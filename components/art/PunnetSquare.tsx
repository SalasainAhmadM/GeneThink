import React from 'react';
import { View } from 'react-native';
import { Rect, Text as SvgText } from 'react-native-svg';
import { Icon, INK, P, SW } from './kit';

// Tt × Tt Punnett square tile (art-kit style): gold parent cells, coloured offspring cells
const CELLS = [
    { g: 'TT', fill: '#FFD9D9' },
    { g: 'Tt', fill: '#DCE8FF' },
    { g: 'Tt', fill: '#DCE8FF' },
    { g: 'tt', fill: '#DDF7E1' },
];

export default function PunnettSquare() {
    const c = 26, x0 = 22, y0 = 22;
    return (
        <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            <Icon size={80}>
                {/* parent allele tabs */}
                {['T', 't'].map((a, i) => (
                    <React.Fragment key={a}>
                        <Rect x={x0 + i * c + 4} y={4} width={c - 8} height={15} rx={4} fill={P.gold} stroke={INK} strokeWidth={2.5} />
                        <SvgText x={x0 + i * c + c / 2} y={15.5} fontSize={11} fontWeight='bold' fill={INK} textAnchor='middle'>{a}</SvgText>
                        <Rect x={4} y={y0 + i * c + 4} width={15} height={c - 8} rx={4} fill={P.gold} stroke={INK} strokeWidth={2.5} />
                        <SvgText x={11.5} y={y0 + i * c + c / 2 + 4} fontSize={11} fontWeight='bold' fill={INK} textAnchor='middle'>{a}</SvgText>
                    </React.Fragment>
                ))}
                {/* shadow + grid */}
                <Rect x={x0 + 3} y={y0 + 3} width={c * 2} height={c * 2} rx={5} fill={P.purpleDark} />
                {CELLS.map((cell, i) => {
                    const x = x0 + (i % 2) * c, y = y0 + Math.floor(i / 2) * c;
                    return (
                        <React.Fragment key={i}>
                            <Rect x={x} y={y} width={c} height={c} fill={cell.fill} stroke={INK} strokeWidth={SW * 0.8} />
                            <SvgText x={x + c / 2} y={y + c / 2 + 4.5} fontSize={12} fontWeight='bold' fill={INK} textAnchor='middle'>{cell.g}</SvgText>
                        </React.Fragment>
                    );
                })}
                <Rect x={x0} y={y0} width={c * 2} height={c * 2} rx={5} fill='none' stroke={INK} strokeWidth={SW} />
            </Icon>
        </View>
    );
}
