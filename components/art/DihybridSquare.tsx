import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';

// 4×4 grid, colored in blocks to suggest a 9:3:3:1 dihybrid ratio at a glance.
const ROW_COLORS = [
    ['#4CAF50', '#4CAF50', '#4CAF50', '#FFD93D'],
    ['#4CAF50', '#4CAF50', '#4CAF50', '#FFD93D'],
    ['#4CAF50', '#4CAF50', '#4CAF50', '#FFD93D'],
    ['#4ECDC4', '#4ECDC4', '#4ECDC4', '#FF6B6B'],
];

export default function DihybridSquare({ size = 80 }: { size?: number; }) {
    const cell = 10;
    const start = 15;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox="0 0 70 70">
                {ROW_COLORS.map((row, r) =>
                    row.map((fill, c) => (
                        <Rect key={`${r}-${c}`} x={start + c * cell} y={start + r * cell} width={cell} height={cell} fill={fill} opacity={0.8} />
                    ))
                )}

                <Rect x={start} y={start} width={cell * 4} height={cell * 4} rx="6" fill="none" stroke="#37474F" strokeWidth="2" />

                <Line x1={start + cell} y1={start} x2={start + cell} y2={start + cell * 4} stroke="#fff" strokeWidth="1" />
                <Line x1={start + cell * 2} y1={start} x2={start + cell * 2} y2={start + cell * 4} stroke="#fff" strokeWidth="1.5" />
                <Line x1={start + cell * 3} y1={start} x2={start + cell * 3} y2={start + cell * 4} stroke="#fff" strokeWidth="1" />
                <Line x1={start} y1={start + cell} x2={start + cell * 4} y2={start + cell} stroke="#fff" strokeWidth="1" />
                <Line x1={start} y1={start + cell * 2} x2={start + cell * 4} y2={start + cell * 2} stroke="#fff" strokeWidth="1.5" />
                <Line x1={start} y1={start + cell * 3} x2={start + cell * 4} y2={start + cell * 3} stroke="#fff" strokeWidth="1" />
            </Svg>
        </View>
    );
}
