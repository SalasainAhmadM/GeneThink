import Cell from '@/components/art/Cell';
import ChromosomeCharacter from '@/components/art/ChromosomeCharacter';
import DnaCharacter from '@/components/art/DnaCharacter';
import GeneCharacter from '@/components/art/GeneCharacter';
import { Ball, FlowerHead, Icon, INK, InkLine, Leaf, P, Shaded, shadeOf, SW, WrinkledPea } from '@/components/art/kit';
import { Portrait, PortraitLook } from '@/components/art/People';
import { MissionVisual } from '@/constants/missions';
import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Path } from 'react-native-svg';

const Arrow = () => <Text className='text-ink-100 text-base'>→</Text>;

// Near-white fills get a lavender shadow instead of grey
const shadowFor = (color: string) => (parseInt(color.replace('#', '').slice(0, 2), 16) > 0xEE ? P.paperDark : shadeOf(color));

// Five-petal flower (shared art-kit style)
export const Flower = ({ color, size = 56 }: { color: string; size?: number; }) => (
    <Icon size={size}>
        <FlowerHead cx={50} cy={50} r={27} base={color} shade={shadowFor(color)} />
    </Icon>
);

// Pea seed — round and shiny, or wrinkled
export const Seed = ({ color, wrinkled = false, size = 44 }: { color: string; wrinkled?: boolean; size?: number; }) => (
    <Icon size={size}>
        {wrinkled
            ? <WrinkledPea cx={50} cy={50} r={36} base={color} shade={shadeOf(color)} />
            : <Ball cx={50} cy={50} r={40} base={color} shade={shadeOf(color)} />}
    </Icon>
);

// Pea pod — inflated (smooth) or constricted (pinched between peas)
export const Pod = ({ color, constricted = false, size = 56 }: { color: string; constricted?: boolean; size?: number; }) => (
    <Icon width={size} height={size * 0.6} viewBox='0 0 100 60'>
        <InkLine d='M8 30L3 20' color={P.greenDark} width={3} />
        {constricted
            ? <Shaded d='M8 32C14 18 22 18 28 26C34 16 44 16 50 24C56 14 66 14 72 24C78 16 88 18 94 30C86 44 76 46 70 38C64 46 54 46 48 38C42 46 32 46 26 38C20 44 12 42 8 32Z' base={color} shade={shadeOf(color)} nudge={2.5} />
            : <Shaded d='M8 32C22 8 72 6 94 24C84 48 30 54 8 32Z' base={color} shade={shadeOf(color)} nudge={2.5} />}
        <Path d={constricted ? 'M16 31C30 28 70 26 86 29' : 'M18 30C38 22 66 20 84 25'} stroke={shadeOf(color, 0.35)} strokeWidth={2.2} fill='none' />
        <Path d={constricted ? 'M17 26c3-3 6-3 8-1' : 'M20 24C32 16 48 13 60 14'} stroke='#fff' strokeWidth={3} fill='none' opacity={0.8} />
    </Icon>
);

// Pea plant: tall or short, flowers along the stem (axial) or at the top (terminal)
export const Plant = ({ tall = true, flower, terminal = false, size = 60 }: { tall?: boolean; flower?: string; terminal?: boolean; size?: number; }) => {
    const top = tall ? 12 : 50;
    const leaves = tall ? [30, 50, 70] : [64, 80];
    return (
        <Icon width={size * 0.7} height={size} viewBox='0 0 70 100'>
            <InkLine d={`M35 97V${top}`} color={P.green} width={3.5} />
            {leaves.map((y, i) => <Leaf key={y} x={35} y={y} len={20} angle={i % 2 ? 200 : -20} />)}
            {flower && !terminal && leaves.map((y, i) => (
                <FlowerHead key={`f${y}`} cx={i % 2 ? 50 : 20} cy={y - 7} r={5.5} base={flower} shade={shadowFor(flower)} />
            ))}
            {flower && terminal && <FlowerHead cx={35} cy={top} r={9} base={flower} shade={shadowFor(flower)} />}
            {!flower && <Ball cx={35} cy={top} r={5} base={P.greenLight} shade={P.green} shine={false} />}
            <Path d='M20 97H50' stroke={INK} strokeWidth={SW} />
        </Icon>
    );
};

