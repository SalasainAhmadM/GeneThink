import Button from '@/components/ui/Button';
import { LevelMission } from '@/constants/missions';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ClueHeader } from './Cards';
import MissionBlockView, { isInteractive } from './MissionBlocks';

// Screen-by-screen mission player. Blocks after an unsolved interactive block stay hidden,
// and Next unlocks once every interactive block on the screen is solved.
export default function MissionReader({ mission, accentColor, onFinish }: { mission: LevelMission; accentColor: string; onFinish: () => void; }) {
    const [index, setIndex] = useState(0);
    const [solved, setSolved] = useState<Record<string, true>>({});
    const scrollRef = useRef<ScrollView>(null);

    const screen = mission.screens[index];
    const isLast = index === mission.screens.length - 1;
    const key = (b: number) => `${index}:${b}`;

    // Show blocks up to (and including) the first unsolved interactive one
    const firstOpen = screen.blocks.findIndex((b, i) => isInteractive(b) && !solved[key(i)]);
    const visible = firstOpen === -1 ? screen.blocks : screen.blocks.slice(0, firstOpen + 1);
    const canContinue = firstOpen === -1;

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
                        <View key={s.id} className='h-1.5 rounded-pill' style={{ width: i === index ? 18 : 6, backgroundColor: i <= index ? accentColor : '#e0e0e0' }} />
                    ))}
                </View>
                <Text className='font-nunito-bold text-ink-100 text-[11px]'>Screen {index + 1} of {mission.screens.length}</Text>
            </View>

            <ScrollView ref={scrollRef} className='flex-1' contentContainerClassName='px-5 pt-1 pb-6' showsVerticalScrollIndicator={false}>
                {/* Mission banner on the first screen */}
                {index === 0 && (
                    <View className='items-center mb-4'>
                        <Text className='font-fredoka-bold text-[26px] uppercase' style={{ color: accentColor }}>{mission.title}</Text>
                        <View className='rounded-pill px-5 py-1.5 mt-1 bg-[#fff8e1] border-2 border-gold'>
                            <Text className='font-fredoka-bold text-ink-300 text-sm uppercase'>{mission.mission} · {mission.tagline}</Text>
                        </View>
                    </View>
                )}

                <ClueHeader title={screen.title} kicker={screen.kicker} accentColor={accentColor} />

                <View className='gap-4'>
                    {visible.map((b, i) => (
                        <MissionBlockView key={`${screen.id}-${i}`} block={b} accentColor={accentColor} solved={!!solved[key(i)]} onSolved={() => setSolved((s) => ({ ...s, [key(i)]: true }))} />
                    ))}
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
