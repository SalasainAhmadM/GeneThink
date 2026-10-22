import Cell from '@/components/art/Cell';
import ChromosomeCharacter from '@/components/art/ChromosomeCharacter';
import DnaCharacter from '@/components/art/DnaCharacter';
import GeneCharacter from '@/components/art/GeneCharacter';
import { MissionVisual } from '@/constants/missions';
import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Ellipse } from 'react-native-svg';

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
        <Ellipse cx={50} cy={52} rx={40} ry={wrinkled ? 32 : 38} fill={color} />
        <Ellipse cx={36} cy={38} rx={10} ry={7} fill='#ffffff66' />
        {wrinkled && <Ellipse cx={58} cy={60} rx={18} ry={4} fill='#00000022' />}
    </Svg>
);

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
        default: return null;
    }
}
