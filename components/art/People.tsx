import React from 'react';
import { Circle, G, Path, Rect } from 'react-native-svg';
import { Ball, Face, Icon, INK, P, Shaded, SW } from './kit';

// Head-and-shoulders portraits for the heredity lessons (Lola Lita → Pilar → Ana).
export type PortraitLook = 'lola' | 'pilar' | 'ana' | 'curly' | 'straight';

const LOOKS: Record<PortraitLook, { hair: 'curly' | 'straight'; color: string; shade: string; shirt: string; shirtShade: string; kid?: boolean; glasses?: boolean; }> = {
    lola: { hair: 'curly', color: '#D9D4E6', shade: '#B3ACC8', shirt: P.purple, shirtShade: P.purpleDark, glasses: true },
    pilar: { hair: 'straight', color: P.hair, shade: P.hairDark, shirt: P.teal, shirtShade: P.tealDark },
    ana: { hair: 'curly', color: P.hair, shade: P.hairDark, shirt: P.pink, shirtShade: P.pinkDark, kid: true },
    curly: { hair: 'curly', color: P.hair, shade: P.hairDark, shirt: P.gold, shirtShade: P.goldDark },
    straight: { hair: 'straight', color: P.hair, shade: P.hairDark, shirt: P.blue, shirtShade: P.blueDark },
};

export const Portrait = ({ look, size = 64 }: { look: PortraitLook; size?: number; }) => {
    const L = LOOKS[look];
    const hy = L.kid ? 50 : 46, hr = L.kid ? 22 : 23;
    // curls ring the top and sides of the head
    const curls = [150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 390].map((deg) => {
        const a = deg * Math.PI / 180;
        return { x: 50 + Math.cos(a) * hr * 1.02, y: hy + Math.sin(a) * hr * 1.02 };
    });

    return (
        <Icon size={size}>
            {/* shoulders */}
            <Shaded d={L.kid ? 'M24 100C26 84 37 77 50 77S74 84 76 100Z' : 'M16 100C18 82 32 74 50 74S82 82 84 100Z'} base={L.shirt} shade={L.shirtShade} />
            <Rect x={44} y={hy + hr - 6} width={12} height={10} fill={P.skinDark} stroke={INK} strokeWidth={SW} />

            {/* hair behind the head */}
            {L.hair === 'straight'
                ? <Shaded d={`M${50 - hr - 3} ${hy}C${50 - hr - 3} ${hy - hr - 6} ${50 + hr + 3} ${hy - hr - 6} ${50 + hr + 3} ${hy}V${hy + hr + 12}H${50 - hr - 3}Z`} base={L.color} shade={L.shade} />
                : curls.map((c, i) => <Ball key={i} cx={c.x} cy={c.y} r={8.5} base={L.color} shade={L.shade} shine={false} />)}

            {/* head */}
            <Ball cx={50} cy={hy} r={hr} base={P.skin} shade={P.skinDark} shine={false} />

            {/* fringe */}
            {L.hair === 'straight'
                ? <Path d={`M${50 - hr} ${hy - 2}C${50 - hr + 2} ${hy - hr - 2} ${50 + hr - 2} ${hy - hr - 2} ${50 + hr} ${hy - 2}C${58} ${hy - 12} ${50} ${hy - 16} ${44} ${hy - 14}C${40} ${hy - 8} ${34} ${hy - 4} ${50 - hr} ${hy - 2}Z`} fill={L.color} stroke={INK} strokeWidth={SW} />
                : [-11, 0, 11].map((dx) => <Ball key={dx} cx={50 + dx} cy={hy - hr + 4} r={7} base={L.color} shade={L.shade} shine={false} />)}
            {look === 'lola' && <Ball cx={50} cy={hy - hr - 8} r={8} base={L.color} shade={L.shade} shine={false} />}
            {look === 'ana' && <Path d={`M${50 + hr - 6} ${hy - hr + 2}l6 -6 4 8z`} fill={P.gold} stroke={INK} strokeWidth={2.5} />}

            <Face cx={50} cy={hy + 3} gap={L.kid ? 15 : 14} eye={L.kid ? 3.6 : 3.2} />
            {L.glasses && (
                <G>
                    <Circle cx={43} cy={hy + 3} r={6} fill='none' stroke={INK} strokeWidth={2.5} />
                    <Circle cx={57} cy={hy + 3} r={6} fill='none' stroke={INK} strokeWidth={2.5} />
                    <Path d={`M49 ${hy + 3}h2`} stroke={INK} strokeWidth={2.5} />
                </G>
            )}
        </Icon>
    );
};
