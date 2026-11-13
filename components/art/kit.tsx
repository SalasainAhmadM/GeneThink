import React from 'react';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

// GeneQuest art kit — the one drawing style every icon, character and lesson
// visual in the app uses, so the whole set reads as one illustrator's work:
//   • one ink colour and one outline weight (INK / SW), round joins
//   • flat fills only — no gradients, no glows
//   • hard-edged cel shadow toward the bottom-right, white shine at the top-left
//   • a small shared palette (P)

export const INK = '#2A1066';
export const SW = 3.5;

export const P = {
    purple: '#8B3FD9', purpleDark: '#6421B0', purpleLight: '#B57BFF',
    gold: '#FFC928', goldDark: '#E59A00',
    yellow: '#FFD93B', yellowDark: '#E8B100',
    green: '#4CC35A', greenDark: '#2E9440', greenLight: '#8FE07A',
    pink: '#F0559B', pinkDark: '#C7307A',
    red: '#F04848', redDark: '#C42B2B',
    blue: '#4C8DF6', blueDark: '#2F64C9',
    teal: '#2EC4B6', tealDark: '#1E9488',
    sky: '#D3EBFF', skyDark: '#A9D2F5',
    paper: '#FFFFFF', paperDark: '#E7DEFA',
    wood: '#B86B32', woodDark: '#8A4A1E',
    skin: '#FFD3AE', skinDark: '#F0B48A',
    hair: '#6B3F22', hairDark: '#4A2914',
    grey: '#ECEAF3', greyDark: '#C9C4DA',
};

// Darker cel-shadow tone for any hex colour (used where the colour comes from data)
export const shadeOf = (hex: string, amount = 0.22) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
    const n = parseInt(full, 16);
    const ch = (s: number) => Math.max(0, Math.round(((n >> s) & 255) * (1 - amount)));
    return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('')}`;
};

export const Icon = ({ size = 70, width, height, viewBox = '0 0 100 100', children }: { size?: number; width?: number; height?: number; viewBox?: string; children: React.ReactNode; }) => (
    <Svg width={width ?? size} height={height ?? size} viewBox={viewBox}>
        <G strokeLinejoin='round' strokeLinecap='round'>{children}</G>
    </Svg>
);

// A thick inked stroke: dark outline underneath, colour on top
export const InkLine = ({ d, color, width = 6 }: { d: string; color: string; width?: number; }) => (
    <G>
        <Path d={d} stroke={INK} strokeWidth={width + SW * 2} fill='none' />
        <Path d={d} stroke={color} strokeWidth={width} fill='none' />
    </G>
);

// Any closed shape with a cel shadow: shadow-filled shape, base shape nudged up-left on top, outline
export const Shaded = ({ d, base, shade, nudge = 3 }: { d: string; base: string; shade: string; nudge?: number; }) => (
    <G>
        <Path d={d} fill={shade} />
        <Path d={d} fill={base} transform={`translate(${-nudge} ${-nudge})`} />
        <Path d={d} fill='none' stroke={INK} strokeWidth={SW} />
    </G>
);

// Shaded ball: shadow disc, base disc nudged up-left (leaves a crescent), shine, outline
export const Ball = ({ cx, cy, r, base, shade, shine = true }: { cx: number; cy: number; r: number; base: string; shade: string; shine?: boolean; }) => (
    <G>
        <Circle cx={cx} cy={cy} r={r} fill={shade} />
        <Circle cx={cx - r * 0.1} cy={cy - r * 0.1} r={r * 0.86} fill={base} />
        {shine && <Path d={`M${cx - r * 0.55} ${cy - r * 0.1}a${r * 0.55} ${r * 0.55} 0 0 1 ${r * 0.42} ${-r * 0.42}`} stroke='#fff' strokeWidth={r * 0.16} fill='none' opacity={0.85} />}
        <Circle cx={cx} cy={cy} r={r} fill='none' stroke={INK} strokeWidth={SW} />
    </G>
);

// Smooth lumpy outline for a wrinkled pea
export const lumpyPath = (cx: number, cy: number, r: number, lumps = 7) => {
    const pt = (a: number, rr: number) => `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
    const step = (Math.PI * 2) / lumps;
    let d = `M${pt(-Math.PI / 2 - step / 2, r * 0.8)}`;
    for (let i = 0; i < lumps; i++) {
        const a = -Math.PI / 2 + i * step;
        d += `Q${pt(a, r * 1.2)} ${pt(a + step / 2, r * 0.8)}`;
    }
    return d + 'Z';
};

