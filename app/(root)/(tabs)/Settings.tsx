import { BackArrow } from '@/components/icons/Arrowicon';
import Button from '@/components/ui/Button';
import { DEFAULT_SETTINGS, Settings, STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOGGLES: {
    icon: string;
    title: string;
    subtitle: string;
    key: keyof Settings;
}[] = [
        { icon: "🔊", title: "Sound Effects", subtitle: "Ding on correct answers", key: "sound" },
        { icon: "⏱", title: "Show Timer", subtitle: "Display countdown during quiz", key: "timer" },
        { icon: "💡", title: "Auto-show Hints", subtitle: "Hint button always visible", key: "hints" },
        { icon: "✨", title: "Animations", subtitle: "Enable UI animations", key: "animations" },
    ];

// ── Toggle switch ─────────────────────────────────────────────
const Toggle = ({
    value, onToggle
}: { value: boolean; onToggle: () => void; }) => {
    const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(anim, {
            toValue: value ? 1 : 0,
            useNativeDriver: false,
            speed: 20,
            bounciness: 4
        }).start();
    }, [value]);

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.85}
            className={cn('w-[48px] h-7 rounded-[14px] justify-center p-0.5', value ? 'bg-success' : 'bg-[#e0e0e0]')}
        >
            <Animated.View className="size-6 rounded-xl bg-white" style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3, elevation: 3, transform: [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 22] }) }] }} />
        </TouchableOpacity>
    );
};

// ── Setting row card ─────────────────────────────────────────
const SettingRow = ({ icon, title, subtitle, right }: {
    icon: string; title: string; subtitle?: string; right: React.ReactNode;
}) => (
    <View className='bg-bg-card rounded-xl px-4 py-3.5 flex-row items-center gap-3' style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}>
        <Text className='text-[22px]'>{icon}</Text>

        <View className='flex-1'>
            <Text className='font-nunito-extrabold text-ink-300'>{title}</Text>
            {subtitle && (
                <Text className='font-nunito text-ink-100 text-xs mt-0.5'>{subtitle}</Text>
            )}
        </View>

        {right}
    </View>
);

export default function SettingsScreen() {
    const [playerName, setPlayerName] = useState<string>('Scientist');
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [confirmReset, setConfirmReset] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const [nameRaw, settingRaw] = await Promise.all([AsyncStorage.getItem(STORAGE_KEYS.playerName), AsyncStorage.getItem(STORAGE_KEYS.settings)]);
            if (nameRaw) setPlayerName(nameRaw);
            if (settingRaw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(settingRaw) });
        })();
    }, []);

    // #region Functions
    const updateSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
        const updated = { ...settings, [key]: value };
        setSettings(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updated));
    };

    const handleReset = async () => {
        await AsyncStorage.multiRemove([STORAGE_KEYS.playerName, STORAGE_KEYS.progress, STORAGE_KEYS.settings]);
        setConfirmReset(false);
        router.push('/');
    };

    return (
        <View className='flex-1 bg-bg-light'>
            {/* ── Header ──────────────────────────────────────────── */}
            <View className='bg-ink-300' style={{ shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 }}>
                <SafeAreaView edges={["top"]}>
                    <View className='flex-row items-center px-4 py-3 justify-between'>
                        <Button btnType='glass' size='sm' icon={<BackArrow color="#fff" size={16} strokeWidth={2.5} />} label='Back' href='back' />

                        <Text className='font-fredoka-bold text-white text-xl'>⚙️ Settings</Text>

                        <View className='w-1/5' />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                className='flex-1 p-4'
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className='gap-3'>
                    {/* Player name */}
                    <SettingRow icon="👤" title='Player Name' right={
                        <Text className='font-fredoka-bold text-primary-400 text-lg'>{playerName}</Text>
                    } />

                    {/* Toggle rows */}
                    {TOGGLES.map((t) => (
                        <SettingRow key={t.key} icon={t.icon} title={t.title} subtitle={t.subtitle} right={<Toggle value={settings[t.key] as boolean} onToggle={() => updateSetting(t.key, !settings[t.key])} />} />
                    ))}

                    {/* Reset progress */}
                    <SettingRow
                        icon="🔄"
                        title="Reset Progress"
                        subtitle="Clear all lesson data"
                        right={
                            confirmReset ? (
                                <View className="flex-row gap-2">
                                    <Pressable
                                        onPress={handleReset}
                                        className="rounded-pill px-3 py-1.5 bg-danger"
                                    >
                                        <Text className="font-nunito-bold text-white text-[12px]">
                                            Yes
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setConfirmReset(false)}
                                        className="rounded-pill px-3 py-1.5"
                                        style={{ backgroundColor: "#f0f0f0" }}
                                    >
                                        <Text className="font-nunito-bold text-ink-100 text-[12px]">
                                            No
                                        </Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Button
                                    onPress={() => setConfirmReset(true)}
                                    label='Reset'
                                    btnType='danger'
                                    size='sm'
                                    className='rounded-pill'
                                    mode={2}
                                />
                            )
                        }
                    />
                </View>
                {/* Footer */}
                <Text className='font-nunito-semibold text-ink-100 text-xs text-center mt-2 mb-8'>GeneThink v1.0 · by Cherelle · G8 Biology</Text>
            </ScrollView>
        </View>
    );
}
