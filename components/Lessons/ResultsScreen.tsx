import { AnswerRecord, HEARTS_PER_LEVEL, Lesson, Question } from '@/constants/lessons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrokenHeart from '../art/BrokenHeart';
import Clock from '../art/Clock';
import Star from '../art/Star';
import Trophy from '../art/Trophy';
import { ForwardArrow } from '../icons/Arrowicon';
import Button from '../ui/Button';

// ── Answer formatting helpers ───────────────────────────────────
const choiceText = (question: Question, choiceId?: string | string[] | null) =>
    question.choices?.find((c) => c.id === choiceId)?.text ?? 'No answer';

const dragText = (value?: string | string[] | null) =>
    Array.isArray(value) && value.length ? value.join(', ') : 'No answer';

const userAnswerText = (entry: AnswerRecord) =>
    entry.question.type === 'mcq' ? choiceText(entry.question, entry.userAnswer) : dragText(entry.userAnswer);

const correctAnswerText = (question: Question) =>
    question.type === 'mcq' ? choiceText(question, question.answer) : dragText(question.dragAnswers);

export default function ResultsScreen({ passed, lesson, correctCount, totalCount, timeUsed, levelIndex, totalLevels, heartsLeft, answerLog,
    onResultAction
}: {
    passed: boolean; lesson: Lesson; correctCount: number; totalCount: number; timeUsed: number; levelIndex: number; totalLevels: number; heartsLeft: number; answerLog: AnswerRecord[];
    onResultAction: (option: number) => void;
}) {
    const hasNext = levelIndex < totalLevels - 1;

    // ── Star calculation ──────────────────────────────────────
    const accuracy = totalCount > 0 ? correctCount / totalCount : 0;
    // maxTime mirrors the level screen formula: Lv1=80, Lv2=60, Lv3=40
    const levelMaxTime = levelIndex === 0 ? 80 : levelIndex === 1 ? 60 : 40;
    const timeRatio = levelMaxTime > 0 ? timeUsed / levelMaxTime : 1;

    const stars = !passed ? 0 : accuracy === 1 && heartsLeft >= 4 && timeRatio <= 0.5 ? 3 : accuracy >= 0.75 && heartsLeft >= 3 && timeRatio <= 0.75 ? 2 : 1;

    return (
        <SafeAreaView className='flex-1 bg-bg-light' >
            <LinearGradient colors={passed ? ['#e8f5e9', '#f5f9f5'] : ['#ffdfe4', '#fff5f5']} className='flex-1'>
                <ScrollView contentContainerClassName='flex-grow items-center justify-center px-6 gap-6 py-6' showsVerticalScrollIndicator={false}>
                    {/* Trophy / broken heart / time */}
                    <Text className='text-7xl'>{passed ? <Trophy /> : heartsLeft <= 0 ? <BrokenHeart /> : <Clock />}</Text>

                    <Text className='font-fredoka-bold text-3xl text-center' style={{ color: passed ? '#2E7D32' : '#C62828' }}>{passed ? 'Level Complete!' : heartsLeft <= 0 ? 'Out of Hearts!' : "Time's Up!"}</Text>

                    {/* Stars */}
                    <View className='flex-row gap-2 my-4'>
                        {[1, 2, 3].map(s => (
                            <Star key={s} active={s <= stars} />
                        ))}
                    </View>

                    {/* Stats card */}
                    <View className='bg-white rounded-[20px] py-5 px-8 flex-row gap-10' style={{ shadowColor: '#000', shadowOpacity: 0.07, elevation: 3 }}>
                        <View className='items-center gap-0.5'>
                            <Text className='font-fredoka-bold text-science-300 text-2xl'>{timeUsed}s</Text>
                            <Text className='font-nunito-semibold text-ink-100 text-sm'>Time</Text>
                        </View>
                        <View className='items-center gap-0.5'>
                            <Text className='font-fredoka-bold text-2xl' style={{ color: lesson.accentColor }}>{correctCount}/{totalCount}</Text>
                            <Text className='font-nunito-semibold text-ink-100 text-sm'>Correct</Text>
                        </View>
                        <View className='items-center gap-0.5'>
                            <Text className='font-fredoka-bold text-danger text-2xl'>{heartsLeft}/{HEARTS_PER_LEVEL}</Text>
                            <Text className='font-nunito-semibold text-ink-100 text-sm'>Hearts</Text>
                        </View>
                    </View>

                    {/* Answer Key — revealed now that the level is submitted */}
                    {answerLog.length > 0 && (
                        <View className='w-full gap-3'>
                            <Text className='font-fredoka-bold text-ink-300 text-lg'>📋 Answer Key</Text>
                            {answerLog.map((entry, i) => (
                                <View key={entry.question.id + i} className='bg-white rounded-2xl p-4 gap-1'
                                    style={{ borderLeftWidth: 4, borderLeftColor: entry.correct ? '#4CAF50' : '#F44336', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 }}
                                >
                                    <Text className='font-nunito-bold text-ink-300 text-sm'>{i + 1}. {entry.question.question}</Text>
                                    <Text className='font-nunito-bold text-xs' style={{ color: entry.correct ? '#2E7D32' : '#C62828' }}>
                                        {entry.correct ? '✓ Correct' : '✗ Incorrect'} — Your answer: {userAnswerText(entry)}
                                    </Text>
                                    {!entry.correct && (
                                        <Text className='font-nunito text-xs text-ink-400'>Correct answer: {correctAnswerText(entry.question)}</Text>
                                    )}
                                    <Text className='font-nunito text-xs text-ink-200 mt-1'>{entry.question.explanation}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Buttons */}
                    <View className='w-full gap-3 mt-4'>
                        {passed && hasNext && (
                            <Button label='Next Level' onPress={() => onResultAction(1)} btnType='secondary' width='full' size='lg' fredokaBold icon2={<ForwardArrow color='#fff' size={18} />} />
                        )}
                        <Button label='Try Again' onPress={() => onResultAction(2)} width='full' size='lg' fredokaBold />
                        <Button label='Back to Menu' onPress={() => onResultAction(3)} btnType='ghost' width='full' size='lg' fredokaBold />
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}
