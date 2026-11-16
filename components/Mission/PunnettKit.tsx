import { playSound } from '@/lib/sound';
import Button from '@/components/ui/Button';
import { combine, cross, gametes, genes, PEA_TRAITS, sameItems, sameRatio, simplify, TraitDef } from '@/lib/genetics';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { CARD_SHADOW, FoundCard, RichText } from './Cards';
import { Flower, Pod, Seed } from './MissionVisuals';
import { isPea, PhenoArt, phenoTone } from './PhenoArt';

// ── Colours (app palette) ─────────────────────────────────────
// Homozygous dominant → science blue, mixed → green, homozygous recessive → amber
export function genotypeColor(g: string): string {
    const lower = g.split('').filter((c) => c === c.toLowerCase()).length;
    if (lower === 0) return '#1565C0';
    if (lower === g.length) return '#E65100';
    return '#2E7D32';
}

// ── Pieces shared by every Punnett square ─────────────────────
// Gametes sit in round allele chips (like the textbook squares); each box shows the
// offspring's genotype plus its phenotype picture, tinted to match (see PhenoArt).

const AlleleBubble = ({ text, w, h, hl, ring }: { text: string | null; w: number; h: number; hl?: boolean; ring?: boolean; }) => {
    const d = Math.min(w, h) * 0.86;
    return (
        <View className='items-center justify-center' style={{ width: w, height: h }}>
            <View className='items-center justify-center rounded-full' style={{ width: d, height: d, backgroundColor: hl ? '#FFD93D' : '#F4EDFF', borderWidth: 2.5, borderColor: ring ? '#F44336' : '#7C5CFF', borderStyle: ring ? 'dashed' : 'solid' }}>
                <Text className='font-fredoka-bold' style={{ color: '#2A1066', fontSize: text && text.length > 1 ? d * 0.34 : d * 0.5 }}>{text ?? '?'}</Text>
            </View>
        </View>
    );
};

export function GenoBox({ value, size, small, highlight, dashed, empty, emptyBg }: { value: string | null; size: number; small?: boolean; highlight?: boolean; dashed?: boolean; empty?: string; emptyBg?: string; }) {
    const tone = value ? phenoTone(value) : null;
    const textColor = value ? tone?.text ?? genotypeColor(value) : '#bdbdbd';
    const art = value && isPea(value);
    return (
        <View className='items-center justify-center rounded-lg border-2' style={{
            width: size, height: size,
            backgroundColor: value ? tone?.bg ?? '#fff' : emptyBg ?? '#fafafa',
            borderColor: highlight ? '#FF9800' : value ? tone?.border ?? genotypeColor(value) + '55' : '#e0e0e0',
            borderStyle: dashed ? 'dashed' : 'solid',
        }}>
            {art && <PhenoArt genotype={value!} size={size * (small ? 0.42 : 0.5)} />}
            <Text className='font-fredoka-bold' style={{ fontSize: art ? (small ? 11 : 15) : small ? 13 : 20, lineHeight: art ? (small ? 13 : 18) : undefined, color: textColor }}>{value ?? empty ?? ''}</Text>
        </View>
    );
}

// ── Static Punnett square ─────────────────────────────────────
export function PunnettGrid({ top, left, cells, cellSize, ringCells, ringEdges, highlight, onCellPress, emptyLabel }: {
    top: (string | null)[]; left: (string | null)[]; cells: (string | null)[];
    cellSize?: number; ringCells?: boolean; ringEdges?: boolean; highlight?: number | null;
    onCellPress?: (i: number) => void; emptyLabel?: string;
}) {
    const n = top.length;
    const size = cellSize ?? (n > 2 ? 58 : 70);
    const edge = (txt: string | null, key: string, isTop: boolean) => {
        const hl = highlight != null && (isTop ? Number(key) === highlight % n : Number(key) === Math.floor(highlight / n));
        return <AlleleBubble key={key} text={txt} w={isTop ? size : size * 0.75} h={isTop ? size * 0.75 : size} hl={hl} ring={ringEdges} />;
    };
    return (
        <View className='items-center gap-1'>
            <View className='flex-row gap-1'>
                <View style={{ width: size * 0.75, height: size * 0.75 }} />
                {top.map((t, i) => edge(t, String(i), true))}
            </View>
            {left.map((l, r) => (
                <View key={r} className='flex-row gap-1'>
                    {edge(l, String(r), false)}
                    {top.map((_, c) => {
                        const i = r * n + c;
                        const box = <GenoBox value={cells[i]} size={size} small={n > 2} highlight={highlight === i} dashed={ringCells} empty={emptyLabel} />;
                        return onCellPress
                            ? <Pressable key={c} onPress={() => { playSound('tap'); onCellPress(i); }}>{box}</Pressable>
                            : <View key={c}>{box}</View>;
                    })}
                </View>
            ))}
        </View>
    );
}

