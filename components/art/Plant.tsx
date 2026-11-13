import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Path } from 'react-native-svg';
import { FlowerHead, Icon, InkLine, Leaf, P, Shaded } from './kit';
import { Pod } from '../Mission/MissionVisuals';

// Onboarding art: a potted pea plant with purple and white flowers, gently floating (art-kit style)
export default function PlantAnimated() {
    const float = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(float, { toValue: -8, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(float, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const scale = float.interpolate({ inputRange: [-8, 0], outputRange: [1.02, 1] });

    return (
        <Animated.View style={{ transform: [{ translateY: float }, { scale }] }}>
            <Icon width={180} height={260} viewBox='0 0 180 260'>
                {/* stems */}
                <InkLine d='M90 190C90 150 92 110 90 60' color={P.green} width={5} />
                <InkLine d='M90 160C74 146 62 128 54 108' color={P.green} width={4} />
                <InkLine d='M91 138C106 126 118 112 126 92' color={P.green} width={4} />
                {/* tendril */}
                <Path d='M90 96c10-4 14 4 8 8s-10-2-4-6' stroke={P.greenDark} strokeWidth={3} fill='none' />

                {/* leaves */}
                <Leaf x={90} y={176} len={34} angle={200} />
                <Leaf x={90} y={168} len={34} angle={-20} />
                <Leaf x={70} y={138} len={26} angle={190} />
                <Leaf x={110} y={120} len={26} angle={-15} />
                <Leaf x={90} y={84} len={24} angle={-35} />
                <Leaf x={90} y={84} len={24} angle={215} />

                {/* flowers */}
                <FlowerHead cx={90} cy={52} r={18} base={P.purple} shade={P.purpleDark} />
                <FlowerHead cx={52} cy={100} r={14} base={P.paper} shade={P.paperDark} />
                <FlowerHead cx={128} cy={86} r={14} base={P.purple} shade={P.purpleDark} />
            </Icon>

            {/* pod hanging off the right branch, and the pot */}
            <Animated.View style={{ position: 'absolute', left: 112, top: 118, transform: [{ rotate: '70deg' }] }}>
                <Pod color={P.green} size={44} />
            </Animated.View>
            <Animated.View style={{ position: 'absolute', left: 0, top: 0 }} pointerEvents='none'>
                <Icon width={180} height={260} viewBox='0 0 180 260'>
                    <Shaded d='M46 182H134V202H46Z' base='#F07A4A' shade='#C9562C' />
                    <Shaded d='M56 202H124L114 250H66Z' base='#F49A6C' shade='#D06A3E' nudge={4} />
                    <Path d='M64 214H116' stroke='#C9562C' strokeWidth={3} />
                </Icon>
            </Animated.View>
        </Animated.View>
    );
}
