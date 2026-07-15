import { Lesson, LESSONS } from '@/constants/lessons';
import { getLevelsDone, isLevelPassed, isLevelUnlocked, Progress, StarsMap } from '@/constants/prorgess';
import { DEFAULT_EXPLORED, ExploredSections, STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ProgressBar from '../ProgressBar';
import Chevron from '../icons/Chevron';

const EXPLORED_SECTIONS: { key: keyof ExploredSections; label: string; icon: string; }[] = [
    { key: 'lessons', label: 'Lessons', icon: '🏠' },
    { key: 'progress', label: 'Progress', icon: '📊' },
    { key: 'guide', label: 'Guide', icon: '📖' },
];

// ── Exploration checklist card ─────────────────────────────────
const ExploredCard = ({ explored }: { explored: ExploredSections; }) => (
    <View className='bg-bg-card rounded-2xl p-4 gap-2.5' style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}>
        <Text className='font-fredoka-bold text-ink-300 text-sm'>App Explored</Text>

        <View className='flex-row gap-2'>
            {EXPLORED_SECTIONS.map((s) => (
                <View key={s.key} className={cn('flex-1 items-center rounded-xl py-2.5 gap-1 border', explored[s.key] ? 'bg-primary-50 border-primary-300' : 'bg-[#f5f5f5] border-[#e0e0e0]')}>
                    <Text className='text-lg'>{s.icon}</Text>
                    <Text className={cn('font-nunito-semibold text-xs', explored[s.key] ? 'text-primary-500' : 'text-ink-100')}>{s.label}</Text>
                    <Text className='text-xs'>{explored[s.key] ? '✓' : '—'}</Text>
                </View>
            ))}
        </View>
    </View>
);


// ── Level pill (pass / locked / unlocked) ─────────────────────
const LevelPill = ({ title, passed, unlocked, levelNum, stars }: { title: string, passed: boolean; unlocked: boolean; levelNum: number; stars: number; }) => {
    const bg = passed ? "bg-primary-100 border-primary-300" : unlocked ? "bg-[#fff9e6] border-amber" : "bg-[#f5f5f5] border-[#e0e0e0]";
    const textColor = passed ? "text-primary-500" : unlocked ? "text-amber" : "text-ink-100";
    const icon = passed ? "✓" : unlocked ? `${levelNum}` : "🔒";

    return (
        <View className={cn("flex-row items-center gap-2 rounded-xl px-3 py-2 border", bg)} >
            <View className={cn("size-6 rounded-pill items-center justify-center", passed ? "bg-primary-300" : unlocked ? "bg-amber" : "bg-[#e0e0e0]")} >
                <Text className={cn("font-nunito-bold text-xs", passed || unlocked ? "text-white" : "text-ink-100")} >{icon}</Text>
            </View>

            <Text className={cn("font-nunito-semibold text-xs flex-1", textColor)} >{title}</Text>

            {/* Stars — right side, only when passed */}
            {passed && (
                <View className="flex-row gap-0.5">
                    {[1, 2, 3].map(s => (
                        <Text key={s} style={{ fontSize: 12, opacity: s <= stars ? 1 : 0.2 }}>⭐</Text>
                    ))}
                </View>
            )}
        </View>
    );
};

// ── Lesson progress card ──────────────────────────────────────
const LessonCard = ({ lesson, progress, expanded, onToggle, art }: { lesson: Lesson; progress: Progress; expanded: boolean; onToggle: () => void; art: React.JSX.Element; }) => {
    const done = getLevelsDone(progress, lesson.id);
    const total = lesson.levels.length;
    const pct = Math.round((done / total) * 100);

    const [starsMap, setStarsMap] = useState<StarsMap>({});

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEYS.stars).then(raw => {
            if (raw) setStarsMap(JSON.parse(raw));
        });
    }, []);

    return (
        <View className='bg-bg-card rounded-2xl overflow-hidden' style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}>
            <Pressable onPress={onToggle} className='flex-row items-center px-4 py-3 gap-3'>
                <View className='size-[70px]'>{art}</View>

                <View className='flex-1'>
                    <Text className='font-fredoka-bold text-ink-300 text-base'>{lesson.title}</Text>

                    <ProgressBar pct={pct} color={lesson.accentColor} />

                    <Text className='font-nunito text-ink-100 text-xs mt-1'>{done} of {total} levels cleared</Text>
                </View>

                <Text className='font-fredoka-bold text-lg' style={{ color: lesson.accentColor }} >{pct}%</Text>

                <Chevron
                    direction={expanded ? "up" : "down"}
                    color={lesson.accentColor}
                    size={18}
                />
            </Pressable>

            {expanded && (
                <View className='px-4 pb-3 gap-2'>
                    <View className='h-[1px] bg-[#f0f0f0] mb-1' />
                    {lesson.levels.map((level, idx) => (
                        <LevelPill key={level.id} levelNum={level.id} title={level.title} passed={isLevelPassed(progress, lesson.id, idx)} unlocked={isLevelUnlocked(progress, lesson.id, idx)} stars={starsMap[lesson.id]?.[idx] ?? 0} />
                    ))}
                </View>
            )}
        </View>
    );
};


export default function ProgressTab({ progress, art }: { progress: Progress; art: React.JSX.Element[]; }) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [explored, setExplored] = useState<ExploredSections>(DEFAULT_EXPLORED);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEYS.explored).then((raw) => {
            const loaded = raw ? { ...DEFAULT_EXPLORED, ...JSON.parse(raw) } : DEFAULT_EXPLORED;
            setExplored({ ...loaded, progress: true }); // this tab is being viewed right now
        });
    }, []);

    const totalDone = LESSONS.reduce((s, l) => s + getLevelsDone(progress, l.id), 0);
    const totalLevels = LESSONS.reduce((s, l) => s + l.levels.length, 0);
    return (
        <ScrollView className='flex-1 p-4 gap-3' showsVerticalScrollIndicator={false}>
            <View className='flex-row items-center justify-between'>
                <Text className='font-fredoka-bold text-ink-300 text-xl mb-4'>Your Progress</Text>

                <Text className='font-fredoka-bold text-primary-400 text-lg'>{totalDone}/{totalLevels} levels</Text>
            </View>

            <View className='gap-3'>
                {/* Exploration checklist */}
                <ExploredCard explored={explored} />

                {/* Per-lesson cards */}
                {LESSONS.map((lesson, i) => (
                    <LessonCard key={lesson.id} lesson={lesson} progress={progress} expanded={expanded === lesson.id} onToggle={() => setExpanded((prev) => (prev === lesson.id ? null : lesson.id))} art={art[i]} />
                ))}

                {/* Legend */}
                <View className='flex-row gap-3 justify-center mt-1'>
                    {[
                        { color: "bg-primary-300", label: "Passed" },
                        { color: "bg-amber", label: "Unlocked" },
                        { color: "bg-[#e0e0e0]", label: "Locked" }
                    ].map((l) => (
                        <View key={l.label} className='flex-row items-center gap-1.5'>
                            <View className={cn("w-3 h-3 rounded-full", l.color)} />
                            <Text className='font-nunito text-ink-100 text-xs'>{l.label}</Text>
                        </View>
                    ))}
                </View>

                <View className="h-6" />
            </View>
        </ScrollView>
    );
}
