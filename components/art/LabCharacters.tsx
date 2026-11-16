import React from 'react';
import { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { Ball, Face, Icon, INK, P, Shaded, SW } from './kit';

// The Teacher and the Student from the GeneThink mission mockups — half-body,
// lab coats, drawn with the shared art kit so they match every other icon.
// viewBox is 120 × 150; pass `size` for the width and the height follows.

const VB = '0 0 120 150';
const H = (size: number) => size * 1.25;

// ── Teacher: short hair, glasses, tie, clipboard, finger raised ("Let's find out!") ──
export const Teacher = ({ size = 120 }: { size?: number; }) => (
    <Icon width={size} height={H(size)} viewBox={VB}>
        {/* raised arm (behind the coat) */}
        <Shaded d='M82 124L88 102L102 104L98 128Z' base={P.paper} shade={P.paperDark} />
        <Path d='M93 98V80Q95.5 76 98 80V98' fill={P.skin} stroke={INK} strokeWidth={SW} />
        <Ball cx={96} cy={100} r={7.5} base={P.skin} shade={P.skinDark} shine={false} />

        {/* lab coat */}
        <Shaded d='M16 150C18 114 36 100 60 100S102 114 104 150Z' base={P.paper} shade={P.paperDark} />
        <Path d='M50 101L60 122L70 101Z' fill={P.blue} stroke={INK} strokeWidth={SW} />
        <Path d='M57 105H63L62.5 123L60 127L57.5 123Z' fill={P.red} stroke={INK} strokeWidth={2.5} />
        <Path d='M50 101L55 134M70 101L65 134' stroke={INK} strokeWidth={SW} fill='none' />
        <Rect x={72} y={128} width={14} height={10} rx={2} fill={P.sky} stroke={INK} strokeWidth={2.5} />

        {/* neck + head */}
        <Rect x={53} y={84} width={14} height={18} fill={P.skinDark} stroke={INK} strokeWidth={SW} />
        <Circle cx={36} cy={68} r={5} fill={P.skin} stroke={INK} strokeWidth={SW} />
        <Circle cx={84} cy={68} r={5} fill={P.skin} stroke={INK} strokeWidth={SW} />
        <Ball cx={60} cy={66} r={24} base={P.skin} shade={P.skinDark} shine={false} />

        {/* short side-parted hair */}
        <Shaded d='M36 64C32 40 50 34 62 36C80 36 90 48 84 64C82 56 76 50 68 48C60 54 46 54 36 64Z' base={P.hair} shade={P.hairDark} nudge={2} />

        <Face cx={60} cy={68} gap={16} eye={3.4} />
        {/* glasses */}
        <G>
            <Circle cx={52} cy={68} r={7.5} fill='#ffffff55' stroke={INK} strokeWidth={2.6} />
            <Circle cx={68} cy={68} r={7.5} fill='#ffffff55' stroke={INK} strokeWidth={2.6} />
            <Path d='M59.5 68H60.5M44.5 67L38 65M75.5 67L82 65' stroke={INK} strokeWidth={2.6} />
        </G>

        {/* clipboard */}
        <G transform='rotate(-8 36 132)'>
            <Shaded d='M20 112H50V150H20Z' base={P.wood} shade={P.woodDark} nudge={2} />
            <Rect x={24} y={118} width={22} height={28} fill={P.paper} stroke={INK} strokeWidth={2.2} />
            <Path d='M28 125H42M28 131H42M28 137H38' stroke={P.purple} strokeWidth={2.2} />
            <Rect x={29} y={108} width={12} height={7} rx={2} fill={P.gold} stroke={INK} strokeWidth={2.5} />
        </G>
        <Ball cx={48} cy={134} r={6.5} base={P.skin} shade={P.skinDark} shine={false} />
    </Icon>
);

// ── Student: long hair with a ponytail + yellow bow, goggles up, DNA tablet ──
export const Student = ({ size = 120 }: { size?: number; }) => (
    <Icon width={size} height={H(size)} viewBox={VB}>
        {/* hair behind + ponytail */}
        <Shaded d='M34 62C30 30 90 30 86 62L92 112H28Z' base={P.hair} shade={P.hairDark} />
        <Shaded d='M84 44C102 40 110 62 104 84C100 74 94 64 86 60Z' base={P.hair} shade={P.hairDark} nudge={2} />
        <Path d='M80 36L90 28L92 40ZM92 40L102 34L98 46Z' fill={P.gold} stroke={INK} strokeWidth={2.5} />
        <Circle cx={92} cy={39} r={3.5} fill={P.goldDark} stroke={INK} strokeWidth={2.5} />

        {/* lab coat */}
        <Shaded d='M20 150C22 116 38 104 60 104S98 116 100 150Z' base={P.paper} shade={P.paperDark} />
        <Path d='M51 105L60 119L69 105Z' fill={P.teal} stroke={INK} strokeWidth={SW} />
        <Path d='M51 105L55 134M69 105L65 134' stroke={INK} strokeWidth={SW} fill='none' />

        {/* neck + head */}
        <Rect x={53} y={86} width={14} height={20} fill={P.skinDark} stroke={INK} strokeWidth={SW} />
        <Ball cx={60} cy={67} r={23} base={P.skin} shade={P.skinDark} shine={false} />

        {/* bangs */}
        <Shaded d='M37 64C36 44 50 40 60 42C72 40 85 48 83 64C78 56 70 52 62 52C56 58 46 60 37 64Z' base={P.hair} shade={P.hairDark} nudge={2} />

        {/* goggles pushed up */}
        <Path d='M38 50Q60 40 82 50' stroke={P.blueDark} strokeWidth={5} fill='none' />
        <Ellipse cx={50} cy={47} rx={8.5} ry={6.5} fill={P.sky} stroke={INK} strokeWidth={2.8} />
        <Ellipse cx={70} cy={47} rx={8.5} ry={6.5} fill={P.sky} stroke={INK} strokeWidth={2.8} />
        <Path d='M46 45l3 -2M66 45l3 -2' stroke='#fff' strokeWidth={2} />

        <Face cx={60} cy={70} gap={15} eye={3.8} />

        {/* DNA tablet */}
        <G transform='rotate(6 76 128)'>
            <Rect x={56} y={110} width={40} height={32} rx={5} fill='#3B2A8F' stroke={INK} strokeWidth={SW} />
            <Rect x={60} y={114} width={32} height={24} rx={2} fill={P.blue} />
            <Path d='M66 116Q76 121 66 126T66 136M86 116Q76 121 86 126T86 136' stroke='#A5F3FC' strokeWidth={2.2} fill='none' />
            <Path d='M69 119H83M69 131H83' stroke={P.gold} strokeWidth={2} />
        </G>
        <Ball cx={58} cy={132} r={6.5} base={P.skin} shade={P.skinDark} shine={false} />
        <Ball cx={96} cy={126} r={6.5} base={P.skin} shade={P.skinDark} shine={false} />
    </Icon>
);
