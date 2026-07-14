import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Rect, Text as SvgText, TSpan } from 'react-native-svg';

// 🎨 allele color helper
const alleleColor = (char: string) => {
    return char === char.toUpperCase()
        ? '#1565C0' // uppercase → blue
        : '#FF5722'; // lowercase → orange
};

// 🎨 render genotype with per-letter color
const GenotypeText = ({ x, y, value }: { x: number; y: number; value: string; }) => {
    return (
        <SvgText x={x} y={y} fontSize="9" textAnchor="middle">
            <TSpan fill={alleleColor(value[0])}>{value[0]}</TSpan>
            <TSpan fill={alleleColor(value[1])}>{value[1]}</TSpan>
        </SvgText>
    );
};

export default function PunnettSquare() {
    const size = 80;

    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Svg width={size} height={size} viewBox="0 0 70 70">

                {/* 🌿 Rounded Grid */}
                <Rect
                    x="15"
                    y="15"
                    width="40"
                    height="40"
                    rx="6" // 👈 rounded corners
                    fill="none"
                    stroke="#4ECDC4"
                    strokeWidth="2"
                />

                {/* Inner lines */}
                <Line x1="35" y1="15" x2="35" y2="55" stroke="#4ECDC4" strokeWidth="2" />
                <Line x1="15" y1="35" x2="55" y2="35" stroke="#4ECDC4" strokeWidth="2" />

                {/* Top labels */}
                <SvgText x="25" y="10" fontSize="10" textAnchor="middle">
                    <TSpan fill="#1565C0">T</TSpan>
                </SvgText>
                <SvgText x="45" y="10" fontSize="10" textAnchor="middle">
                    <TSpan fill="#FF5722">t</TSpan>
                </SvgText>

                {/* Left labels */}
                <SvgText x="8" y="30" fontSize="10" textAnchor="middle">
                    <TSpan fill="#1565C0">T</TSpan>
                </SvgText>
                <SvgText x="8" y="50" fontSize="10" textAnchor="middle">
                    <TSpan fill="#FF5722">t</TSpan>
                </SvgText>

                {/* Cells (rounded + softer) */}
                <Rect x="15" y="15" width="20" height="20" rx="4" fill="#4ECDC420" />
                <Rect x="35" y="15" width="20" height="20" rx="4" fill="#FFD93D20" />
                <Rect x="15" y="35" width="20" height="20" rx="4" fill="#FFD93D20" />
                <Rect x="35" y="35" width="20" height="20" rx="4" fill="#FF6B6B20" />

                {/* Genotypes (colored letters) */}
                <GenotypeText x={25} y={28} value="TT" />
                <GenotypeText x={45} y={28} value="Tt" />
                <GenotypeText x={25} y={48} value="Tt" />
                <GenotypeText x={45} y={48} value="tt" />

            </Svg>
        </View>
    );
}