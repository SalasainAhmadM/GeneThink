import DNAHelix from '@/components/art/DNAHelix';
import PlantAnimated from '@/components/art/Plant';
import Trophy from '@/components/art/Trophy';
import { BackArrow, ForwardArrow } from '@/components/icons/Arrowicon';
import Button from '@/components/ui/Button';
import { STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated, Easing, KeyboardAvoidingView,
    Platform,
    ScrollView, Text, TextInput, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ── Slides ────────────────────────────────────────────────────
const SLIDES = [
    {
        key: "welcome",
        title: "Welcome to GeneQuest!",
        body: "The ultimate Grade 8 Genetics adventure. Learn Mendel's Laws, Punnett Squares, and become a genetics expert!",
    },
    {
        key: "howto",
        title: "How to Play",
        body: "Answer quiz questions and fill in Punnett Squares. Use hints wisely — you only get a limited number of lives per level!",
    },
    {
        key: "hearts",
        title: "Hearts & Levels",
        body: "You get ❤️❤️❤️❤️❤️ 5 hearts per level.\n\nEach wrong answer costs one heart. Lose them all and the level ends — study the hints and try again!",
    },
];

// ── Dots ──────────────────────────────────────────────────────
const Dots = ({ current }: { current: number; }) => (
    <View className="flex-row items-center gap-2">
        {Array.from({ length: SLIDES.length }).map((_, i) => (
            <View
                key={i}
                style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === current ? "#4CAF50" : "#4CAF5055",
                }}
            />
        ))}
    </View>
);

// ── Main screen ───────────────────────────────────────────────
export default function OnboardingScreen() {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false);

    const slideAnim = useRef(new Animated.Value(30)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const ART = [<DNAHelix onboarding />, <PlantAnimated />, <Trophy />];
    const isLastStep = step === SLIDES.length - 1;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]).start();
    }, []);

    const goTo = (next: number) => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
            .start(() => {
                setStep(next);
                slideAnim.setValue(next > step ? 30 : -30);
                Animated.parallel([
                    Animated.timing(fadeAnim, { toValue: 1, duration: 360, useNativeDriver: true }),
                    Animated.timing(slideAnim, { toValue: 0, duration: 360, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                ]).start();
            });
    };

    const handleNext = async (isBack?: boolean) => {
        if (isBack && step > 0) {
            goTo(step - 1);
        } else if (!isBack && step < SLIDES.length - 1) {
            goTo(step + 1);
        } else if (!isBack) {
            const trimmed = name.trim();
            if (!trimmed) { setNameErr(true); return; }
            setNameErr(false);
            await AsyncStorage.setItem(STORAGE_KEYS.playerName, trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
            router.replace("/(root)/(tabs)/Home");
        }
    };

    return (
        // Light mint gradient — matches mockup
        <LinearGradient
            colors={["#e0f2f1", "#e8f5e9", "#f1f8e9"]}
            locations={[0, 0.5, 1]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled={Platform.OS === "ios"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="flex-1 items-center px-6 pt-28 pb-2" style={{ minHeight: 600 }}>

                            {/* Dots */}
                            <View className="mb-8">
                                <Dots current={step} />
                            </View>

                            {/* Art area */}
                            <Animated.View
                                className="items-center justify-center mb-8 h-[170]"
                                style={{
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }],
                                }}
                            >
                                {ART[step]}
                            </Animated.View>

                            {/* Title + body */}
                            <Animated.View
                                className="items-center"
                                style={{
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }],
                                }}
                            >
                                <Text className="font-fredoka-bold text-center text-[26px] text-primary-500 mb-3">
                                    {SLIDES[step].title}
                                </Text>
                                <Text className="font-nunito text-center text-[15px] text-ink-400 leading-6">
                                    {SLIDES[step].body}
                                </Text>
                            </Animated.View>

                            {/* Name input — last slide only */}
                            {isLastStep && (
                                <Animated.View
                                    className="w-full mt-6"
                                    style={{ opacity: fadeAnim }}
                                >
                                    <Text className="font-nunito-semibold text-sm text-ink-400 mb-2">
                                        What's your name, scientist?
                                    </Text>

                                    <TextInput
                                        value={name}
                                        onChangeText={(t) => { setName(t); setNameErr(false); }}
                                        placeholder="Enter your name..."
                                        placeholderTextColor="#aaa"
                                        returnKeyType="done"
                                        onSubmitEditing={() => handleNext()}
                                        className={cn(
                                            "font-nunito text-[15px] text-primary-500 bg-bg-card px-[18px] py-3.5 w-full border rounded-xl",
                                            nameErr ? "border-2 border-danger2" : "border-ink-500"
                                        )}
                                    />

                                    {nameErr && (
                                        <Text className="font-nunito-semibold text-xs text-danger mt-1">
                                            Please enter your name to continue
                                        </Text>
                                    )}
                                </Animated.View>
                            )}

                            {/* Pushes buttons to bottom */}
                            <View className="flex-1" />

                            {/* Buttons */}
                            <View className="w-full gap-2.5">
                                <Button
                                    label={isLastStep ? "Start Adventure!" : "Next"}
                                    icon2={isLastStep ? <Text>🚀</Text> : <ForwardArrow />}
                                    width="full"
                                    onPress={() => handleNext()}
                                    size='lg'
                                />

                                {step > 0 && (
                                    <Button
                                        label="Back"
                                        icon={<BackArrow color="#9e9e9e" />}
                                        btnType="ghost"
                                        width="full"
                                        onPress={() => handleNext(true)}
                                        labelClassName="text-ink-100"
                                        size='lg'
                                    />
                                )}

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}