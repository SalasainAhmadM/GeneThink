import { ForwardArrow } from '@/components/icons/Arrowicon';
import { LESSONS } from '@/constants/lessons';
import { getLevelsDone, Progress } from '@/constants/prorgess';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ProgressBar from '../ProgressBar';
import Button from '../ui/Button';

export default function LessonTab({ progress, art }: { progress: Progress; art: React.JSX.Element[]; }) {
    return (
        <ScrollView className='flex-1 p-4 gap-3' showsVerticalScrollIndicator={false}>
            <View className='gap-3'>
                {LESSONS.map((lesson, i) => {
                    const done = getLevelsDone(progress, lesson.id);
                    const total = lesson.levels.length;
                    const pct = Math.round((done / total) * 100);

                    return (
                        <Button key={lesson.id} btnType='container' href={`/lessons/${lesson.id}`} className='rounded-2xl'>
                            <View className='bg-white rounded-2xl overflow-hidden flex-row items-center px-4 py-3 gap-3'>
                                {/* Art */}
                                <View className='size-[70px]'>{art[i]}</View>

                                {/* Info */}
                                <View className='flex-1'>
                                    <Text className='font-fredoka-bold text-ink-300 text-base'>{lesson.title}</Text>
                                    <Text className='font-nunito text-ink-200 text-xs mt-0.5'>{lesson.subtitle}</Text>
                                    <ProgressBar pct={pct} color={lesson.accentColor} />
                                    <Text className='font-nunito text-ink-100 text-[11px] mt-1'>{done}/{total} levels</Text>
                                </View>

                                {/* Arrow */}
                                <ForwardArrow color="green" size={20} strokeWidth={2.5} />
                            </View>
                        </Button>
                    );
                })}

                {/* Bottom padding */}
                <View className='h-6' />
            </View>
        </ScrollView>
    );
}
