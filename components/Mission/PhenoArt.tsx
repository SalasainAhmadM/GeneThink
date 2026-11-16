import { genes, PEA_TRAITS } from '@/lib/genetics';
import React from 'react';
import { View } from 'react-native';
import { Flower, Plant, Pod, Seed } from './MissionVisuals';

// Phenotype pictures for pea-plant genotypes, so every Punnett box shows what the
// offspring looks like (purple / white flower, round / wrinkled, yellow / green seed…),
// with the box and the genotype text tinted to match — like the textbook squares.
//
// Letters follow PEA_TRAITS: P flower color · R seed shape · Y seed color ·
// G pod color · I pod shape · T plant height · A flower position.
// Any other letter (e.g. the chicken C/B cross) gets no art and the default colours.

export const PEA = {
    seedYellow: '#FDD835', seedGreen: '#7CB342',
    flowerPurple: '#8E24AA', flowerWhite: '#FAFAFA',
    podGreen: '#66BB6A', podYellow: '#FDD835',
};

export type Tone = { text: string; bg: string; border: string; };
export const TONES = {
    yellow: { text: '#B07A00', bg: '#FFF8E1', border: '#FFD54F' },
    green: { text: '#2E7D32', bg: '#E8F5E9', border: '#A5D6A7' },
    purple: { text: '#7B1FA2', bg: '#F3E5F5', border: '#CE93D8' },
    white: { text: '#6D6A85', bg: '#FFFFFF', border: '#DAD5EA' },
} satisfies Record<string, Tone>;

const PEA_LETTERS = new Set(Object.values(PEA_TRAITS).map((t) => t.letter));
const TRAIT_BY_LETTER = Object.fromEntries(Object.values(PEA_TRAITS).map((t) => [t.letter, t]));

/** Does this genotype use only pea-plant letters we can draw? */
export const isPea = (genotype: string) => genes(genotype).length > 0 && genes(genotype).every((p) => PEA_LETTERS.has(p[0].toUpperCase()));

/** 'RrYy' → 'Round Yellow' */
export const peaPhenotype = (genotype: string) =>
    genes(genotype).map((p) => { const t = TRAIT_BY_LETTER[p[0].toUpperCase()]; return p[0] === p[0].toUpperCase() ? t.dominant : t.recessive; }).join(' ');

/** Tint for a genotype's box, from the most colourful trait it carries (null → caller's default) */
export function phenoTone(genotype: string): Tone | null {
    if (!isPea(genotype)) return null;
    const dom: Record<string, boolean> = {};
    genes(genotype).forEach((p) => { dom[p[0].toUpperCase()] = p[0] === p[0].toUpperCase(); });
    if ('Y' in dom) return dom.Y ? TONES.yellow : TONES.green;
    if ('P' in dom) return dom.P ? TONES.purple : TONES.white;
    if ('G' in dom) return dom.G ? TONES.green : TONES.yellow;
    if ('R' in dom) return TONES.yellow; // yellow seeds either way; the shape tells them apart
    return null;
}

/** The offspring's picture (null when the letters aren't pea traits) */
export function PhenoArt({ genotype, size = 34 }: { genotype: string; size?: number; }) {
    if (!isPea(genotype)) return null;
    const dom: Record<string, boolean> = {};
    genes(genotype).forEach((p) => { dom[p[0].toUpperCase()] = p[0] === p[0].toUpperCase(); });

    const pieces: React.ReactNode[] = [];
    const s = Object.keys(dom).length > 1 && !('R' in dom && 'Y' in dom) ? size * 0.7 : size;
    if ('R' in dom || 'Y' in dom) {
        pieces.push(<Seed key='seed' color={'Y' in dom && !dom.Y ? PEA.seedGreen : PEA.seedYellow} wrinkled={'R' in dom && !dom.R} size={s} />);
    }
    if ('P' in dom) pieces.push(<Flower key='flower' color={dom.P ? PEA.flowerPurple : PEA.flowerWhite} size={s} />);
    if ('G' in dom || 'I' in dom) {
        pieces.push(<Pod key='pod' color={'G' in dom && !dom.G ? PEA.podYellow : PEA.podGreen} constricted={'I' in dom && !dom.I} size={s * 1.15} />);
    }
    if ('T' in dom || 'A' in dom) {
        pieces.push(<Plant key='plant' tall={!('T' in dom) || dom.T} terminal={'A' in dom && !dom.A} flower={'A' in dom ? PEA.flowerPurple : undefined} size={s} />);
    }
    return <View className='flex-row items-center justify-center'>{pieces}</View>;
}
