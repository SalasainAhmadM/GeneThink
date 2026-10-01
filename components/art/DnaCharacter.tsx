import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

export default function DnaCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
                {/* Body — rounded capsule */}
                <Rect x="30" y="20" width="40" height="70" rx="20" fill="#00ACC1" />

                {/* Ladder rungs */}
                <Line x1="34" y1="52" x2="66" y2="52" stroke="#fff" strokeWidth="2.5" opacity={0.7} />
                <Line x1="34" y1="66" x2="66" y2="66" stroke="#fff" strokeWidth="2.5" opacity={0.7} />
                <Line x1="34" y1="80" x2="66" y2="80" stroke="#fff" strokeWidth="2.5" opacity={0.7} />

                {/* Face */}
                <Circle cx="42" cy="34" r="4.2" fill="#fff" />
                <Circle cx="58" cy="34" r="4.2" fill="#fff" />
                <Circle cx="42" cy="34" r="2" fill="#1a1a2e" />
                <Circle cx="58" cy="34" r="2" fill="#1a1a2e" />
                <Path d="M 42 43 Q 50 48 58 43" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
            </Svg>
        </View>
    );
}
