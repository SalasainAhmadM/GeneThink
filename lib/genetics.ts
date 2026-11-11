// ── Tiny genetics engine for Punnett-square practice ──────────
// Genotypes are written gene-by-gene, two letters per gene, e.g. 'Tt', 'RrGg'.
// Rule from the worksheet: write the dominant (uppercase) allele before the recessive one.

export interface TraitDef {
    letter: string;      // uppercase letter, e.g. 'P'
    trait: string;       // e.g. 'Flower color'
    dominant: string;    // e.g. 'Purple'
    recessive: string;   // e.g. 'White'
}

/** Split 'RrGg' → ['Rr', 'Gg'] */
export const genes = (genotype: string): string[] => genotype.match(/../g) ?? [];

/** Dominant allele first: 'tT' → 'Tt' */
export const orderPair = (a: string, b: string) =>
    (a === a.toUpperCase() && b !== b.toUpperCase()) || a === b ? a + b : b === b.toUpperCase() && a !== a.toUpperCase() ? b + a : a + b;

/** Gametes via FOIL (First, Outer, Inner, Last). 'Tt' → ['T','t']; 'RrGg' → ['RG','Rg','rG','rg'] */
export function gametes(genotype: string): string[] {
    const g = genes(genotype);
    if (g.length === 1) return [g[0][0], g[0][1]];
    if (g.length === 2) {
        const [a, b] = g;
        return [a[0] + b[0], a[0] + b[1], a[1] + b[0], a[1] + b[1]];
    }
    return [];
}

/** Combine two gametes into an offspring genotype: ('Rg', 'rG') → 'RrGg' */
export const combine = (g1: string, g2: string) =>
    g1.split('').map((a, i) => orderPair(a, g2[i])).join('');

/** Full square, row by row: rows = left gametes, columns = top gametes */
export const squareCells = (top: string[], left: string[]) =>
    left.flatMap((l) => top.map((t) => combine(t, l)));

/** All genotype classes in textbook order, e.g. ['TT','Tt','tt'] or 9 dihybrid classes */
export function genotypeClasses(letters: string[]): string[] {
    const per = letters.map((L) => [L + L, L + L.toLowerCase(), L.toLowerCase() + L.toLowerCase()]);
    return per.reduce<string[]>((acc, opts) => acc.flatMap((a) => opts.map((o) => a + o)), ['']);
}

const isDominant = (pair: string) => pair[0] !== pair[0].toLowerCase();

/** Phenotype class labels, e.g. ['Purple', 'White'] or ['Round Green', 'Round Yellow', ...] */
export function phenotypeClasses(traits: TraitDef[]): string[] {
    const per = traits.map((t) => [t.dominant, t.recessive]);
    return per.reduce<string[]>((acc, opts) => acc.flatMap((a) => opts.map((o) => (a ? a + ' ' : '') + o)), ['']);
}

export function phenotypeOf(genotype: string, traits: TraitDef[]): string {
    return genes(genotype).map((p, i) => (isDominant(p) ? traits[i].dominant : traits[i].recessive)).join(' ');
}

export interface CrossResult {
    top: string[];
    left: string[];
    cells: string[];
    genoClasses: string[];
    genoCounts: number[];
    phenoClasses: string[];
    phenoCounts: number[];
}

/** Parent 1 gametes go across the top, parent 2 down the side */
export function cross(p1: string, p2: string, traits: TraitDef[]): CrossResult {
    const top = gametes(p1);
    const left = gametes(p2);
    const cells = squareCells(top, left);
    const genoClasses = genotypeClasses(traits.map((t) => t.letter));
    const phenoClasses = phenotypeClasses(traits);
    return {
        top, left, cells,
        genoClasses,
        genoCounts: genoClasses.map((g) => cells.filter((c) => c === g).length),
        phenoClasses,
        phenoCounts: phenoClasses.map((p) => cells.filter((c) => phenotypeOf(c, traits) === p).length),
    };
}

/** Same multiset? (order doesn't matter) */
export const sameItems = (a: string[], b: string[]) =>
    a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

/** Is `user` the same ratio as `actual`? 1:2:1 == 2:4:2, zeros must match */
export function sameRatio(user: number[], actual: number[]): boolean {
    if (user.length !== actual.length || user.every((n) => !n)) return false;
    for (let i = 0; i < user.length; i++)
        for (let j = 0; j < user.length; j++)
            if (user[i] * actual[j] !== user[j] * actual[i]) return false;
    return true;
}

/** Reduce counts to the simplest whole-number ratio: [2,4,2] → [1,2,1] */
export function simplify(counts: number[]): number[] {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const d = counts.filter(Boolean).reduce(gcd, 0) || 1;
    return counts.map((c) => c / d);
}

// ── Mendel's seven pea-plant traits (used by the Lab and the trait table) ──
export const PEA_TRAITS: Record<string, TraitDef> = {
    seedColor: { letter: 'Y', trait: 'Seed color', dominant: 'Yellow', recessive: 'Green' },
    seedShape: { letter: 'R', trait: 'Seed shape', dominant: 'Round', recessive: 'Wrinkled' },
    flowerColor: { letter: 'P', trait: 'Flower color', dominant: 'Purple', recessive: 'White' },
    podColor: { letter: 'G', trait: 'Pod color', dominant: 'Green', recessive: 'Yellow' },
    podShape: { letter: 'I', trait: 'Pod shape', dominant: 'Inflated', recessive: 'Constricted' },
    flowerPosition: { letter: 'A', trait: 'Flower position', dominant: 'Axial', recessive: 'Terminal' },
    plantHeight: { letter: 'T', trait: 'Plant height', dominant: 'Tall', recessive: 'Short' },
};
