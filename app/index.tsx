import DNAHelix from "@/components/art/DNAHelix";
import { STORAGE_KEYS } from "@/constants/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";

const TIPS = [
  "🧬  DNA contains billions of base pairs...",
  "🌱  Mendel studied 10,000+ pea plants!",
  "👨‍👩‍👧  You inherit 50% of DNA from each parent.",
  "🐒  Humans share 98.7% DNA with chimpanzees!",
  "🔬  Every human cell has ~6 feet of DNA inside.",
  "⭐  Genes make up only ~1% of your total DNA.",
];

// ── Staggered progress ──────────────────────────────
function useStaggeredProgress(progressAnim: Animated.Value, onComplete: () => void) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Generate 2 random pause points
    const stop1 = 10 + Math.random() * 20;
    const stop2 = stop1 + 10 + Math.random() * 20;
    const stop3 = stop2 + 10 + Math.random() * 20;

    let cancelled = false;

    const animateTo = (target: number, duration: number) =>
      new Promise<void>((resolve) => {
        Animated.timing(progressAnim, {
          toValue: target / 100,
          duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished) resolve();
        });
      });

    // Live display updater
    const listenerId = progressAnim.addListener(({ value }) => setDisplay(Math.round(value * 100)));

    const run = async () => {
      // Phase 1: rush to first stop
      await animateTo(stop1, 900 + Math.random() * 400);
      if (cancelled) return;

      // Pause 1: 0.8 – 1.4 seconds
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
      if (cancelled) return;

      // Phase 2: continue to second stop
      await animateTo(stop2, 700 + Math.random() * 500);
      if (cancelled) return;

      // Pause 2: 0.6 – 1.2 seconds
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
      if (cancelled) return;

      // Phase 3: continue to third stop
      await animateTo(stop3, 700 + Math.random() * 500);
      if (cancelled) return;

      // Pause 3: 0.6 – 1.2 seconds
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
      if (cancelled) return;

      // Phase 3: finish to 100%
      await animateTo(100, 600 + Math.random() * 400);
      if (cancelled) return;

      // setTimeout(() => { setDisplay(0); run(); }, 500);
      setTimeout(onComplete, 500);
    };

    run();

    return () => {
      cancelled = true;
      progressAnim.removeListener(listenerId);
    };
  }, []);

  return display;
}

export default function LoadingScreen() {
  const [tipIndex, setTipIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoSlide = useRef(new Animated.Value(30)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const tipFade = useRef(new Animated.Value(1)).current;

  const progress = useStaggeredProgress(progressAnim, async () => {
    const name = await AsyncStorage.getItem(STORAGE_KEYS.playerName);
    router.replace(name ? "/(root)/(tabs)/Home" : "/(root)/(tabs)/Onboarding");
  });

  useEffect(() => {
    // ── Entrance animations ────────────────────────────────
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(logoSlide, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(logoFade, { toValue: 1, duration: 700, useNativeDriver: true })
    ]).start();

    // Tips rotation
    const tipInterval = setInterval(() => {
      Animated.timing(tipFade, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        tipFade.setValue(0);
        setTimeout(() => Animated.timing(tipFade, { toValue: 1, duration: 350, useNativeDriver: true }).start(), 40);
      });
    }, 3500);

    return () => clearInterval(tipInterval);
  }, []);

  return (
    <LinearGradient colors={["#1a237e", "#283593", "#1b5e20"]} locations={[0, 0.40, 1]} start={{ x: 0.2, y: 0.4 }} end={{ x: 1, y: .8 }} className="flex-1 items-center justify-center">
      {/* ── Decorative blobs ─────────────────────────────── */}
      <View
        className="absolute rounded-full -top-16 -right-20"
        style={{ width: 280, height: 280, backgroundColor: "#1565c033" }}
      />
      <View
        className="absolute rounded-full -bottom-10 -left-16"
        style={{ width: 220, height: 220, backgroundColor: "#2e7d322b" }}
      />

      {/* ── Main content ─────────────────────────────────── */}
      <Animated.View className="items-center w-full px-8"
        style={{ opacity: fadeAnim, gap: 24 }}
      >
        {/* DNA helix art */}
        <DNAHelix />

        {/* Logo block */}
        <Animated.View className="items-center mt-5"
          style={{ opacity: logoFade, transform: [{ translateY: logoSlide }] }}
        >
          <Text className="font-fredoka-bold text-white text-6xl tracking-wide">GeneThink</Text>
          <Text className="font-nunito-semibold text-white/60 text-sm">by Charelle</Text>

          <View className="mt-3 bg-glass-white rounded-pill px-5 py-1.5 border border-white/20">
            <Text className="font-nunito-bold text-white/90 text-xs tracking-wide">✦  Explore · Practice · Master Genetics  ✦
            </Text>
          </View>
        </Animated.View>

        {/* Progress bar */}
        <View className="w-[85%] items-center" style={{ gap: 8 }}>
          {/* Track */}
          <View className="w-full rounded-pill overflow-hidden"
            style={{ height: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Animated.View
              style={{
                height: "100%",
                borderRadius: 99,
                overflow: "hidden",
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"]
                })
              }}>
              <LinearGradient colors={["#4CAF50", "#8BC34A", "#FFD93D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="flex-1 rounded-pill" />
            </Animated.View>
          </View>

          <Text className="font-nunito-semibold text-white/50 text-xs">Loading... {progress}%</Text>
        </View>

        {/* Tip */}
        <Animated.Text className="font-nunito-semibold text-white/70 text-sm text-center leading-5"
          style={{ opacity: tipFade }}>
          {TIPS[tipIndex]}
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}
