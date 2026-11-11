import { GlossaryEntry, splitGlossary } from '@/constants/glossary';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

// Question text where key terms are tappable (coloured + underlined + 👆).
// Tapping a term opens its "What is …?" card below the text. **bold** is supported.
export default function GlossaryText({ text, className, color = '#1565C0' }: { text: string; className?: string; color?: string; }) {
    const [open, setOpen] = useState<GlossaryEntry | null>(null);

    const parts = text.split(/(\*\*[^*]+\*\*)/g).flatMap((chunk) => {
        const bold = chunk.startsWith('**') && chunk.endsWith('**');
        const body = bold ? chunk.slice(2, -2) : chunk;
        return splitGlossary(body).map((p) => ({ ...p, bold }));
    });

    return (
        <View>
            <Text className={className}>
                {parts.map((p, i) => p.entry ? (
                    <Text key={i} onPress={() => setOpen(open?.term === p.entry!.term ? null : p.entry!)} style={{ color, textDecorationLine: 'underline', fontWeight: p.bold ? '700' : undefined }}>
                        {p.text}<Text style={{ textDecorationLine: 'none' }}> 👆</Text>
                    </Text>
                ) : (
                    <Text key={i} className={p.bold ? 'font-nunito-extrabold' : undefined}>{p.text}</Text>
                ))}
            </Text>
            {open && (
                <Pressable onPress={() => setOpen(null)}>
                    <View className='mt-2 rounded-xl px-3 py-2.5 border-2 bg-science-100' style={{ borderColor: color + '55' }}>
                        <Text className='font-fredoka-bold text-sm' style={{ color }}>📖 What is {open.term}?</Text>
                        <Text className='font-nunito text-ink-600 text-[13px] leading-5 mt-0.5'>{open.definition}</Text>
                        <Text className='font-nunito text-ink-100 text-[10px] mt-1'>Tap to close</Text>
                    </View>
                </Pressable>
            )}
        </View>
    );
}
