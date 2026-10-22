import { getTerm } from '@/constants/missions';
import { cn } from '@/lib/utils';
import React from 'react';
import { Text, View } from 'react-native';

// Shared "Genetics Investigator" card kit — used by missions and comic stories alike.

export const CARD_SHADOW = { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 };

// Renders **bold** segments and \n line breaks.
export const RichText = ({ text, className, boldClassName = 'font-nunito-bold' }: { text: string; className?: string; boldClassName?: string; }) => (
    <Text className={className}>
        {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
                ? <Text key={i} className={boldClassName}>{part.slice(2, -2)}</Text>
                : <Text key={i}>{part}</Text>
        )}
    </Text>
);

// "🔎 CLUE #1 — TRAIT" header row
export const ClueHeader = ({ title, kicker, accentColor, icon = '🔎' }: { title: string; kicker?: string; accentColor: string; icon?: string; }) => (
    <View className='flex-row items-center gap-3 mb-4'>
        <View className='size-11 rounded-full items-center justify-center border-2' style={{ backgroundColor: accentColor + '1f', borderColor: accentColor }}>
            <Text className='text-lg'>{icon}</Text>
        </View>
        <View className='flex-1'>
            {kicker && (
                <View className='self-start rounded-md px-2 py-0.5 mb-1 bg-[#fff3e0]'>
                    <Text className='font-nunito-extrabold text-amber text-[10px] uppercase tracking-wide'>{kicker}</Text>
                </View>
            )}
            <Text className='font-fredoka-bold text-ink-300 text-lg uppercase leading-6'>{title}</Text>
        </View>
    </View>
);

// White card wrapper for visuals
export const VisualCard = ({ children }: { children: React.ReactNode; }) => (
    <View className='bg-white rounded-2xl px-3 py-5 items-center justify-center' style={CARD_SHADOW}>
        {children}
    </View>
);

// "Look for the clue" prompt with optional highlighted reveal pill
export const PromptCard = ({ title, text, reveal, accentColor }: { title: string; text: string; reveal?: string; accentColor: string; }) => (
    <View className='gap-2'>
        <Text className='font-nunito-extrabold text-xs uppercase tracking-wide' style={{ color: accentColor }}>{title}</Text>
        <RichText text={text} className='font-nunito-bold text-ink-300 text-base leading-6' />
        {reveal && (
            <View className='bg-[#fffde7] rounded-xl px-4 py-2.5 border-2 border-medium items-center'>
                <Text className='font-nunito-bold text-ink-600 text-sm text-center'>{reveal}</Text>
            </View>
        )}
    </View>
);

// Term pill + definition box
export const DefinitionCard = ({ term, text, examples, accentColor }: { term: string; text: string; examples?: string; accentColor: string; }) => (
    <View className='items-center'>
        <View className='rounded-pill px-6 py-2 bg-[#fff8e1] border-2 border-gold z-10' style={{ marginBottom: -14 }}>
            <Text className='font-fredoka-bold text-ink-300 text-lg uppercase tracking-wide'>{term}</Text>
        </View>
        <View className='w-full rounded-2xl px-4 pt-6 pb-4 border' style={{ backgroundColor: accentColor + '12', borderColor: accentColor + '40' }}>
            <RichText text={text} className='font-nunito text-ink-300 text-[15px] leading-6 text-center' />
            {examples && (
                <Text className='font-nunito text-ink-200 text-xs leading-5 text-center mt-2'>
                    <Text className='font-nunito-bold'>Examples: </Text>{examples}
                </Text>
            )}
        </View>
    </View>
);

// Important note (red "!") or tip (💡) — same yellow as the quiz hint box
export const NoteCard = ({ tone, title, text }: { tone: 'important' | 'tip'; title?: string; text: string; }) => (
    <View className='bg-[#fffde7] rounded-xl px-4 py-3 border-2 border-medium flex-row gap-3'>
        {tone === 'important' ? (
            <View className='size-7 rounded-full bg-danger items-center justify-center mt-0.5'>
                <Text className='font-fredoka-bold text-white text-sm'>!</Text>
            </View>
        ) : (
            <Text className='text-xl mt-0.5'>💡</Text>
        )}
        <View className='flex-1 gap-0.5'>
            {title && <Text className={cn('font-nunito-extrabold text-xs uppercase tracking-wide', tone === 'important' ? 'text-danger' : 'text-amber')}>{title}</Text>}
            <RichText text={text} className='font-nunito text-ink-600 text-sm leading-5' />
        </View>
    </View>
);

// Green "✓ Correct!" / "Clue found!" card
export const FoundCard = ({ title, text }: { title: string; text: string; }) => (
    <View className='bg-[#e8f5e9] rounded-xl px-4 py-3 border-2 border-primary-300 flex-row gap-3'>
        <View className='size-8 rounded-full bg-primary-300 items-center justify-center mt-0.5'>
            <Text className='font-fredoka-bold text-white text-base'>✓</Text>
        </View>
        <View className='flex-1 gap-0.5'>
            <Text className='font-fredoka-bold text-primary-400 text-base'>{title}</Text>
            <RichText text={text} className='font-nunito text-ink-600 text-sm leading-5' />
        </View>
    </View>
);

// "Evidence Card Unlocked: TRAIT" — accepts toolkit keys or free-form labels
export const EvidenceCard = ({ terms }: { terms: string[]; }) => {
    const items = terms.map((t) => getTerm(t) ?? { key: t, term: t, icon: '🗂️', color: '#4CAF50' });
    return (
        <View className='self-start flex-row items-center gap-3 rounded-xl px-3 py-2.5 bg-primary-50 border-2 border-dashed border-primary-300'>
            <View className='size-10 rounded-lg bg-primary-300 items-center justify-center'>
                <Text className='text-lg'>{items[0].icon}</Text>
            </View>
            <View>
                <Text className='font-nunito-bold text-ink-200 text-[11px]'>Evidence Card Unlocked:</Text>
                <Text className='font-fredoka-bold text-primary-500 text-base uppercase'>{items.map((i) => i.term).join(' & ')}</Text>
            </View>
        </View>
    );
};

// A / B / C / D option row — same states as MCQQuestion
export type OptionState = 'idle' | 'correct' | 'wrong';
export const OptionRow = ({ label, text, state }: { label: string; text: string; state: OptionState; }) => {
    const bg = state === 'correct' ? 'bg-[#e8f5e9] border-2 border-primary-300' : state === 'wrong' ? 'bg-[#ffebee] border-2 border-danger2' : 'bg-white border border-[#e8e8e8]';
    const badge = state === 'correct' ? 'bg-primary-300' : state === 'wrong' ? 'bg-danger' : 'bg-[#f0f0f0]';
    return (
        <View className={cn('flex-row items-center gap-3 rounded-xl px-4 py-3', bg)}>
            <View className={cn('size-7 rounded-full items-center justify-center', badge)}>
                <Text className={cn('font-fredoka-bold text-sm', state === 'idle' ? 'text-ink-200' : 'text-white')}>{label}</Text>
            </View>
            <Text className='font-nunito-bold text-[15px] flex-1 text-ink-600'>{text}</Text>
        </View>
    );
};
