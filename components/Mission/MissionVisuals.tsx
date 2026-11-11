import Cell from '@/components/art/Cell';
import ChromosomeCharacter from '@/components/art/ChromosomeCharacter';
import DnaCharacter from '@/components/art/DnaCharacter';
import GeneCharacter from '@/components/art/GeneCharacter';
import { MissionVisual } from '@/constants/missions';
import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/lib/utils';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

const Arrow = () => <Text className='text-ink-100 text-base'>→</Text>;

// Five-petal flower drawn with SVG
export const Flower = ({ color, size = 56 }: { color: string; size?: number; }) => (
    <Svg width={size} height={size} viewBox='0 0 100 100'>
        {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg - 90) * Math.PI / 180;
            return <Circle key={deg} cx={50 + Math.cos(rad) * 24} cy={50 + Math.sin(rad) * 24} r={22} fill={color} stroke='#00000018' strokeWidth={1.5} />;
        })}
        <Circle cx={50} cy={50} r={12} fill='#FFD54F' />
    </Svg>
);

export const Seed = ({ color, wrinkled = false, size = 44 }: { color: string; wrinkled?: boolean; size?: number; }) => (
    <Svg width={size} height={size} viewBox='0 0 100 100'>
        {wrinkled ? (
            <>
                {[[34, 36], [58, 30], [72, 52], [62, 72], [38, 72], [26, 54], [50, 52]].map(([x, y], i) => (
                    <Circle key={i} cx={x} cy={y} r={i === 6 ? 24 : 18} fill={color} stroke='#00000026' strokeWidth={2} />
                ))}
                <Path d='M40 46c6 4 14 4 20 0M44 62c4 3 10 3 14 0' stroke='#00000030' strokeWidth={3} fill='none' strokeLinecap='round' />
            </>
        ) : (
            <>
                <Ellipse cx={50} cy={52} rx={40} ry={38} fill={color} stroke='#00000020' strokeWidth={2} />
                <Ellipse cx={36} cy={38} rx={10} ry={7} fill='#ffffff66' />
            </>
        )}
    </Svg>
);

// Pea pod — inflated (smooth) or constricted (pinched between peas)
export const Pod = ({ color, constricted = false, size = 56 }: { color: string; constricted?: boolean; size?: number; }) => (
    <Svg width={size} height={size * 0.6} viewBox='0 0 100 60'>
        {constricted ? (
            <Path d='M6 34c6-14 14-14 20-8 6-10 16-10 22-2 6-10 16-10 22-2 6-8 16-8 24 4-8 14-20 18-30 12-8 8-18 8-24 0-8 8-18 8-24 0-6 6-8 2-10-4z' fill={color} stroke='#00000033' strokeWidth={2} />
        ) : (
            <Path d='M4 34C20 8 72 6 96 26 84 50 30 56 4 34z' fill={color} stroke='#00000033' strokeWidth={2} />
        )}
        <Path d='M14 30C34 22 64 20 86 26' stroke='#ffffff55' strokeWidth={3} fill='none' strokeLinecap='round' />
    </Svg>
);

// Simple pea plant: tall or short, flowers along the stem (axial) or at the top (terminal)
export const Plant = ({ tall = true, flower, terminal = false, size = 60 }: { tall?: boolean; flower?: string; terminal?: boolean; size?: number; }) => {
    const top = tall ? 10 : 46;
    return (
        <Svg width={size * 0.7} height={size} viewBox='0 0 70 100'>
            <Path d={`M35 98V${top}`} stroke='#2E7D32' strokeWidth={4} strokeLinecap='round' />
            {(tall ? [30, 52, 74] : [62, 80]).map((y, i) => (
                <G key={y}>
                    <Ellipse cx={i % 2 ? 22 : 48} cy={y} rx={12} ry={6} fill='#66BB6A' transform={`rotate(${i % 2 ? 25 : -25} ${i % 2 ? 22 : 48} ${y})`} />
                    {flower && !terminal && <Circle cx={i % 2 ? 48 : 22} cy={y - 4} r={5} fill={flower} stroke='#00000030' />}
                </G>
            ))}
            {flower && terminal && <Circle cx={35} cy={top} r={8} fill={flower} stroke='#00000030' />}
            {!flower && <Ellipse cx={35} cy={top} rx={7} ry={4} fill='#81C784' />}
        </Svg>
    );
};

// Labelled tile with an icon on top
const Tile = ({ children, label, sub, width = 92 }: { children: React.ReactNode; label: string; sub?: string; width?: number; }) => (
    <View className='items-center gap-1' style={{ width }}>
        <View className='rounded-2xl bg-[#f5f9f5] border border-[#e8e8e8] items-center justify-center' style={{ width: width - 8, height: width - 16 }}>
            {children}
        </View>
        <Text className='font-nunito-bold text-ink-300 text-xs text-center'>{label}</Text>
        {sub && <Text className='font-nunito text-ink-200 text-[10px] text-center'>{sub}</Text>}
    </View>
);

const Person = ({ emoji, name, sub }: { emoji: string; name: string; sub: string; }) => (
    <View className='items-center gap-1' style={{ width: 84 }}>
        <View className='size-16 rounded-full bg-[#fff3e0] border-2 border-amber items-center justify-center'>
            <Text className='text-[32px]'>{emoji}</Text>
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
                    <Person emoji='👵' name='Lola Lita' sub='curly hair' />
                    <Person emoji='👩' name='Pilar' sub='straight hair' />
                    <Person emoji='👧' name='Ana' sub='curly hair' />
                </View>
            );
        case 'traitGallery':
            return (
                <View className='flex-row flex-wrap justify-center gap-2'>
                    <Tile label='Curly hair'><Text className='text-[38px]'>👩‍🦱</Text></Tile>
                    <Tile label='Straight hair'><Text className='text-[38px]'>👩</Text></Tile>
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
                    <Person emoji='👵' name='Lola Lita' sub='curly' />
                    <Arrow />
                    <Person emoji='👩' name='Pilar' sub='straight' />
                    <Arrow />
                    <Person emoji='👧' name='Ana' sub='curly' />
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
