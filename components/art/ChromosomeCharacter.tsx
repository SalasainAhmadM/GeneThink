import React from 'react';
import { View } from 'react-native';
import { Circle, G, Path } from 'react-native-svg';
import { Face, Icon, INK, P, Shaded, SW } from './kit';

// Chromosome hero: an X-shaped body with a red cape (art-kit style)
const ARM = 'M42 10a8 8 0 0 1 16 0V90a8 8 0 0 1-16 0Z';

export default function ChromosomeCharacter({ size = 90 }: { size?: number; }) {
    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={size}>
                {/* cape */}
                <Shaded d='M36 46H64L76 90Q50 82 24 90Z' base={P.red} shade={P.redDark} />
                {/* X body */}
                {[22, -22].map((deg) => (
                    <G key={deg} transform={`rotate(${deg} 50 50)`}>
                        <Shaded d={ARM} base={P.purple} shade={P.purpleDark} nudge={2.5} />
                        {/* gene bands */}
                        {[20, 30, 70, 80].map((y) => <Path key={y} d={`M44 ${y}H56`} stroke={y % 20 ? P.gold : P.pink} strokeWidth={3.5} />)}
                    </G>
                ))}
                {/* centromere */}
                <Circle cx={50} cy={50} r={11} fill={P.purpleLight} stroke={INK} strokeWidth={SW} />
                <Face cx={50} cy={48} gap={9} eye={2.6} />
            </Icon>
        </View>
    );
}