export function PunnettCard({ p1, p2, caption, ringCells, ringEdges }: { p1: string; p2: string; caption?: string; ringCells?: boolean; ringEdges?: boolean; }) {
    const top = gametes(p1);
    const left = gametes(p2);
    const cells = left.flatMap((l) => top.map((t) => combine(t, l)));
    return (
        <View className='bg-white rounded-2xl px-3 py-4 items-center gap-3' style={CARD_SHADOW}>
            <Text className='font-fredoka-bold text-ink-200 text-sm tracking-wide'>{p1} × {p2}</Text>
            <PunnettGrid top={top} left={left} cells={cells} ringCells={ringCells} ringEdges={ringEdges} />
            {caption && <Text className='font-nunito text-ink-400 text-xs text-center leading-4'>{caption}</Text>}
        </View>
    );
}

// ── Tap-to-fill square: one box at a time, row by row ─────────
export function FillSquare({ p1, p2, prompt, solved, onSolved }: { p1: string; p2: string; prompt: string; solved: boolean; onSolved: () => void; }) {
    const top = gametes(p1);
    const left = gametes(p2);
    const answer = left.flatMap((l) => top.map((t) => combine(t, l)));
    const [filled, setFilled] = useState(solved ? answer.length : 0);
    const [miss, setMiss] = useState(false);
    const n = top.length;

    const tap = (i: number) => {
        if (filled >= answer.length) return;
        if (i !== filled) { playSound('wrong'); setMiss(true); return; }
        setMiss(false);
        const next = filled + 1;
        setFilled(next);
        if (next === answer.length) onSolved();
    };

    const done = filled >= answer.length;
    const r = Math.floor(filled / n), c = filled % n;

    return (
        <View className='bg-white rounded-2xl px-3 py-4 gap-3 items-center' style={CARD_SHADOW}>
            <RichText text={prompt} className='font-nunito-bold text-ink-300 text-sm text-center leading-5' />
            <PunnettGrid top={top} left={left} cells={answer.map((v, i) => (i < filled ? v : null))} highlight={done ? null : filled} onCellPress={tap} emptyLabel={n > 2 ? '' : '?'} />
            {!done ? (
                <View className='rounded-xl px-3 py-2 bg-[#fffde7] border border-medium'>
                    <Text className='font-nunito-bold text-ink-600 text-xs text-center'>
                        Box {filled + 1} of {answer.length}: combine top <Text className='text-science-300'>{top[c]}</Text> and side <Text className='text-science-300'>{left[r]}</Text> → tap the glowing box
                    </Text>
                </View>
            ) : (
                <Text className='font-nunito-bold text-primary-400 text-xs'>✓ All {answer.length} boxes complete!</Text>
            )}
            {miss && !done && <Text className='font-nunito-bold text-danger text-xs'>Fill the boxes in order — row by row.</Text>}
        </View>
    );
}

// ── FOIL gamete table ─────────────────────────────────────────
export function FoilTable({ genotype }: { genotype: string; }) {
    const [a, b] = genes(genotype);
    const rows = [
        { k: 'F', d: 'First — the first letters of each trait', pick: [0, 2] },
        { k: 'O', d: 'Outer — the outside letters', pick: [0, 3] },
        { k: 'I', d: 'Inner — the inside letters', pick: [1, 2] },
        { k: 'L', d: 'Last — the last letters of each trait', pick: [1, 3] },
    ];
    const letters = (a + b).split('');
    return (
        <View className='bg-white rounded-2xl overflow-hidden' style={CARD_SHADOW}>
            {rows.map((row, i) => (
                <View key={row.k} className={cn('flex-row items-center gap-3 px-3 py-2.5', i > 0 && 'border-t border-[#f0f0f0]')}>
                    <Text className='font-fredoka-bold text-science-300 text-2xl w-6 text-center'>{row.k}</Text>
                    <Text className='font-nunito text-ink-400 text-xs flex-1 leading-4'>{row.d}</Text>
                    <Text className='font-fredoka-bold text-base tracking-widest'>
                        {letters.map((ch, j) => (
                            <Text key={j} style={{ color: row.pick.includes(j) ? '#1565C0' : '#bdbdbd', textDecorationLine: row.pick.includes(j) ? 'underline' : 'none' }}>{ch}</Text>
                        ))}
                    </Text>
                    <Text className='text-ink-100'>→</Text>
                    <View className='rounded-pill px-3 py-1 bg-[#fff8e1] border-2 border-gold min-w-[46px] items-center'>
                        <Text className='font-fredoka-bold text-ink-300 text-sm'>{letters[row.pick[0]] + letters[row.pick[1]]}</Text>
                    </View>
                </View>
            ))}
            <View className='px-3 py-2 bg-primary-50 border-t border-[#e0f2e0]'>
                <Text className='font-nunito-bold text-primary-500 text-xs text-center'>Gametes from {genotype}: {gametes(genotype).join(', ')}</Text>
            </View>
        </View>
    );
}

