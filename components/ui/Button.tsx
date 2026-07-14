import { cn } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
    Animated,
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ── Types ─────────────────────────────────────────────────────

type BtnType =
    | "primary"    // amber→orange gradient (default)
    | "secondary"  // green gradient
    | "danger"     // red solid
    | "success"    // green solid
    | "border"     // transparent + border outline
    | "ghost"      // light grey fill
    | "transparent" // no bg, no border
    | "glass"
    | "container"; // for ButtonContainer

type BtnSize = "sm" | "md" | "lg"; // md = default

type BtnWidth = "fit" | "full"; // fit = default

interface ButtonProps {
    // Content
    label?: string;
    icon?: React.ReactNode;   // shown before label
    icon2?: React.ReactNode;  // shown after label
    children?: React.ReactNode; // shown inside the container

    // Behaviour
    onPress?: (e: GestureResponderEvent) => void;
    href?: string;            // if passed → router.push(href) on press

    // Appearance
    btnType?: BtnType;
    size?: BtnSize;
    width?: BtnWidth;
    className?: string;       // appended to the outer container
    labelClassName?: string;  // appended to the label Text
    fredokaBold?: boolean;
    mode?: number;

    // State
    disabled?: boolean;
}

// ── Size maps ─────────────────────────────────────────────────

const SIZE_PY: Record<BtnSize, string> = {
    sm: "py-2",
    md: "py-3",
    lg: "py-4",
};

const SIZE_PY_BORDER: Record<BtnSize, string> = {
    sm: "py-1.5",
    md: "py-2.5",
    lg: "py-3.5",
};

const SIZE_PX: Record<BtnSize, string> = {
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
};

const SIZE_TEXT: Record<BtnSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
};

const SIZE_GAP: Record<BtnSize, string> = {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2.5",
};

// ── Gradient configs ──────────────────────────────────────────

const GRADIENTS: Partial<Record<BtnType, [string, string]>> = {
    primary: ["#FFB300", "#FF6F00"],
    secondary: ["#4CAF50", "#2E7D32"],
};

// ── Solid bg classNames ───────────────────────────────────────

const SOLID_BG: Partial<Record<BtnType, string>> = {
    danger: "bg-danger",
    success: "bg-success",
    ghost: "bg-[#f0f0f0]",
    border: "bg-transparent",
    transparent: "bg-transparent",
    glass: 'bg-white/35'
};

const BORDER_CLASS: Partial<Record<BtnType, string>> = {
    border: "border-1 border-primary-300",
    danger: "border border-[#ef9a9a] bg-[#ffebee]",
};

const LABEL_COLOR: Record<BtnType, string> = {
    primary: "text-white",
    secondary: "text-white",
    glass: "text-white",
    danger: "text-white",
    success: "text-white",
    border: "text-primary-400",
    ghost: "text-ink-200",
    transparent: "text-ink-200",
    container: "text-ink-200",
};

const LABEL_COLOR_BORDER: Record<BtnType, string> = {
    primary: "text-white",
    secondary: "text-white",
    glass: "text-white",
    danger: "text-danger",
    success: "text-white",
    border: "text-primary-400",
    ghost: "text-ink-200",
    transparent: "text-ink-200",
    container: "text-ink-200",
};

// ── Shadow config (style only — no NativeWind equivalent) ─────

const SHADOWS: Partial<Record<BtnType, object>> = {
    primary: {
        shadowColor: "#FF6F00"
    },
    secondary: {
        shadowColor: "#2E7D32"
    },
    danger: {
        shadowColor: "#F44336"
    },
    success: {
        shadowColor: "#4CAF50"
    },
    container: {
        shadowColor: "#4CAF50"
    }
};

const SHADOW_SIZES: Partial<Record<BtnSize, object>> = {
    sm: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    md: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    lg: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
};

// ── Component ─────────────────────────────────────────────────

export default function Button({
    label,
    icon,
    icon2,
    children,
    onPress,
    href,
    btnType = "primary",
    size = "md",
    width = "fit",
    className,
    labelClassName,
    fredokaBold = false,
    mode = 1,
    disabled = false,
}: ButtonProps) {
    // Press scale animation — TouchableOpacity doesn't have built-in scale
    const scale = useRef(new Animated.Value(1)).current;

    const pressIn = () => {
        Animated.spring(scale, {
            toValue: btnType === "container" ? 0.98 : 0.96,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const pressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 40,
            bounciness: 6,
        }).start();
    };

    const handlePress = (e: GestureResponderEvent) => {
        if (disabled) return;
        if (href) {
            href === 'back' ? router.back() : router.push(href as any);
        } else {
            onPress?.(e);
        }
    };

    // ── Computed classNames ──────────────────────────────────────
    const isGradient = btnType === "primary" || btnType === "secondary";

    const containerClass = btnType !== "container" ? cn(
        // width
        width === "full" ? "w-full" : "self-start",
        // disabled state
        disabled && "opacity-40",
        // extra className from consumer
        className
    ) : cn(disabled && "opacity-40", className, 'bg-white/0');


    const innerClass = cn(
        "flex-row items-center justify-center overflow-hidden",
        mode === 1 ? SIZE_PY[size] : SIZE_PY_BORDER[size],
        SIZE_PX[size],
        SIZE_GAP[size],
        // solid bg (gradient types handle their own bg)
        !isGradient && mode === 1 && SOLID_BG[btnType],
        // border
        BORDER_CLASS[btnType],
        className,
        className?.includes("rounded") ? "" : "rounded-pill"
    );

    const labelClass = cn(
        fredokaBold ? "font-fredoka-bold" : 'font-nunito-bold',
        SIZE_TEXT[size],
        mode === 1 ? LABEL_COLOR[btnType] : LABEL_COLOR_BORDER[btnType],
        labelClassName
    );

    // ── Inner content (shared between gradient + solid) ──────────
    const Content = () => (
        <>
            {icon && <View>{icon}</View>}
            {label && <Text className={labelClass}>{label}</Text>}
            {icon2 && <View>{icon2}</View>}
        </>
    );

    return (
        <Animated.View
            style={[
                { transform: [{ scale }] },
                // shadow on the outer wrapper so it isn't clipped by overflow:hidden
                SHADOWS[btnType],
                SHADOW_SIZES[size],
            ]}
            className={containerClass}
        >
            <TouchableOpacity
                activeOpacity={0.70}
                onPress={handlePress}
                onPressIn={pressIn}
                onPressOut={pressOut}
                disabled={disabled}
            >
                {btnType === "container" && children ?
                    children :
                    isGradient ? (
                        <LinearGradient
                            colors={GRADIENTS[btnType]!}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className={innerClass}
                        >
                            <Content />
                        </LinearGradient>
                    ) : (
                        <View className={innerClass}>
                            <Content />
                        </View>
                    )
                }
            </TouchableOpacity>
        </Animated.View>
    );
}