// Labelled tile with an icon on top
const Tile = ({ children, label, sub, width = 92 }: { children: React.ReactNode; label: string; sub?: string; width?: number; }) => (
    <View className='items-center gap-1' style={{ width }}>
        <View className='rounded-2xl bg-[#f7f3ff] border border-[#e6dcfa] items-center justify-center' style={{ width: width - 8, height: width - 16 }}>
            {children}
        </View>
        <Text className='font-nunito-bold text-ink-300 text-xs text-center'>{label}</Text>
        {sub && <Text className='font-nunito text-ink-200 text-[10px] text-center'>{sub}</Text>}
    </View>
);

const Person = ({ look, name, sub }: { look: PortraitLook; name: string; sub: string; }) => (
    <View className='items-center gap-1' style={{ width: 84 }}>
        <View className='size-16 rounded-full bg-[#fff3e0] border-2 border-amber items-center justify-center overflow-hidden'>
            <Portrait look={look} size={62} />
        </View>
        <Text className='font-fredoka-bold text-ink-300 text-sm'>{name}</Text>
        <Text className='font-nunito text-ink-200 text-[11px]'>{sub}</Text>
    </View>
);

export const AlleleChip = ({ text, color, size = 52 }: { text: string; color: string; size?: number; }) => (
    <View className='rounded-full items-center justify-center' style={{ width: size, height: size, backgroundColor: color }}>
        <Text className='font-fredoka-bold text-white' style={{ fontSize: size * 0.38 }}>{text}</Text>
    </View>
);

const GenoTile = ({ text, color }: { text: string; color: string; }) => (
    <View className='rounded-xl px-4 py-3 border-2 bg-white' style={{ borderColor: color }}>
        <Text className='font-fredoka-bold text-2xl' style={{ color }}>{text}</Text>
    </View>
);

