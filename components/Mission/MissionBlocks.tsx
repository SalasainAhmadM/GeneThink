import Button from '@/components/ui/Button';
import { MissionBlock, TOOLKIT } from '@/constants/missions';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { CARD_SHADOW, DefinitionCard, EvidenceCard, FoundCard, NoteCard, OptionRow, OptionState, PromptCard, RichText, VisualCard } from './Cards';
import MissionVisualView from './MissionVisuals';

const LABELS = ['A', 'B', 'C', 'D'];

export const isInteractive = (b: MissionBlock) => ['check', 'tapSort', 'classify', 'caseQuestions', 'fillBlanks'].includes(b.type);

type Solve = () => void;

// ── Quick check: pick until correct, then show feedback ───────
const CheckBlock = ({ block, solved, onSolved }: { block: Extract<MissionBlock, { type: 'check'; }>; solved: boolean; onSolved: Solve; }) => {
    const [wrong, setWrong] = useState<string[]>([]);
    const pick = (id: string) => {
        if (solved) return;
        if (id === block.answer) onSolved();
        else setWrong((w) => [...w, id]);
    };
    return (
        <View className='gap-2.5'>
            <Text className='font-nunito-bold text-ink-300 text-base leading-6'>{block.question}</Text>
            {block.choices.map((c, i) => {
                const state: OptionState = solved && c.id === block.answer ? 'correct' : wrong.includes(c.id) ? 'wrong' : 'idle';
                return (
                    <Button key={c.id} btnType='container' className='rounded-xl' disabled={solved && c.id !== block.answer} onPress={() => pick(c.id)}>
                        <OptionRow label={LABELS[i]} text={c.text} state={state} />
                    </Button>
                );
            })}
            {!solved && wrong.length > 0 && <Text className='font-nunito-bold text-danger text-xs'>Not quite — look at the clues again and try another answer.</Text>}
            {solved && <FoundCard title={block.feedbackTitle} text={block.feedback} />}
        </View>
    );
};

// ── Tap only the matching items ───────────────────────────────
const TapSortBlock = ({ block, solved, onSolved }: { block: Extract<MissionBlock, { type: 'tapSort'; }>; solved: boolean; onSolved: Solve; }) => {
    const [picked, setPicked] = useState<number[]>([]);
    const [flash, setFlash] = useState<number | null>(null);
    const needed = block.items.filter((i) => i.correct).length;

    const tap = (idx: number) => {
        if (solved || picked.includes(idx)) return;
        if (!block.items[idx].correct) {
            setFlash(idx);
            setTimeout(() => setFlash(null), 700);
            return;
        }
        const next = [...picked, idx];
        setPicked(next);
        if (next.length === needed) onSolved();
    };

    return (
        <View className='gap-2.5'>
            <Text className='font-nunito-bold text-ink-300 text-base'>{block.prompt}</Text>
            <View className='flex-row flex-wrap gap-2'>
                {block.items.map((item, i) => (
                    <Button key={i} btnType='container' className='rounded-xl' onPress={() => tap(i)}>
                        <View className={cn('rounded-xl px-4 py-2.5 border-2', picked.includes(i) ? 'bg-[#e8f5e9] border-primary-300' : flash === i ? 'bg-[#ffebee] border-danger2' : 'bg-white border-[#e8e8e8]')}>
                            <Text className={cn('font-nunito-bold text-sm', picked.includes(i) ? 'text-primary-400' : 'text-ink-600')}>{item.text}</Text>
                        </View>
                    </Button>
                ))}
            </View>
            <Text className='font-nunito text-ink-100 text-xs'>{picked.length}/{needed} found</Text>
            {solved && <FoundCard title='Correct!' text={block.feedback} />}
        </View>
    );
};

// ── Sort each row into one of two bins ────────────────────────
const ClassifyBlock = ({ block, solved, onSolved }: { block: Extract<MissionBlock, { type: 'classify'; }>; solved: boolean; onSolved: Solve; }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const choose = (row: number, opt: string) => {
        if (solved) return;
        const next = { ...answers, [row]: opt };
        setAnswers(next);
        if (block.rows.every((r, i) => next[i] === r.answer)) onSolved();
    };
    return (
        <View className='gap-2.5'>
            <Text className='font-nunito-bold text-ink-300 text-base'>{block.prompt}</Text>
            {block.rows.map((row, i) => {
                const a = answers[i];
                return (
                    <View key={row.label} className='flex-row items-center gap-2'>
                        <View className='w-14 rounded-xl py-2.5 items-center bg-[#fff3e0]'>
                            <Text className='font-fredoka-bold text-ink-300 text-base'>{row.label}</Text>
                        </View>
                        <Text className='text-ink-100'>→</Text>
                        {block.options.map((opt) => {
                            const chosen = a === opt;
                            const ok = chosen && opt === row.answer;
                            return (
                                <Button key={opt} btnType='container' className='flex-1 rounded-xl' onPress={() => choose(i, opt)}>
                                    <View className={cn('rounded-xl py-2.5 items-center border-2', ok ? 'bg-[#e8f5e9] border-primary-300' : chosen ? 'bg-[#ffebee] border-danger2' : 'bg-white border-[#e8e8e8]')}>
                                        <Text className={cn('font-nunito-bold text-xs', ok ? 'text-primary-400' : chosen ? 'text-danger' : 'text-ink-200')}>{opt}</Text>
                                    </View>
                                </Button>
                            );
                        })}
                    </View>
                );
            })}
            {solved && <FoundCard title={block.feedbackTitle} text={block.feedback} />}
        </View>
    );
};

