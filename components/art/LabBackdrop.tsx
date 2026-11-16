import { QUEST } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Leaf, P } from './kit';

// Purple genetics-lab scene behind the mission screens, after the docx mockups:
// deep indigo → violet, shelves of glowing flasks, a DNA monitor, a neon double helix,
// sparkles and leaves in the bottom corners. Drop it as the first child of a
// `relative` / `overflow-hidden` container; it fills the container and ignores touches.
//
// The scene is drawn on a 400 × 800 canvas pinned to the top, so short containers
// (headers, cards) show the shelves + helix and tall screens get the leaves too.

const NEON = '#C084FC';
const CYAN = '#67E8F9';
const SHELF = '#24107A';

// Neon double helix running down the right side
const helix = () => {
    const strand = (phase: number) => {
        let d = '';
        for (let y = -10; y <= 300; y += 6) {
            const x = 340 + Math.sin(y / 34 + phase) * 30;
            d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${y}`;
        }
        return d;
    };
    const rungs = Array.from({ length: 13 }, (_, i) => {
        const y = 4 + i * 23;
        return `M${(340 + Math.sin(y / 34) * 30).toFixed(1)} ${y}L${(340 + Math.sin(y / 34 + Math.PI) * 30).toFixed(1)} ${y}`;
    }).join('');
    return { a: strand(0), b: strand(Math.PI), rungs };
};
const HELIX = helix();

const Flask = ({ x, y, h, color }: { x: number; y: number; h: number; color: string; }) => (
    <G>
        <Rect x={x - 3} y={y - h - 6} width={6} height={8} fill='#ffffff30' />
        <Rect x={x - 7} y={y - h} width={14} height={h} rx={4} fill='#ffffff22' />
        <Rect x={x - 7} y={y - h * 0.55} width={14} height={h * 0.55} rx={4} fill={color} opacity={0.55} />
    </G>
);

const Shelf = ({ x, y, w, flasks }: { x: number; y: number; w: number; flasks: { dx: number; h: number; c: string; }[]; }) => (
    <G>
        {flasks.map((f, i) => <Flask key={i} x={x + f.dx} y={y} h={f.h} color={f.c} />)}
        <Rect x={x} y={y} width={w} height={7} fill={SHELF} />
        <Rect x={x} y={y} width={w} height={2} fill='#ffffff25' />
    </G>
);

const Sparkle = ({ x, y, r = 5, o = 0.8 }: { x: number; y: number; r?: number; o?: number; }) => (
    <Path d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`} fill='#fff' opacity={o} />
);

export default function LabBackdrop({ leaves = true, dim = false }: { leaves?: boolean; dim?: boolean; }) {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents='none'>
            <LinearGradient colors={QUEST.gradient} locations={QUEST.gradientLocations} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />

            <Svg style={StyleSheet.absoluteFill} width='100%' height='100%' viewBox='0 0 400 800' preserveAspectRatio='xMidYMin slice'>
                <Defs>
                    <RadialGradient id='glow' cx='50%' cy='22%' rx='60%' ry='30%'>
                        <Stop offset='0' stopColor='#E9D5FF' stopOpacity={0.35} />
                        <Stop offset='1' stopColor='#E9D5FF' stopOpacity={0} />
                    </RadialGradient>
                    <RadialGradient id='floor' cx='50%' cy='100%' rx='70%' ry='25%'>
                        <Stop offset='0' stopColor='#F0ABFC' stopOpacity={0.3} />
                        <Stop offset='1' stopColor='#F0ABFC' stopOpacity={0} />
                    </RadialGradient>
                </Defs>

                {/* soft lab lights */}
                <Rect x={0} y={0} width={400} height={800} fill='url(#glow)' />
                <Rect x={0} y={500} width={400} height={300} fill='url(#floor)' />

                {/* DNA monitor, top left (left out of short headers, where it sits under the content) */}
                {!dim && <G>
                    <Rect x={-6} y={70} width={92} height={66} rx={8} fill='#2B1A8C' stroke='#7C5CFF' strokeWidth={3} />
                    <Rect x={2} y={78} width={76} height={50} rx={4} fill='#1E3A9E' />
                    <Path d='M14 90Q26 98 14 106T14 122M40 90Q28 98 40 106T40 122' stroke={CYAN} strokeWidth={2.5} fill='none' />
                    <Path d='M50 92H70M50 100H66M50 108H70M50 116H62' stroke={CYAN} strokeWidth={2} opacity={0.6} />
                    <Rect x={34} y={136} width={12} height={10} fill='#2B1A8C' />
                </G>}

                {/* shelves of glowing flasks */}
                <Shelf x={0} y={210} w={96} flasks={[{ dx: 16, h: 26, c: CYAN }, { dx: 40, h: 34, c: P.pink }, { dx: 66, h: 22, c: P.greenLight }]} />
                <Shelf x={0} y={300} w={74} flasks={[{ dx: 20, h: 30, c: P.gold }, { dx: 50, h: 24, c: CYAN }]} />
                <Shelf x={300} y={330} w={100} flasks={[{ dx: 22, h: 28, c: P.pink }, { dx: 50, h: 22, c: CYAN }, { dx: 78, h: 32, c: P.greenLight }]} />

                {/* neon double helix, top right */}
                <G opacity={dim ? 0.5 : 1}>
                    <Path d={HELIX.rungs} stroke={NEON} strokeWidth={10} opacity={0.15} />
                    <Path d={HELIX.rungs} stroke='#F5D0FE' strokeWidth={3} opacity={0.7} />
                    {[HELIX.a, HELIX.b].map((d, i) => (
                        <G key={i}>
                            <Path d={d} stroke={NEON} strokeWidth={16} fill='none' opacity={0.18} />
                            <Path d={d} stroke={i ? '#F0ABFC' : NEON} strokeWidth={6} fill='none' strokeLinecap='round' />
                            <Path d={d} stroke='#fff' strokeWidth={1.6} fill='none' opacity={0.7} />
                        </G>
                    ))}
                </G>

                {/* sparkles + floating dots */}
                <Sparkle x={120} y={40} r={6} />
                <Sparkle x={260} y={120} r={4} o={0.6} />
                <Sparkle x={210} y={250} r={5} o={0.5} />
                <Sparkle x={60} y={420} r={5} o={0.5} />
                <Sparkle x={350} y={470} r={6} o={0.6} />
                <Sparkle x={180} y={610} r={4} o={0.4} />
                {[[150, 90], [290, 200], [40, 360], [250, 400], [110, 540], [330, 620]].map(([x, y], i) => (
                    <Circle key={i} cx={x} cy={y} r={2.5} fill='#fff' opacity={0.35} />
                ))}

                {/* leaves in the bottom corners */}
                {leaves && (
                    <G>
                        <Leaf x={-6} y={790} len={70} angle={-60} />
                        <Leaf x={-4} y={760} len={56} angle={-25} base={P.greenLight} shade={P.green} />
                        <Leaf x={10} y={800} len={48} angle={-95} />
                        <Leaf x={406} y={790} len={70} angle={-120} />
                        <Leaf x={404} y={760} len={56} angle={-155} base={P.greenLight} shade={P.green} />
                        <Leaf x={390} y={800} len={48} angle={-85} />
                    </G>
                )}
            </Svg>
        </View>
    );
}
