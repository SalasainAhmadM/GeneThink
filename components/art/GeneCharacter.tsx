import React from 'react';
import { View } from 'react-native';
import { Path } from 'react-native-svg';
import { Ball, Face, Icon, InkLine, P, Shaded } from './kit';

// Gene mascot: a small green pill with antennae, waving (art-kit style)
export default function GeneCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size}>
                {/* antennae */}
                <InkLine d='M43 26L38 12' color={P.greenDark} width={2.5} />
                <InkLine d='M57 26L62 12' color={P.greenDark} width={2.5} />
                <Ball cx={38} cy={11} r={4.5} base={P.gold} shade={P.goldDark} shine={false} />
                <Ball cx={62} cy={11} r={4.5} base={P.gold} shade={P.goldDark} shine={false} />
                {/* arms: one resting, one waving */}
                <InkLine d='M35 64Q26 68 24 76' color={P.green} width={6} />
                <InkLine d='M65 60Q80 56 80 42' color={P.green} width={6} />
                <Shaded d='M35 40a15 15 0 0 1 30 0V74a15 15 0 0 1-30 0Z' base={P.green} shade={P.greenDark} />
                <Path d='M40 38a10 10 0 0 1 6-8' stroke='#fff' strokeWidth={3.5} fill='none' opacity={0.85} />
                <Face cx={50} cy={46} gap={12} eye={3} />
            </Icon>
        </View>
    );
}
