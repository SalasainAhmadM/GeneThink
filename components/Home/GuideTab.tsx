import { CARD_SHADOW } from '@/components/Mission/Cards';
import { ToolkitTable } from '@/components/Mission/MissionBlocks';
import Button from '@/components/ui/Button';
import { GUIDE_ITEMS } from '@/constants/guide';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function GuideTab() {
    return (
        <ScrollView className='flex-1 p-4 gap-[10px]' showsVerticalScrollIndicator={false}>
            <Text className='font-fredoka-bold text-ink-300 text-xl mb-1'>Genetic Terms 🔎</Text>
            <Text className='font-nunito text-ink-200 text-xs mb-4'>Your Genetics Investigator Toolkit — every clue from Mission 1.</Text>

            <View className='gap-3'>
                <ToolkitTable accentColor='#1565C0' />

                <Button label='🔎 Play Mission 1: Genetic Terms' btnType='secondary' size='md' width='full' fredokaBold href='/lessons/terms/1/story' />

                <Text className='font-fredoka-bold text-ink-300 text-base mt-2'>More terms</Text>
                {GUIDE_ITEMS.map((guide, i) => (
                    <View key={i} className='bg-bg-card rounded-2xl px-4 py-3 flex-row items-start gap-3' style={CARD_SHADOW}>
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
