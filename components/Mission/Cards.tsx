import { getTerm } from '@/constants/missions';
import { LinearGradient } from 'expo-linear-gradient';
import InvestigatorSvg from '../../assets/svgs/investigator.svg';
import ScientistSvg from '../../assets/svgs/scientist.svg';
import { cn } from '@/lib/utils';
import React from 'react';
import { Text, View } from 'react-native';
import { MagnifierIcon } from '@/components/art/QuestIcons';
import { QUEST } from '@/constants/theme';

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
export const ClueHeader = ({ title, kicker, accentColor, icon }: { title: string; kicker?: string; accentColor: string; icon?: React.ReactNode; }) => (
    <View className='flex-row items-center gap-3 mb-4'>
        <View className='size-11 rounded-full items-center justify-center border-2' style={{ backgroundColor: accentColor + '1f', borderColor: accentColor }}>
            {typeof icon === 'string' ? <Text className='text-lg'>{icon}</Text> : icon ?? <MagnifierIcon size={30} />}
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
    const bg = state === 'correct' ? 'bg-[#e8f5e9] border-2 border-primary-300' : state === 'wrong' ? 'bg-[#ffebee] border-2 border-danger2' : 'bg-[#F4EDFF] border border-[#D8C4FF]';
    const badge = state === 'correct' ? 'bg-primary-300' : state === 'wrong' ? 'bg-danger' : '';
    const idleColor = QUEST.letters['ABCD'.indexOf(label)] ?? QUEST.purple;
    return (
        <View className={cn('flex-row items-center gap-3 rounded-xl px-4 py-3', bg)}>
            <View className={cn('size-7 rounded-full items-center justify-center', badge)} style={state === 'idle' ? { backgroundColor: idleColor } : undefined}>
                <Text className='font-fredoka-bold text-sm text-white'>{label}</Text>
            </View>
            <Text className='font-nunito-bold text-[15px] flex-1 text-ink-600'>{text}</Text>
        </View>
    );
};

// ── GeneQuest mission cover (title card) ──────────────────────
export const CoverCard = ({ mission, title, text, accentColor }: { mission: string; title: string; text: string; accentColor: string; }) => (
    <View className='rounded-2xl overflow-hidden' style={CARD_SHADOW}>
        <LinearGradient colors={QUEST.gradient} locations={QUEST.gradientLocations} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}>
            <View className='items-center px-4 pt-5 pb-4 gap-2'>
                <Text className='font-fredoka-bold text-white text-[34px] leading-[40px]'>Gene<Text style={{ color: QUEST.gold }}>Quest</Text></Text>
                <View className='rounded-pill px-4 py-1 bg-glass-white2 border border-white/30'>
                    <Text className='font-nunito-extrabold text-white text-xs uppercase tracking-wide'>{mission}</Text>
                </View>
                <View className='rounded-xl px-4 py-2 mt-1 bg-[#fff8e1] border-2 border-gold'>
                    <Text className='font-fredoka-bold text-ink-300 text-lg uppercase text-center'>{title}</Text>
                </View>
            </View>
        </LinearGradient>
        <View className='bg-white px-4 py-3'>
            <SpeechBubble text={text} accentColor={accentColor} />
        </View>
    </View>
);

// ── Character speech bubble ───────────────────────────────────
export const SpeechBubble = ({ text, who = 'investigator', accentColor }: { text: string; who?: 'investigator' | 'mendel'; accentColor: string; }) => (
    <View className='flex-row items-end gap-2'>
        <View className='size-14 rounded-full items-center justify-center bg-[#f5f9f5] border-2' style={{ borderColor: accentColor }}>
            {who === 'mendel' ? <ScientistSvg width={44} height={44} /> : <InvestigatorSvg width={44} height={44} />}
        </View>
        <View className='flex-1 rounded-2xl rounded-bl-sm px-3.5 py-2.5 border-2' style={{ backgroundColor: accentColor + '10', borderColor: accentColor + '40' }}>
            <Text className='font-nunito-extrabold text-[10px] uppercase tracking-wide' style={{ color: accentColor }}>{who === 'mendel' ? 'Gregor Mendel' : 'Gene Investigator'}</Text>
            <RichText text={text} className='font-nunito text-ink-300 text-sm leading-5' />
        </View>
    </View>
);

// ── Simple data table ─────────────────────────────────────────
export const TableCard = ({ title, headers, rows, accentColor }: { title?: string; headers: string[]; rows: string[][]; accentColor: string; }) => (
    <View className='bg-white rounded-2xl overflow-hidden' style={CARD_SHADOW}>
        {title && (
            <View className='px-3 py-2' style={{ backgroundColor: accentColor }}>
                <Text className='font-fredoka-bold text-white text-sm'>{title}</Text>
            </View>
        )}
        <View className='flex-row px-3 py-2 bg-science-100'>
            {headers.map((h, i) => <Text key={i} className='font-nunito-extrabold text-science-400 text-xs flex-1'>{h}</Text>)}
        </View>
        {rows.map((r, i) => (
            <View key={i} className={cn('flex-row px-3 py-2', i > 0 && 'border-t border-[#f0f0f0]')}>
                {r.map((c, j) => <Text key={j} className={cn('text-xs flex-1 leading-4', j === 0 ? 'font-nunito-bold text-ink-300' : 'font-nunito text-ink-400')}>{c}</Text>)}
            </View>
        ))}
    </View>
);

// ── Numbered / labelled steps ─────────────────────────────────
export const StepsCard = ({ title, steps, accentColor }: { title?: string; steps: { label: string; text: string; }[]; accentColor: string; }) => (
    <View className='bg-white rounded-2xl p-3 gap-2' style={CARD_SHADOW}>
        {title && <Text className='font-fredoka-bold text-ink-300 text-sm'>{title}</Text>}
        {steps.map((s, i) => (
            <View key={i} className='flex-row items-start gap-2.5'>
                <View className='rounded-pill px-2.5 py-1 min-w-[30px] items-center' style={{ backgroundColor: accentColor + '22' }}>
                    <Text className='font-fredoka-bold text-xs' style={{ color: accentColor }}>{s.label}</Text>
                </View>
                <RichText text={s.text} className='font-nunito text-ink-600 text-[13px] leading-5 flex-1' />
            </View>
        ))}
    </View>
);
