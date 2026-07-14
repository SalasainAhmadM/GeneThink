import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

const RUNGS = [
    { left: "#FF6B6B", bar: "#4ECDC4", right: "#4ECDC4" },
    { left: "#FFD93D", bar: "#6BCB77", right: "#A29BFE" },
    { left: "#A29BFE", bar: "#4ECDC4", right: "#FF6B6B" },
    { left: "#4ECDC4", bar: "#FFD93D", right: "#FFD93D" },
    { left: "#FF6B6B", bar: "#A29BFE", right: "#6BCB77" },
    { left: "#6BCB77", bar: "#4ECDC4", right: "#FF6B6B" },
    { left: "#FFD93D", bar: "#6BCB77", right: "#A29BFE" },
    { left: "#A29BFE", bar: "#FF6B6B", right: "#4ECDC4" },
    { left: "#4ECDC4", bar: "#FFD93D", right: "#FFD93D" },
    { left: "#FF6B6B", bar: "#A29BFE", right: "#6BCB77" },
    { left: "#6BCB77", bar: "#4ECDC4", right: "#FF6B6B" },
    { left: "#FFD93D", bar: "#6BCB77", right: "#A29BFE" },
    { left: "#A29BFE", bar: "#FF6B6B", right: "#4ECDC4" },
    { left: "#4ECDC4", bar: "#FFD93D", right: "#FFD93D" },
    { left: "#FF6B6B", bar: "#A29BFE", right: "#6BCB77" },
    { left: "#6BCB77", bar: "#4ECDC4", right: "#FF6B6B" },
];

const VISIBLE = 13;
const AMP = 42;
const HELIX_W = 170;
const CENTER = HELIX_W / 2;
const FADE_RUNGS = 2.5;

export default function DNAHelix({ onboarding }: { onboarding?: boolean }) {
    const NODE = onboarding ? 11 : 12;
    const RUNG_H = onboarding ? 14 : 20;
    const loopHeight = RUNGS.length * RUNG_H;
    const totalHeight = VISIBLE * RUNG_H + NODE;
    const fadeSize = FADE_RUNGS * RUNG_H;

    // ── Two animated values, both native driver ──────────────────
    const scrollY = useRef(new Animated.Value(0)).current;
    const pulse = useRef(new Animated.Value(0)).current; // 0 → .6 → 0

    useEffect(() => {
        // Scroll: static top + translateY → useNativeDriver: true
        const startScroll = () => {
            scrollY.setValue(0);
            Animated.timing(scrollY, {
                toValue: -loopHeight,
                duration: onboarding ? 35000 : 18000,
                easing: Easing.linear,
                useNativeDriver: true, // ← native thread, no JS jank
            }).start(({ finished }) => {
                if (finished) startScroll();
            });
        };
        startScroll();

        // Pulse: gentle breathe on all nodes
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: .6, duration: 1750,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0, duration: 1750,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // 2 copies is enough — loopHeight covers the visible window
    const repeated = [...RUNGS, ...RUNGS];

    return (
        <View style={{ width: HELIX_W, height: totalHeight, overflow: 'hidden' }}>
            {repeated.map((rung, i) => {
                const phase = (i / RUNGS.length) * Math.PI * 2.5;

                const lx = Math.sin(phase) * AMP;
                const rx = Math.sin(phase + Math.PI) * AMP;

                // ── FIX: both nodes use Math.abs → always equal size ──
                // old: depthL=(sin+1)/2, depthR=(-sin+1)/2 → inversely different
                // new: Math.abs(sin) → identical for both at every rung
                const depth = 0.75 + 0.35 * Math.abs(Math.sin(phase));

                // Pulse: each node breathes between depth and depth×1.18
                // Derived from native-driven pulse → also runs on native thread
                const nodeScale = pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [depth, depth * 1.18],
                });

                const barLeft = CENTER + Math.min(lx, rx);
                const barWidth = Math.abs(lx - rx);

                // Static base position — scroll handled by translateY below
                const baseY = i * RUNG_H;

                // ── Opacity from scrollY (native thread) ─────────────
                // absolute_Y = baseY + scrollY_value
                // Convert fade thresholds from absolute_Y space → scrollY space:
                //   absolute = target → scrollY = target - baseY
                const opacity = scrollY.interpolate({
                    inputRange: [
                        -NODE - baseY,                   // absolute = -NODE  → opacity 0
                        fadeSize - baseY,                // absolute = fadeSize → opacity 1
                        totalHeight - fadeSize - baseY,  // absolute = totalH-fade → opacity 1
                        totalHeight + NODE - baseY,      // absolute = totalH+NODE → opacity 0
                    ],
                    outputRange: [0, 1, 1, 0],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={i}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: NODE,
                            top: baseY,                        // STATIC — no JS layout animation
                            opacity,                           // native-derived from scrollY
                            transform: [{ translateY: scrollY }], // native driver scroll
                        }}
                    >
                        {/* Bar — fully static, zero animation cost */}
                        <View
                            style={{
                                position: 'absolute',
                                left: barLeft,
                                width: barWidth,
                                top: NODE / 2 - 1.5,
                                height: 3,
                                borderRadius: 2,
                                backgroundColor: rung.bar,
                                opacity: 0.8,
                            }}
                        />

                        {/* Left node */}
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: CENTER + lx - NODE / 2,
                                top: 0,
                                width: NODE,
                                height: NODE,
                                borderRadius: NODE / 2,
                                backgroundColor: rung.left,
                                transform: [{ scale: nodeScale }], // native pulse
                                shadowColor: rung.left,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.9,
                                shadowRadius: 6,
                                elevation: 8,
                            }}
                        />

                        {/* Right node — same nodeScale as left → same size */}
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: CENTER + rx - NODE / 2,
                                top: 0,
                                width: NODE,
                                height: NODE,
                                borderRadius: NODE / 2,
                                backgroundColor: rung.right,
                                transform: [{ scale: nodeScale }], // same scale ref
                                shadowColor: rung.right,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.9,
                                shadowRadius: 6,
                                elevation: 8,
                            }}
                        />
                    </Animated.View>
                );
            })}
        </View>
    );
}