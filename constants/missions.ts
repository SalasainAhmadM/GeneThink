// ── "Genetics Investigator" missions — clue-by-clue screens shown before a level's quiz ──
// Layout follows the GENTHINK content worksheet: visual → prompt → definition card →
// quick check → feedback → evidence card. Interactive blocks gate everything after them.

import { Choice } from './lessons';

export type MissionVisual =
    | 'family' | 'traitGallery' | 'heredityLine' | 'cellToGene' | 'seedAlleles'
    | 'genotypeTiles' | 'flowerPhenotype' | 'domRec' | 'zygosityChips' | 'flowerCase' | 'seedCase';

// Small icon/colour per genetics term — reused by the Toolkit, evidence cards and the Guide tab.
export interface ToolkitTerm {
    key: string;
    term: string;
    icon: string;
    color: string;
    definition: string;
}

export const TOOLKIT: ToolkitTerm[] = [
    { key: 'trait', term: 'Trait', icon: '👁️', color: '#FF9800', definition: 'Observable characteristic.' },
    { key: 'heredity', term: 'Heredity', icon: '👪', color: '#E91E63', definition: 'Passing of characteristics from parents to offspring.' },
    { key: 'gene', term: 'Gene', icon: '🧬', color: '#4CAF50', definition: 'Segment of DNA containing genetic information related to a characteristic.' },
    { key: 'allele', term: 'Allele', icon: '🔑', color: '#7C4DFF', definition: 'A different form or version of a gene.' },
    { key: 'genotype', term: 'Genotype', icon: '🧩', color: '#00ACC1', definition: 'Combination of alleles for a gene or trait.' },
    { key: 'phenotype', term: 'Phenotype', icon: '🌸', color: '#9C27B0', definition: 'Observable characteristic or expression of a trait.' },
    { key: 'dominant', term: 'Dominant', icon: '👑', color: '#FFB300', definition: 'Expressed in a simple dominant–recessive pattern when paired with a recessive allele.' },
    { key: 'recessive', term: 'Recessive', icon: '🤫', color: '#F44336', definition: 'Expressed when the appropriate recessive genotype is present.' },
    { key: 'homozygous', term: 'Homozygous', icon: '🟰', color: '#1565C0', definition: 'Two identical alleles.' },
    { key: 'heterozygous', term: 'Heterozygous', icon: '🔀', color: '#2E7D32', definition: 'Two different alleles.' },
];

export const getTerm = (key: string) => TOOLKIT.find((t) => t.key === key);

export type MissionBlock =
    | { type: 'visual'; visual: MissionVisual; }
    | { type: 'text'; text: string; }                            // **double-asterisks** = bold
    | { type: 'prompt'; title: string; text: string; reveal?: string; } // "Look for the clue" + highlighted answer
    | { type: 'definition'; term: string; text: string; examples?: string; }
    | { type: 'note'; tone: 'important' | 'tip'; title: string; text: string; }
    | { type: 'rule'; title: string; text: string; steps: string[]; }
    | { type: 'check'; question: string; choices: Choice[]; answer: string; feedbackTitle: string; feedback: string; }
    | { type: 'tapSort'; prompt: string; items: { text: string; correct: boolean; }[]; feedback: string; }
    | { type: 'classify'; prompt: string; options: string[]; rows: { label: string; answer: string; }[]; feedbackTitle: string; feedback: string; }
    | { type: 'caseQuestions'; rows: { q: string; a: string; }[]; }
    | { type: 'fillBlanks'; rows: { text: string; answer: string; }[]; }
    | { type: 'found'; title: string; text: string; }
    | { type: 'evidence'; terms: string[]; }                     // ToolkitTerm keys
    | { type: 'toolkit'; }
    | { type: 'complete'; title: string; text: string; };

export interface MissionScreen {
    id: string;
    kicker?: string;   // small label above the title, e.g. 'Case File 001'
    title: string;     // e.g. 'Clue #1 — Trait'
    blocks: MissionBlock[];
}

export interface LevelMission {
    lessonId: string;
    levelId: number;
    title: string;     // e.g. 'Genetics Investigator'
    mission: string;   // e.g. 'Mission 1'
    tagline: string;   // e.g. 'Crack the Genetic Code'
    screens: MissionScreen[];
}

