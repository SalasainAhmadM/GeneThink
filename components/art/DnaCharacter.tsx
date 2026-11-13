import React from 'react';
import { View } from 'react-native';
import { Path } from 'react-native-svg';
import { Face, Icon, InkLine, P, Shaded } from './kit';

// DNA buddy: a capsule body with ladder rungs (art-kit style)
export default function DnaCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size}>
                {/* little arms */}
                <InkLine d='M30 60Q20 58 18 48' color={P.teal} width={5} />
                <InkLine d='M70 60Q80 62 84 70' color={P.teal} width={5} />
                <Shaded d='M30 40a20 20 0 0 1 40 0V72a20 20 0 0 1-40 0Z' base={P.teal} shade={P.tealDark} />
                {/* rungs */}
                {[56, 68, 80].map((y, i) => <InkLine key={y} d={`M38 ${y}H62`} color={[P.gold, P.pink, P.blue][i]} width={3} />)}
                <Path d='M36 36a14 14 0 0 1 8-10' stroke='#fff' strokeWidth={3.5} fill='none' opacity={0.85} />
                <Face cx={50} cy={36} gap={14} eye={3.4} />
            </Icon>
        </View>
    );
}
