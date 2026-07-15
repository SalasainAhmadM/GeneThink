import { BackArrow } from '@/components/icons/Arrowicon';
import Button from '@/components/ui/Button';
import { DEFAULT_SETTINGS, Settings, STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        { icon: "🔒", title: "Control access to app sections", subtitle: "Require a PIN to open Settings", key: "restrictAccess" },
    ];

const PIN_LENGTH = 4;

// ── PIN entry field (4 boxes) ──────────────────────────────────
const PinField = ({ value }: { value: string; }) => (
    <View className='flex-row gap-2.5 justify-center'>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View key={i} className={cn('size-11 rounded-lg items-center justify-center border-2', value[i] ? 'border-primary-400 bg-primary-50' : 'border-[#e0e0e0] bg-bg-card')}>
                <Text className='font-fredoka-bold text-ink-300 text-xl'>{value[i] ? '•' : ''}</Text>
            </View>
        ))}
    </View>
);

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

    // Access control
    const [pin, setPin] = useState<string | null>(null);
    const [locked, setLocked] = useState<boolean>(false);
    const [unlockEntry, setUnlockEntry] = useState<string>('');
    const [unlockError, setUnlockError] = useState<string>('');
    const unlockInputRef = useRef<TextInput>(null);

    const [showPinSetup, setShowPinSetup] = useState<boolean>(false);
    const [newPin, setNewPin] = useState<string>('');
    const [confirmPin, setConfirmPin] = useState<string>('');
    const [pinSetupStep, setPinSetupStep] = useState<'create' | 'confirm'>('create');
    const [pinSetupError, setPinSetupError] = useState<string>('');
    const setupInputRef = useRef<TextInput>(null);

    useEffect(() => {
        (async () => {
            const [nameRaw, settingRaw, pinRaw] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.playerName),
                AsyncStorage.getItem(STORAGE_KEYS.settings),
                AsyncStorage.getItem(STORAGE_KEYS.pin),
            ]);
            if (nameRaw) setPlayerName(nameRaw);
            const loadedSettings = settingRaw ? { ...DEFAULT_SETTINGS, ...JSON.parse(settingRaw) } : DEFAULT_SETTINGS;
            setSettings(loadedSettings);
            setPin(pinRaw);
            setLocked(loadedSettings.restrictAccess && !!pinRaw);
        })();
    }, []);

    // #region Functions
    const updateSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
        const updated = { ...settings, [key]: value };
        setSettings(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(updated));
    };

    const handleToggle = (key: keyof Settings) => {
        if (key === 'restrictAccess' && !settings.restrictAccess) {
            // Enabling access control for the first time — require a PIN to be set first
            setNewPin(''); setConfirmPin(''); setPinSetupStep('create'); setPinSetupError('');
            setShowPinSetup(true);
            return;
        }
        updateSetting(key, !settings[key]);
    };

    const handlePinDigit = (digits: string) => {
        if (pinSetupStep === 'create') {
            setNewPin(digits);
            if (digits.length === PIN_LENGTH) {
                setPinSetupStep('confirm');
                setConfirmPin('');
                setupInputRef.current?.clear();
            }
        } else {
            setConfirmPin(digits);
            if (digits.length === PIN_LENGTH) {
                if (digits !== newPin) {
                    setPinSetupError('PINs did not match — try again');
                    setPinSetupStep('create');
                    setNewPin(''); setConfirmPin('');
                    setupInputRef.current?.clear();
                    return;
                }
                (async () => {
                    await AsyncStorage.setItem(STORAGE_KEYS.pin, digits);
                    setPin(digits);
                    setShowPinSetup(false);
                    await updateSetting('restrictAccess', true);
                })();
            }
        }
    };

    const handleUnlockDigit = (digits: string) => {
        setUnlockEntry(digits);
        if (digits.length === PIN_LENGTH) {
            if (digits === pin) {
                setLocked(false); setUnlockEntry(''); setUnlockError('');
            } else {
                setUnlockError('Incorrect PIN — try again');
                setUnlockEntry('');
                unlockInputRef.current?.clear();
            }
        }
    };

    const handleReset = async () => {
        await AsyncStorage.multiRemove([STORAGE_KEYS.playerName, STORAGE_KEYS.progress, STORAGE_KEYS.settings, STORAGE_KEYS.pin, STORAGE_KEYS.explored]);
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

            {locked ? (
                /* ── Lock screen ───────────────────────────────────── */
                <View className='flex-1 items-center justify-center p-6 gap-4'>
                    <Text className='text-[40px]'>🔒</Text>
                    <Text className='font-fredoka-bold text-ink-300 text-lg'>Enter PIN to open Settings</Text>

                    <Pressable onPress={() => unlockInputRef.current?.focus()}>
                        <PinField value={unlockEntry} />
                    </Pressable>

                    {!!unlockError && <Text className='font-nunito-semibold text-danger text-sm'>{unlockError}</Text>}

                    <TextInput
                        ref={unlockInputRef}
                        value={unlockEntry}
                        onChangeText={(t) => handleUnlockDigit(t.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH))}
                        keyboardType='number-pad'
                        maxLength={PIN_LENGTH}
                        autoFocus
                        style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
                    />
                </View>
            ) : (
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
                            <SettingRow key={t.key} icon={t.icon} title={t.title} subtitle={t.subtitle} right={<Toggle value={settings[t.key] as boolean} onToggle={() => handleToggle(t.key)} />} />
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
            )}

            {/* ── PIN setup overlay ──────────────────────────────────── */}
            {showPinSetup && (
                <View className='absolute inset-0 bg-black/50 items-center justify-center p-6'>
                    <View className='bg-bg-card rounded-xl2 p-6 w-full gap-4 items-center'>
                        <Text className='text-[32px]'>🔒</Text>
                        <Text className='font-fredoka-bold text-ink-300 text-lg text-center'>
                            {pinSetupStep === 'create' ? 'Create a 4-digit PIN' : 'Confirm your PIN'}
                        </Text>
                        <Text className='font-nunito text-ink-100 text-xs text-center'>
                            This PIN will be required to open Settings once access control is on.
                        </Text>

                        <Pressable onPress={() => setupInputRef.current?.focus()}>
                            <PinField value={pinSetupStep === 'create' ? newPin : confirmPin} />
                        </Pressable>

                        {!!pinSetupError && <Text className='font-nunito-semibold text-danger text-sm'>{pinSetupError}</Text>}

                        <TextInput
                            ref={setupInputRef}
                            value={pinSetupStep === 'create' ? newPin : confirmPin}
                            onChangeText={(t) => handlePinDigit(t.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH))}
                            keyboardType='number-pad'
                            maxLength={PIN_LENGTH}
                            autoFocus
                            style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
                        />

                        <Button
                            label='Cancel'
                            btnType='ghost'
                            size='sm'
                            className='rounded-pill'
                            onPress={() => setShowPinSetup(false)}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}
