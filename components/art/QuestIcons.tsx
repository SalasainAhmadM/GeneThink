import React from 'react';
import { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { Ball, FlowerHead, Icon, INK, InkLine, P, SW, WrinkledPea } from './kit';

// GeneQuest icon set — drawn with the shared art kit (see ./kit.tsx for the style rules).

type IconProps = { size?: number; };

// ── Mission 1 · Genetics investigator (magnifier) ─────────────
export const MagnifierIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        {/* handle */}
        <InkLine d='M64 64L86 86' color={P.purple} width={11} />
        <Path d='M68 66L84 82' stroke={P.purpleLight} strokeWidth={3} />
        <InkLine d='M60 60L66 66' color={P.gold} width={13} />
        {/* rim */}
        <Ball cx={42} cy={42} r={30} base={P.gold} shade={P.goldDark} shine={false} />
        {/* glass */}
        <Circle cx={42} cy={42} r={22} fill={P.skyDark} stroke={INK} strokeWidth={SW} />
        <Circle cx={40} cy={40} r={19} fill={P.sky} />
        {/* DNA inside the lens */}
        <Path d='M34 27c16 6 0 18 16 30' stroke={P.purple} strokeWidth={4} fill='none' />
        <Path d='M50 27c-16 6 0 18-16 30' stroke={P.pink} strokeWidth={4} fill='none' />
        <Path d='M38 33h8M38 51h8' stroke={P.blue} strokeWidth={3} />
        {/* shine */}
        <Path d='M27 40a15 15 0 0 1 9-12' stroke='#fff' strokeWidth={4} fill='none' />
    </Icon>
);

// ── Intro · DNA double helix ──────────────────────────────────
export const DnaIcon = ({ size = 70 }: IconProps) => {
    // one full twist: strands cross at y≈29 and y≈71, rungs sit where they are apart
    const A = 'M27 8C27 30 73 30 73 50C73 70 27 70 27 92';
    const B = 'M73 8C73 30 27 30 27 50C27 70 73 70 73 92';
    const rungs: [number, number, number][] = [[14, 37, 63], [21, 44, 56], [41, 43, 57], [50, 35, 65], [59, 43, 57], [79, 44, 56], [86, 37, 63]];
    return (
        <Icon size={size}>
            {rungs.map(([y, x1, x2], i) => <InkLine key={y} d={`M${x1} ${y}H${x2}`} color={i % 2 ? P.gold : P.blue} width={4} />)}
            <InkLine d={B} color={P.pink} width={6} />
            <InkLine d={A} color={P.purple} width={6} />
            <Path d='M30 14C31 22 40 28 46 31' stroke={P.purpleLight} strokeWidth={2} fill='none' />
        </Icon>
    );
};

// ── Mission 2 · Mendel's purple & white flowers ───────────────
export const FlowerPairIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        <InkLine d='M36 50C36 68 42 82 46 94' color={P.green} width={4} />
        <InkLine d='M67 64C66 76 58 87 50 94' color={P.green} width={4} />
        {/* leaves */}
        <Path d='M41 78C29 78 21 70 20 61C31 60 40 66 41 78Z' fill={P.green} stroke={INK} strokeWidth={SW} />
        <Path d='M40 76C33 72 27 67 24 63' stroke={P.greenDark} strokeWidth={2} fill='none' />
        <Path d='M57 82C66 80 75 73 78 63C67 64 59 71 57 82Z' fill={P.green} stroke={INK} strokeWidth={SW} />
        <Path d='M59 80C65 75 71 70 75 66' stroke={P.greenDark} strokeWidth={2} fill='none' />
        <FlowerHead cx={36} cy={35} r={14} base={P.purple} shade={P.purpleDark} />
        <FlowerHead cx={68} cy={53} r={12} base={P.paper} shade={P.paperDark} />
    </Icon>
);

// ── Mission 3 · Punnett square book ───────────────────────────
export const PunnettBookIcon = ({ size = 70 }: IconProps) => {
    const cells = [[P.red, P.blue], [P.blue, P.green]];
    return (
        <Icon size={size}>
            {/* cover */}
            <Path d='M5 34V88Q28 82 50 90Q72 82 95 88V34Z' fill={P.purpleDark} stroke={INK} strokeWidth={SW} />
            {/* pages */}
            <Path d='M10 28Q30 22 50 30V84Q30 76 10 82Z' fill={P.paper} stroke={INK} strokeWidth={SW} />
            <Path d='M90 28Q70 22 50 30V84Q70 76 90 82Z' fill={P.paper} stroke={INK} strokeWidth={SW} />
            <Path d='M44 29.5Q47 29.5 50 30V84Q47 82.5 44 82Z' fill={P.paperDark} />
            <Path d='M56 29.5Q53 29.5 50 30V84Q53 82.5 56 82Z' fill={P.paperDark} />
            <Line x1={50} y1={30} x2={50} y2={84} stroke={INK} strokeWidth={SW} />
            {/* text lines on the left page */}
            {[40, 50, 60, 70].map((y) => <Path key={y} d={`M17 ${y - 1}Q28 ${y - 4} 40 ${y}`} stroke={P.purpleLight} strokeWidth={3} fill='none' />)}
            {/* 2×2 Punnett grid on the right page */}
            {cells.map((row, r) => row.map((c, ci) => (
                <Rect key={`${r}${ci}`} x={58 + ci * 13} y={40 + r * 13} width={13} height={13} fill={c} stroke={INK} strokeWidth={2.5} />
            )))}
            {/* parent-allele markers above and beside the grid */}
            <Path d='M61 35h7M74 35h7M54 43v7M54 56v7' stroke={INK} strokeWidth={3} />
            {/* sparkle */}
            <Path d='M18 8l3 9M30 5v9M41 8l-3 9' stroke={P.goldDark} strokeWidth={3.5} />
        </Icon>
    );
};

