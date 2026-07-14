import { GUIDE_ITEMS } from '@/constants/guide';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function GuideTab() {
    return (
        <ScrollView className='flex-1 p-4 gap-[10px]' showsVerticalScrollIndicator={false}>
            <Text className='font-fredoka-bold text-ink-300 text-xl mb-4'>Quick Guide 📚</Text>

            <View className='gap-3'>
                {GUIDE_ITEMS.map((guide, i) => (
                    <View key={i} className='bg-bg-card rounded-2xl px-4 py-3 flex-row items-start gap-3' style={{
                        shadowColor: "#000",
                        shadowOpacity: 0.06,
                        shadowRadius: 8,
                        elevation: 3
                    }}>
                        <Text className='text-[28px] mt-0.5'>{guide.icon}</Text>

                        <View className='flex-1'>
                            <Text className='font-fredoka-bold text-ink-300 text-base mb-1'>{guide.term}</Text>
                            <Text className='font-nunito text-ink-400 text-xs leading-5'>{guide.definition}</Text>
                        </View>
                    </View>
                ))}

                <View className="h-6" />
            </View>
        </ScrollView>
    );
}
