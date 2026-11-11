// Terms that become tappable (underlined, with a 👆 hint) inside questions.
// Longer phrases first so "genotypic ratio" wins over "genotype".
export interface GlossaryEntry {
    term: string;
    match: RegExp;
    definition: string;
}

const entry = (term: string, pattern: string, definition: string): GlossaryEntry => ({
    term, definition, match: new RegExp(`\\b(${pattern})\\b`, 'i'),
});

export const GLOSSARY: GlossaryEntry[] = [
    entry('Genotypic ratio', 'genotypic ratios?|genotype ratios?', 'The ratio of the different genotypes among the offspring. Count how many times each genotype appears in the Punnett square, e.g. 1 TT : 2 Tt : 1 tt.'),
    entry('Phenotypic ratio', 'phenotypic ratios?|phenotype ratios?', 'The ratio of the observable traits among the offspring. Group genotypes with the same phenotype, e.g. 3 tall : 1 short.'),
    entry('Punnett square', 'punnett squares?', 'A chart that predicts the possible genotypes and phenotypes of offspring from the parents’ gametes.'),
    entry('Independent assortment', 'independent assortment', 'Alleles of different genes separate independently of each other when gametes form.'),
    entry('Monohybrid cross', 'monohybrid cross(?:es)?', 'A cross that studies ONE trait, e.g. Tt × Tt.'),
    entry('Dihybrid cross', 'dihybrid cross(?:es)?', 'A cross that studies TWO traits at the same time, e.g. RrYy × RrYy.'),
    entry('Homozygous', 'homozygous', 'Having two identical alleles for a gene, e.g. TT or tt.'),
    entry('Heterozygous', 'heterozygous', 'Having two different alleles for a gene, e.g. Tt.'),
    entry('Genotype', 'genotypes?', 'The combination of alleles an organism has, e.g. Tt.'),
    entry('Phenotype', 'phenotypes?', 'The observable characteristic or trait, e.g. tall or purple.'),
    entry('Allele', 'alleles?', 'A different form or version of a gene, e.g. T or t.'),
    entry('Dominant', 'dominant', 'An allele whose trait shows even with just one copy. Written in uppercase.'),
    entry('Recessive', 'recessive', 'An allele whose trait shows only with two copies. Written in lowercase.'),
    entry('Gamete', 'gametes?', 'A sex cell (egg or pollen/sperm). Each gamete carries ONE allele of each gene.'),
    entry('Segregation', 'segregation|segregate', 'The separation of the two alleles of a gene when gametes form.'),
    entry('True-breeding', 'true-breeding|purebred', 'A plant that always produces offspring with the same trait (homozygous).'),
];

/** Split text into plain and glossary segments; each term is linked once (first occurrence). */
export function splitGlossary(text: string): { text: string; entry?: GlossaryEntry; }[] {
    const out: { text: string; entry?: GlossaryEntry; }[] = [];
    const used = new Set<string>();
    let rest = text;
    while (rest.length) {
        let best: { idx: number; len: number; e: GlossaryEntry; } | null = null;
        for (const e of GLOSSARY) {
            if (used.has(e.term)) continue;
            const m = e.match.exec(rest);
            if (m && (best === null || m.index < best.idx || (m.index === best.idx && m[0].length > best.len))) best = { idx: m.index, len: m[0].length, e };
        }
        if (!best) { out.push({ text: rest }); break; }
        if (best.idx > 0) out.push({ text: rest.slice(0, best.idx) });
        out.push({ text: rest.slice(best.idx, best.idx + best.len), entry: best.e });
        used.add(best.e.term);
        rest = rest.slice(best.idx + best.len);
    }
    return out;
}
