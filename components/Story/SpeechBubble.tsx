import { STORY_CHARACTERS, StoryCharacterKey } from '@/constants/stories';
import React from 'react';
import { Text, View } from 'react-native';

export default function SpeechBubble({ speaker, text }: { speaker: StoryCharacterKey; text: string; }) {
    const meta = STORY_CHARACTERS[speaker];

    return (
        <View className='flex-row items-start gap-2.5'>
            <View className='size-8 rounded-full items-center justify-center mt-0.5' style={{ backgroundColor: meta.color }}>
                <Text className='font-fredoka-bold text-white text-sm'>{meta.letter}</Text>
            </View>

            <View className='flex-1 bg-white rounded-2xl rounded-tl-sm px-4 py-3' style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
                <Text className='font-nunito-bold text-xs mb-1' style={{ color: meta.color }}>{meta.name}</Text>
                <Text className='font-nunito text-ink-300 text-[15px] leading-5'>{text}</Text>
            </View>
        </View>
    );
}
