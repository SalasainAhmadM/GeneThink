import React from 'react';
import { View } from 'react-native';
import { Circle, Path } from 'react-native-svg';
import { Ball, Icon, INK, InkLine, P, Shaded, SW } from './kit';

// A cell with its nucleus and an X-shaped chromosome inside (art-kit style)
export default function Cell({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size}>
                {/* membrane — slightly wobbly so it reads as a living cell */}
                <Shaded d='M50 5C74 4 95 22 95 48C96 74 76 95 50 95C24 96 5 76 6 50C5 26 26 6 50 5Z' base='#BFF0E6' shade='#8FDCCB' nudge={4} />
                {/* organelles */}
                <Ball cx={26} cy={66} r={6} base={P.gold} shade={P.goldDark} shine={false} />
                <Ball cx={40} cy={80} r={4.5} base={P.pink} shade={P.pinkDark} shine={false} />
                <Path d='M20 40c4-6 10-6 14 0' stroke={P.tealDark} strokeWidth={3} fill='none' />
                {/* nucleus */}
                <Ball cx={58} cy={42} r={24} base='#E6DAFF' shade='#C7B2F5' shine={false} />
                <InkLine d='M51 33L65 51' color={P.purple} width={4.5} />
                <InkLine d='M65 33L51 51' color={P.purple} width={4.5} />
                <Circle cx={58} cy={42} r={3} fill={P.gold} stroke={INK} strokeWidth={SW * 0.6} />
                <Path d='M14 36a38 38 0 0 1 16-20' stroke='#fff' strokeWidth={4} fill='none' opacity={0.8} />
            </Icon>
        </View>
    );
}