// ── Numbered case questions — tap to reveal each answer ───────
const CaseQuestionsBlock = ({ block, onSolved }: { block: Extract<MissionBlock, { type: 'caseQuestions'; }>; solved: boolean; onSolved: Solve; }) => {
    const [shown, setShown] = useState<number[]>([]);
    const reveal = (i: number) => {
        if (shown.includes(i)) return;
        const next = [...shown, i];
        setShown(next);
        if (next.length === block.rows.length) onSolved();
    };
    return (
        <View className='gap-2'>
            {block.rows.map((row, i) => (
                <Button key={i} btnType='container' className='rounded-xl' onPress={() => reveal(i)}>
                    <View className='flex-row items-center gap-3 rounded-xl px-3 py-3 bg-white border border-[#e8e8e8]'>
                        <View className='size-7 rounded-full bg-science-300 items-center justify-center'>
                            <Text className='font-fredoka-bold text-white text-sm'>{i + 1}</Text>
                        </View>
                        <Text className='font-nunito-bold text-ink-600 text-sm flex-1'>{row.q}</Text>
                        {shown.includes(i) ? (
                            <View className='rounded-lg px-2.5 py-1 bg-[#e8f5e9]'>
                                <Text className='font-fredoka-bold text-primary-400 text-sm'>{row.a}</Text>
                            </View>
                        ) : (
                            <View className='rounded-lg px-2.5 py-1 bg-[#f0f0f0]'>
                                <Text className='font-nunito-bold text-ink-100 text-xs'>Tap to check</Text>
                            </View>
                        )}
                    </View>
                </Button>
            ))}
        </View>
    );
};

// ── Fill the blanks from a word bank ──────────────────────────
const FillBlanksBlock = ({ block, solved, onSolved }: { block: Extract<MissionBlock, { type: 'fillBlanks'; }>; solved: boolean; onSolved: Solve; }) => {
    const bank = useMemo(() => [...block.rows.map((r) => r.answer)].sort(), [block]);
    const [word, setWord] = useState<string | null>(null);
    const [filled, setFilled] = useState<number[]>([]);
    const [flash, setFlash] = useState<number | null>(null);

    const place = (i: number) => {
        if (!word || filled.includes(i)) return;
        if (block.rows[i].answer !== word) {
            setFlash(i);
            setTimeout(() => setFlash(null), 700);
            return;
        }
        const next = [...filled, i];
        setFilled(next);
        setWord(null);
        if (next.length === block.rows.length) onSolved();
    };

    const used = filled.map((i) => block.rows[i].answer);

    return (
        <View className='gap-3'>
            <Text className='font-nunito-bold text-ink-300 text-base'>Complete the statements. Tap a word, then tap its blank.</Text>
            {!solved && (
                <View className='flex-row flex-wrap gap-2'>
                    {bank.filter((w) => !used.includes(w)).map((w) => (
                        <Button key={w} btnType='container' className='rounded-pill' onPress={() => setWord(w)}>
                            <View className={cn('rounded-pill px-3.5 py-2 border-2', word === w ? 'bg-science-100 border-science-300' : 'bg-white border-[#e8e8e8]')}>
                                <Text className={cn('font-nunito-bold text-sm', word === w ? 'text-science-300' : 'text-ink-600')}>{w}</Text>
                            </View>
                        </Button>
                    ))}
                </View>
            )}
            {block.rows.map((row, i) => {
                const done = filled.includes(i);
                return (
                    <Button key={i} btnType='container' className='rounded-xl' onPress={() => place(i)}>
                        <View className='flex-row items-center gap-3 rounded-xl px-3 py-2.5 bg-white border border-[#e8e8e8]'>
                            <View className='size-7 rounded-full bg-science-300 items-center justify-center'>
                                <Text className='font-fredoka-bold text-white text-sm'>{i + 1}</Text>
                            </View>
                            <Text className='font-nunito text-ink-600 text-sm flex-1'>{row.text}</Text>
                            <View className={cn('rounded-lg px-2.5 py-1.5 border-2 min-w-[90px] items-center', done ? 'bg-[#e8f5e9] border-primary-300' : flash === i ? 'bg-[#ffebee] border-danger2' : 'bg-[#f5f5f5] border-dashed border-[#bdbdbd]')}>
                                <Text className={cn('font-nunito-bold text-xs', done ? 'text-primary-400' : 'text-ink-100')}>{done ? row.answer : '______'}</Text>
                            </View>
                        </View>
                    </Button>
                );
            })}
        </View>
    );
};

