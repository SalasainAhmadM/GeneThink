import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Line, Polygon, Rect } from 'react-native-svg';

// 🌿 Deterministic cluster generator (no randomness)
function generateCluster(
    cx: number,
    cy: number,
    count: number,
    variant: number
) {
    const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6BCB77", "#A29BFE"];

    return Array.from({ length: count }).map((_, i) => {
        const baseAngle = (i / count) * Math.PI * 2;

        const angleOffset =
            Math.sin(i * (1.6 + variant)) * (0.25 + variant * 0.12);

        const radius =
            18 + Math.sin(i * (1.3 + variant * 0.4)) * (6 + variant * 2);

        return {
            cx: cx + Math.cos(baseAngle + angleOffset) * radius,
            cy: cy + Math.sin(baseAngle + angleOffset) * radius,

            // size variation
            r: 4 + Math.abs(Math.sin(i * 1.2 + variant)) * 5,

            fill: colors[(i + variant) % colors.length],
        };
    });
}

export default function PlantAnimated() {
    const float = useRef(new Animated.Value(0)).current;

    // 🌿 Generate clusters once
    const topCluster = useRef(generateCluster(90, 70, 20, 0)).current;
    const leftCluster = useRef(generateCluster(50, 110, 20, 1)).current;
    const rightCluster = useRef(generateCluster(140, 110, 20, 2)).current;

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

    // 🌿 Optional subtle breathing
    const scale = float.interpolate({
        inputRange: [-8, 0],
        outputRange: [1.02, 1],
    });

    const glow = float.interpolate({
        inputRange: [-8, 0],
        outputRange: [0.18, 0.1],
    });

    return (
        <Animated.View
            style={{
                transform: [
                    { translateY: float },
                    { scale },
                ],
            }}
        >
            <Svg width={180} height={260} viewBox="0 0 180 260">

                {/* STEM */}
                <Rect x="88" y="80" width="4" height="110" rx="2" fill="#6BCB77" />

                {/* BRANCHES */}
                <Line x1="90" y1="165" x2="50" y2="110" stroke="#4ECDC4" strokeWidth="3" />
                <Line x1="90" y1="145" x2="130" y2="110" stroke="#A29BFE" strokeWidth="3" />

                {/* TOP CLUSTER */}
                {topCluster.map((c, i) => (
                    <React.Fragment key={`top-${i}`}>
                        {/* outer glow (very subtle) */}
                        <Circle
                            cx={c.cx}
                            cy={c.cy}
                            r={c.r * 1.8}
                            fill={c.fill}
                            opacity={0.08}
                        />

                        {/* mid glow */}
                        <Circle
                            cx={c.cx}
                            cy={c.cy}
                            r={c.r * 1.3}
                            fill={c.fill}
                            opacity={0.16}
                        />

                        {/* core */}
                        <Circle {...c} />
                    </React.Fragment>
                ))}

                {/* LEFT CLUSTER */}
                {leftCluster.map((c, i) => (
                    <React.Fragment key={`left-${i}`}>
                        <Circle cx={c.cx} cy={c.cy} r={c.r * 1.8} fill={c.fill} opacity={0.08} />
                        <Circle cx={c.cx} cy={c.cy} r={c.r * 1.3} fill={c.fill} opacity={0.16} />
                        <Circle {...c} />
                    </React.Fragment>
                ))}

                {/* RIGHT CLUSTER */}
                {rightCluster.map((c, i) => (
                    <React.Fragment key={`right-${i}`}>
                        <Circle cx={c.cx} cy={c.cy} r={c.r * 1.8} fill={c.fill} opacity={0.08} />
                        <Circle cx={c.cx} cy={c.cy} r={c.r * 1.3} fill={c.fill} opacity={0.16} />
                        <Circle {...c} />
                    </React.Fragment>
                ))}

                {/* POT */}
                <Rect x="50" y="180" width="80" height="20" rx="4" fill="#FF6B6B" />
                <Polygon points="60,200 120,200 110,250 70,250" fill="#FF8E53" />

            </Svg>
        </Animated.View>
    );
}