import LabBackdrop from '@/components/art/LabBackdrop';
import { Student, Teacher } from '@/components/art/LabCharacters';
import { ClipboardIcon, DnaIcon, PunnettBookIcon, PunnettTabletIcon } from '@/components/art/QuestIcons';
import { BackArrow } from '@/components/icons/Arrowicon';
import Chevron from '@/components/icons/Chevron';
import Button from '@/components/ui/Button';
import { Lesson } from '@/constants/lessons';
import { isLevelPassed, isLevelUnlocked, isStoryRead, Progress, StarsMap, StoriesRead } from '@/constants/prorgess';
import { hasStory } from '@/constants/stories';
import { QUEST } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mission 3 landing page, after the "Punnett Square Lab" mockup: logo + mission banner,
// the two lab students around a glowing Punnett square, then three big menu cards
// (What is it? → How to make one → the Lab). The level quizzes sit underneath.

const INDIGO = QUEST.goldText; // #2A1066
const CYAN = '#67E8F9';

// Chunky outlined game-logo text (RN has no text stroke, so stack a hard shadow)
const LOGO_SHADOW = { textShadowColor: '#2A1066', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 1 };

// ── Glowing Punnett square held between the two students ──────
const HeroSquare = () => {
    const top = ['T', 't'];
    const side = ['T', 't'];
    const cell = (a: string, b: string) => (a === a.toUpperCase() ? a + b : b + a);
    const Box = ({ children, head }: { children?: string; head?: boolean; }) => (
        <View className='size-[30px] items-center justify-center rounded-md border-2'
            style={{ borderColor: CYAN, backgroundColor: head ? 'rgba(103,232,249,0.18)' : 'rgba(27,11,90,0.75)' }}>
            {children ? <Text className='font-fredoka-bold text-white text-[15px]'>{children}</Text> : null}
        </View>
    );
    return (
        <View className='rounded-2xl p-2 gap-1 border-2'
            style={{ borderColor: CYAN, backgroundColor: 'rgba(30,58,158,0.55)', shadowColor: CYAN, shadowOpacity: 0.9, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 10 }}>
            <View className='flex-row gap-1'>
                <View className='size-[30px]' />
                {top.map((t) => <Box key={t} head>{t}</Box>)}
            </View>
            {side.map((s) => (
                <View key={s} className='flex-row gap-1'>
                    <Box head>{s}</Box>
                    {top.map((t) => <Box key={t}>{cell(s, t)}</Box>)}
                </View>
            ))}
        </View>
    );
};

// ── Big menu card ─────────────────────────────────────────────
type CardTheme = { colors: readonly [string, string, ...string[]]; border: string; chevron: readonly [string, string]; };
const THEMES: Record<'gold' | 'lilac' | 'cyan', CardTheme> = {
    gold: { colors: ['#FFF3A8', '#FFD23F', '#FFB800'], border: '#FFF7CC', chevron: ['#A855F7', '#6D28D9'] },
    lilac: { colors: ['#FBF7FF', '#E9DAFF', '#CDB2FF'], border: '#F3EBFF', chevron: ['#A855F7', '#6D28D9'] },
    cyan: { colors: ['#B9F6FF', '#5ED8F5', '#2AA7E6'], border: '#DDFBFF', chevron: ['#A855F7', '#6D28D9'] },
};

const MenuCard = ({ theme, icon, href, locked, children }: { theme: CardTheme; icon: React.ReactNode; href: string; locked?: boolean; children: React.ReactNode; }) => (
    <Button btnType='container' width='full' href={href} disabled={locked} className='rounded-[26px]'>
        <View className='rounded-[26px] p-[3px]'
            style={{ backgroundColor: theme.border, opacity: locked ? 0.6 : 1, shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 5 }, elevation: 8 }}>
            <LinearGradient colors={theme.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className='rounded-[23px] overflow-hidden' style={{ borderRadius: 23 }}>
                <View className='flex-row items-center gap-3 pl-2 pr-3 py-2.5 min-h-[104px]'>
                    <View className='w-[92px] items-center justify-center'>{icon}</View>
                    <View className='flex-1 items-center'>{children}</View>
                    <LinearGradient colors={theme.chevron} className='size-11 rounded-full items-center justify-center' style={{ borderRadius: 22, borderWidth: 3, borderColor: '#fff' }}>
                        {locked ? <Text className='text-base'>🔒</Text> : <Chevron direction='right' color='#fff' size={22} strokeWidth={3.5} />}
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    </Button>
);

