import Button from '@/components/ui/Button';
import { LevelStory } from '@/constants/stories';
import React, { useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import StoryPanelView from './StoryPanelView';

export default function StoryReader({ story, accentColor, onFinish }: { story: LevelStory; accentColor: string; onFinish: () => void; }) {
    const { width: SCREEN_W } = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const listRef = useRef<FlatList<any>>(null);
    const isLast = index === story.panels.length - 1;

    const goTo = (i: number) => {
        const clamped = Math.max(0, Math.min(story.panels.length - 1, i));
        listRef.current?.scrollToIndex({ index: clamped, animated: true });
        setIndex(clamped);
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; }) => {
        if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
    }).current;

    return (
        <View className='flex-1'>
            {/* Progress dots */}
            <View className='flex-row justify-center gap-1.5 py-3'>
                {story.panels.map((p, i) => (
                    <View key={p.id} className='h-1.5 rounded-pill' style={{ width: i === index ? 22 : 8, backgroundColor: i <= index ? accentColor : '#e0e0e0' }} />
                ))}
            </View>

            <FlatList
                ref={listRef}
                data={story.panels}
                keyExtractor={(p) => p.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
                getItemLayout={(_, i) => ({ length: SCREEN_W, offset: SCREEN_W * i, index: i })}
                renderItem={({ item, index: i }) => (
                    <View style={{ width: SCREEN_W }}>
                        <StoryPanelView panel={item} index={i} accentColor={accentColor} />
                    </View>
                )}
            />

            {/* Footer nav */}
            <View className='flex-row items-center justify-between px-5 pb-6 pt-3'>
                <View style={{ opacity: index === 0 ? 0 : 1 }} pointerEvents={index === 0 ? 'none' : 'auto'}>
                    <Button label='Back' btnType='ghost' size='md' fredokaBold onPress={() => goTo(index - 1)} />
                </View>

                {isLast ? (
                    <Button label='Start Quiz →' btnType='secondary' size='lg' fredokaBold onPress={onFinish} />
                ) : (
                    <Button label='Next' btnType='primary' size='md' fredokaBold onPress={() => goTo(index + 1)} />
                )}
            </View>
        </View>
    );
}
