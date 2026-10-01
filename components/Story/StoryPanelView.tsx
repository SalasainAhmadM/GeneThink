import Cell from '@/components/art/Cell';
import ChromosomeCharacter from '@/components/art/ChromosomeCharacter';
import DnaCharacter from '@/components/art/DnaCharacter';
import GeneCharacter from '@/components/art/GeneCharacter';
import PunnetSquare from '@/components/art/PunnetSquare';
import Scientist from '@/components/art/Scientist';
import { STORY_CHARACTERS, StoryPanel } from '@/constants/stories';
import { cn } from '@/lib/utils';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import SpeechBubble from './SpeechBubble';

const FlowStep = ({ label, color }: { label: string; color: string; }) => (
    <View className='rounded-pill px-3.5 py-2' style={{ backgroundColor: color + '22' }}>
        <Text className='font-fredoka-bold text-sm' style={{ color }}>{label}</Text>
    </View>
);

const AlleleBadge = ({ letter, label, color }: { letter: string; label: string; color: string; }) => (
    <View className='items-center gap-1.5'>
        <View className='size-14 rounded-full items-center justify-center' style={{ backgroundColor: color }}>
            <Text className={cn('font-fredoka-bold text-white', letter.length > 1 ? 'text-base' : 'text-xl')}>{letter}</Text>
        </View>
        <Text className='font-nunito-bold text-ink-200 text-xs'>{label}</Text>
    </View>
);

const Chip = ({ text, color }: { text: string; color: string; }) => (
    <View className='size-10 rounded-full items-center justify-center' style={{ backgroundColor: color }}>
        <Text className='font-fredoka-bold text-white text-sm'>{text}</Text>
    </View>
);

// ── Two-gene helpers (seed color Y/y = purple, seed shape R/r = green — same as the comics) ──
const Y_COLOR = '#7B1FA2';
const R_COLOR = '#2E7D32';
const letterColor = (c: string) => ('Yy'.includes(c) ? Y_COLOR : 'Rr'.includes(c) ? R_COLOR : '#1565C0');

const Geno = ({ value, size = 14 }: { value: string; size?: number; }) => (
    <Text style={{ fontFamily: 'Fredoka-Bold', fontSize: size }}>
        {value.split('').map((c, i) => <Text key={i} style={{ color: letterColor(c) }}>{c}</Text>)}
    </Text>
);

// Combine two gametes into a genotype — dominant allele first, Y gene before R gene (YyRr, not yYrR)
const combine = (a: string, b: string) => {
    const pair = (x: string, y: string) => (x === x.toUpperCase() ? x + y : y + x);
    return a.length === 1 ? pair(a, b) : pair(a[0], b[0]) + pair(a[1], b[1]);
};

// Punnett grid — top/side headers, boxes filled row by row up to `fill`
const Grid = ({ top, side, fill, cell }: { top: string[]; side: string[]; fill: number; cell: number; }) => (
    <View>
        <View className='flex-row'>
            <View style={{ width: cell * 0.7 }} />
            {top.map((t, i) => (
                <View key={i} style={{ width: cell, alignItems: 'center', paddingBottom: 4 }}><Geno value={t} size={13} /></View>
            ))}
        </View>
        {side.map((sd, r) => (
            <View key={r} className='flex-row items-center'>
                <View style={{ width: cell * 0.7, alignItems: 'center' }}><Geno value={sd} size={13} /></View>
                {top.map((t, c) => {
                    const idx = r * top.length + c;
                    const filled = idx < fill;
                    const isNewest = idx === fill - 1 && fill < top.length * side.length;
                    return (
                        <View key={c} style={{ width: cell, height: cell * 0.75, borderWidth: 1, borderColor: '#cfd8dc', alignItems: 'center', justifyContent: 'center', backgroundColor: isNewest ? '#fff8e1' : filled ? '#f5f5f5' : '#fff' }}>
                            {filled && <Geno value={combine(sd, t)} size={top.length > 2 ? 11 : 15} />}
                        </View>
                    );
                })}
            </View>
        ))}
    </View>
);

const GAMETES_4 = ['YR', 'Yr', 'yR', 'yr'];

