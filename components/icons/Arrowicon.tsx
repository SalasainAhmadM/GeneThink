/**
 * components/icons/ArrowIcon.tsx
 * Arrow icon with tail — forward › and back ‹
 * Usage:
 *   <ArrowIcon />
 *   <ArrowIcon direction="back" color="#9e9e9e" size={20} />
 *   <ForwardArrow />  <BackArrow />
 */

import React from "react";
import { Line, Polyline, Svg } from "react-native-svg";

interface ArrowIconProps {
    direction?: "forward" | "back";
    color?: string;
    size?: number;
    strokeWidth?: number;
}

export default function ArrowIcon({
    direction = "forward",
    color = "#ffffff",
    size = 18,
    strokeWidth = 2.5,
}: ArrowIconProps) {
    const isForward = direction === "forward";

    // All coords in 24×24 viewBox
    // Tail: horizontal line from x=4 to x=16, centered at y=12
    // Head: chevron from (13,7) → (19,12) → (13,17)
    //
    // Back mirrors everything: tail x=20→8, chevron from (11,7)→(5,12)→(11,17)

    const tailX1 = isForward ? 4 : 20;
    const tailX2 = isForward ? 16 : 8;
    const headX1 = isForward ? 13 : 11;
    const headTipX = isForward ? 19 : 5;

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* Tail — medium length horizontal line */}
            <Line
                x1={tailX1} y1="12"
                x2={tailX2} y2="12"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            {/* Head — chevron */}
            <Polyline
                points={`${headX1},7 ${headTipX},12 ${headX1},17`}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export const ForwardArrow = (props: Omit<ArrowIconProps, "direction">) => (
    <ArrowIcon {...props} direction="forward" />
);

export const BackArrow = (props: Omit<ArrowIconProps, "direction">) => (
    <ArrowIcon {...props} direction="back" />
);