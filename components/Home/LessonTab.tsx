import { ForwardArrow } from '@/components/icons/Arrowicon';
import { Lesson, LESSONS } from '@/constants/lessons';
import { getLevelsDone, Progress } from '@/constants/prorgess';
import { QUEST } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ProgressBar from '../ProgressBar';
import Button from '../ui/Button';

// Home is split into the GeneQuest mission path and optional extra practice.
const MISSION_IDS = ['terms', 'mendel', 'punnett', 'dihybrid'];
const EXTRA_TAGS: Record<string, string> = {
    intro: 'Warm-up · review the basics',
    quiz: 'Review · mixed quizzes & final test',
};

const SectionTitle = ({ title, sub }: { title: string; sub: string; }) => (
    <View className='mt-1'>
        <Text className='font-fredoka-bold text-lg' style={{ color: QUEST.indigo }}>{title}</Text>
        <Text className='font-nunito text-ink-200 text-xs'>{sub}</Text>
    </View>
);

const MissionCard = ({ lesson, num, art, progress }: { lesson: Lesson; num: number; art: React.JSX.Element; progress: Progress; }) => {
    const done = getLevelsDone(progress, lesson.id);
    const total = lesson.levels.length;
    const pct = Math.round((done / total) * 100);
    const tagline = lesson.subtitle.replace(/^GeneQuest · Mission \d+( · )?/, '');

    return (
        <Button btnType='container' href={`/lessons/${lesson.id}`} className='rounded-2xl'>
            <View className='bg-white rounded-2xl overflow-hidden border-2' style={{ borderColor: lesson.accentColor + '55' }}>
                {/* Mission ribbon */}
                <LinearGradient colors={QUEST.gradient} locations={QUEST.gradientLocations} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <View className='flex-row items-center justify-between px-4 py-1.5'>
                        <Text className='font-fredoka-bold text-white text-[13px] uppercase tracking-wide'>Mission {num}</Text>
                        {done === total
                            ? <Text className='font-nunito-extrabold text-[11px]' style={{ color: QUEST.gold }}>✓ Complete</Text>
                            : <Text className='font-nunito-bold text-white/80 text-[11px]'>{done}/{total} levels</Text>}
                    </View>
                </LinearGradient>

                <View className='flex-row items-center px-4 py-3 gap-3'>
                    <View className='size-[70px]'>{art}</View>
                    <View className='flex-1'>
                        <Text className='font-fredoka-bold text-ink-300 text-base'>{lesson.title}</Text>
                        {!!tagline && <Text className='font-nunito text-ink-200 text-xs mt-0.5'>{tagline}</Text>}
                        <ProgressBar pct={pct} color={lesson.accentColor} />
                    </View>
                    <ForwardArrow color={lesson.accentColor} size={20} strokeWidth={2.5} />
                </View>
            </View>
        </Button>
    );
};

const ExtraCard = ({ lesson, art, progress }: { lesson: Lesson; art: React.JSX.Element; progress: Progress; }) => {
    const done = getLevelsDone(progress, lesson.id);
    const total = lesson.levels.length;
    const pct = Math.round((done / total) * 100);

    return (
        <Button btnType='container' href={`/lessons/${lesson.id}`} className='rounded-2xl'>
            <View className='bg-white rounded-2xl overflow-hidden flex-row items-center px-4 py-3 gap-3'>
                {/* art is drawn at 70px; scale it down for the smaller card */}
                <View className='size-[52px] items-center justify-center'>
                    <View style={{ transform: [{ scale: 52 / 70 }] }}>{art}</View>
                </View>
                <View className='flex-1'>
                    <Text className='font-fredoka-bold text-ink-300 text-[15px]'>{lesson.title}</Text>
                    <Text className='font-nunito text-ink-200 text-xs mt-0.5'>{EXTRA_TAGS[lesson.id] ?? lesson.subtitle}</Text>
                    <ProgressBar pct={pct} color={lesson.accentColor} />
                    <Text className='font-nunito text-ink-100 text-[11px] mt-1'>{done}/{total} levels</Text>
                </View>
                <ForwardArrow color={lesson.accentColor} size={18} strokeWidth={2.5} />
            </View>
        </Button>
    );
};

export default function LessonTab({ progress, art }: { progress: Progress; art: React.JSX.Element[]; }) {
    // `art` is indexed in LESSONS order
    const artFor = (lesson: Lesson) => art[LESSONS.indexOf(lesson)];
    const missions = MISSION_IDS.map((id) => LESSONS.find((l) => l.id === id)).filter((l): l is Lesson => !!l);
    const extras = LESSONS.filter((l) => !MISSION_IDS.includes(l.id));

    return (
        <ScrollView className='flex-1 p-4' showsVerticalScrollIndicator={false}>
            <View className='gap-3'>
                <SectionTitle title='GeneQuest Missions' sub='Follow the missions in order, from 1 to 4.' />
                {missions.map((lesson, i) => (
                    <MissionCard key={lesson.id} lesson={lesson} num={i + 1} art={artFor(lesson)} progress={progress} />
                ))}

                <View className='mt-3'>
                    <SectionTitle title='Extra Practice' sub='Warm up before the missions, or review after them.' />
                </View>
                {extras.map((lesson) => (
                    <ExtraCard key={lesson.id} lesson={lesson} art={artFor(lesson)} progress={progress} />
                ))}

                {/* Bottom padding */}
                <View className='h-6' />
            </View>
        </ScrollView>
    );
}