const SeedDot = ({ yellow, wrinkled, size = 34 }: { yellow: boolean; wrinkled: boolean; size?: number; }) => (
    <View style={{ width: size, height: size, borderRadius: wrinkled ? size * 0.3 : size / 2, backgroundColor: yellow ? '#FDD835' : '#7CB342', borderWidth: wrinkled ? 2 : 0, borderStyle: 'dashed', borderColor: '#5d4037' }} />
);

const MiniTable = ({ rows, widths }: { rows: string[][]; widths: number[]; }) => (
    <View className='rounded-xl overflow-hidden border border-[#e0e0e0]'>
        {rows.map((row, r) => (
            <View key={r} className='flex-row' style={{ backgroundColor: r === 0 ? '#eceff1' : r % 2 ? '#fff' : '#fafafa' }}>
                {row.map((cellText, c) => (
                    <Text key={c} style={{ width: widths[c], paddingVertical: 4, paddingHorizontal: 6, fontFamily: r === 0 ? 'Nunito-Bold' : 'Nunito-Regular', fontSize: 11, color: '#37474F' }}>{cellText}</Text>
                ))}
            </View>
        ))}
    </View>
);

// Illustration area — big, centered visual per panel.
const Illustration = ({ panel }: { panel: StoryPanel; }) => {
    const { illustration: type, genotype, fill } = panel;
    switch (type) {
        case 'cell': return <Cell />;
        case 'chromosome': return <ChromosomeCharacter />;
        case 'dna': return <DnaCharacter />;
        case 'gene': return <GeneCharacter />;
        case 'flow':
            return (
                <View className='flex-row items-center gap-1.5'>
                    <FlowStep label='Chromosome' color={STORY_CHARACTERS.chromosome.color} />
                    <Text className='text-ink-100'>→</Text>
                    <FlowStep label='DNA' color={STORY_CHARACTERS.dna.color} />
                    <Text className='text-ink-100'>→</Text>
                    <FlowStep label='Genes' color={STORY_CHARACTERS.gene.color} />
                </View>
            );
        case 'alleles':
            return (
                <View className='flex-row items-center gap-6'>
                    <AlleleBadge letter='B' label='Dominant' color='#4CAF50' />
                    <AlleleBadge letter='b' label='Recessive' color='#9e9e9e' />
                </View>
            );
        case 'summary':
            return (
                <View className='flex-row items-center'>
                    <ChromosomeCharacter size={60} />
                    <DnaCharacter size={60} />
                    <GeneCharacter size={60} />
                </View>
            );
        case 'mendel': return <Scientist />;
        case 'punnettGrid': return <PunnetSquare />;
        case 'segregation':
            return (
                <View className='flex-row items-center gap-3'>
                    <Chip text='Pp' color={STORY_CHARACTERS.mendel.color} />
                    <Text className='text-ink-100 text-lg'>→</Text>
                    <View className='gap-2'>
                        <Chip text='P' color='#4CAF50' />
                        <Chip text='p' color='#9e9e9e' />
                    </View>
                </View>
            );
        case 'assort':
            return (
                <View className='gap-3'>
                    <View className='flex-row items-center gap-2'>
                        <Chip text='Y' color='#4CAF50' />
                        <Chip text='y' color='#9e9e9e' />
                        <Text className='font-nunito text-ink-100 text-xs ml-2'>seed color</Text>
                    </View>
                    <View className='flex-row items-center gap-2'>
                        <Chip text='R' color='#1565C0' />
                        <Chip text='r' color='#9e9e9e' />
                        <Text className='font-nunito text-ink-100 text-xs ml-2'>seed shape</Text>
                    </View>
                </View>
            );
        case 'blend':
            return (
                <View className='flex-row items-center gap-3'>
                    <AlleleBadge letter='RR' label='Red' color='#F44336' />
                    <Text className='text-ink-100'>+</Text>
                    <AlleleBadge letter='WW' label='White' color='#BDBDBD' />
                    <Text className='text-ink-100'>=</Text>
                    <AlleleBadge letter='RW' label='Pink' color='#F48FB1' />
                </View>
            );
        case 'codominance':
            return (
                <View className='items-center gap-2'>
                    <View className='flex-row'>
                        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#F44336' }} />
                        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', borderWidth: 2, borderColor: '#e0e0e0', marginLeft: -14 }} />
                    </View>
                    <Text className='font-nunito-bold text-ink-200 text-xs'>Type AB — both fully expressed</Text>
                </View>
            );
        case 'polygenic': {
            const heights = [10, 18, 26, 34, 40, 34, 26, 18, 10];
            return (
                <View className='items-center gap-2'>
                    <View className='flex-row items-end gap-1.5'>
                        {heights.map((h, i) => (
                            <View key={i} style={{ width: 10, height: h, borderRadius: 5, backgroundColor: '#4CAF50' }} />
                        ))}
                    </View>
                    <Text className='font-nunito-bold text-ink-200 text-xs'>Many genes → a range of outcomes</Text>
                </View>
            );
        }
        case 'sexChromosomes':
            return (
                <View className='flex-row items-center gap-6'>
                    <AlleleBadge letter='XX' label='Female' color='#F48FB1' />
                    <AlleleBadge letter='XY' label='Male' color='#1565C0' />
                </View>
            );
        case 'testcross':
            return (
                <View className='flex-row items-center gap-3'>
                    <AlleleBadge letter='?' label='Unknown' color='#FF9800' />
                    <Text className='text-ink-100 text-lg'>×</Text>
                    <AlleleBadge letter='tt' label='Recessive' color='#9e9e9e' />
                </View>
            );
        case 'dihybridGrid':
            return (
                <View className='flex-row items-start gap-3'>
                    {[
                        { n: 9, label: 'Round\nYellow', key: 'Y_R_', yellow: true, wrinkled: false },
                        { n: 3, label: 'Wrinkled\nYellow', key: 'Y_rr', yellow: true, wrinkled: true },
                        { n: 3, label: 'Round\nGreen', key: 'yyR_', yellow: false, wrinkled: false },
                        { n: 1, label: 'Wrinkled\nGreen', key: 'yyrr', yellow: false, wrinkled: true },
                    ].map((g) => (
                        <View key={g.key} className='items-center gap-1'>
                            <SeedDot yellow={g.yellow} wrinkled={g.wrinkled} />
                            <Text className='font-fredoka-bold text-ink-300 text-lg'>{g.n}</Text>
                            <Geno value={g.key} size={12} />
                            <Text className='font-nunito text-ink-200 text-[10px] text-center'>{g.label}</Text>
                        </View>
                    ))}
                </View>
            );
        case 'foil':
            if (genotype?.length === 4) {
                const [a1, a2, b1, b2] = genotype.split('');
                const rows = [
                    { k: 'F', label: 'First', g: a1 + b1 },
                    { k: 'O', label: 'Outer', g: a1 + b2 },
                    { k: 'I', label: 'Inner', g: a2 + b1 },
                    { k: 'L', label: 'Last', g: a2 + b2 },
                ];
                return (
                    <View className='items-center gap-2'>
                        <Geno value={genotype} size={30} />
                        <View className='gap-1'>
                            {rows.map((row) => (
                                <View key={row.k} className='flex-row items-center gap-3'>
                                    <Text className='font-fredoka-bold text-[#1565C0] text-lg' style={{ width: 18 }}>{row.k}</Text>
                                    <Text className='font-nunito text-ink-200 text-xs' style={{ width: 40 }}>{row.label}</Text>
                                    <Text className='text-ink-100'>→</Text>
                                    <Geno value={row.g} size={18} />
                                </View>
                            ))}
                        </View>
                    </View>
                );
            }
            return (
                <View className='gap-1.5'>
                    <FlowStep label='F · First' color='#F44336' />
                    <FlowStep label='O · Outer' color='#FF9800' />
                    <FlowStep label='I · Inner' color='#4CAF50' />
                    <FlowStep label='L · Last' color='#1565C0' />
                </View>
            );
        case 'geneFlow':
            return (
                <View className='flex-row flex-wrap items-center justify-center gap-1.5'>
                    {[
                        { label: 'Chromosome', color: STORY_CHARACTERS.chromosome.color },
                        { label: 'DNA', color: STORY_CHARACTERS.dna.color },
                        { label: 'Genes', color: STORY_CHARACTERS.gene.color },
                        { label: 'Proteins', color: '#FF9800' },
                        { label: 'Traits', color: '#E91E63' },
                    ].map((step, i) => (
                        <View key={step.label} className='flex-row items-center gap-1.5'>
                            {i > 0 && <Text className='text-ink-100'>→</Text>}
                            <FlowStep label={step.label} color={step.color} />
                        </View>
                    ))}
                </View>
            );
        case 'traits':
            return (
                <View className='flex-row flex-wrap justify-center gap-2'>
                    {['Brown eyes', 'Curly hair', 'Dimples', 'Freckles'].map((t) => (
                        <FlowStep key={t} label={t} color='#8D6E63' />
                    ))}
                </View>
            );
        case 'zygosity':
            return (
                <View className='flex-row items-start gap-4'>
                    <AlleleBadge letter='AA' label='Homozygous' color='#4CAF50' />
                    <AlleleBadge letter='Aa' label='Heterozygous' color='#7B1FA2' />
                    <AlleleBadge letter='aa' label='Homozygous' color='#9e9e9e' />
                </View>
            );
        case 'peaTraits':
            return (
                <MiniTable
                    widths={[100, 95, 100]}
                    rows={[
                        ['Trait', 'Dominant', 'Recessive'],
                        ['Flower color', 'Purple (P)', 'White (p)'],
                        ['Seed shape', 'Round (R)', 'Wrinkled (r)'],
                        ['Seed color', 'Yellow (Y)', 'Green (y)'],
                        ['Pod shape', 'Inflated (I)', 'Constricted (i)'],
                        ['Pod color', 'Green (G)', 'Yellow (g)'],
                        ['Flower position', 'Axial (A)', 'Terminal (a)'],
                        ['Plant height', 'Tall (T)', 'Short (t)'],
                    ]}
                />
            );
        case 'generations':
            return (
                <View className='items-center gap-1.5'>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-nunito-bold text-ink-200 text-xs w-6'>P</Text>
                        <AlleleBadge letter='PP' label='Purple' color='#7B1FA2' />
                        <Text className='text-ink-100'>×</Text>
                        <AlleleBadge letter='pp' label='White' color='#BDBDBD' />
                    </View>
                    <Text className='text-ink-100'>↓</Text>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-nunito-bold text-ink-200 text-xs w-6'>F1</Text>
                        <AlleleBadge letter='Pp' label='All purple' color='#9C27B0' />
                    </View>
                    <Text className='font-nunito text-ink-100 text-xs'>↓ Pp × Pp</Text>
                    <View className='flex-row items-center gap-2'>
                        <Text className='font-nunito-bold text-ink-200 text-xs w-6'>F2</Text>
                        <AlleleBadge letter='3' label='Purple' color='#7B1FA2' />
                        <Text className='text-ink-100'>:</Text>
                        <AlleleBadge letter='1' label='White' color='#BDBDBD' />
                    </View>
                </View>
            );
        case 'seeds':
            return (
                <View className='flex-row flex-wrap justify-center gap-y-4' style={{ width: 240 }}>
                    {[
                        { label: 'Round Yellow', yellow: true, wrinkled: false },
                        { label: 'Round Green', yellow: false, wrinkled: false },
                        { label: 'Wrinkled Yellow', yellow: true, wrinkled: true },
                        { label: 'Wrinkled Green', yellow: false, wrinkled: true },
                    ].map((sd) => (
                        <View key={sd.label} className='items-center gap-1' style={{ width: 120 }}>
                            <SeedDot yellow={sd.yellow} wrinkled={sd.wrinkled} size={40} />
                            <Text className='font-nunito-bold text-ink-200 text-xs'>{sd.label}</Text>
                        </View>
                    ))}
                </View>
            );
        case 'meiosis':
            return (
                <View className='flex-row items-center gap-4'>
                    {[
                        { label: 'Orientation A', pairs: [['Y', 'R'], ['y', 'r']] },
                        { label: 'Orientation B', pairs: [['Y', 'r'], ['y', 'R']] },
                    ].map((o) => (
                        <View key={o.label} className='items-center gap-2 rounded-xl border-2 border-[#e0e0e0] px-3 py-2'>
                            <Text className='font-nunito-bold text-ink-200 text-xs'>{o.label}</Text>
                            {o.pairs.map((p) => (
                                <View key={p.join('')} className='flex-row gap-2'>
                                    <Chip text={p[0]} color={Y_COLOR} />
                                    <Chip text={p[1]} color={R_COLOR} />
                                </View>
                            ))}
                            <Text className='font-nunito text-ink-200 text-[10px]'>→ {o.pairs.map((p) => p.join('')).join(' + ')}</Text>
                        </View>
                    ))}
                </View>
            );
        case 'gametes4':
            return (
                <View className='flex-row gap-2'>
                    {GAMETES_4.map((g, i) => (
                        <View key={g} className='size-14 rounded-full items-center justify-center' style={{ backgroundColor: ['#FFF59D', '#FFCC80', '#C5E1A5', '#E1BEE7'][i] }}>
                            <Geno value={g} size={20} />
                        </View>
                    ))}
                </View>
            );
        case 'monoGrid':
            return <Grid top={['T', 't']} side={['T', 't']} fill={fill ?? 4} cell={64} />;
        case 'dihybridSquare':
            return <Grid top={GAMETES_4} side={GAMETES_4} fill={fill ?? 16} cell={58} />;
        case 'genotypeRatio':
            return (
                <MiniTable
                    widths={[70, 55, 115]}
                    rows={[
                        ['Genotype', 'Boxes', 'Phenotype'],
                        ['YYRR', '1', 'Round Yellow'],
                        ['YYRr', '2', 'Round Yellow'],
                        ['YYrr', '1', 'Wrinkled Yellow'],
                        ['YyRR', '2', 'Round Yellow'],
                        ['YyRr', '4', 'Round Yellow'],
                        ['Yyrr', '2', 'Wrinkled Yellow'],
                        ['yyRR', '1', 'Round Green'],
                        ['yyRr', '2', 'Round Green'],
                        ['yyrr', '1', 'Wrinkled Green'],
                    ]}
                />
            );
        case 'parentGametes':
            return (
                <View className='flex-row items-center gap-2'>
                    <View className='items-center gap-1'>
                        <View className='size-14 rounded-full items-center justify-center bg-[#BBDEFB]'><Geno value='YR' size={18} /></View>
                        <Text className='font-nunito text-ink-200 text-[10px]'>from Dad</Text>
                    </View>
                    <Text className='text-ink-100 text-lg'>+</Text>
                    <View className='items-center gap-1'>
                        <View className='size-14 rounded-full items-center justify-center bg-[#F8BBD0]'><Geno value='Yr' size={18} /></View>
                        <Text className='font-nunito text-ink-200 text-[10px]'>from Mom</Text>
                    </View>
                    <Text className='text-ink-100 text-lg'>=</Text>
                    <Geno value='YYRr' size={26} />
                </View>
            );
        default: return null;
    }
};

