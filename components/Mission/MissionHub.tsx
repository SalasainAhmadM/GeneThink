import LabBackdrop from '@/components/art/LabBackdrop';
import { Student, Teacher } from '@/components/art/LabCharacters';
import { ClipboardIcon, DnaIcon, FlowerPairIcon, MagnifierIcon, PunnettBookIcon, PunnettTabletIcon, SeedQuadIcon } from '@/components/art/QuestIcons';
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
import ScientistSvg from '../../assets/svgs/scientist.svg';
import { Flower, Plant, Pod, Seed } from './MissionVisuals';

// Mission landing page, after the "Punnett Square Lab" mockup: logo + mission banners,
// the two lab students around a glowing centrepiece, then big menu cards that open the
// mission on a given screen (story?start=<screenId>). The level quizzes sit underneath.
// Each mission's content lives in HUBS at the bottom of this file.

const INDIGO = QUEST.goldText; // #2A1066
const CYAN = '#67E8F9';

// Chunky outlined game-logo text (RN has no text stroke, so stack a hard shadow)
const LOGO_SHADOW = { textShadowColor: INDIGO, textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 1 };
const GOLD_SHADOW = { color: QUEST.gold, textShadowColor: INDIGO, textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 };

// ── Types ─────────────────────────────────────────────────────
/** One line of a card title: ink (default), small ink, or gold highlight */
type Line = { t: string; k?: 'small' | 'gold' | 'goldBig'; };
type HubCard = {
    lines: Line[];
    icon: React.ReactNode;
    level: number;        // lesson level the card opens (1-based)
    start?: string;       // mission screen id to open on
};
export type HubConfig = {
    mission: string;      // 'Mission 3'
    banner: string;       // 'Punnett Square Lab'
    intro: React.ReactNode;
    hero: React.ReactNode;
    menuHeading?: string; // e.g. 'Choose a cross to explore:'
    cards: HubCard[];
};

// ── Glowing panel in the middle of the hero ───────────────────
const GlowPanel = ({ children, pad = 8 }: { children: React.ReactNode; pad?: number; }) => (
    <View className='rounded-2xl border-2 items-center justify-center'
        style={{ padding: pad, borderColor: CYAN, backgroundColor: 'rgba(30,58,158,0.55)', shadowColor: CYAN, shadowOpacity: 0.9, shadowRadius: 14, shadowOffset: { width: 0, height: 0 }, elevation: 10 }}>
        {children}
    </View>
);

// Mission 3 · the T/t Punnett square
const HeroSquare = () => {
    const top = ['T', 't'];
    const cell = (a: string, b: string) => (a === a.toUpperCase() ? a + b : b + a);
    const Box = ({ children, head }: { children?: string; head?: boolean; }) => (
        <View className='size-[30px] items-center justify-center rounded-md border-2'
            style={{ borderColor: CYAN, backgroundColor: head ? 'rgba(103,232,249,0.18)' : 'rgba(27,11,90,0.75)' }}>
            {children ? <Text className='font-fredoka-bold text-white text-[15px]'>{children}</Text> : null}
        </View>
    );
    return (
        <GlowPanel>
            <View className='gap-1'>
                <View className='flex-row gap-1'>
                    <View className='size-[30px]' />
                    {top.map((t) => <Box key={t} head>{t}</Box>)}
                </View>
                {top.map((s) => (
                    <View key={s} className='flex-row gap-1'>
                        <Box head>{s}</Box>
                        {top.map((t) => <Box key={t}>{cell(s, t)}</Box>)}
                    </View>
                ))}
            </View>
        </GlowPanel>
    );
};

// Mission 2 · P → F₁ → F₂ with the 3 : 1 ratio
const HeroRatio = () => (
    <GlowPanel pad={6}>
        <View className='flex-row items-end gap-0.5'>
            {[true, true, true, false].map((tall, i) => <Plant key={i} tall={tall} flower='#8E24AA' size={44} />)}
        </View>
        <Text className='font-fredoka-bold text-white text-lg -mt-1'>3 <Text style={{ color: CYAN }}>:</Text> 1</Text>
    </GlowPanel>
);

// ── Big menu card ─────────────────────────────────────────────
type CardTheme = { colors: readonly [string, string, ...string[]]; border: string; };
const THEMES: CardTheme[] = [
    { colors: ['#FFF3A8', '#FFD23F', '#FFB800'], border: '#FFF7CC' },
    { colors: ['#FBF7FF', '#E9DAFF', '#CDB2FF'], border: '#F3EBFF' },
    { colors: ['#B9F6FF', '#5ED8F5', '#2AA7E6'], border: '#DDFBFF' },
];

// On the yellow card a gold highlight would vanish, so it turns violet there
const VIOLET_HL = { color: '#7E22CE', textShadowColor: '#FFFFFF', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 1 };

