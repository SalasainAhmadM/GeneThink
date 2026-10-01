import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

export default function Cell({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
                {/* Cell membrane */}
                <Circle cx="50" cy="50" r="46" fill="#d0f0e8" stroke="#4ECDC4" strokeWidth="3" />

                {/* Nucleus */}
                <Circle cx="58" cy="42" r="24" fill="#e6dcf7" stroke="#7C4DFF" strokeWidth="2.5" />

                {/* Chromosome (X) inside the nucleus */}
                <Line x1="52" y1="34" x2="64" y2="50" stroke="#7C4DFF" strokeWidth="3.5" strokeLinecap="round" />
                <Line x1="64" y1="34" x2="52" y2="50" stroke="#7C4DFF" strokeWidth="3.5" strokeLinecap="round" />
            </Svg>
        </View>
    );
}