export const MISSIONS: LevelMission[] = [
    {
        lessonId: 'terms',
        levelId: 1,
        title: 'Genetics Investigator',
        mission: 'Mission 1',
        tagline: 'Crack the Genetic Code',
        screens: [
            {
                id: 'case001',
                kicker: 'Case File 001',
                title: 'The Trait That Came Back',
                blocks: [
                    { type: 'visual', visual: 'family' },
                    { type: 'text', text: 'Meet the **Santos family**. Lola Lita has **curly hair**. Her daughter Pilar has **straight hair**. Pilar\'s daughter Ana has **curly hair**.' },
                    { type: 'text', text: 'Ana looks at an old family photo: “Wait… Lola has curly hair. Mom has straight hair. But I have curly hair too!”' },
                    { type: 'prompt', title: 'The big question', text: 'How could a characteristic appear in a child even when it was not observed in the parent?' },
                    { type: 'text', text: '**Your mission:** Investigate how characteristics can be passed from parents to offspring.' },
                    { type: 'rule', title: "Investigator's Rule", text: 'You will not be given all the answers immediately. Collect the clues carefully.', steps: ['Observe', 'Predict', 'Discover', 'Test', 'Explain'] },
                ],
            },
            {
                id: 'predict',
                title: 'Make Your First Prediction',
                blocks: [
                    {
                        type: 'check',
                        question: 'Why do children often have characteristics similar to their parents?',
                        choices: [
                            { id: 'a', text: "Children copy their parents' appearance." },
                            { id: 'b', text: 'Characteristics can be inherited from parents.' },
                            { id: 'c', text: 'All children have exactly the same characteristics as their parents.' },
                            { id: 'd', text: 'Characteristics appear without any biological basis.' },
                        ],
                        answer: 'b',
                        feedbackTitle: 'Clue found!',
                        feedback: 'Characteristics can be passed from parents to offspring. This process is called **heredity**. But how does this happen? Keep investigating.',
                    },
                ],
            },
            {
                id: 'trait',
                title: 'Clue #1 — Trait',
                blocks: [
                    { type: 'visual', visual: 'traitGallery' },
                    { type: 'prompt', title: 'Look for the clue', text: 'What do these examples have in common?', reveal: 'They are all observable characteristics.' },
                    { type: 'definition', term: 'Trait', text: 'A trait is an **observable characteristic** of an organism.', examples: 'hair texture, eye color, flower color, seed shape' },
                    {
                        type: 'check',
                        question: 'Which is a trait?',
                        choices: [{ id: 'a', text: 'DNA' }, { id: 'b', text: 'Curly hair' }, { id: 'c', text: 'Chromosome' }, { id: 'd', text: 'Allele' }],
                        answer: 'b',
                        feedbackTitle: 'Correct!',
                        feedback: 'Curly hair is an observable characteristic, so it can be described as a trait.',
                    },
                    { type: 'evidence', terms: ['trait'] },
                ],
            },
            {
                id: 'heredity',
                title: 'Clue #2 — Heredity',
                blocks: [
                    { type: 'visual', visual: 'heredityLine' },
                    { type: 'text', text: 'Ana and Lola Lita share a similar characteristic. The passing of characteristics from parents to offspring is called:' },
                    { type: 'definition', term: 'Heredity', text: 'Heredity refers to the **transmission of characteristics** from parents to offspring.' },
                    {
                        type: 'check',
                        question: 'Which situation is an example of heredity?',
                        choices: [
                            { id: 'a', text: 'Carlo learns how to ride a bicycle.' },
                            { id: 'b', text: 'A child has a characteristic similar to a parent.' },
                            { id: 'c', text: 'A student learns a new song.' },
                            { id: 'd', text: 'A plant bends toward sunlight.' },
                        ],
                        answer: 'b',
                        feedbackTitle: 'Correct!',
                        feedback: 'The characteristic is being considered in relation to information passed from parent to offspring.',
                    },
                    { type: 'evidence', terms: ['heredity'] },
                ],
            },
            {
                id: 'gene',
                title: 'Clue #3 — Where Is the Information?',
                blocks: [
                    { type: 'visual', visual: 'cellToGene' },
                    { type: 'text', text: 'If characteristics can be inherited, where is the **biological information** connected with those characteristics?' },
                    { type: 'definition', term: 'Gene', text: 'A gene is a **segment of DNA** that contains information related to a particular characteristic or biological function.' },
                    { type: 'note', tone: 'important', title: 'Important investigator note', text: 'A gene is **not** the same thing as a chromosome. A chromosome contains many genes.' },
                    {
                        type: 'check',
                        question: 'Which statement is correct?',
                        choices: [
                            { id: 'a', text: 'A chromosome can contain genes.' },
                            { id: 'b', text: 'A gene is larger than an entire chromosome.' },
                            { id: 'c', text: 'A gene is a complete cell.' },
                            { id: 'd', text: 'Genes are found only outside cells.' },
                        ],
                        answer: 'a',
                        feedbackTitle: 'Clue found!',
                        feedback: 'Genes are located on chromosomes.',
                    },
                    { type: 'evidence', terms: ['gene'] },
                ],
            },
            {
                id: 'allele',
                title: 'Clue #4 — Different Versions',
                blocks: [
                    { type: 'visual', visual: 'seedAlleles' },
                    { type: 'text', text: 'If the gene is related to seed color, can **different versions** of that gene exist?' },
                    { type: 'definition', term: 'Alleles', text: 'An allele is a **different form or version** of a gene.', examples: 'Gene: seed color · Possible alleles: Y and y' },
                    {
                        type: 'check',
                        question: 'Which statement is correct?',
                        choices: [
                            { id: 'a', text: 'An allele is a version of a gene.' },
                            { id: 'b', text: 'An allele is another name for a cell.' },
                            { id: 'c', text: 'Every allele is an entire chromosome.' },
                            { id: 'd', text: 'Genes and alleles are unrelated.' },
                        ],
                        answer: 'a',
                        feedbackTitle: 'Correct!',
                        feedback: 'You have discovered an important relationship: GENE → can have different ALLELES.',
                    },
                    { type: 'evidence', terms: ['allele'] },
                ],
            },
            {
                id: 'genotype',
                title: 'Clue #5 — The Genetic Code',
                blocks: [
                    { type: 'visual', visual: 'genotypeTiles' },
                    { type: 'text', text: 'These combinations look different. What do they represent?' },
                    { type: 'definition', term: 'Genotype', text: 'A genotype is the **combination of alleles** an organism has for a particular gene or trait.', examples: 'AA, Aa, aa' },
                    {
                        type: 'tapSort',
                        prompt: 'Sort the evidence. Tap only the genotypes.',
                        items: [
                            { text: 'AA', correct: true }, { text: 'purple flowers', correct: false }, { text: 'Aa', correct: true },
                            { text: 'curly hair', correct: false }, { text: 'aa', correct: true }, { text: 'green seeds', correct: false },
                        ],
                        feedback: 'AA, Aa, and aa are genotypes.',
                    },
                    { type: 'evidence', terms: ['genotype'] },
                ],
            },
            {
                id: 'phenotype',
                title: 'Clue #6 — What Can We See?',
                blocks: [
                    { type: 'visual', visual: 'flowerPhenotype' },
                    { type: 'definition', term: 'Phenotype', text: 'A phenotype is an **observable characteristic** or the observable expression of a trait.' },
                    {
                        type: 'check',
                        question: 'Which is a phenotype?',
                        choices: [{ id: 'a', text: 'Aa' }, { id: 'b', text: 'BB' }, { id: 'c', text: 'Purple flowers' }, { id: 'd', text: 'bb' }],
                        answer: 'c',
                        feedbackTitle: 'Correct!',
                        feedback: 'Purple flowers can be observed, so they represent a phenotype.',
                    },
                    { type: 'note', tone: 'tip', title: 'Investigator tip', text: '**GENOTYPE** = genetic combination\n**PHENOTYPE** = observable characteristic' },
                    { type: 'evidence', terms: ['phenotype'] },
                ],
            },
            {
                id: 'domrec',
                title: 'Clue #7 — Dominant or Recessive?',
                blocks: [
                    { type: 'visual', visual: 'domRec' },
                    { type: 'text', text: 'In a simple dominant–recessive inheritance pattern: **A** = dominant allele, **a** = recessive allele.' },
                    { type: 'note', tone: 'important', title: 'Dominant does NOT mean better', text: 'Dominant does not mean stronger, healthier, or more common. It means the allele\'s effect is **expressed in the phenotype** when paired with a recessive allele.\nExample: Aa → dominant phenotype' },
                    {
                        type: 'check',
                        question: 'If B is dominant over b, which genotype contains both a dominant and a recessive allele?',
                        choices: [{ id: 'a', text: 'BB' }, { id: 'b', text: 'Bb' }, { id: 'c', text: 'bb' }, { id: 'd', text: 'B' }],
                        answer: 'b',
                        feedbackTitle: 'Correct!',
                        feedback: 'Bb contains both a dominant and a recessive allele.',
                    },
                    { type: 'evidence', terms: ['dominant', 'recessive'] },
                ],
            },
            {
                id: 'zygosity',
                title: 'Clue #8 — Same or Different?',
                blocks: [
                    { type: 'visual', visual: 'zygosityChips' },
                    {
                        type: 'classify',
                        prompt: 'Sort the evidence: is each genotype homozygous or heterozygous?',
                        options: ['Homozygous', 'Heterozygous'],
                        rows: [
                            { label: 'AA', answer: 'Homozygous' },
                            { label: 'aa', answer: 'Homozygous' },
                            { label: 'Aa', answer: 'Heterozygous' },
                            { label: 'Bb', answer: 'Heterozygous' },
                            { label: 'BB', answer: 'Homozygous' },
                        ],
                        feedbackTitle: 'Genetics tool unlocked!',
                        feedback: 'You can now identify whether a genotype is homozygous or heterozygous.',
                    },
                    { type: 'evidence', terms: ['homozygous', 'heterozygous'] },
                ],
            },
            {
                id: 'toolkit',
                title: 'Build Your Genetics Toolkit',
                blocks: [
                    { type: 'text', text: 'You collected every clue. Here is your **Genetics Investigator Toolkit** — use it to crack the next cases.' },
                    { type: 'toolkit' },
                ],
            },
            {
                id: 'case002',
                kicker: 'Case File 002',
                title: 'The Purple Flower',
                blocks: [
                    { type: 'visual', visual: 'flowerCase' },
                    { type: 'text', text: 'A plant has two alleles for flower color: **P** = purple, **p** = white. The plant has genotype **Pp**. Tap each question to check your answer.' },
                    {
                        type: 'caseQuestions',
                        rows: [
                            { q: 'What is the genotype?', a: 'Pp' },
                            { q: 'Is it homozygous or heterozygous?', a: 'Heterozygous' },
                            { q: 'Which allele is dominant?', a: 'P' },
                            { q: 'Which allele is recessive?', a: 'p' },
                            { q: 'What phenotype is expected?', a: 'Purple flowers' },
                        ],
                    },
                ],
            },
            {
                id: 'explain',
                title: 'Explain Your Evidence',
                blocks: [
                    {
                        type: 'check',
                        question: 'Why did you predict purple flowers?',
                        choices: [
                            { id: 'a', text: 'Because P is dominant and the genotype contains P.' },
                            { id: 'b', text: 'Because Pp is homozygous.' },
                            { id: 'c', text: 'Because lowercase letters are always dominant.' },
                            { id: 'd', text: 'Because phenotype means genotype.' },
                        ],
                        answer: 'a',
                        feedbackTitle: 'Excellent reasoning!',
                        feedback: 'The genotype is **Pp**. The genotype contains the dominant allele P. Under the simple dominant–recessive pattern given in this case, the dominant phenotype is expected.',
                    },
                ],
            },
            {
                id: 'case003',
                kicker: 'Case File 003',
                title: 'The Mystery Seed',
                blocks: [
                    { type: 'visual', visual: 'seedCase' },
                    { type: 'text', text: 'An organism has genotype **Bb**. B = dominant allele, b = recessive allele.' },
                    {
                        type: 'caseQuestions',
                        rows: [
                            { q: 'What is the genotype?', a: 'Bb' },
                            { q: 'Homozygous or heterozygous?', a: 'Heterozygous' },
                            { q: 'Which allele is dominant?', a: 'B' },
                            { q: 'Which allele is recessive?', a: 'b' },
                            { q: 'Which phenotype is expected?', a: 'Dominant phenotype' },
                        ],
                    },
                    {
                        type: 'check',
                        question: 'Final question: which statement best explains the case?',
                        choices: [
                            { id: 'a', text: 'Bb is homozygous because it contains two alleles.' },
                            { id: 'b', text: 'Bb is heterozygous because its two alleles are different.' },
                            { id: 'c', text: 'Bb is a phenotype because it can be observed.' },
                            { id: 'd', text: 'Bb contains two identical recessive alleles.' },
                        ],
                        answer: 'b',
                        feedbackTitle: 'Case closed!',
                        feedback: 'B and b are different alleles, so Bb is heterozygous.',
                    },
                ],
            },
            {
                id: 'quickcheck',
                title: "The Investigator's Quick Check",
                blocks: [
                    {
                        type: 'fillBlanks',
                        rows: [
                            { text: 'A visible characteristic is a…', answer: 'trait / phenotype' },
                            { text: 'A different form of a gene is called an…', answer: 'allele' },
                            { text: 'The combination of alleles is the…', answer: 'genotype' },
                            { text: 'Two identical alleles are described as…', answer: 'homozygous' },
                            { text: 'Two different alleles are described as…', answer: 'heterozygous' },
                        ],
                    },
                    { type: 'complete', title: 'Mission complete!', text: 'Congratulations, Genetics Investigator! You have collected the first set of genetics tools. You can now explain how heredity is connected to traits and distinguish important genetic terms.' },
                    { type: 'note', tone: 'tip', title: 'But the investigation is not over…', text: 'More than a century ago, a scientist carefully crossed pea plants and recorded what happened to their offspring. Can you discover the pattern he found? Head to **Mendel\'s Laws** next.' },
                ],
            },
        ],
    },
];

export function getMission(lessonId: string, levelId: number): LevelMission | undefined {
    return MISSIONS.find((m) => m.lessonId === lessonId && m.levelId === levelId);
}