const CardTitle = ({ lines, onGold }: { lines: Line[]; onGold?: boolean; }) => (
    <>
        {lines.map((l, i) => (
            <Text key={i} className='font-fredoka-bold uppercase text-center'
                style={[
                    l.k === 'small' ? { fontSize: 14, lineHeight: 17, color: INDIGO }
                        : l.k === 'gold' ? { fontSize: 24, lineHeight: 27, ...(onGold ? VIOLET_HL : GOLD_SHADOW) }
                            : l.k === 'goldBig' ? { fontSize: 30, lineHeight: 32, ...(onGold ? VIOLET_HL : GOLD_SHADOW) }
                                : { fontSize: 22, lineHeight: 25, color: INDIGO },
                ]}>{l.t}</Text>
        ))}
    </>
);

const MenuCard = ({ theme, icon, href, lockedHint, lines }: { theme: CardTheme; icon: React.ReactNode; href: string; lockedHint?: string; lines: Line[]; }) => {
    const locked = !!lockedHint;
    return (
        <Button btnType='container' width='full' href={href} disabled={locked} className='rounded-[26px]'>
            <View className='rounded-[26px] p-[3px]'
                style={{ backgroundColor: theme.border, opacity: locked ? 0.6 : 1, shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 5 }, elevation: 8 }}>
                <LinearGradient colors={theme.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 23 }}>
                    <View className='flex-row items-center gap-3 pl-2 pr-3 py-2.5 min-h-[104px]'>
                        <View className='w-[92px] items-center justify-center'>{icon}</View>
                        <View className='flex-1 items-center'>
                            <CardTitle lines={lines} onGold={theme === THEMES[0]} />
                            {locked && <Text className='font-nunito-bold text-[11px] text-center' style={{ color: INDIGO }}>{lockedHint}</Text>}
                        </View>
                        <LinearGradient colors={['#A855F7', '#6D28D9']} className='size-11 items-center justify-center' style={{ borderRadius: 22, borderWidth: 3, borderColor: '#fff' }}>
                            {locked ? <Text className='text-base'>🔒</Text> : <Chevron direction='right' color='#fff' size={22} strokeWidth={3.5} />}
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
        </Button>
    );
};

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

