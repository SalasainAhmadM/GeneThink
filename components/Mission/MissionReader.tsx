import { playSound } from '@/lib/sound';
import Button from '@/components/ui/Button';
import { LevelMission } from '@/constants/missions';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ClipboardIcon, PunnettTabletIcon, TargetIcon } from '@/components/art/QuestIcons';
import { ClueHeader } from './Cards';
import MissionBlockView, { isInteractive } from './MissionBlocks';
import { QUEST } from '@/constants/theme';

// Screen-by-screen mission player. Blocks after an unsolved interactive block stay hidden,
// and Next unlocks once every interactive block on the screen is solved.
export default function MissionReader({ mission, accentColor, onFinish, startAt }: { mission: LevelMission; accentColor: string; onFinish: () => void; startAt?: string; }) {
    // `startAt` opens the mission on a given screen id (used by the Mission 3 hub cards)
    const [index, setIndex] = useState(() => Math.max(0, mission.screens.findIndex((s) => s.id === startAt)));
    const [solved, setSolved] = useState<Record<string, true>>({});
    const scrollRef = useRef<ScrollView>(null);

    const screen = mission.screens[index];
    const isLast = index === mission.screens.length - 1;
    const key = (b: number) => `${index}:${b}`;

    // Show blocks up to (and including) the first unsolved interactive one
    const firstOpen = screen.blocks.findIndex((b, i) => isInteractive(b) && !solved[key(i)]);
    const visible = firstOpen === -1 ? screen.blocks : screen.blocks.slice(0, firstOpen + 1);
    const canContinue = firstOpen === -1;
    const isCover = screen.blocks[0]?.type === 'cover';

    // Header icon, as in the mockups: tablet for the lab, target for practice, clipboard for quizzes
    const types = screen.blocks.map((b) => b.type);
    const headerIcon = types.includes('lab') ? <PunnettTabletIcon size={30} />
        : types.includes('builder') || /practice/i.test(screen.kicker ?? '') ? <TargetIcon size={30} />
            : /quiz|check/i.test(`${screen.title} ${screen.kicker ?? ''}`) ? <ClipboardIcon size={30} />
                : undefined;

    const goTo = (i: number) => {
        setIndex(Math.max(0, Math.min(mission.screens.length - 1, i)));
        scrollRef.current?.scrollTo({ y: 0, animated: false });
    };

    return (
        <View className='flex-1'>
            {/* Progress dots + screen count */}
            <View className='items-center gap-1.5 py-3'>
                <View className='flex-row justify-center gap-1.5'>
                    {mission.screens.map((s, i) => (
                        <View key={s.id} className='h-1.5 rounded-pill' style={{ width: i === index ? 18 : 6, backgroundColor: i <= index ? QUEST.gold : 'rgba(255,255,255,0.3)' }} />
                    ))}
                </View>
                <Text className='font-nunito-bold text-white/70 text-[11px]'>Screen {index + 1} of {mission.screens.length}</Text>
            </View>

            <ScrollView ref={scrollRef} className='flex-1' contentContainerClassName='px-4 pt-1 pb-6' showsVerticalScrollIndicator={false}>
                {/* Cover screens sit straight on the lab scene; every other screen gets the lavender panel */}
                <View className={isCover ? '' : 'rounded-3xl px-4 pt-4 pb-5 border-2'} style={isCover ? undefined : { backgroundColor: QUEST.lavender + 'f2', borderColor: QUEST.lavenderBorder }}>
                {/* Mission banner on the first screen */}
                {index === 0 && !isCover && (
                    <View className='items-center mb-4'>
                        <Text className='font-fredoka-bold text-[26px] uppercase' style={{ color: accentColor }}>{mission.title}</Text>
                        <View className='rounded-pill px-5 py-1.5 mt-1 bg-[#fff8e1] border-2 border-gold'>
                            <Text className='font-fredoka-bold text-ink-300 text-sm uppercase'>{mission.mission} · {mission.tagline}</Text>
                        </View>
                    </View>
                )}

                {!isCover && <ClueHeader title={screen.title} kicker={screen.kicker} accentColor={accentColor} icon={headerIcon} />}

                <View className='gap-4'>
                    {visible.map((b, i) => (
                        <MissionBlockView key={`${screen.id}-${i}`} block={b} accentColor={accentColor} solved={!!solved[key(i)]} onSolved={() => { if (!solved[key(i)]) playSound('correct'); setSolved((s) => ({ ...s, [key(i)]: true })); }} />
                    ))}
                </View>
                </View>
            </ScrollView>

            {/* Footer nav */}
            <View className='flex-row items-center justify-between px-5 pb-6 pt-3'>
                <View style={{ opacity: index === 0 ? 0 : 1 }} pointerEvents={index === 0 ? 'none' : 'auto'}>
                    <Button label='Back' btnType='ghost' size='md' fredokaBold onPress={() => goTo(index - 1)} />
                </View>

                {isLast ? (
                    <Button label='Start Quiz →' btnType='secondary' size='lg' fredokaBold disabled={!canContinue} onPress={onFinish} />
                ) : (
                    <Button label={canContinue ? 'Next' : 'Solve the clue'} btnType='primary' size='md' fredokaBold disabled={!canContinue} onPress={() => goTo(index + 1)} />
                )}
            </View>
        </View>
    );
}