export const WrinkledPea = ({ cx, cy, r, base, shade }: { cx: number; cy: number; r: number; base: string; shade: string; }) => (
    <G>
        <Path d={lumpyPath(cx, cy, r)} fill={shade} />
        <Path d={lumpyPath(cx - r * 0.1, cy - r * 0.1, r * 0.84)} fill={base} />
        <Path d={`M${cx - r * 0.45} ${cy - r * 0.05}q${r * 0.25} ${r * 0.22} ${r * 0.5} 0M${cx - r * 0.15} ${cy + r * 0.38}q${r * 0.25} ${r * 0.2} ${r * 0.5} 0M${cx + r * 0.05} ${cy - r * 0.42}q${r * 0.2} ${r * 0.18} ${r * 0.42} 0`} stroke={INK} strokeWidth={2.2} fill='none' opacity={0.55} />
        <Path d={lumpyPath(cx, cy, r)} fill='none' stroke={INK} strokeWidth={SW} />
    </G>
);

// Flower head: petals layered in order (each with its own shade + highlight), then the centre
export const FlowerHead = ({ cx, cy, r, base, shade }: { cx: number; cy: number; r: number; base: string; shade: string; }) => (
    <G>
        {[0, 72, 144, 216, 288].map((deg) => {
            const a = (deg - 90) * Math.PI / 180;
            const px = cx + Math.cos(a) * r * 0.95, py = cy + Math.sin(a) * r * 0.95, pr = r * 0.78;
            return (
                <G key={deg}>
                    <Circle cx={px} cy={py} r={pr} fill={shade} stroke={INK} strokeWidth={SW} />
                    <Circle cx={px - pr * 0.12} cy={py - pr * 0.12} r={pr * 0.7} fill={base} />
                </G>
            );
        })}
        <Ball cx={cx} cy={cy} r={r * 0.48} base={P.yellow} shade={P.yellowDark} shine={false} />
    </G>
);

// Leaf with a midrib, pointing from (x, y) toward `angle` degrees
export const Leaf = ({ x, y, len = 22, angle = 0, base = P.green, shade = P.greenDark }: { x: number; y: number; len?: number; angle?: number; base?: string; shade?: string; }) => (
    <G transform={`translate(${x} ${y}) rotate(${angle})`}>
        <Path d={`M0 0C${len * 0.3} ${-len * 0.42} ${len * 0.75} ${-len * 0.38} ${len} 0C${len * 0.75} ${len * 0.38} ${len * 0.3} ${len * 0.42} 0 0Z`} fill={base} stroke={INK} strokeWidth={SW} />
        <Path d={`M${len * 0.12} 0H${len * 0.8}`} stroke={shade} strokeWidth={2} />
    </G>
);

// Cartoon face: eyes with catch-lights, smile, blush. (cx, cy) = point between the eyes.
export const Face = ({ cx, cy, gap = 14, eye = 4.5, mood = 'happy' }: { cx: number; cy: number; gap?: number; eye?: number; mood?: 'happy' | 'sad' | 'neutral'; }) => {
    const mouthY = cy + eye * 2.6;
    const mouth = mood === 'happy'
        ? `M${cx - gap * 0.4} ${mouthY}Q${cx} ${mouthY + gap * 0.45} ${cx + gap * 0.4} ${mouthY}`
        : mood === 'sad'
            ? `M${cx - gap * 0.35} ${mouthY + gap * 0.25}Q${cx} ${mouthY - gap * 0.15} ${cx + gap * 0.35} ${mouthY + gap * 0.25}`
            : `M${cx - gap * 0.3} ${mouthY + 2}H${cx + gap * 0.3}`;
    return (
        <G>
            {[-1, 1].map((s) => (
                <G key={s}>
                    <Ellipse cx={cx + s * gap / 2} cy={cy} rx={eye * 0.85} ry={eye} fill={INK} />
                    <Circle cx={cx + s * gap / 2 + eye * 0.3} cy={cy - eye * 0.4} r={eye * 0.35} fill='#fff' />
                    <Ellipse cx={cx + s * (gap / 2 + eye * 1.6)} cy={cy + eye * 1.7} rx={eye * 0.9} ry={eye * 0.55} fill={P.pink} opacity={0.45} />
                </G>
            ))}
            <Path d={mouth} stroke={INK} strokeWidth={2.6} fill='none' />
        </G>
    );
};