// ── Toolkit table ─────────────────────────────────────────────
export const ToolkitTable = ({ accentColor }: { accentColor: string; }) => (
    <View className='bg-white rounded-2xl overflow-hidden' style={CARD_SHADOW}>
        <View className='py-2.5 items-center' style={{ backgroundColor: accentColor }}>
            <Text className='font-fredoka-bold text-white text-sm uppercase tracking-wide'>Genetics Investigator Toolkit</Text>
        </View>
        {TOOLKIT.map((t, i) => (
            <View key={t.key} className={cn('flex-row items-center gap-3 px-3 py-2.5', i > 0 && 'border-t border-[#f0f0f0]')}>
                <View className='size-8 rounded-lg items-center justify-center' style={{ backgroundColor: t.color + '26' }}>
                    <Text className='text-base'>{t.icon}</Text>
                </View>
                <Text className='font-fredoka-bold text-ink-300 text-sm w-[92px]'>{t.term}</Text>
                <Text className='font-nunito text-ink-400 text-xs flex-1 leading-4'>{t.definition}</Text>
            </View>
        ))}
    </View>
);

// ── Mission complete card ─────────────────────────────────────
const CompleteCard = ({ title, text, accentColor }: { title: string; text: string; accentColor: string; }) => (
    <View className='rounded-2xl p-4 gap-3 items-center border-2 border-gold bg-[#fffde7]'>
        <Text className='text-[40px]'>🏆</Text>
        <Text className='font-fredoka-bold text-xl uppercase' style={{ color: accentColor }}>{title}</Text>
        <Text className='font-nunito text-ink-600 text-sm leading-5 text-center'>{text}</Text>
        <Text className='font-nunito-extrabold text-ink-200 text-xs uppercase tracking-wide mt-1'>Your toolkit</Text>
        <View className='flex-row flex-wrap justify-center gap-2'>
            {TOOLKIT.map((t) => (
                <View key={t.key} className='items-center gap-0.5' style={{ width: 58 }}>
                    <View className='size-10 rounded-full items-center justify-center' style={{ backgroundColor: t.color + '30' }}>
                        <Text className='text-lg'>{t.icon}</Text>
                    </View>
                    <Text className='font-nunito-bold text-ink-300 text-[9px] text-center'>{t.term}</Text>
                </View>
            ))}
        </View>
    </View>
);

export default function MissionBlockView({ block, accentColor, solved, onSolved }: { block: MissionBlock; accentColor: string; solved: boolean; onSolved: Solve; }) {
    switch (block.type) {
        case 'visual': return <VisualCard><MissionVisualView visual={block.visual} /></VisualCard>;
        case 'text': return <RichText text={block.text} className='font-nunito text-ink-300 text-[15px] leading-6' />;
        case 'prompt': return <PromptCard title={block.title} text={block.text} reveal={block.reveal} accentColor={accentColor} />;
        case 'definition': return <DefinitionCard term={block.term} text={block.text} examples={block.examples} accentColor={accentColor} />;
        case 'note': return <NoteCard tone={block.tone} title={block.title} text={block.text} />;
        case 'rule':
            return (
                <View className='rounded-2xl p-4 gap-2 border-2' style={{ backgroundColor: accentColor + '12', borderColor: accentColor + '40' }}>
                    <View className='flex-row items-center gap-2'>
                        <Text className='text-xl'>🔍</Text>
                        <Text className='font-fredoka-bold text-base uppercase' style={{ color: accentColor }}>{block.title}</Text>
                    </View>
                    <Text className='font-nunito text-ink-600 text-sm leading-5'>{block.text}</Text>
                    <View className='flex-row flex-wrap items-center gap-1'>
                        <Text className='font-nunito-bold text-ink-600 text-xs'>You will:</Text>
                        {block.steps.map((s, i) => (
                            <Text key={s} className='font-nunito-extrabold text-xs uppercase' style={{ color: accentColor }}>{i > 0 ? '→ ' : ''}{s}</Text>
                        ))}
                    </View>
                </View>
            );
        case 'check': return <CheckBlock block={block} solved={solved} onSolved={onSolved} />;
        case 'tapSort': return <TapSortBlock block={block} solved={solved} onSolved={onSolved} />;
        case 'classify': return <ClassifyBlock block={block} solved={solved} onSolved={onSolved} />;
        case 'caseQuestions': return <CaseQuestionsBlock block={block} solved={solved} onSolved={onSolved} />;
        case 'fillBlanks': return <FillBlanksBlock block={block} solved={solved} onSolved={onSolved} />;
        case 'found': return <FoundCard title={block.title} text={block.text} />;
        case 'evidence': return <EvidenceCard terms={block.terms} />;
        case 'toolkit': return <ToolkitTable accentColor={accentColor} />;
        case 'complete': return <CompleteCard title={block.title} text={block.text} accentColor={accentColor} />;
        default: return null;
    }
}
