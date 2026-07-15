import { cn } from '@/lib/utils';
import React from 'react';
import { Text, View } from 'react-native';

export default function AnswerFeedback({ correct }: { correct: boolean; }) {
    return (
        <View className={cn('rounded-xl px-4 py-3 flex-row items-center gap-2 border-2', correct ? 'bg-[#e8f5e9] border-primary-300' : 'bg-[#ffebee] border-danger2')}>
            <Text className='text-xl'>{correct ? '✅' : '❌'}</Text>
            <Text className={cn('font-nunito-bold text-sm flex-1', correct ? 'text-primary-500' : 'text-danger')}>
                {correct ? 'Correct!' : 'Not quite — you lose a heart.'}
            </Text>
        </View>
    );
}