// ── Quiz row under the cards ──────────────────────────────────
const QuizRow = ({ num, title, href, passed, unlocked, stars }: { num: number; title: string; href: string; passed: boolean; unlocked: boolean; stars: number; }) => (
    <Button btnType='container' width='full' href={href} disabled={!unlocked} className='rounded-2xl'>
        <View className='flex-row items-center gap-3 rounded-2xl px-3.5 py-3 border-2'
            style={{ backgroundColor: 'rgba(27,11,90,0.7)', borderColor: 'rgba(196,181,253,0.45)', opacity: unlocked ? 1 : 0.55 }}>
            <View className='size-10 rounded-xl items-center justify-center' style={{ backgroundColor: passed ? '#22C55E' : unlocked ? QUEST.gold : 'rgba(255,255,255,0.15)' }}>
                {passed ? <Text className='font-fredoka-bold text-white text-lg'>✓</Text>
                    : unlocked ? <Text className='font-fredoka-bold text-lg' style={{ color: INDIGO }}>{num}</Text>
                        : <Text className='text-base'>🔒</Text>}
            </View>
            <View className='flex-1'>
                <Text className='font-nunito-extrabold text-[10px] uppercase tracking-wide text-white/60'>Quiz · Level {num}</Text>
                <Text className='font-fredoka-bold text-white text-base'>{title}</Text>
            </View>
            {passed && (
                <View className='flex-row gap-0.5'>
                    {[1, 2, 3].map((s) => <Text key={s} style={{ fontSize: 14, opacity: s <= stars ? 1 : 0.25 }}>⭐</Text>)}
                </View>
            )}
        </View>
    </Button>
);

