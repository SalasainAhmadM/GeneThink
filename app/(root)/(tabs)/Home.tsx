import BrainStorm from '@/components/art/BrainStorm';
import DNA from '@/components/art/DNA';
import PunnettSquare from '@/components/art/PunnetSquare';
import Scientist from '@/components/art/Scientist';
import GuideTab from '@/components/Home/GuideTab';
import LessonTab from '@/components/Home/LessonTab';
import ProgressTab from '@/components/Home/ProgressTab';
import Button from '@/components/ui/Button';
import { getTotalDone, getTotalLevels, Progress } from '@/constants/prorgess';
import { STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = "lessons" | "progress" | "guide";

// ── Stat chip ─────────────────────────────────────────────────
const StatChip = ({ value, label }: { value: string | number; label: string; }) =>
    <View className='flex-1 items-center rounded-xl py-2.5 bg-white/35'>
        <Text className='font-fredoka-bold text-white text-xl'>{value}</Text>
        <Text className='font-nunito text-white/70 text-xs mt-0.5'>{label}</Text>
    </View>;

// ── Custom tab button ─────────────────────────────────────────
const TabBtn = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void; }) => (
    <Pressable onPress={onPress} className={cn('flex-1 items-center py-3 border-b-[3px]', active ? 'border-b-[#4caf50]' : 'border-b-transparent')}><Text className={cn('font-nunito-bold text-sm', active ? 'text-primary-300' : "text-ink-200")}>{label}</Text></Pressable>
);

const ART = [<DNA />, <Scientist />, <PunnettSquare />, <BrainStorm />];

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<TabType>("lessons");
    const [progress, setProgress] = useState<Progress>({});
    const [playerName, setPlayerName] = useState<string>("Scientist");

    // Load data from AsyncStorage
    const loadData = useCallback(async () => {
        try {
            const [nameRaw, progressRaw] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.playerName),
                AsyncStorage.getItem(STORAGE_KEYS.progress)
            ]);

            if (nameRaw) setPlayerName(nameRaw);
            if (progressRaw) setProgress(JSON.parse(progressRaw));
        } catch (e) {
            console.warn("HomeScreen: failed to load data. ", e);
        }
    }, []);

    useEffect(() => { loadData(); }, []);

    const totalDone = getTotalDone(progress);
    const totalLevels = getTotalLevels();
    const pctComplete = Math.round((totalDone / totalLevels) * 100);

    const TABS: { key: TabType, label: string; }[] = [
        { key: "lessons", label: "🏠 Lessons" },
        { key: "progress", label: "📊 Progress" },
        { key: "guide", label: "📖 Guide" },
    ];

    return (
        <View className='flex-1 bg-bg-light'>
            {/* ── Header ──────────────────────────────────────────── */}
            <LinearGradient colors={["#1a237e", "#283593", "#1b5e20"]}
                locations={[0, 0.45, 1]}
                start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
            >
                <SafeAreaView edges={['top']}>
                    <View className='px-5 pt-3 pb-4'>
                        {/* Logo row */}
                        <View className='flex-row items-center justify-between mb-1'>
                            <View>
                                <Text className='font-fredoka-bold text-white text-3xl'>GeneQuest</Text>

                                <Text className='font-nunito-semibold text-white text-[13px] mt-2'>Hello, {playerName}! 👋</Text>
                            </View>

                            {/* Settings button */}
                            <Button label="⚙️" size="lg" btnType='glass' className='size-[38px] py-[0px] px-[0px] rounded-[10px]' href='/(root)/(tabs)/Settings' />
                        </View>

                        {/* Stat chips */}
                        <View className='flex-row gap-2.5 mt-3'>
                            <StatChip value={totalDone} label="Cleared" />
                            <StatChip value={totalLevels - totalDone} label="Remaining" />
                            <StatChip value={`${pctComplete}%`} label="Complete" />
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* ── Tab bar ─────────────────────────────────────────── */}
            <View className='flex-row bg-bg-card border-b border-[#e8e8e8]'
                style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
            >
                {TABS.map((tab) => (
                    <TabBtn key={tab.key} label={tab.label} active={activeTab === tab.key} onPress={() => setActiveTab(tab.key)} />
                )
                )}
            </View>

            {/* ── Tab content ─────────────────────────────────────── */}
            {activeTab === "lessons" ? <LessonTab progress={progress} art={ART} /> : activeTab === "progress" ? <ProgressTab progress={progress} art={ART} /> : activeTab === 'guide' ? <GuideTab /> : null}
        </View>
    );
}
