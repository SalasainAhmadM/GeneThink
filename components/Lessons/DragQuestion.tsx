/**
 * components/Lessons/DragQuestion.tsx
 * Real drag-and-drop Punnett Square.
 * Chips use PanResponder — drag onto any cell to auto-fill.
 * Correctness is not revealed here — the answer key shows after the level ends.
 */

import { Question } from '@/constants/lessons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../ui/Button';

// ── Allele combinator ─────────────────────────────────────────
const COMBOS: Record<string, string> = {
    'T+T': 'TT', 'T+t': 'Tt', 't+T': 'Tt', 't+t': 'tt',
    'A+A': 'AA', 'A+a': 'Aa', 'a+A': 'Aa', 'a+a': 'aa',
    'P+P': 'PP', 'P+p': 'Pp', 'p+P': 'Pp', 'p+p': 'pp',
    'B+B': 'BB', 'B+b': 'Bb', 'b+B': 'Bb', 'b+b': 'bb',
    'R+R': 'RR', 'R+r': 'Rr', 'r+R': 'Rr', 'r+r': 'rr',
    'G+G': 'GG', 'G+g': 'Gg', 'g+G': 'Gg', 'g+g': 'gg',
};

// ── Helpers ───────────────────────────────────────────────────
const chipColor = (a: string) => {
    // Color by the dominant allele in the combo
    const hasUpperCase = a.split('').some(c => c === c.toUpperCase() && c !== c.toLowerCase());
    const allUpperCase = a.split('').every(c => c === c.toUpperCase());
    return allUpperCase ? '#1565C0'       // TT → full blue
        : hasUpperCase ? '#7B1FA2'      // Tt → purple (mixed)
            : '#FF5722';     // tt → orange
};

// ── Draggable allele chip ─────────────────────────────────────
function DraggableChip({
    allele,
    onDrop,
    disabled,
    onActiveChange,
}: {
    allele: string;
    onDrop: (moveX: number, moveY: number, value: string) => void;
    disabled: boolean;
    onActiveChange?: (active: boolean) => void;
}) {
    const pan = useRef(new Animated.ValueXY()).current;
    const [active, setActive] = useState(false);

    const responder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled,
            onMoveShouldSetPanResponder: () => !disabled,

            onPanResponderGrant: () => {
                setActive(true);
                onActiveChange?.(true);
                pan.setOffset({
                    x: (pan.x as any)._value,
                    y: (pan.y as any)._value,
                });
                pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),

            onPanResponderRelease: (_, g) => {
                setActive(false);
                onActiveChange?.(false);
                pan.flattenOffset();
                onDrop(g.moveX, g.moveY, allele);
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                    bounciness: 10,
                    speed: 18,
                }).start();
            },

            onPanResponderTerminate: () => {
                setActive(false);
                onActiveChange?.(false);
                pan.flattenOffset();
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    const color = chipColor(allele);

    return (
        <Animated.View
            {...responder.panHandlers}
            style={[
                pan.getLayout(),
                {
                    zIndex: active ? 999 : 1,
                    elevation: active ? 20 : 4,
                },
            ]}
        >
            <Animated.View
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: color,
                    shadowOpacity: active ? 0.65 : 0.4,
                    shadowRadius: active ? 14 : 6,
                    elevation: active ? 16 : 4,
                    transform: [{ scale: active ? 1.12 : 1 }],
                }}
            >
                <Text
                    style={{ fontFamily: 'Fredoka-Bold', fontSize: 24, color: '#fff' }}
                >
                    {allele}
                </Text>
            </Animated.View>
        </Animated.View>
    );
}

// ── Main component ────────────────────────────────────────────
interface Props {
    quizNumberLabel: string;
    showHint: boolean;
    question: Question;
    onAnswered: (correct: boolean, userAnswer?: string[]) => void;
    accentColor: string;
    isLast: boolean;
}