export default function MissionVisualView({ visual }: { visual: MissionVisual; }) {
    switch (visual) {
        case 'family':
            return (
                <View className='flex-row items-start justify-center'>
                    <Person look='lola' name='Lola Lita' sub='curly hair' />
                    <Person look='pilar' name='Pilar' sub='straight hair' />
                    <Person look='ana' name='Ana' sub='curly hair' />
                </View>
            );
        case 'traitGallery':
            return (
                <View className='flex-row flex-wrap justify-center gap-2'>
                    <Tile label='Curly hair'><Portrait look='curly' size={64} /></Tile>
                    <Tile label='Straight hair'><Portrait look='straight' size={64} /></Tile>
                    <Tile label='Purple flower'><Flower color='#9C27B0' /></Tile>
                    <Tile label='White flower'><Flower color='#fafafa' /></Tile>
                    <Tile label='Seed shape'>
                        <View className='flex-row gap-1'><Seed color='#7CB342' size={34} /><Seed color='#7CB342' wrinkled size={34} /></View>
                    </Tile>
                </View>
            );
        case 'heredityLine':
            return (
                <View className='flex-row items-center justify-center'>
                    <Person look='lola' name='Lola Lita' sub='curly' />
                    <Arrow />
                    <Person look='pilar' name='Pilar' sub='straight' />
                    <Arrow />
                    <Person look='ana' name='Ana' sub='curly' />
                </View>
            );
        case 'cellToGene':
            return (
                <View className='flex-row flex-wrap items-center justify-center gap-1'>
                    {[
                        { label: 'Cell', art: <Cell size={46} /> },
                        { label: 'Nucleus', art: <View className='size-10 rounded-full bg-[#e6dcf7] border-2 border-[#7C4DFF]' /> },
                        { label: 'Chromosome', art: <ChromosomeCharacter size={46} /> },
                        { label: 'DNA', art: <DnaCharacter size={46} /> },
                        { label: 'Gene', art: <GeneCharacter size={46} /> },
                    ].map((s, i) => (
                        <View key={s.label} className='flex-row items-center gap-1'>
                            {i > 0 && <Arrow />}
                            <View className='items-center' style={{ width: 54 }}>
                                <View style={{ height: 48, justifyContent: 'center' }}>{s.art}</View>
                                <Text className='font-nunito-bold text-ink-200 text-[10px]'>{s.label}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            );
        case 'seedAlleles':
            return (
                <View className='items-center gap-3'>
                    <Text className='font-fredoka-bold text-ink-300 text-base uppercase'>Gene: seed color</Text>
                    <View className='flex-row gap-6'>
                        <Tile label='Y' sub='yellow' width={104}><Seed color='#FDD835' size={56} /></Tile>
                        <Tile label='y' sub='green' width={104}><Seed color='#7CB342' size={56} /></Tile>
                    </View>
                </View>
            );
        case 'genotypeTiles':
            return (
                <View className='flex-row gap-3'>
                    <GenoTile text='AA' color='#1565C0' />
                    <GenoTile text='Aa' color='#7C4DFF' />
                    <GenoTile text='aa' color='#00ACC1' />
                </View>
            );
        case 'flowerPhenotype':
            return (
                <View className='flex-row items-center gap-4'>
                    <View className='items-center'>
                        <Flower color='#9C27B0' size={80} />
                        <Text className='font-nunito-bold text-ink-200 text-xs mt-1'>Genotype: <Text className='font-fredoka-bold text-science-300 text-base'>Pp</Text></Text>
                    </View>
                    <Arrow />
                    <View>
                        <Text className='font-nunito text-ink-200 text-xs'>Observed characteristic:</Text>
                        <Text className='font-fredoka-bold text-[#9C27B0] text-lg'>Purple flowers</Text>
                    </View>
                </View>
            );
        case 'domRec':
            return (
                <View className='flex-row items-end gap-4'>
                    <View className='items-center gap-1'><AlleleChip text='A' color='#FFB300' size={64} /><Text className='font-nunito-bold text-ink-200 text-xs'>dominant</Text></View>
                    <View className='items-center gap-1'><AlleleChip text='a' color='#1565C0' size={48} /><Text className='font-nunito-bold text-ink-200 text-xs'>recessive</Text></View>
                    <View className='items-center gap-1'><AlleleChip text='a' color='#1565C0' size={48} /><Text className='font-nunito-bold text-ink-200 text-xs'>recessive</Text></View>
                </View>
            );
        case 'zygosityChips':
            return (
                <View className='gap-4 w-full'>
                    <View className='flex-row justify-center gap-2'>
                        {['AA', 'Aa', 'aa', 'BB', 'Bb'].map((g) => <AlleleChip key={g} text={g} color={g[0] === g[1] ? '#1565C0' : '#2E7D32'} size={48} />)}
                    </View>
                    <View className='flex-row gap-3'>
                        <View className='flex-1 rounded-xl p-3 bg-science-100 items-center'>
                            <Text className='font-fredoka-bold text-science-300 text-sm uppercase'>Homozygous</Text>
                            <Text className='font-nunito text-ink-200 text-xs text-center'>Two identical alleles{'\n'}(AA or aa)</Text>
                        </View>
                        <View className='flex-1 rounded-xl p-3 bg-primary-100 items-center'>
                            <Text className='font-fredoka-bold text-primary-400 text-sm uppercase'>Heterozygous</Text>
                            <Text className='font-nunito text-ink-200 text-xs text-center'>Two different alleles{'\n'}(Aa or Bb)</Text>
                        </View>
                    </View>
                </View>
            );
        case 'flowerCase':
            return (
                <View className='flex-row items-center gap-5'>
                    <Flower color='#9C27B0' size={86} />
                    <View className='gap-1.5'>
                        <View className='flex-row items-center gap-2'><AlleleChip text='P' color='#9C27B0' size={30} /><Text className='font-nunito-bold text-ink-300 text-sm'>= purple</Text></View>
                        <View className='flex-row items-center gap-2'><AlleleChip text='p' color='#BDBDBD' size={30} /><Text className='font-nunito-bold text-ink-300 text-sm'>= white</Text></View>
                    </View>
                </View>
            );
        case 'seedCase':
            return (
                <View className='flex-row items-center gap-5'>
                    <Seed color='#5C6BC0' size={70} />
                    <View className='gap-1'>
                        <Text className='font-nunito text-ink-200 text-xs'>Genotype</Text>
                        <Text className='font-fredoka-bold text-science-300 text-3xl'>Bb</Text>
                    </View>
                </View>
            );
        // ── GeneQuest visuals ──
        case 'peaTraits':
            return (
                <View className='w-full'>
                    <View className='flex-row px-1 pb-1.5 border-b border-[#e8e8e8]'>
                        <Text className='font-nunito-extrabold text-ink-200 text-[11px] flex-1'>Trait</Text>
                        <Text className='font-nunito-extrabold text-science-300 text-[11px] w-[86px] text-center'>Dominant</Text>
                        <Text className='font-nunito-extrabold text-amber text-[11px] w-[86px] text-center'>Recessive</Text>
                    </View>
                    {PEA_ROWS.map((r, i) => (
                        <View key={r.trait} className={cn('flex-row items-center px-1 py-1.5', i % 2 ? 'bg-[#f5f9f5]' : '')}>
                            <Text className='font-nunito-bold text-ink-300 text-xs flex-1'>{i + 1}. {r.trait}</Text>
                            {[r.dom, r.rec].map((s, j) => (
                                <View key={j} className='w-[86px] items-center'>
                                    <View style={{ height: 34, justifyContent: 'center' }}>{s.art}</View>
                                    <Text className='font-nunito-bold text-ink-400 text-[10px]'>{s.name} <Text className='font-fredoka-bold text-science-300 text-xs'>({s.sym})</Text></Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            );
        case 'domRecFlowers':
            return (
                <View className='flex-row gap-2'>
                    {[
                        { g: 'PP', label: 'Homozygous dominant', color: '#8E24AA', ph: 'Purple', why: 'Has dominant alleles' },
                        { g: 'Pp', label: 'Heterozygous', color: '#8E24AA', ph: 'Purple', why: 'One dominant allele is enough' },
                        { g: 'pp', label: 'Homozygous recessive', color: '#fafafa', ph: 'White', why: 'Two recessive alleles' },
                    ].map((c) => (
                        <View key={c.g} className='flex-1 items-center gap-1 rounded-xl py-2 px-1 bg-[#f5f9f5] border border-[#e8e8e8]'>
                            <View className='flex-row gap-1'>
                                {c.g.split('').map((a, i) => <AlleleChip key={i} text={a} color={a === 'P' ? '#1565C0' : '#FF9800'} size={28} />)}
                            </View>
                            <Text className='font-nunito-bold text-ink-200 text-[9px] text-center'>{c.label}</Text>
                            <Flower color={c.color} size={46} />
                            <Text className='font-fredoka-bold text-ink-300 text-xs'>{c.ph} flower</Text>
                            <Text className='font-nunito text-ink-200 text-[9px] text-center'>{c.why}</Text>
                        </View>
                    ))}
                </View>
            );
        case 'pollination':
            return (
                <View className='flex-row gap-3'>
                    <View className='flex-1 items-center gap-1 rounded-xl p-2 bg-science-100'>
                        <Text className='font-fredoka-bold text-science-300 text-xs uppercase'>Self-pollination</Text>
                        <View className='flex-row items-center'><Flower color='#8E24AA' size={44} /><Text className='text-lg'>↺</Text></View>
                        <Text className='font-nunito text-ink-400 text-[10px] text-center'>Same plant</Text>
                    </View>
                    <View className='flex-1 items-center gap-1 rounded-xl p-2 bg-primary-100'>
                        <Text className='font-fredoka-bold text-primary-400 text-xs uppercase'>Cross-pollination</Text>
                        <View className='flex-row items-center'><Flower color='#8E24AA' size={40} /><Arrow /><Flower color='#fafafa' size={40} /></View>
                        <Text className='font-nunito text-ink-400 text-[10px] text-center'>Two different plants</Text>
                    </View>
                </View>
            );
        case 'firstCross':
            return (
                <View className='items-center gap-2'>
                    <GenLabel text='P generation' />
                    <View className='flex-row items-end gap-4'>
                        <View className='items-center'><Plant tall size={70} /><Text className='font-nunito-bold text-ink-200 text-xs'>Tall</Text></View>
                        <Text className='font-fredoka-bold text-ink-300 text-xl mb-4'>×</Text>
                        <View className='items-center'><Plant tall={false} size={70} /><Text className='font-nunito-bold text-ink-200 text-xs'>Dwarf</Text></View>
                    </View>
                    <Text className='text-ink-100'>↓</Text>
                    <GenLabel text='F₁ generation' />
                    <View className='flex-row gap-1'>{[0, 1, 2, 3].map((i) => <Plant key={i} tall size={56} />)}</View>
                    <Text className='font-fredoka-bold text-primary-400 text-sm'>All tall</Text>
                </View>
            );
        case 'secondGen':
            return (
                <View className='items-center gap-2'>
                    <GenLabel text='F₁ × F₁' />
                    <View className='flex-row gap-3'><Plant tall size={56} /><Plant tall size={56} /></View>
                    <Text className='text-ink-100'>↓</Text>
                    <GenLabel text='F₂ generation' />
                    <View className='flex-row items-end gap-1'><Plant tall size={56} /><Plant tall size={56} /><Plant tall size={56} /><Plant tall={false} size={56} /></View>
                    <View className='rounded-pill px-3 py-1 bg-[#fff8e1] border-2 border-gold'><Text className='font-fredoka-bold text-ink-300 text-sm'>3 tall : 1 dwarf</Text></View>
                </View>
            );
        case 'threeLaws':
            return (
                <View className='gap-2 w-full'>
                    {[
                        { n: 'Law of Dominance', d: 'One trait can mask another trait.', art: <View className='flex-row'><Seed color='#FDD835' size={30} /><Seed color='#7CB342' wrinkled size={30} /></View>, bg: '#e3f2fd' },
                        { n: 'Law of Segregation', d: 'Allele pairs separate during gamete formation.', art: <View className='flex-row gap-0.5'><AlleleChip text='P' color='#1565C0' size={26} /><AlleleChip text='p' color='#FF9800' size={26} /></View>, bg: '#e8f5e9' },
                        { n: 'Law of Independent Assortment', d: 'Different traits are inherited independently of one another.', art: <View className='flex-row flex-wrap w-[60px]'><Seed color='#FDD835' size={28} /><Seed color='#7CB342' size={28} /><Seed color='#FDD835' wrinkled size={28} /><Seed color='#7CB342' wrinkled size={28} /></View>, bg: '#fff8e1' },
                    ].map((l) => (
                        <View key={l.n} className='flex-row items-center gap-3 rounded-xl p-2.5' style={{ backgroundColor: l.bg }}>
                            <View className='w-[64px] items-center'>{l.art}</View>
                            <View className='flex-1'>
                                <Text className='font-fredoka-bold text-ink-300 text-sm'>{l.n}</Text>
                                <Text className='font-nunito text-ink-400 text-xs'>{l.d}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            );
        case 'segregation':
            return (
                <View className='items-center gap-1'>
                    <Flower color='#8E24AA' size={50} />
                    <Text className='font-fredoka-bold text-science-300 text-lg'>Rr <Text className='font-nunito text-ink-200 text-xs'>(heterozygous)</Text></Text>
                    <View className='flex-row gap-10'><Text className='text-ink-100 text-lg'>↙</Text><Text className='text-ink-100 text-lg'>↘</Text></View>
                    <View className='flex-row gap-10'>
                        <View className='items-center'><AlleleChip text='R' color='#1565C0' size={44} /><Text className='font-nunito text-ink-200 text-[10px]'>gamete</Text></View>
                        <View className='items-center'><AlleleChip text='r' color='#FF9800' size={44} /><Text className='font-nunito text-ink-200 text-[10px]'>gamete</Text></View>
                    </View>
                    <Text className='font-nunito-bold text-ink-400 text-xs mt-1'>Each gamete receives only one allele.</Text>
                </View>
            );
        case 'meiosis':
            return (
                <View className='flex-row gap-3'>
                    {[
                        { o: 'Orientation A', pairs: [['R', 'r'], ['Y', 'y']], g: ['RY', 'ry'] },
                        { o: 'Orientation B', pairs: [['R', 'r'], ['y', 'Y']], g: ['Ry', 'rY'] },
                    ].map((s) => (
                        <View key={s.o} className='flex-1 items-center gap-1.5 rounded-xl p-2 bg-[#f5f9f5] border border-[#e8e8e8]'>
                            <Text className='font-fredoka-bold text-ink-300 text-xs'>{s.o}</Text>
                            {s.pairs.map(([l, r], i) => (
                                <View key={i} className='flex-row items-center gap-1'>
                                    <AlleleChip text={l} color={l === l.toUpperCase() ? '#1565C0' : '#FF9800'} size={26} />
                                    <View className='h-1 w-6 rounded-full bg-[#bdbdbd]' />
                                    <AlleleChip text={r} color={r === r.toUpperCase() ? '#1565C0' : '#FF9800'} size={26} />
                                </View>
                            ))}
                            <Text className='font-nunito text-ink-200 text-[10px]'>Possible gametes:</Text>
                            <View className='flex-row gap-1'>{s.g.map((g) => <AlleleChip key={g} text={g} color='#2E7D32' size={34} />)}</View>
                        </View>
                    ))}
                </View>
            );
        case 'twoGenes':
            return (
                <View className='w-full gap-3'>
                    <View className='flex-row gap-3'>
                        <View className='flex-1 items-center rounded-xl p-2 bg-[#fff8e1] gap-1'>
                            <Text className='font-fredoka-bold text-ink-300 text-xs uppercase'>Gene: seed color</Text>
                            <View className='flex-row'><Seed color='#FDD835' size={34} /><Seed color='#7CB342' size={34} /></View>
                            <Text className='font-nunito-bold text-ink-400 text-[11px] text-center'>Y = yellow (dominant){'\n'}y = green (recessive)</Text>
                        </View>
                        <View className='flex-1 items-center rounded-xl p-2 bg-science-100 gap-1'>
                            <Text className='font-fredoka-bold text-ink-300 text-xs uppercase'>Gene: seed shape</Text>
                            <View className='flex-row'><Seed color='#FDD835' size={34} /><Seed color='#FDD835' wrinkled size={34} /></View>
                            <Text className='font-nunito-bold text-ink-400 text-[11px] text-center'>R = round (dominant){'\n'}r = wrinkled (recessive)</Text>
                        </View>
                    </View>
                    <View className='flex-row flex-wrap justify-center gap-2'>
                        {[{ n: 'Round yellow', c: '#FDD835', w: false }, { n: 'Round green', c: '#7CB342', w: false }, { n: 'Wrinkled yellow', c: '#FDD835', w: true }, { n: 'Wrinkled green', c: '#7CB342', w: true }].map((s) => (
                            <View key={s.n} className='items-center w-[72px]'><Seed color={s.c} wrinkled={s.w} size={38} /><Text className='font-nunito-bold text-ink-200 text-[10px] text-center'>{s.n}</Text></View>
                        ))}
                    </View>
                </View>
            );
        case 'tallCross':
            return (
                <View className='flex-row items-end gap-3'>
                    <View className='items-center'><Plant tall flower='#8E24AA' size={68} /><Text className='font-nunito-bold text-ink-200 text-[10px]'>Parent 1 · Tall (Tt)</Text></View>
                    <Text className='font-fredoka-bold text-ink-300 text-xl mb-6'>×</Text>
                    <View className='items-center'><Plant tall flower='#8E24AA' size={68} /><Text className='font-nunito-bold text-ink-200 text-[10px]'>Parent 2 · Tall (Tt)</Text></View>
                    <Text className='text-ink-100 mb-6'>→</Text>
                    <View className='items-center'><Plant tall={false} flower='#8E24AA' size={68} /><Text className='font-nunito-bold text-danger text-[10px]'>Short offspring!</Text></View>
                </View>
            );
        case 'dihybridParents':
            return (
                <View className='items-center gap-2'>
                    <View className='flex-row items-center gap-3'>
                        <View className='items-center'><Pod color='#66BB6A' size={60} /><Text className='font-fredoka-bold text-science-300 text-sm'>RrGg</Text></View>
                        <Text className='font-fredoka-bold text-ink-300 text-xl'>×</Text>
                        <View className='items-center'><Pod color='#66BB6A' size={60} /><Text className='font-fredoka-bold text-science-300 text-sm'>RrGg</Text></View>
                    </View>
                    <View className='flex-row gap-3'>
                        <Text className='font-nunito-bold text-ink-400 text-[11px]'>Seed shape: R round · r wrinkled</Text>
                    </View>
                    <Text className='font-nunito-bold text-ink-400 text-[11px]'>Pod color: G green · g yellow</Text>
                </View>
            );
        default: return null;
    }
}

const GenLabel = ({ text }: { text: string; }) => (
    <View className='rounded-pill px-3 py-0.5 bg-science-300'><Text className='font-fredoka-bold text-white text-xs'>{text}</Text></View>
);

const PEA_ROWS: { trait: string; dom: { name: string; sym: string; art: React.ReactNode; }; rec: { name: string; sym: string; art: React.ReactNode; }; }[] = [
    { trait: 'Flower color', dom: { name: 'Purple', sym: 'P', art: <Flower color='#8E24AA' size={30} /> }, rec: { name: 'White', sym: 'p', art: <Flower color='#fafafa' size={30} /> } },
    { trait: 'Seed shape', dom: { name: 'Round', sym: 'R', art: <Seed color='#FDD835' size={30} /> }, rec: { name: 'Wrinkled', sym: 'r', art: <Seed color='#FDD835' wrinkled size={30} /> } },
    { trait: 'Seed color', dom: { name: 'Yellow', sym: 'Y', art: <Seed color='#FDD835' size={30} /> }, rec: { name: 'Green', sym: 'y', art: <Seed color='#7CB342' size={30} /> } },
    { trait: 'Pod shape', dom: { name: 'Inflated', sym: 'I', art: <Pod color='#66BB6A' size={48} /> }, rec: { name: 'Constricted', sym: 'i', art: <Pod color='#66BB6A' constricted size={48} /> } },
    { trait: 'Pod color', dom: { name: 'Green', sym: 'G', art: <Pod color='#66BB6A' size={48} /> }, rec: { name: 'Yellow', sym: 'g', art: <Pod color='#FDD835' size={48} /> } },
    { trait: 'Flower position', dom: { name: 'Axial', sym: 'A', art: <Plant tall flower='#8E24AA' size={34} /> }, rec: { name: 'Terminal', sym: 'a', art: <Plant tall flower='#8E24AA' terminal size={34} /> } },
    { trait: 'Plant height', dom: { name: 'Tall', sym: 'T', art: <Plant tall size={34} /> }, rec: { name: 'Short', sym: 't', art: <Plant tall={false} size={34} /> } },
];
