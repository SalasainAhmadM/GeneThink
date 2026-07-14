import { BackArrow } from '@/components/icons/Arrowicon';
import Button from '@/components/ui/Button';
import { HEARTS_PER_LEVEL, LESSONS } from '@/constants/lessons';
import { isLevelPassed, isLevelUnlocked, Progress, StarsMap } from '@/constants/prorgess';
import { STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ── Difficulty badge derived from level index ─────────────────
// Level 1 = Beginner, Level 2 = Explorer, Level 3 = Scientist
const LEVEL_LABELS = ["Beginner 🌱", "Explorer 🔥", "Scientist 🔬"];
const LEVEL_COLORS = ["#4CAF50", "#FF9800", "#F44336"];
const LEVEL_BG = ["#e8f5e9", "#fff3e0", "#ffebee"];

// ── Heart icon (SVG-free, just emoji for now) ─────────────────
const HeartRow = ({ count }: { count: number; }) => (
    <View className='flex-row gap-1 mt-2'>
        {Array.from({ length: count }).map((_, i) => (
            <Text key={i} className='text-base'>❤️</Text>
        ))}
    </View>
);

const LevelCard = ({ levelNum, title, passed, unlocked, accentColor, hrefLink, stars }: { levelNum: number; title: string; passed: boolean; unlocked: boolean; accentColor: string; hrefLink: string; stars: number; }) => {
    const labelIndex = Math.min(levelNum - 1, LEVEL_LABELS.length - 1);
    const diffColor = LEVEL_COLORS[labelIndex];
    const diffBg = LEVEL_BG[labelIndex];

    return (
        <Button btnType='container' width='full' disabled={!unlocked} href={hrefLink} className='rounded-[18px]'>
            <View className={cn("bg-white rounded-[18px] px-4 py-4 flex-row items-center gap-4", !unlocked && "opacity-50")}>
                {/* Level number badge */}
                <View className='size-11 rounded-[14px] items-center justify-center'
                    style={{ backgroundColor: unlocked ? accentColor + '35' : '#9e9e9e73' }}
                >
                    {passed ? (<Text className='font-fredoka-bold text-xl' style={{ color: accentColor }}>✓</Text>) : unlocked ? (<Text className='font-fredoka-bold text-xl' style={{ color: accentColor }}>{levelNum}</Text>) : (<Text className='text-lg'>🔒</Text>)}
                </View>

                {/* Info */}
                <View className='flex-1'>
                    <Text className='font-fredoka-bold text-ink-300 text-base'>{title}</Text>

                    {/* Difficulty + type pills */}
                    <View className='flex-row gap-2 mt-1.5 flex-wrap'>
                        <View className='rounded-pill px-3 py-1.5' style={{ backgroundColor: diffBg }}>
                            <Text className='font-nunito-bold text-[11px]' style={{ color: diffColor }}>{LEVEL_LABELS[labelIndex]}</Text>
                        </View>
                        <View className='rounded-pill px-3 py-1.5 bg-[#f5f5f5]'>
                            <Text className='font-nunito text-[11px] text-ink-100'>📝 Multiple Choice + Drag</Text>
                        </View>
                    </View>

                    {/* Hearts — always 5, just visual info */}
                    <View className='flex-row items-center justify-between'>
                        <HeartRow count={HEARTS_PER_LEVEL} />

                        {passed && (
                            <View className="flex-row gap-0.5">
                                {[1, 2, 3].map(s => (
                                    <Text key={s} style={{ fontSize: 14, opacity: s <= stars ? 1 : 0.2 }}>⭐</Text>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Button>
    );
};

export default function LessonSelectScreen() {
    const { id } = useLocalSearchParams<{ id: string; }>();
    const [progress, setProgress] = useState<Progress>({});
    const [starsMap, setStarsMap] = useState<StarsMap>({});

    const lesson = LESSONS.find((l) => l.id === id);

    useEffect(() => {
        (async () => {
            const [progressRaw, starsRaw] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.progress),
                AsyncStorage.getItem(STORAGE_KEYS.stars),
            ]);
            if (progressRaw) setProgress(JSON.parse(progressRaw));
            if (starsRaw) setStarsMap(JSON.parse(starsRaw));
        })();
    }, []);

    if (!lesson) {
        return (
            <View className='flex-1 items-center justify-center bg-bg-light'><Text className='font-nunito text-ink-100'>Lesson not found.</Text></View>
        );
    }

    return (
        <View className='flex-1 bg-bg-light' >
            {/* ── Header ─────────────────────────────────────────── */}
            <LinearGradient colors={[lesson.accentColor + "cc", lesson.accentColor]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <SafeAreaView edges={['top']}>
                    <View className='p-4'>
                        <View className='flex-row items-center gap-3 mb-1' >
                            <Button btnType='glass' size='sm' icon={<BackArrow color='#fff' size={15} strokeWidth={2.5} />} label='Back' href='back' />
                            <Text className='font-fredoka-bold text-white text-xl flex-1'>{lesson.title}</Text>
                        </View>
                        <Text className='font-nunito text-white/75 text-sm ml-1' >{lesson.subtitle}</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* ── Level list ─────────────────────────────────────── */}
            <ScrollView contentContainerClassName='flex-1 p-4 gap-3' showsVerticalScrollIndicator={false}>
                <Text className='font-nunito-bold text-ink-200 text-sm mb-1'>Select a level to begin: </Text>

                {lesson.levels.map((level, idx) => (
                    <LevelCard key={level.id} levelNum={level.id} title={level.title} passed={isLevelPassed(progress, lesson.id, idx)} unlocked={isLevelUnlocked(progress, lesson.id, idx)} accentColor={lesson.accentColor} hrefLink={`/lessons/${lesson.id}/${level.id}`} stars={starsMap[lesson!.id]?.[idx] ?? 0} />
                ))}

                <View className='h-6' />
            </ScrollView>
        </View>
    );
}