export default function DragQuestion({
    quizNumberLabel,
    showHint,
    question,
    onAnswered,
    accentColor,
    isLast,
}: Props) {
    const pA = question.parentA ?? [];
    const pB = question.parentB ?? [];
    const expected = question.dragAnswers ?? [];

    const [cells, setCells] = useState(['', '', '', '']);
    const [submitting, setSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const cellRefs = useRef<Array<View | null>>([]);

    // Extract the two unique single alleles from parents (e.g. "T" and "t")
    const allSingleAlleles = [...new Set([...pA, ...pB])];
    const upper = allSingleAlleles.find(a => a === a.toUpperCase() && isNaN(Number(a))) ?? pA[0];
    const lower = allSingleAlleles.find(a => a !== a.toUpperCase()) ?? pB[0];

    // Always show all 3 possible combo chips — student must pick correctly
    // e.g. for T/t cross: ["TT", "Tt", "tt"] always shown
    const answerChips = [
        `${upper}${upper}`,   // TT — homozygous dominant
        `${upper}${lower}`,   // Tt — heterozygous
        `${lower}${lower}`,   // tt — homozygous recessive
    ];

    // Called when a chip is released anywhere on screen
    const handleDrop = (moveX: number, moveY: number, draggedValue: string) => {
        if (submitting) return;

        cellRefs.current.forEach((ref, idx) => {
            ref?.measureInWindow((cx, cy, cw, ch) => {
                if (
                    moveX >= cx &&
                    moveX <= cx + cw &&
                    moveY >= cy &&
                    moveY <= cy + ch
                ) {
                    setCells((prev) => {
                        const next = [...prev];
                        next[idx] = draggedValue;
                        return next;
                    });
                }
            });
        });
    };

    const allFilled = cells.every((c) => c !== '');

    const check = () => {
        if (!allFilled || submitting) return;
        setSubmitting(true);
        const ok = expected.every((ans, i) => cells[i] === ans);
        onAnswered(ok, cells);
    };

    const reset = () => {
        setCells(['', '', '', '']);
    };

    const diffLabel =
        question.difficulty === 'easy'
            ? 'Beginner 🌱'
            : question.difficulty === 'medium'
                ? 'Explorer 🔥'
                : 'Scientist 🔬';

    return (
        <View className="gap-4 pb-8">
            {/* Difficulty / type / question number */}
            <View className="flex-row gap-2 items-center">
                <View className="rounded-pill px-3 py-2" style={{ backgroundColor: accentColor + '33' }}>
                    <Text className="font-nunito-bold text-xs" style={{ color: accentColor }}>
                        {diffLabel}
                    </Text>
                </View>
                <Text className="font-nunito text-ink-200 text-xs">🎯 Drag & Drop</Text>
                <View className="rounded-lg py-2 px-3 ml-auto" style={{ backgroundColor: accentColor + '33' }}>
                    <Text className="font-nunito-bold text-xs" style={{ color: accentColor }}>
                        {quizNumberLabel}
                    </Text>
                </View>
            </View>

            {/* Hint */}
            {showHint && (
                <View className="bg-[#fffde7] rounded-xl px-4 py-3 border-2 border-amber">
                    <Text className="font-nunito text-ink-400 text-sm leading-5">
                        💡 <Text className="font-nunito-bold">Hint:</Text> {question.hint}
                    </Text>
                </View>
            )}

            {/* Question card */}
            <View
                className="bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="font-nunito text-ink-100 text-xs uppercase tracking-wide mb-1">
                    DRAG & DROP · PUNNETT SQUARE
                </Text>
                <Text className="font-nunito-bold text-ink-300 text-base leading-6">
                    {question.question}
                </Text>
            </View>

            {/* Draggable allele chips — NOW ONLY 2 CHIPS */}
            <View
                className="bg-white rounded-2xl px-4 py-4"
                style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    elevation: isDragging ? 10 : 2,
                    zIndex: isDragging ? 10 : undefined,
                }}
            >
                <Text className="font-nunito text-ink-100 text-xs text-center mb-4">
                    Drag alleles into the cells below 👇
                </Text>
                <View
                    className="flex-row justify-center gap-4"
                    style={{ overflow: 'visible' }}
                >
                    {answerChips.map((a, i) => (
                        <DraggableChip
                            key={i}
                            allele={a}
                            onDrop={handleDrop}
                            disabled={submitting}
                            onActiveChange={setIsDragging}
                        />
                    ))}
                </View>
            </View>

            {/* Punnett grid */}
            <View
                className="bg-white rounded-2xl p-4"
                style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
            >
                <Text className="font-fredoka-bold text-ink-300 text-base text-center mb-3">
                    Punnett Square
                </Text>

                {/* Column headers */}
                <View className="flex-row ml-12 mb-2">
                    {pA.map((a, i) => (
                        <View key={i} className="flex-1 items-center">
                            <Text
                                className="font-fredoka-bold text-xl"
                                style={{ color: chipColor(a) }}
                            >
                                {a}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Rows */}
                {[0, 1].map((row) => (
                    <View key={row} className="flex-row items-center mb-3">
                        {/* Row header */}
                        <View className="w-12 items-center">
                            <Text
                                className="font-fredoka-bold text-xl"
                                style={{ color: chipColor(pB[row]) }}
                            >
                                {pB[row]}
                            </Text>
                        </View>

                        {/* Cells — now tap to clear */}
                        {[0, 1].map((col) => {
                            const idx = row * 2 + col;
                            const val = cells[idx];

                            const bg = val ? accentColor + '18' : '#F8F9FA';
                            const border = val ? accentColor : '#E0E0E0';
                            const dashed = !val;

                            return (
                                <TouchableOpacity
                                    key={col}
                                    ref={(el) => { cellRefs.current[idx] = el as View | null; }}
                                    className="flex-1 mx-1 h-16 items-center justify-center rounded-xl"
                                    style={{
                                        backgroundColor: bg,
                                        borderWidth: 2,
                                        borderColor: border,
                                        borderStyle: dashed ? 'dashed' : 'solid',
                                    }}
                                    onPress={() => {
                                        if (submitting || !val) return;
                                        setCells((prev) => {
                                            const next = [...prev];
                                            next[idx] = '';
                                            return next;
                                        });
                                    }}
                                    activeOpacity={0.7}
                                >
                                    {val ? (
                                        <Text
                                            className="font-fredoka-bold text-lg"
                                            style={{ color: '#333' }}
                                        >
                                            {val}
                                        </Text>
                                    ) : (
                                        <Text className="font-nunito text-xs text-ink-100">
                                            drop here
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}

                <Text className="font-nunito text-ink-100 text-xs text-center mt-1">
                    Drag a chip and drop it onto a cell
                </Text>
            </View>

            {/* Reset + Submit — advances without revealing correctness */}
            <View className="flex-row gap-3">
                <Button
                    label="Reset"
                    btnType="ghost"
                    size="md"
                    className="flex-1"
                    disabled={submitting}
                    onPress={reset}
                />
                <Button
                    label={isLast ? 'Finish Level ✓' : 'Submit Answer'}
                    btnType="primary"
                    size="md"
                    fredokaBold
                    disabled={!allFilled || submitting}
                    onPress={check}
                    className="flex-[2]"
                />
            </View>
        </View>
    );
}