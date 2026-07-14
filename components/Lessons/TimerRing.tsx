/**
 * components/Lessons/TimerRing.tsx
 * Circular countdown timer — white strokes work on any accent color header.
 * Color shifts: white → yellow → red as time runs low.
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function TimerRing({ timeLeft, maxTime }: { timeLeft: number; maxTime: number; }) {
    const size = 52;
    const strokeWidth = 4;

    const cx = size / 2;
    const cy = size / 2;
    const r = (size - strokeWidth * 2) / 2;
    const circ = 2 * Math.PI * r;

    // Animated stroke offset
    const animOffset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const pct = timeLeft / maxTime;
        const targetOffset = circ * (1 - pct);

        Animated.timing(animOffset, {
            toValue: targetOffset,
            duration: 950,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }, [timeLeft]);

    // Color: white → amber → red based on time remaining
    const pct = timeLeft / maxTime;
    const ringColor = pct > 0.5 ? 'rgba(255,255,255, 0.95)' : pct > 0.25 ? '#FFD93D' : '#FF6B6B';

    const textColor = pct > 0.5 ? '#FFF' : pct > 0.25 ? '#FFD93D' : '#FF6B6B';

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    return (
        <View
            style={{ width: size, height: size }}
            className="items-center justify-center"
        >
            <Svg
                width={size}
                height={size}
                style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
            >
                {/* Track */}
                <Circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress */}
                <AnimatedCircle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circ}
                    strokeDashoffset={animOffset}
                    strokeLinecap="round"
                />
            </Svg>

            {/* Number */}
            <Text
                className="font-fredoka-bold"
                style={{
                    position: 'absolute', // 🔥 important
                    fontSize: size * 0.32,
                    color: textColor,
                    textAlign: 'center'
                }}
            >
                {timeLeft}
            </Text>
        </View>
    );
}