// ── Picker slot (opens a small option sheet) ──────────────────
function Slot({ value, options, onChange, width = 50, state = 'idle', placeholder = '?' }: {
    value: string | null; options: string[]; onChange: (v: string) => void; width?: number; state?: 'idle' | 'ok' | 'bad'; placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const border = state === 'ok' ? '#4CAF50' : state === 'bad' ? '#F44336' : value ? '#1565C0' : '#bdbdbd';
    return (
        <>
            <Pressable onPress={() => { playSound('tap'); setOpen(true); }}>
                <View className='rounded-lg items-center justify-center flex-row gap-0.5' style={{ width, height: 36, borderWidth: 2, borderColor: border, backgroundColor: value ? '#fff' : '#f5f5f5', borderStyle: value ? 'solid' : 'dashed' }}>
                    <Text className='font-fredoka-bold text-sm' style={{ color: value ? '#0d47a1' : '#9e9e9e' }}>{value ?? placeholder}</Text>
                    <Text className='text-ink-100 text-[9px]'>▾</Text>
                </View>
            </Pressable>
            <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
                <Pressable className='flex-1 bg-black/40 items-center justify-center px-8' onPress={() => setOpen(false)}>
                    <View className='bg-white rounded-2xl p-4 w-full gap-3'>
                        <Text className='font-fredoka-bold text-ink-300 text-base text-center'>Choose one</Text>
                        <View className='flex-row flex-wrap justify-center gap-2'>
                            {options.map((o) => (
                                <Pressable key={o} onPress={() => { playSound('tap'); onChange(o); setOpen(false); }}>
                                    <View className={cn('rounded-xl px-4 py-2.5 border-2', o === value ? 'bg-science-100 border-science-300' : 'bg-white border-[#e8e8e8]')}>
                                        <Text className='font-fredoka-bold text-ink-300 text-base'>{o}</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const StepHead = ({ n, text }: { n: number; text: string; }) => (
    <View className='flex-row items-center gap-2'>
        <View className='rounded-pill px-3 py-1 bg-science-300'>
            <Text className='font-fredoka-bold text-white text-xs'>Step {n}</Text>
        </View>
        <Text className='font-nunito-bold text-ink-300 text-sm flex-1'>{text}</Text>
    </View>
);

const Mark = ({ ok }: { ok: boolean | null; }) => ok === null ? null : (
    <Text className={cn('font-nunito-bold text-xs', ok ? 'text-primary-400' : 'text-danger')}>{ok ? '✓ Correct' : '✗ Check this part again'}</Text>
);

// ── Interactive Punnett builder (monohybrid 2×2 or dihybrid 4×4) ──
export function PunnettBuilder({ problem, p1, p2, traits, onSolved }: { problem?: string; p1: string; p2: string; traits: TraitDef[]; onSolved?: () => void; }) {
    const res = useMemo(() => cross(p1, p2, traits), [p1, p2, traits]);
    // one pure-breeding genotype per phenotype class (same order as res.phenoClasses), for the pictures
    const phenoReps = useMemo(() => traits.reduce<string[]>((acc, t) => acc.flatMap((a) => [a + t.letter + t.letter, a + t.letter.toLowerCase().repeat(2)]), ['']), [traits]);
    const n = res.top.length;
    const di = traits.length > 1;

    // Gamete options: every one-allele-per-gene combination, plus a few tempting wrong ones
    const gameteOptions = useMemo(() => {
        if (!di) {
            const L = traits[0].letter;
            return [L, L.toLowerCase(), L + L, L + L.toLowerCase(), L.toLowerCase() + L.toLowerCase()];
        }
        const [A, B] = traits.map((t) => t.letter);
        const a = A.toLowerCase(), b = B.toLowerCase();
        return [A + B, A + b, a + B, a + b, A + a, B + b];
    }, [traits, di]);

    const empty = () => Array<string | null>(n).fill(null);
    const [g1, setG1] = useState<(string | null)[]>(empty);
    const [g2, setG2] = useState<(string | null)[]>(empty);
    const [top, setTop] = useState<(string | null)[]>(empty);
    const [left, setLeft] = useState<(string | null)[]>(empty);
    const [cells, setCells] = useState<(string | null)[]>(() => Array(n * n).fill(null));
    const [geno, setGeno] = useState<(number | null)[]>(() => res.genoClasses.map(() => null));
    const [pheno, setPheno] = useState<(number | null)[]>(() => res.phenoClasses.map(() => null));
    const [checked, setChecked] = useState<null | { g: boolean; sq: boolean; geno: boolean; pheno: boolean; }>(null);
    const [solved, setSolved] = useState(false);

    const set = <T,>(arr: T[], setter: (v: T[]) => void, i: number, v: T) => { const c = [...arr]; c[i] = v; setter(c); setChecked(null); };

    const edgesReady = top.every(Boolean) && left.every(Boolean);
    const tapCell = (i: number) => {
        if (!edgesReady || solved) return;
        const r = Math.floor(i / n), c = i % n;
        set(cells, setCells, i, combine(top[c]!, left[r]!));
    };

    const check = () => {
        const g = sameItems(g1 as string[], res.top) && sameItems(g2 as string[], res.left) && g1.every(Boolean) && g2.every(Boolean);
        const edgesOk = (sameItems(top as string[], res.top) && sameItems(left as string[], res.left)) || (sameItems(top as string[], res.left) && sameItems(left as string[], res.top));
        const sq = edgesReady && edgesOk && cells.every(Boolean);
        const gOk = sameRatio(geno.map((x) => x ?? 0), res.genoCounts);
        const pOk = sameRatio(pheno.map((x) => x ?? 0), res.phenoCounts);
        setChecked({ g, sq, geno: gOk, pheno: pOk });
        if (g && sq && gOk && pOk) { setSolved(true); onSolved?.(); }
        else playSound('wrong');
    };

    const showAnswer = () => {
        setG1(res.top); setG2(res.left); setTop(res.top); setLeft(res.left); setCells(res.cells);
        setGeno(simplify(res.genoCounts)); setPheno(simplify(res.phenoCounts));
        setChecked({ g: true, sq: true, geno: true, pheno: true });
        setSolved(true); onSolved?.();
    };

    const numOpts = Array.from({ length: n * n + 1 }, (_, i) => String(i));
    const st = (ok: boolean | undefined) => (checked ? (ok ? 'ok' : 'bad') : 'idle') as 'ok' | 'bad' | 'idle';

    return (
        <View className='gap-4'>
            {problem && (
                <View className='rounded-2xl p-4 border-2 border-science-200 bg-science-100 gap-1'>
                    <Text className='font-nunito-extrabold text-science-300 text-xs uppercase tracking-wide'>Word problem</Text>
                    <Text className='font-nunito text-ink-300 text-sm leading-5'>{problem}</Text>
                </View>
            )}

            {/* Step 1 — gametes */}
            <View className='bg-white rounded-2xl p-4 gap-3' style={CARD_SHADOW}>
                <StepHead n={1} text={di ? 'Select the gametes of each parent (use the FOIL method).' : 'Select the gametes of each parent.'} />
                {[{ label: `Parent 1 (${p1})`, v: g1, s: setG1 }, { label: `Parent 2 (${p2})`, v: g2, s: setG2 }].map((p) => (
                    <View key={p.label} className='flex-row items-center gap-2 flex-wrap'>
                        <Text className='font-nunito-bold text-ink-400 text-xs' style={{ width: di ? 74 : 92 }}>{p.label}</Text>
                        {p.v.map((x, i) => <Slot key={i} value={x} options={gameteOptions} onChange={(v) => set(p.v, p.s, i, v)} width={di ? 46 : 50} state={st(checked?.g)} />)}
                    </View>
                ))}
                <Mark ok={checked ? checked.g : null} />
            </View>

            {/* Step 2 — square */}
            <View className='bg-white rounded-2xl p-4 gap-3 items-center' style={CARD_SHADOW}>
                <StepHead n={2} text={`Build the Punnett square (${n} × ${n}). Put parent 1's gametes on top and parent 2's on the side, then tap each box.`} />
                <View className='flex-row gap-1' style={{ marginLeft: (n > 2 ? 44 : 53) + 4 }}>
                    {top.map((x, i) => <Slot key={i} value={x} options={gameteOptions} onChange={(v) => set(top, setTop, i, v)} width={n > 2 ? 58 : 70} state={st(checked?.sq)} />)}
                </View>
                <View className='flex-row gap-1'>
                    <View className='gap-1'>
                        {left.map((x, i) => (
                            <View key={i} style={{ height: n > 2 ? 58 : 70, justifyContent: 'center' }}>
                                <Slot value={x} options={gameteOptions} onChange={(v) => set(left, setLeft, i, v)} width={n > 2 ? 44 : 53} state={st(checked?.sq)} />
                            </View>
                        ))}
                    </View>
                    <PunnettGridCells n={n} cells={cells} onPress={tapCell} enabled={edgesReady} />
                </View>
                {!edgesReady && <Text className='font-nunito text-ink-100 text-xs'>Choose all the gametes outside the square first.</Text>}
                <Mark ok={checked ? checked.sq : null} />
            </View>

            {/* Step 3 — ratios */}
            <View className='bg-white rounded-2xl p-4 gap-3' style={CARD_SHADOW}>
                <StepHead n={3} text='Determine the ratios (count the boxes, or use the simplest ratio).' />
                <Text className='font-nunito-extrabold text-ink-200 text-xs uppercase'>Genotypic ratio</Text>
                <View className='flex-row flex-wrap gap-2'>
                    {res.genoClasses.map((gc, i) => (
                        <View key={gc} className='items-center gap-0.5'>
                            <Slot value={geno[i] == null ? null : String(geno[i])} options={numOpts} onChange={(v) => set(geno, setGeno, i, Number(v))} width={46} state={st(checked?.geno)} />
                            <Text className='font-fredoka-bold text-[10px]' style={{ color: phenoTone(gc)?.text ?? genotypeColor(gc) }}>{gc}</Text>
                        </View>
                    ))}
                </View>
                <Mark ok={checked ? checked.geno : null} />
                <Text className='font-nunito-extrabold text-ink-200 text-xs uppercase mt-1'>Phenotypic ratio</Text>
                <View className='flex-row flex-wrap gap-2'>
                    {res.phenoClasses.map((pc, i) => (
                        <View key={pc} className='items-center gap-0.5' style={{ width: di ? 74 : 90 }}>
                            {isPea(phenoReps[i]) && <PhenoArt genotype={phenoReps[i]} size={di ? 26 : 30} />}
                            <Slot value={pheno[i] == null ? null : String(pheno[i])} options={numOpts} onChange={(v) => set(pheno, setPheno, i, Number(v))} width={46} state={st(checked?.pheno)} />
                            <Text className='font-nunito-bold text-ink-400 text-[10px] text-center'>{pc}</Text>
                        </View>
                    ))}
                </View>
                <Mark ok={checked ? checked.pheno : null} />
            </View>

            {solved ? (
                <FoundCard title='Correct!' text={`Genotypic ratio: **${res.genoClasses.map((g, i) => [g, simplify(res.genoCounts)[i]] as const).filter(([, c]) => c).map(([g, c]) => `${c} ${g}`).join(' : ')}**\nPhenotypic ratio: **${res.phenoClasses.map((p, i) => [p, simplify(res.phenoCounts)[i]] as const).filter(([, c]) => c).map(([p, c]) => `${c} ${p}`).join(' : ')}**`} />
            ) : (
                <View className='gap-2'>
                    <Button label='✓  Check Answer' btnType='secondary' size='lg' width='full' fredokaBold onPress={check} />
                    {checked && <Button label='Show me the answer' btnType='ghost' size='md' width='full' onPress={showAnswer} />}
                </View>
            )}
        </View>
    );
}

function PunnettGridCells({ n, cells, onPress, enabled }: { n: number; cells: (string | null)[]; onPress: (i: number) => void; enabled: boolean; }) {
    const size = n > 2 ? 58 : 70;
    return (
        <View className='gap-1'>
            {Array.from({ length: n }).map((_, r) => (
                <View key={r} className='flex-row gap-1'>
                    {Array.from({ length: n }).map((__, c) => {
                        const i = r * n + c, v = cells[i];
                        return (
                            <Pressable key={c} onPress={() => { playSound('tap'); onPress(i); }}>
                                <GenoBox value={v} size={size} small={n > 2} empty={enabled ? 'tap' : ''} emptyBg={enabled ? '#fffde7' : '#fafafa'} />
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

// ── Punnett Square Lab: choose a trait → 4 practice crosses ───
const LAB_TRAITS: { key: keyof typeof PEA_TRAITS; art: React.ReactNode; tint: string; }[] = [
    { key: 'seedColor', art: <View className='flex-row'><Seed color='#FDD835' size={34} /><Seed color='#7CB342' size={34} /></View>, tint: '#fff8e1' },
    { key: 'seedShape', art: <View className='flex-row'><Seed color='#FDD835' size={34} /><Seed color='#FDD835' wrinkled size={34} /></View>, tint: '#e3f2fd' },
    { key: 'flowerColor', art: <View className='flex-row'><Flower color='#8E24AA' size={34} /><Flower color='#fafafa' size={34} /></View>, tint: '#f3e5f5' },
    { key: 'podColor', art: <View className='flex-row gap-1'><Pod color='#66BB6A' size={38} /><Pod color='#FDD835' size={38} /></View>, tint: '#e8f5e9' },
];

export function PunnettLab({ onSolved }: { onSolved: () => void; }) {
    const [traitKey, setTraitKey] = useState<keyof typeof PEA_TRAITS | null>(null);
    const [practice, setPractice] = useState(0);
    const [done, setDone] = useState<Record<string, true>>({});

    if (!traitKey) {
        return (
            <View className='gap-3'>
                <Text className='font-nunito-bold text-ink-300 text-base'>Choose a trait of the pea plant to investigate:</Text>
                {LAB_TRAITS.map(({ key, art, tint }) => {
                    const t = PEA_TRAITS[key];
                    return (
                        <Button key={key} btnType='container' className='rounded-2xl' onPress={() => { setTraitKey(key); setPractice(0); }}>
                            <View className='flex-row items-center gap-3 rounded-2xl p-3 border-2 border-[#e8e8e8]' style={{ backgroundColor: tint }}>
                                <View className='w-[76px] items-center'>{art}</View>
                                <View className='flex-1 gap-1'>
                                    <Text className='font-fredoka-bold text-ink-300 text-lg'>{t.trait}</Text>
                                    <Text className='font-nunito-bold text-ink-400 text-xs'>{t.dominant} ({t.letter}) – dominant</Text>
                                    <Text className='font-nunito-bold text-ink-400 text-xs'>{t.recessive} ({t.letter.toLowerCase()}) – recessive</Text>
                                </View>
                                <Text className='font-fredoka-bold text-science-300 text-xl'>›</Text>
                            </View>
                        </Button>
                    );
                })}
            </View>
        );
    }

    const t = PEA_TRAITS[traitKey];
    const A = t.letter, a = A.toLowerCase();
    const crosses: [string, string][] = [[A + a, A + a], [A + A, a + a], [A + a, a + a], [a + a, a + a]];
    const [p1, p2] = crosses[practice];
    const id = `${traitKey}-${practice}`;

    return (
        <View className='gap-4'>
            <View className='flex-row items-center justify-between'>
                <Button label='‹ Traits' btnType='ghost' size='sm' onPress={() => setTraitKey(null)} />
                <Text className='font-fredoka-bold text-ink-300 text-base'>{t.trait}</Text>
            </View>
            <View className='flex-row gap-2'>
                {crosses.map(([x, y], i) => (
                    <Button key={i} btnType='container' className='flex-1 rounded-xl' onPress={() => setPractice(i)}>
                        <View className={cn('rounded-xl py-2 items-center border-2', i === practice ? 'bg-science-100 border-science-300' : 'bg-white border-[#e8e8e8]')}>
                            <Text className='font-nunito-extrabold text-ink-200 text-[10px]'>Practice {i + 1}{done[`${traitKey}-${i}`] ? ' ✓' : ''}</Text>
                            <Text className='font-fredoka-bold text-ink-300 text-xs'>{x} × {y}</Text>
                        </View>
                    </Button>
                ))}
            </View>
            <PunnettBuilder key={id} p1={p1} p2={p2} traits={[t]}
                problem={`Trait: ${t.trait}. ${A} – ${t.dominant} (dominant), ${a} – ${t.recessive} (recessive). Cross: ${p1} × ${p2}.`}
                onSolved={() => { setDone((d) => ({ ...d, [id]: true })); onSolved(); }} />
        </View>
    );
}
