import React from 'react';
import { View } from 'react-native';

export default function ProgressBar({ pct, color }: { pct: number; color: string; }) {
    return (
        <View className='w-full h-2 rounded-pill bg-[#e0e0e0] overflow-hidden mt-1.5'>
            <View className='h-full rounded-pill' style={{ width: `${pct}%`, backgroundColor: color }}></View>
        </View>
    );
}