export default function Mission3Hub({ lesson, progress, starsMap, storiesRead }: { lesson: Lesson; progress: Progress; starsMap: StarsMap; storiesRead: StoriesRead; }) {
    const base = `/lessons/${lesson.id}`;
    const labUnlocked = isLevelUnlocked(progress, lesson.id, 1);

    return (
        <View className='flex-1 relative overflow-hidden' style={{ backgroundColor: QUEST.indigo }}>
            <LabBackdrop />

            <SafeAreaView edges={['top']} className='flex-1'>
                <ScrollView contentContainerClassName='px-4 pb-10' showsVerticalScrollIndicator={false}>
                    {/* Back */}
                    <View className='flex-row pt-2'>
                        <Button btnType='container' href='back' className='rounded-pill'>
                            <LinearGradient colors={['#3B82F6', '#1D4ED8']} className='flex-row items-center gap-1.5 px-4 py-2'
                                style={{ borderRadius: 999, borderWidth: 2.5, borderColor: '#fff' }}>
                                <BackArrow color='#fff' size={15} strokeWidth={2.5} />
                                <Text className='font-fredoka-bold text-white text-base'>Back</Text>
                            </LinearGradient>
                        </Button>
                    </View>

                    {/* ── Logo + mission banners ───────────────── */}
                    <View className='items-center -mt-2'>
                        <View className='flex-row items-center'>
                            <Text className='font-fredoka-bold text-white text-[44px] leading-[48px] uppercase' style={LOGO_SHADOW}>Gene</Text>
                            <View className='-ml-1 -mt-3'><DnaIcon size={40} /></View>
                        </View>
                        <Text className='font-fredoka-bold text-[48px] leading-[50px] uppercase -mt-1' style={[LOGO_SHADOW, { color: QUEST.gold }]}>Think</Text>

                        <LinearGradient colors={['#E879F9', '#A21CAF', '#7E22CE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            className='rounded-pill px-6 py-1 mt-1' style={{ borderRadius: 999, borderWidth: 2, borderColor: '#F5D0FE' }}>
                            <Text className='font-fredoka-bold text-white text-base uppercase tracking-wider'>Mission 3</Text>
                        </LinearGradient>

                        <View className='rounded-2xl px-6 py-2 mt-2 border-[3px]'
                            style={{ backgroundColor: '#24107A', borderColor: '#C4B5FD', shadowColor: '#A78BFA', shadowOpacity: 0.8, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 8 }}>
                            <Text className='font-fredoka-bold text-white text-[22px] uppercase text-center'>Punnett Square Lab</Text>
                        </View>
                    </View>

                    {/* ── Students around the glowing square ───── */}
                    <View className='h-[176px] mt-1 items-center justify-end'>
                        <View className='absolute top-6 self-center'><HeroSquare /></View>
                        <View className='absolute bottom-0 left-[-10px]'><Teacher size={140} /></View>
                        <View className='absolute bottom-0 right-[-10px]'><Student size={136} /></View>
                    </View>

                    {/* ── Intro line ──────────────────────────── */}
                    <View className='rounded-2xl px-4 py-2.5 border-2 -mt-2'
                        style={{ backgroundColor: 'rgba(27,11,90,0.92)', borderColor: '#A78BFA' }}>
                        <Text className='font-nunito-extrabold text-white text-[15px] text-center leading-5'>
                            Let’s discover how traits are inherited using a <Text style={{ color: QUEST.gold }}>Punnett square</Text>!
                        </Text>
                    </View>

                    {/* ── Menu cards ──────────────────────────── */}
                    <View className='gap-4 mt-5'>
                        <MenuCard theme={THEMES.gold} icon={<PunnettBookIcon size={84} />} href={`${base}/1/story?start=m3-what`}>
                            <Text className='font-fredoka-bold text-[22px] leading-[25px] uppercase text-center' style={{ color: INDIGO }}>What is a{'\n'}Punnett{'\n'}Square?</Text>
                        </MenuCard>

                        <MenuCard theme={THEMES.lilac} icon={<ClipboardIcon size={84} />} href={`${base}/1/story?start=m3-steps`}>
                            <Text className='font-fredoka-bold text-[14px] leading-[17px] uppercase text-center' style={{ color: INDIGO }}>Steps on how to{'\n'}make a</Text>
                            <Text className='font-fredoka-bold text-[24px] leading-[27px] uppercase text-center' style={{ color: '#FFC928', textShadowColor: INDIGO, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 }}>Punnett{'\n'}Square</Text>
                        </MenuCard>

                        <MenuCard theme={THEMES.cyan} icon={<PunnettTabletIcon size={84} />} href={`${base}/2/story?start=m3lab-how`} locked={!labUnlocked}>
                            <Text className='font-fredoka-bold text-[22px] leading-[25px] uppercase text-center' style={{ color: INDIGO }}>Punnett{'\n'}Square</Text>
                            <Text className='font-fredoka-bold text-[30px] leading-[32px] uppercase text-center' style={{ color: QUEST.gold, textShadowColor: INDIGO, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 }}>Lab</Text>
                            {!labUnlocked && <Text className='font-nunito-bold text-[11px] text-center' style={{ color: INDIGO }}>Pass Quiz 1 to unlock</Text>}
                        </MenuCard>
                    </View>

                    {/* ── Quizzes ─────────────────────────────── */}
                    <Text className='font-fredoka-bold text-white text-lg mt-7 mb-2'>Mission quizzes</Text>
                    <View className='gap-2.5'>
                        {lesson.levels.map((level, idx) => {
                            const unread = hasStory(lesson.id, level.id) && !isStoryRead(storiesRead, lesson.id, idx);
                            return (
                                <QuizRow key={level.id} num={level.id} title={level.title}
                                    href={unread ? `${base}/${level.id}/story` : `${base}/${level.id}`}
                                    passed={isLevelPassed(progress, lesson.id, idx)} unlocked={isLevelUnlocked(progress, lesson.id, idx)}
                                    stars={starsMap[lesson.id]?.[idx] ?? 0} />
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
