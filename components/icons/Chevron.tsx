import React from "react";
import { Polyline, Svg } from "react-native-svg";

interface ChevronProps {
    direction?: "up" | "down" | "left" | "right";
    color?: string;
    size?: number;
    strokeWidth?: number;
}

export default function Chevron({
    direction = "down",
    color = "#ffffff",
    size = 18,
    strokeWidth = 2.5,
}: ChevronProps) {

    const pointsMap = {
        down: "6 9 12 15 18 9",
        up: "6 15 12 9 18 15",
        left: "15 6 9 12 15 18",
        right: "9 6 15 12 9 18",
    };

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
                points={pointsMap[direction]}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}