export default function MissionHub({ hub, lesson, progress, starsMap, storiesRead }: { hub: HubConfig; lesson: Lesson; progress: Progress; starsMap: StarsMap; storiesRead: StoriesRead; }) {
    const base = `/lessons/${lesson.id}`;

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
                            className='px-6 py-1 mt-1' style={{ borderRadius: 999, borderWidth: 2, borderColor: '#F5D0FE' }}>
                            <Text className='font-fredoka-bold text-white text-base uppercase tracking-wider'>{hub.mission}</Text>
                        </LinearGradient>

                        <View className='rounded-2xl px-6 py-2 mt-2 border-[3px]'
                            style={{ backgroundColor: '#24107A', borderColor: '#C4B5FD', shadowColor: '#A78BFA', shadowOpacity: 0.8, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 8 }}>
                            <Text className='font-fredoka-bold text-white text-[22px] uppercase text-center'>{hub.banner}</Text>
                        </View>
                    </View>

                    {/* ── Students around the glowing centrepiece ─ */}
                    <View className='h-[176px] mt-1 items-center justify-end'>
                        <View className='absolute top-6 self-center'>{hub.hero}</View>
                        <View className='absolute bottom-0 left-[-10px]'><Teacher size={140} /></View>
                        <View className='absolute bottom-0 right-[-10px]'><Student size={136} /></View>
                    </View>

                    {/* ── Intro line ──────────────────────────── */}
                    <View className='rounded-2xl px-4 py-2.5 border-2 -mt-2'
                        style={{ backgroundColor: 'rgba(27,11,90,0.92)', borderColor: '#A78BFA' }}>
                        <Text className='font-nunito-extrabold text-white text-[15px] text-center leading-5'>{hub.intro}</Text>
                    </View>

                    {/* ── Menu cards ──────────────────────────── */}
                    {hub.menuHeading && <Text className='font-fredoka-bold text-white text-xl mt-5 -mb-1 uppercase' style={LOGO_SHADOW}>{hub.menuHeading}</Text>}
                    <View className='gap-4 mt-5'>
                        {hub.cards.map((c, i) => {
                            const idx = c.level - 1;
                            const unlocked = isLevelUnlocked(progress, lesson.id, idx);
                            return (
                                <MenuCard key={i} theme={THEMES[i % THEMES.length]} icon={c.icon} lines={c.lines}
                                    href={`${base}/${c.level}/story${c.start ? `?start=${c.start}` : ''}`}
                                    lockedHint={unlocked ? undefined : `Pass Quiz ${idx} to unlock`} />
                            );
                        })}
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

// ══════════════════════════════════════════════════════════════
//  Hub content per mission (keyed by lesson id)
// ══════════════════════════════════════════════════════════════
const Gold = ({ children }: { children: React.ReactNode; }) => <Text style={{ color: QUEST.gold }}>{children}</Text>;
const Row = ({ children }: { children: React.ReactNode; }) => <View className='flex-row items-center justify-center'>{children}</View>;

export const HUBS: Record<string, HubConfig> = {
    terms: {
        mission: 'Mission 1',
        banner: 'Genetics Investigator',
        intro: <>Crack the genetic code and learn the <Gold>words of heredity</Gold>!</>,
        hero: <GlowPanel pad={10}><MagnifierIcon size={84} /></GlowPanel>,
        cards: [
            { level: 1, lines: [{ t: 'Crack the' }, { t: 'Genetic', k: 'gold' }, { t: 'Code', k: 'gold' }], icon: <MagnifierIcon size={84} /> },
            { level: 2, start: 'm1b-cover', lines: [{ t: 'Dominant &' }, { t: 'Recessive' }, { t: 'Traits', k: 'gold' }], icon: <FlowerPairIcon size={84} /> },
            {
                level: 2, start: 'm1b-table', lines: [{ t: 'The pea plant', k: 'small' }, { t: 'Traits', k: 'goldBig' }],
                icon: <View className='items-center'><Row><Seed color='#FDD835' size={36} /><Seed color='#7CB342' wrinkled size={36} /></Row><Pod color='#66BB6A' size={64} /></View>,
            },
        ],
    },
    mendel: {
        mission: 'Mission 2',
        banner: "Mendel's Laws",
        intro: <>Follow <Gold>Gregor Mendel</Gold> and discover the laws of inheritance!</>,
        hero: <HeroRatio />,
        cards: [
            { level: 1, start: 'm2a-cover', lines: [{ t: 'The monk who', k: 'small' }, { t: 'Counted' }, { t: 'Peas', k: 'goldBig' }], icon: <ScientistSvg width={84} height={84} /> },
            { level: 1, start: 'm2a-count', lines: [{ t: 'Count the' }, { t: 'Evidence', k: 'gold' }], icon: <ClipboardIcon size={84} /> },
            { level: 2, start: 'm2b-cover', lines: [{ t: 'The three', k: 'small' }, { t: 'Laws of' }, { t: 'Mendel', k: 'gold' }], icon: <PunnettBookIcon size={84} /> },
        ],
    },
    punnett: {
        mission: 'Mission 3',
        banner: 'Punnett Square Lab',
        intro: <>Let’s discover how traits are inherited using a <Gold>Punnett square</Gold>!</>,
        hero: <HeroSquare />,
        cards: [
            { level: 1, start: 'm3-what', lines: [{ t: 'What is a' }, { t: 'Punnett' }, { t: 'Square?' }], icon: <PunnettBookIcon size={84} /> },
            { level: 1, start: 'm3-steps', lines: [{ t: 'Steps on how to', k: 'small' }, { t: 'make a', k: 'small' }, { t: 'Punnett', k: 'gold' }, { t: 'Square', k: 'gold' }], icon: <ClipboardIcon size={84} /> },
            { level: 2, start: 'm3lab-how', lines: [{ t: 'Punnett' }, { t: 'Square' }, { t: 'Lab', k: 'goldBig' }], icon: <PunnettTabletIcon size={84} /> },
        ],
    },
    dihybrid: {
        mission: 'Mission 4',
        banner: 'Monohybrid & Dihybrid',
        intro: <>Predict the offspring for <Gold>one trait</Gold> — then for <Gold>two traits</Gold> at once!</>,
        hero: <GlowPanel pad={10}><SeedQuadIcon size={84} /></GlowPanel>,
        menuHeading: 'Choose a cross to explore:',
        cards: [
            {
                level: 1, lines: [{ t: 'Monohybrid' }, { t: 'Cross', k: 'gold' }, { t: '(One trait)', k: 'small' }],
                icon: <Row><Seed color='#FDD835' size={44} /><Seed color='#7CB342' wrinkled size={44} /></Row>,
            },
            {
                level: 2, lines: [{ t: 'Dihybrid' }, { t: 'Cross', k: 'gold' }, { t: '(Two traits)', k: 'small' }],
                icon: <View className='items-center'><Row><Flower color='#8E24AA' size={40} /><Flower color='#FAFAFA' size={40} /></Row><Row><Seed color='#FDD835' size={34} /><Seed color='#7CB342' wrinkled size={34} /></Row></View>,
            },
            { level: 2, start: 'm4d-practice', lines: [{ t: "Let's" }, { t: 'Practice!', k: 'gold' }], icon: <PunnettTabletIcon size={84} /> },
        ],
    },
};
