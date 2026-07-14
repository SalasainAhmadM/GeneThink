import { Question } from '@/constants/lessons';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../ui/Button';

export default function MCQQuestion({ quizNumberLabel, showHint, question, onAnswered, accentColor, isLast }: { quizNumberLabel: string; showHint: boolean; question: Question; onAnswered: (correct: boolean, userAnswer?: string) => void; accentColor: string; isLast: boolean; }) {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const LABELS = ["A", "B", "C", "D"];

    const pick = (id: string) => {
        if (submitting) return;
        setSelected(id);
    };

    const submit = () => {
        if (!selected || submitting) return;
        setSubmitting(true);
        onAnswered(selected === question.answer, selected);
    };

    const diffLabel = question.difficulty === 'easy' ? 'Beginner 🌱' :
        question.difficulty === 'medium' ? 'Explorer 🔥' :
            'Scientist 🔬';

    return (
        <View className='flex-1 gap-4' >
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

                    const bg = isSelected ? "bg-[#e3f2fd]" : "bg-white";
                    const border = isSelected ? "border-2 border-science-300" : "border border-[#e8e8e8]";
                    const badgeBg = isSelected ? "bg-science-300" : "bg-[#f0f0f0]";
                    const badgeText = isSelected ? "text-white" : "text-ink-200";
                    const textColor = isSelected ? 'text-science-500' : 'text-ink-600';

                    return (
                        <Button key={choice.id} btnType='container' onPress={() => pick(choice.id)}
                            disabled={submitting} className='rounded-xl'
                        >
                            <View className={cn("flex-row items-center gap-3 rounded-xl px-4 py-3.5", bg, border)}>
                                <View className={cn('size-8 rounded-full items-center justify-center', badgeBg)}>
                                    <Text className={cn('font-fredoka-bold text-sm', badgeText)} >{LABELS[i]}</Text>
                                </View>

                                <Text className={cn('font-nunito-bold text-base flex-1', textColor)}>{choice.text}</Text>
                            </View>
                        </Button>
                    );
                })}
            </View>

            {/* ── Submit — advances without revealing correctness ──── */}
            {selected && (
                <View className='mt-auto'>
                    <Button onPress={submit} label={isLast ? 'Finish Level ✓' : 'Submit Answer'} btnType='secondary' size='lg' width='full' fredokaBold disabled={submitting} />
                </View>
            )}
        </View>
    );
}
