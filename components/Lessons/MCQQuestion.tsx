import { Question } from '@/constants/lessons';
import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import Button from '../ui/Button';

export default function MCQQuestion({ quizNumberLabel, showHint, question, onAnswered, accentColor, isLast, onNext }: { quizNumberLabel: string; showHint: boolean; question: Question; onAnswered: (correct: boolean) => void; accentColor: string; isLast: boolean; onNext: () => void; }) {
    const [selected, setSelected] = useState<string | null>(null);
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const LABELS = ["A", "B", "C", "D"];

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true })
        ]).start();
    };

    const isAnswered = selected !== null;
    const isCorrect = selected === question.answer;

    const pick = (id: string) => {
        if (isAnswered) return;
        setSelected(id);
        const correct = id === question.answer;
        if (!correct) shake();
        onAnswered(correct);
    };

    const diffLabel = question.difficulty === 'easy' ? 'Beginner 🌱' :
        question.difficulty === 'medium' ? 'Explorer 🔥' :
            'Scientist 🔬';


    console.log('question: ', question);


    return (
        <Animated.View className='flex-1 gap-4' style={{ transform: [{ translateX: shakeAnim }], flex: 1, gap: '16px' }} >
            {/* Difficulty + type row */}
            <View className='flex-row gap-2 items-center'>
                <View className='rounded-pill px-3 py-2' style={{ backgroundColor: accentColor + "33" }}>
                    <Text className='font-nunito-bold text-xs' style={{ color: accentColor }}>{diffLabel}</Text>
                </View>
                <Text className='font-nunito text-ink-200 text-xs'>📝 Multiple Choice</Text>
                <View className='rounded-lg py-2 px-3 items-center ml-auto' style={{ backgroundColor: accentColor + "33" }}>
                    <Text className='font-nunito-bold text-xs' style={{ color: accentColor }}>{quizNumberLabel}</Text>
                </View>
            </View>

            {/* Hint */}
            {showHint && (
                <View className='bg-[#fffde7] rounded-xl px-4 py-3 border-2 border-medium' >
                    <Text className='font-nunito text-ink-600 text-sm leading-5'>
                        💡 <Text className='font-nunito-bold'>Hint:</Text> {question.hint}</Text>
                </View>
            )}

            {/* Question card */}
            <View className='bg-white rounded-2xl p-4' style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }} >
                <Text className='font-nunito text-ink-100 text-xs uppercase tracking-wide mb-2'>Question</Text>
                <Text className='font-nunito-bold text-ink-300 text-base leading-6'>{question.question}</Text>
            </View>

            {/* Choices */}
            <View className='gap-3'>
                {question.choices?.map((choice, i) => {
                    const isSelected = selected === choice.id;
                    const isCorrect = choice.id === question.answer;

                    let bg = "bg-white";
                    let border = "border border-[#e8e8e8]";
                    let badgeBg = "bg-[#f0f0f0]";
                    let badgeText = "text-ink-200";
                    let textColor = 'text-ink-600';

                    if (selected) {
                        if (isCorrect) {
                            bg = "bg-[#e8f5e9]"; border = "border-2 border-primary-300";
                            badgeBg = "bg-primary-300"; badgeText = "text-white"; textColor = 'text-primary-500';
                        } else if (isSelected) {
                            bg = "bg-[#ffebee]"; border = "border-2 border-danger";
                            badgeBg = "bg-danger"; badgeText = "text-white"; textColor = 'text-danger';
                        }
                    }

                    // const badgeLabel = selected && ((isSelected && isCorrect) || question.answer === choice.id) ? "✓" : isSelected && selected && !isCorrect ? "✗" : LABELS[i];
                    const badgeLabel = selected && isSelected && isCorrect ? "✓" : isSelected && selected && !isCorrect ? "✗" : LABELS[i];

                    return (
                        <Button key={choice.id} btnType='container' onPress={() => pick(choice.id)}
                            disabled={isAnswered} className='rounded-xl'
                        >
                            <View className={cn("flex-row items-center gap-3 rounded-xl px-4 py-3.5", bg, border)}>
                                <View className={cn('size-8 rounded-full items-center justify-center', badgeBg)}>
                                    <Text className={cn('font-fredoka-bold text-sm', badgeText)} >{badgeLabel}</Text>
                                </View>

                                <Text className={cn('font-nunito-bold text-base flex-1', textColor)}>{choice.text}</Text>
                            </View>
                        </Button>
                    );
                })}
            </View>

            {/* ── Feedback panel — shown after answering ────────────── */}
            {isAnswered && (
                <View className='gap-3 mt-auto'>
                    <View className={cn('rounded-2xl p-4 gap-3 border-2', isCorrect ? 'bg-[#e8f5e9]' : 'bg-[#fff8e1]')} style={{ borderColor: isCorrect ? '#4CAF50' : '#FFB300' }} >
                        {/* Title */}
                        <Text className='font-fredoka-bold text-lg' style={{ color: isCorrect ? '#2e7d32' : '#e65100' }} >{isCorrect ? '🎉 Excellent!' : '💡 Learn from this!'}</Text>

                        {/* Explanation */}
                        <Text className='font-nunito text-ink-400 text-sm leading-5'>
                            {question.explanation ?? (isCorrect ? 'Great work!' : 'Review the highlighted correct answer above.')}</Text>
                    </View>

                    {/* Next / Try Again button */}
                    <Button onPress={onNext} label={isCorrect ? isLast ? 'Finish Level ✓' : 'Next Question' : 'Got it'} btnType={isCorrect ? 'secondary' : 'danger'} size='lg' width='full' fredokaBold />
                </View>
            )}
        </Animated.View>
    );
}