export default function StoryPanelView({ panel, index, accentColor }: { panel: StoryPanel; index: number; accentColor: string; }) {
    return (
        <ScrollView className='flex-1' contentContainerClassName='px-5 pt-2 pb-4' showsVerticalScrollIndicator={false}>
            {/* Panel header */}
            <View className='flex-row items-center gap-2.5 mb-5'>
                <View className='size-7 rounded-full items-center justify-center' style={{ backgroundColor: accentColor }}>
                    <Text className='font-fredoka-bold text-white text-xs'>{index + 1}</Text>
                </View>
                <Text className='font-fredoka-bold text-ink-300 text-lg flex-1'>{panel.title}</Text>
            </View>

            {/* Illustration */}
            <View className='items-center justify-center py-4'>
                <Illustration panel={panel} />
            </View>

            {/* Dialogue */}
            <View className='gap-3 mt-3'>
                {panel.lines.map((line, i) => (
                    <SpeechBubble key={i} speaker={line.speaker} text={line.text} />
                ))}
            </View>

            {/* Note callout — same styling as the hint box in MCQQuestion */}
            {panel.note && (
                <View className='bg-[#fffde7] rounded-xl px-4 py-3 border-2 border-medium mt-4'>
                    <Text className='font-nunito text-ink-600 text-sm leading-5'>💡 {panel.note}</Text>
                </View>
            )}

            {panel.references && (
                <View className='mt-4 gap-1'>
                    {panel.references.map((ref) => (
                        <Text key={ref} className='font-nunito text-ink-100 text-[10px] leading-4'>📚 {ref}</Text>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}
