import { QuestionFigure as Figure } from '@/constants/lessons';
import React from 'react';
import { Text, View } from 'react-native';

// Same allele colors as the Punnett square art: uppercase → blue, lowercase → orange
const alleleColor = (char: string) => (char === char.toUpperCase() ? '#1565C0' : '#FF5722');

const Alleles = ({ value, size = 16 }: { value: string; size?: number }) => (
    <Text className='font-fredoka-bold' style={{ fontSize: size }}>
        {value.split('').map((c, i) => <Text key={i} style={{ color: alleleColor(c) }}>{c}</Text>)}
    </Text>
);

const BORDER = '#4ECDC4';
const CELL = 52;

function PunnettFigure({ figure }: { figure: Extract<Figure, { kind: 'punnett' }> }) {
    const cols = figure.top.length;
    const cell = (children: React.ReactNode, key: string, bg = 'white', width = CELL) => (
        <View key={key} className='items-center justify-center' style={{ width, height: CELL, backgroundColor: bg, borderWidth: 1, borderColor: BORDER }}>
            {children}
        </View>
    );
    // Father / Mother labels sit in an extra header row and an extra column spanning the allele rows
    const hasSideLabels = !!(figure.topLabel || figure.leftLabel);
    const sideWidth = hasSideLabels ? CELL : 0;
    const label = (text?: string) => <Text className='font-nunito-bold text-ink-300 text-xs'>{text ?? ''}</Text>;

    return (
        <View className='items-center'>
            {hasSideLabels && (
                <View className='flex-row'>
                    <View style={{ width: sideWidth + CELL }} />
                    {cell(label(figure.topLabel), 'tl', '#e0f7f5', CELL * cols)}
                </View>
            )}
            <View className='flex-row'>
                {cell(<Text className='font-nunito-bold text-ink-200 text-[10px] text-center px-1'>{figure.cornerLabel ?? ''}</Text>, 'corner', '#e0f7f5', sideWidth + CELL)}
                {figure.top.map((a, i) => cell(<Alleles value={a} />, `t${i}`, '#e0f7f5'))}
            </View>
            <View className='flex-row'>
                {hasSideLabels && (
                    <View className='items-center justify-center' style={{ width: sideWidth, height: CELL * figure.left.length, backgroundColor: '#e0f7f5', borderWidth: 1, borderColor: BORDER }}>
                        {label(figure.leftLabel)}
                    </View>
                )}
                <View>
                    {figure.left.map((a, r) => (
                        <View key={`r${r}`} className='flex-row'>
                            {cell(<Alleles value={a} />, `l${r}`, '#e0f7f5')}
                            {figure.cells.slice(r * cols, r * cols + cols).map((g, c) => cell(<Alleles value={g} />, `c${r}${c}`))}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const Seed = ({ wrinkled }: { wrinkled?: boolean }) => (
    <View style={{
        width: 26, height: 22, borderRadius: 11, borderWidth: 2,
        backgroundColor: wrinkled ? '#9CCC65' : '#FFD54F',
        borderColor: wrinkled ? '#558B2F' : '#3F51B5',
        borderStyle: wrinkled ? 'dashed' : 'solid',
    }} />
);

function SeedPedigreeFigure() {
    const row = (label: string, seeds: boolean[]) => (
        <View className='flex-row items-center gap-3'>
            <View className='flex-row gap-2 justify-center' style={{ width: 150 }}>
                {seeds.map((w, i) => <Seed key={i} wrinkled={w} />)}
            </View>
            <Text className='font-nunito-semibold text-ink-200 text-xs italic' style={{ width: 80 }}>{label}</Text>
        </View>
    );
    const arrow = <Text className='text-ink-100 text-base' style={{ width: 150, textAlign: 'center' }}>↓</Text>;

    return (
        <View className='gap-1 items-center'>
            {row('Parent', [true, false])}
            <View className='flex-row'>{arrow}<View style={{ width: 92 }} /></View>
            {row('F1 generation', [false, false, false, false])}
            <View className='flex-row'>{arrow}<View style={{ width: 92 }} /></View>
            {row('F2 generation', [false, false, false, true])}
            <View className='flex-row gap-4 mt-2'>
                <View className='flex-row items-center gap-1'><Seed /><Text className='font-nunito text-ink-300 text-xs'>= round</Text></View>
                <View className='flex-row items-center gap-1'><Seed wrinkled /><Text className='font-nunito text-ink-300 text-xs'>= wrinkled</Text></View>
            </View>
        </View>
    );
}

export default function QuestionFigure({ figure }: { figure: Figure }) {
    return (
        <View className='mt-3 items-center'>
            {figure.kind === 'punnett' ? <PunnettFigure figure={figure} /> : <SeedPedigreeFigure />}
        </View>
    );
}
