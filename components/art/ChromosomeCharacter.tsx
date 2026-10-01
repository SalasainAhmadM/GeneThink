import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Polygon, Rect } from 'react-native-svg';

export default function ChromosomeCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox="0 0 100 100">
                {/* Cape */}
                <Polygon points="35,45 65,45 78,85 22,85" fill="#F44336" opacity={0.85} />

                {/* X-shaped body */}
                <Rect x="42" y="8" width="16" height="84" rx="8" fill="#7C4DFF" transform="rotate(45 50 50)" />
                <Rect x="42" y="8" width="16" height="84" rx="8" fill="#7C4DFF" transform="rotate(-45 50 50)" />

                {/* Face */}
                <Circle cx="43" cy="46" r="5" fill="#fff" />
                <Circle cx="57" cy="46" r="5" fill="#fff" />
                <Circle cx="43" cy="46" r="2.3" fill="#1a1a2e" />
                <Circle cx="57" cy="46" r="2.3" fill="#1a1a2e" />
                <Path d="M 42 57 Q 50 63 58 57" stroke="#1a1a2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </Svg>
        </View>
    );
}
