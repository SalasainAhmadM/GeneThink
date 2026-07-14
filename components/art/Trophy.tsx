import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import TrophySvg from '../../assets/svgs/trophy-svgrepo-com.svg';

export default function Trophy() {
    const float = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(float, {
                    toValue: -8,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(float, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const scale = float.interpolate({
        inputRange: [-8, 0],
        outputRange: [1.02, 1],
    });

    return (
        <Animated.View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateY: float }, { scale }]
            }}
        >
            <TrophySvg width={160} height={160} />
        </Animated.View>
    );
}