// ── Mission 4 · the four dihybrid peas (round/wrinkled × yellow/green) ──
export const SeedQuadIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        <Ball cx={28} cy={28} r={19} base={P.yellow} shade={P.yellowDark} />
        <Ball cx={72} cy={28} r={19} base={P.green} shade={P.greenDark} />
        <WrinkledPea cx={28} cy={72} r={18} base={P.yellow} shade={P.yellowDark} />
        <WrinkledPea cx={72} cy={72} r={18} base={P.green} shade={P.greenDark} />
    </Icon>
);

// ── Test Your Knowledge · quiz clipboard ──────────────────────
export const ClipboardIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        {/* board with a hard shadow edge */}
        <Rect x={17} y={12} width={68} height={84} rx={9} fill={P.purpleDark} stroke={INK} strokeWidth={SW} />
        <Rect x={17} y={12} width={63} height={79} rx={9} fill={P.purple} />
        <Rect x={17} y={12} width={68} height={84} rx={9} fill='none' stroke={INK} strokeWidth={SW} />
        {/* paper with folded corner */}
        <Path d='M25 22H75V72L63 84H25Z' fill={P.paper} stroke={INK} strokeWidth={SW} />
        <Path d='M75 72H63V84Z' fill={P.paperDark} stroke={INK} strokeWidth={SW} />
        {/* clip */}
        <Rect x={36} y={6} width={30} height={14} rx={5} fill={P.gold} stroke={INK} strokeWidth={SW} />
        <Rect x={45} y={9} width={12} height={4} rx={2} fill={P.goldDark} />
        {/* checklist */}
        {[36, 52, 68].map((y, i) => (
            <G key={y}>
                <Rect x={31} y={y - 6} width={12} height={12} rx={3} fill={i < 2 ? '#DDF7E1' : P.paper} stroke={INK} strokeWidth={2.5} />
                {i < 2 && <Path d={`M33.5 ${y}l3 3 6-8`} stroke={P.greenDark} strokeWidth={3.5} fill='none' />}
                <Path d={`M48 ${y}H${i === 2 ? 58 : 68}`} stroke={P.purpleLight} strokeWidth={4} />
            </G>
        ))}
    </Icon>
);

// ── "Let's practice!" target ──────────────────────────────────
export const TargetIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        <Ball cx={44} cy={56} r={38} base={P.red} shade={P.redDark} shine={false} />
        <Circle cx={44} cy={56} r={27} fill={P.paper} stroke={INK} strokeWidth={SW} />
        <Circle cx={44} cy={56} r={17} fill={P.red} stroke={INK} strokeWidth={SW} />
        <Circle cx={44} cy={56} r={7} fill={P.paper} stroke={INK} strokeWidth={SW} />
        <Path d='M17 44a30 30 0 0 1 16-18' stroke='#fff' strokeWidth={4} fill='none' opacity={0.8} />
        {/* arrow */}
        <InkLine d='M46 54L80 20' color={P.wood} width={4} />
        <Path d='M78 10L82 22L94 18L88 12Z' fill={P.gold} stroke={INK} strokeWidth={SW} />
        <Path d='M74 14L80 20L76 26L70 20Z' fill={P.pink} stroke={INK} strokeWidth={SW} />
    </Icon>
);

// ── Punnett Square Lab tablet ─────────────────────────────────
export const PunnettTabletIcon = ({ size = 70 }: IconProps) => (
    <Icon size={size}>
        <Rect x={8} y={12} width={80} height={68} rx={10} fill={P.purpleDark} stroke={INK} strokeWidth={SW} />
        <Rect x={8} y={12} width={76} height={64} rx={10} fill={P.purple} />
        <Rect x={8} y={12} width={80} height={68} rx={10} fill='none' stroke={INK} strokeWidth={SW} />
        <Rect x={16} y={20} width={64} height={52} rx={4} fill={P.sky} stroke={INK} strokeWidth={2.5} />
        {/* grid: gold headers, blue cells */}
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (r === 0 && c === 0) ? null : (
            <Rect key={`${r}${c}`} x={22 + c * 16} y={24 + r * 15} width={14} height={13} rx={2}
                fill={r === 0 || c === 0 ? P.gold : P.blue} stroke={INK} strokeWidth={2} />
        )))}
        {/* pointing hand */}
        <Path d='M68 64V48a4.5 4.5 0 0 1 9 0V58l8 2c3.5 1 5 3.5 4.5 7L88 82H72L64 70a4.5 4.5 0 0 1 7-5.5Z' fill={P.paper} stroke={INK} strokeWidth={SW} />
        <Path d='M77 60v6M83 61v6' stroke={INK} strokeWidth={2} />
    </Icon>
);
