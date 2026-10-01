import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export default function GeneCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
                {/* Body — small pill */}
                <Rect x="35" y="25" width="30" height="60" rx="15" fill="#4CAF50" />

                {/* Waving arm */}
                <Path d="M 65 60 Q 82 55 80 42" stroke="#4CAF50" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* Face */}
                <Circle cx="43" cy="42" r="3.6" fill="#fff" />
                <Circle cx="57" cy="42" r="3.6" fill="#fff" />
                <Circle cx="43" cy="42" r="1.7" fill="#1a1a2e" />
                <Circle cx="57" cy="42" r="1.7" fill="#1a1a2e" />
                <Path d="M 43 52 Q 50 57 57 52" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
            </Svg>
        </View>
    );
}
