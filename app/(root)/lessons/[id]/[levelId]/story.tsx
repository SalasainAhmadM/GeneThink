import { BackArrow } from '@/components/icons/Arrowicon';
import StoryReader from '@/components/Story/StoryReader';
import Button from '@/components/ui/Button';
import { LESSONS } from '@/constants/lessons';
import { StoriesRead } from '@/constants/prorgess';
import { STORAGE_KEYS } from '@/constants/settings';
import { getStory } from '@/constants/stories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoryScreen() {
    const { id, levelId } = useLocalSearchParams<{ id: string; levelId: string; }>();

    const lesson = LESSONS.find((l) => l.id === id);
    const levelIndex = lesson?.levels.findIndex((l) => String(l.id) === levelId) ?? -1;
    const level = lesson?.levels[levelIndex];
    const story = lesson ? getStory(lesson.id, Number(levelId)) : undefined;

    const markReadAndStart = async () => {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEYS.storiesRead);
            const storiesRead: StoriesRead = raw ? JSON.parse(raw) : {};
            const arr = [...(storiesRead[id] ?? [])];
            arr[levelIndex] = true;
            await AsyncStorage.setItem(STORAGE_KEYS.storiesRead, JSON.stringify({ ...storiesRead, [id]: arr }));
        } catch (e) {
            console.warn('Failed to save story-read state:', e);
        } finally {
            router.replace(`/lessons/${id}/${levelId}` as any);
        }
    };

    if (!lesson || !level || !story) {
        return (
            <View className='flex-1 items-center justify-center bg-bg-light'>
                <Text className='font-nunito text-ink-100'>Story not found.</Text>
            </View>
        );
    }

    return (
        <View className='flex-1 bg-bg-light'>
            {/* ── Header ─────────────────────────────────────────── */}
            <LinearGradient colors={[lesson.accentColor + 'cc', lesson.accentColor]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <SafeAreaView edges={['top']}>
                    <View className='p-4 flex-row items-center gap-3'>
                        <Button btnType='glass' size='sm' icon={<BackArrow color='#fff' size={14} />} label='Back' href='back' />
                        <Text className='font-fredoka-bold text-white text-base flex-1'>{lesson.title} · Lv{level.id}</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <StoryReader story={story} accentColor={lesson.accentColor} onFinish={markReadAndStart} />
        </View>
    );
}
