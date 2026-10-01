// ── Comic-strip "Story" reading content — shown before a level's quiz ──
// Mirrors the Lesson/Level/Question shape in constants/lessons.ts.

export type StoryCharacterKey = 'guide' | 'chromosome' | 'dna' | 'gene' | 'mendel';

export interface StoryCharacterMeta {
    name: string;
    letter: string;
    color: string;
}

// Shared per-character styling — used by the mascot avatar in speech bubbles.
export const STORY_CHARACTERS: Record<StoryCharacterKey, StoryCharacterMeta> = {
    guide: { name: 'You', letter: 'Y', color: '#1565C0' },
    chromosome: { name: 'Chromosome', letter: 'C', color: '#7C4DFF' },
    dna: { name: 'DNA', letter: 'D', color: '#00ACC1' },
    gene: { name: 'Gene', letter: 'G', color: '#4CAF50' },
    mendel: { name: 'Mendel', letter: 'M', color: '#9C27B0' },
};

export type StoryIllustration =
    | 'cell' | 'chromosome' | 'dna' | 'gene' | 'flow' | 'alleles' | 'summary'
    | 'mendel' | 'punnettGrid' | 'segregation' | 'assort' | 'blend' | 'codominance'
    | 'polygenic' | 'sexChromosomes' | 'testcross' | 'dihybridGrid' | 'foil'
    | 'geneFlow' | 'traits' | 'zygosity' | 'peaTraits' | 'generations' | 'seeds'
    | 'meiosis' | 'gametes4' | 'monoGrid' | 'dihybridSquare' | 'genotypeRatio' | 'parentGametes';

export interface StoryLine {
    speaker: StoryCharacterKey;
    text: string;
}

export interface StoryPanel {
    id: string;
    title: string;
    illustration: StoryIllustration;
    lines: StoryLine[];
    note?: string; // optional callout, styled like the hint box in MCQQuestion
    genotype?: string; // 'foil' — two-gene genotype to split, e.g. 'YyRr'
    fill?: number; // 'monoGrid' / 'dihybridSquare' — how many boxes are filled in (row by row)
    references?: string[]; // small citation lines under the panel
}

const CAMPBELL = 'Urry, L. A., Cain, M. L., Wasserman, S. A., Minorsky, P. V., & Orr, R. B. (2021). Campbell Biology (12th ed.). Pearson.';
const OPENSTAX = 'Clark, M. A., Choi, J., & Douglas, M. (2018). Biology 2e. OpenStax, Rice University.';
const UNL_FOIL = 'Adapted from: University of Nebraska, Board of Regents. (2000). FOIL method. University of Nebraska–Lincoln.';

export interface LevelStory {
    lessonId: string;
    levelId: number;
    panels: StoryPanel[];
}

export const STORIES: LevelStory[] = [
    // ══════════════════════════════════════════════════════════
    //  Intro to Genetics — Level 1: The Basics
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'intro',
        levelId: 1,
        panels: [
            {
                id: 'cell',
                title: 'Welcome to the Cell!',
                illustration: 'cell',
                lines: [
                    { speaker: 'guide', text: "I've always wondered... why do I look like my parents?" },
                    { speaker: 'guide', text: "Let's go inside a cell and find out!" },
                ],
            },
            {
                id: 'chromosome',
                title: 'Meet Mr. Chromosome',
                illustration: 'chromosome',
                lines: [
                    { speaker: 'chromosome', text: "Hi! I'm Chromosome." },
                    { speaker: 'chromosome', text: 'I live inside the nucleus of almost every cell.' },
                    { speaker: 'chromosome', text: 'I organize and protect your genetic information.' },
                ],
                note: 'Chromosome = tightly packed DNA + proteins',
            },
            {
                id: 'dna',
                title: 'Meet Miss DNA',
                illustration: 'dna',
                lines: [
                    { speaker: 'dna', text: "Hello! I'm DNA — Deoxyribonucleic Acid." },
                    { speaker: 'dna', text: 'I store the instructions that tell your body how to grow and function.' },
                    { speaker: 'dna', text: "Think of me as your body's instruction manual." },
                ],
            },
            {
                id: 'gene',
                title: 'Meet Gene',
                illustration: 'gene',
                lines: [
                    { speaker: 'gene', text: "I'm Gene — just a small section of DNA." },
                    { speaker: 'gene', text: 'Each gene contains instructions for making a specific protein.' },
                    { speaker: 'gene', text: 'Those proteins help determine inherited traits like eye color, blood type, and hair texture.' },
                ],
                note: "Teacher note: a gene doesn't directly make a trait. It contains instructions for making proteins that influence traits.",
            },
            {
                id: 'relation',
                title: "How We're Related",
                illustration: 'flow',
                lines: [
                    { speaker: 'chromosome', text: 'I contain DNA.' },
                    { speaker: 'dna', text: 'I contain many genes.' },
                    { speaker: 'gene', text: 'Together, we help build and maintain your body!' },
                ],
            },
            {
                id: 'important',
                title: 'Why Are We Important?',
                illustration: 'traits',
                lines: [
                    { speaker: 'gene', text: 'We help determine many inherited characteristics — brown eyes, curly hair, dimples, freckles...' },
                    { speaker: 'dna', text: 'We carry the instructions your cells use every day.' },
                    { speaker: 'chromosome', text: "Without us, cells couldn't properly store or pass on genetic information." },
                ],
            },
            {
                id: 'summary',
                title: 'The Big Summary',
                illustration: 'summary',
                lines: [
                    { speaker: 'chromosome', text: 'I protect the DNA.' },
                    { speaker: 'dna', text: 'I store the genetic instructions.' },
                    { speaker: 'gene', text: 'I carry the instructions for specific proteins that influence traits.' },
                    { speaker: 'guide', text: 'Now I understand!' },
                ],
            },
            {
                id: 'info-flow',
                title: 'The Flow of Genetic Information',
                illustration: 'geneFlow',
                lines: [
                    { speaker: 'guide', text: 'Chromosomes in the nucleus contain DNA. DNA contains many genes.' },
                    { speaker: 'guide', text: 'Genes provide instructions for proteins, and proteins carry out jobs in the body that shape the traits we can see!' },
                ],
                note: 'Remember: Every cell has this amazing team working together!',
                references: [CAMPBELL, OPENSTAX],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Intro to Genetics — Level 2: Inheritance Patterns
    //  (adapted from "The Genetics Story: From Genes to Mendel's Discovery")
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'intro',
        levelId: 2,
        panels: [
            {
                id: 'gene-allele',
                title: 'What Is a Gene and an Allele?',
                illustration: 'dna',
                lines: [
                    { speaker: 'guide', text: "Let's learn how traits are passed from parents to offspring!" },
                    { speaker: 'gene', text: "A GENE is a segment of DNA that contains the instructions for a specific trait — like flower color." },
                    { speaker: 'gene', text: 'An ALLELE is a different version of a gene — like a purple flower or a white flower.' },
                ],
            },
            {
                id: 'dominant-recessive',
                title: 'Dominant vs. Recessive Alleles',
                illustration: 'alleles',
                lines: [
                    { speaker: 'gene', text: 'Alleles come in pairs. One may be DOMINANT and the other RECESSIVE.' },
                    { speaker: 'gene', text: 'A dominant allele always shows up in the appearance when it is present.' },
                    { speaker: 'gene', text: 'A recessive allele only shows up when two copies are present.' },
                ],
                note: 'We use letters for alleles: A = dominant (CAPITAL), a = recessive (lowercase).',
            },
            {
                id: 'zygosity',
                title: 'Homozygous vs. Heterozygous',
                illustration: 'zygosity',
                lines: [
                    { speaker: 'gene', text: 'HOMOZYGOUS means two identical alleles for a gene — AA or aa. It is "pure" for that trait.' },
                    { speaker: 'gene', text: 'HETEROZYGOUS means two different alleles — Aa. It is not pure for that trait.' },
                    { speaker: 'guide', text: 'So AA and aa are homozygous, while Aa is heterozygous!' },
                ],
                note: 'AA shows the dominant trait. Aa ALSO shows the dominant trait. Only aa shows the recessive trait.',
            },
            {
                id: 'meet-mendel',
                title: "Mendel's Experiment",
                illustration: 'mendel',
                lines: [
                    { speaker: 'mendel', text: 'I was a monk who studied pea plants. I wanted to know how traits are passed from parents to offspring.' },
                    { speaker: 'mendel', text: 'I carefully crossed pea plants with different traits and recorded the results for many generations.' },
                ],
            },
            {
                id: 'pea-traits',
                title: 'Pea Plant Traits Studied by Mendel',
                illustration: 'peaTraits',
                lines: [
                    { speaker: 'mendel', text: 'I studied 7 pairs of contrasting traits. Each trait has a dominant and a recessive form.' },
                ],
                note: 'Example: purple flowers (P) are dominant over white flowers (p).',
            },
            {
                id: 'generations',
                title: "How Mendel's Experiment Worked",
                illustration: 'generations',
                lines: [
                    { speaker: 'mendel', text: 'I crossed a pure-breeding purple plant (PP) with a pure-breeding white plant (pp).' },
                    { speaker: 'guide', text: 'All F1 plants were purple! Why? Because purple (P) is dominant over white (p).' },
                    { speaker: 'mendel', text: 'Then I let the F1 plants self-cross (Pp × Pp). In F2: 3 purple : 1 white!' },
                    { speaker: 'guide', text: 'So the white trait reappears when two recessive alleles pair together (pp)!' },
                ],
                note: 'F2 = 3/4 purple, 1/4 white.',
            },
            {
                id: 'story-summary',
                title: 'Simple Explanation',
                illustration: 'zygosity',
                lines: [
                    { speaker: 'mendel', text: 'Thanks to these experiments, we now understand the patterns of inheritance!' },
                    { speaker: 'guide', text: 'Science is all around us — in every living thing!' },
                ],
                note: 'Dominant allele shows its trait even if only one copy is present. Recessive allele shows its trait only when two copies are present.',
                references: [CAMPBELL, OPENSTAX],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Mendel's Laws — Level 1: Mendel's Experiments
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'mendel',
        levelId: 1,
        panels: [
            {
                id: 'meet-mendel',
                title: 'Meet Gregor Mendel',
                illustration: 'mendel',
                lines: [
                    { speaker: 'mendel', text: "Hello! I'm Gregor Mendel — people call me the Father of Genetics." },
                    { speaker: 'mendel', text: 'I studied pea plants because their traits never blend — purple stays purple, wrinkled stays wrinkled.' },
                    { speaker: 'guide', text: 'So how did you figure out the rules of inheritance?' },
                ],
                note: 'Mendel crossed the purebred "P" (parental) generation to get the F1 generation, then crossed F1 × F1 to get F2.',
            },
            {
                id: 'law-dominance',
                title: 'Law of Dominance',
                illustration: 'alleles',
                lines: [
                    { speaker: 'mendel', text: 'My first discovery: cross purple (PP) with white (pp) and EVERY offspring came out purple.' },
                    { speaker: 'mendel', text: 'One allele — the dominant one — completely hides the other in a hybrid.' },
                ],
                note: 'Pp looks purple, but it still carries a hidden white allele.',
            },
            {
                id: 'law-segregation',
                title: 'Law of Segregation',
                illustration: 'segregation',
                lines: [
                    { speaker: 'mendel', text: "Each parent's allele PAIR splits apart when making sex cells — that's the Law of Segregation." },
                    { speaker: 'mendel', text: 'A Pp parent makes two kinds of gametes: half carry P, half carry p.' },
                ],
                note: 'Gametes only carry ONE allele per gene — never a pair.',
            },
            {
                id: 'law-assortment',
                title: 'Law of Independent Assortment',
                illustration: 'assort',
                lines: [
                    { speaker: 'mendel', text: 'When I tracked TWO traits at once — seed color and seed shape — they sorted into gametes independently.' },
                    { speaker: 'mendel', text: "Which allele you get for one gene doesn't affect which allele you get for another gene." },
                ],
                note: 'A dihybrid cross like YyRr × YyRr makes 4 kinds of gametes: YR, Yr, yR, yr.',
            },
            {
                id: 'ratios',
                title: 'The Famous Ratios',
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'guide', text: 'So what happens when I cross two Pp plants together?' },
                    { speaker: 'mendel', text: 'Pp × Pp gives 1 PP : 2 Pp : 1 pp — the 1:2:1 genotype ratio.' },
                    { speaker: 'mendel', text: 'But since PP and Pp both look purple, the phenotype ratio is 3 purple : 1 white!' },
                ],
                note: '3:1 is the signature ratio of a monohybrid cross between two heterozygotes.',
            },
            {
                id: 'mendel-summary',
                title: 'Three Laws, One Mendel',
                illustration: 'mendel',
                lines: [
                    { speaker: 'guide', text: 'Dominance, Segregation, Independent Assortment — got it!' },
                ],
                note: 'Dominance hides recessive traits. Segregation splits allele pairs. Independent Assortment sorts different genes separately.',
                references: [CAMPBELL, OPENSTAX],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Mendel's Laws — Level 2: Beyond Mendel
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'mendel',
        levelId: 2,
        panels: [
            {
                id: 'beyond-intro',
                title: 'Not Every Trait Plays by Simple Rules',
                illustration: 'gene',
                lines: [
                    { speaker: 'gene', text: "Mendel's peas were simple — purple OR white, round OR wrinkled. But not every trait works that way!" },
                    { speaker: 'guide', text: 'What do you mean?' },
                ],
                note: 'Some traits blend, some share the stage equally, and some involve many genes at once.',
            },
            {
                id: 'incomplete-dominance',
                title: 'Incomplete Dominance',
                illustration: 'blend',
                lines: [
                    { speaker: 'gene', text: "Cross a red flower (RR) with a white flower (WW) — you don't get red OR white. You get PINK." },
                    { speaker: 'gene', text: 'Neither allele fully dominates, so the heterozygote blends into something new.' },
                ],
                note: 'RW × RW gives 1 red : 2 pink : 1 white — the original colors reappear in the next generation!',
            },
            {
                id: 'codominance',
                title: 'Codominance',
                illustration: 'codominance',
                lines: [
                    { speaker: 'gene', text: 'Codominance is different — BOTH alleles show up fully, at the same time, with no blending.' },
                    { speaker: 'gene', text: 'Blood type AB is the classic example — a person with I^A I^B makes both A and B markers.' },
                ],
                note: 'Blend = incomplete dominance (pink). Both, unblended = codominance (AB).',
            },
            {
                id: 'polygenic',
                title: 'Polygenic Traits',
                illustration: 'polygenic',
                lines: [
                    { speaker: 'gene', text: "Some traits — like human height or skin color — aren't controlled by just one gene." },
                    { speaker: 'gene', text: 'Multiple genes add up together, which is why these traits show a wide range instead of just two options.' },
                ],
                note: 'Polygenic traits create smooth variation, not neat 3:1 ratios.',
            },
            {
                id: 'beyond-summary',
                title: 'Beyond the Basics',
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: 'So genetics has exceptions — blends, teams, and combos!' },
                ],
                note: 'Incomplete dominance blends. Codominance shows both. Polygenic traits stack many genes.',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Mendel's Laws — Level 3: Sex-Linked Traits
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'mendel',
        levelId: 3,
        panels: [
            {
                id: 'the-23rd-pair',
                title: 'The 23rd Pair',
                illustration: 'sexChromosomes',
                lines: [
                    { speaker: 'guide', text: 'Why do some traits affect boys and girls differently?' },
                    { speaker: 'chromosome', text: "It's all about the 23rd chromosome pair — the SEX chromosomes!" },
                ],
                note: 'Females are XX. Males are XY.',
            },
            {
                id: 'only-one-x',
                title: 'Only One X',
                illustration: 'sexChromosomes',
                lines: [
                    { speaker: 'chromosome', text: "Males only have ONE X chromosome. Whatever allele is on it shows up — there's no second X to hide it." },
                    { speaker: 'chromosome', text: 'Females have two X\'s, so a recessive allele on one X can be masked by a dominant allele on the other.' },
                ],
                note: 'This is why X-linked recessive traits — like color blindness — are more common in males.',
            },
            {
                id: 'tracing-x-linked',
                title: 'Tracing an X-Linked Trait',
                illustration: 'sexChromosomes',
                lines: [
                    { speaker: 'guide', text: 'So how does color blindness pass from parent to child?' },
                    { speaker: 'chromosome', text: "Fathers always give their SON a Y chromosome — never an X. A son's X-linked traits come entirely from mom!" },
                ],
                note: 'Daughters get one X from each parent, so they can inherit X-linked alleles from either side.',
            },
            {
                id: 'carriers',
                title: 'Carriers',
                illustration: 'chromosome',
                lines: [
                    { speaker: 'chromosome', text: "A female with ONE copy of a recessive X-linked allele is a carrier — she doesn't show the trait, but she can pass it on." },
                ],
                note: 'A carrier mother has a 50% chance of passing the allele to each child, regardless of sex.',
            },
            {
                id: 'sexlinked-summary',
                title: 'X Marks the Spot',
                illustration: 'chromosome',
                lines: [
                    { speaker: 'guide', text: 'Got it — X-linked traits follow their own special rules!' },
                ],
                note: 'Males (XY) show X-linked recessive traits more often than females (XX).',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Punnett Squares — Level 1: Reading the Grid
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'punnett',
        levelId: 1,
        panels: [
            {
                id: 'what-is-punnett',
                title: "What's a Punnett Square?",
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'guide', text: 'How do scientists predict what offspring will look like?' },
                    { speaker: 'gene', text: "With a Punnett square! It's a grid that shows every possible combination of alleles from two parents." },
                ],
                note: 'Named after Reginald Punnett, who invented this method in 1905.',
            },
            {
                id: 'step-1',
                title: 'Step 1: Alleles Outside the Box',
                illustration: 'monoGrid',
                fill: 0,
                lines: [
                    { speaker: 'gene', text: "Example: Tt × Tt. One parent's alleles (T, t) go across the TOP. The other parent's alleles (T, t) go down the LEFT side." },
                    { speaker: 'guide', text: 'Put the alleles outside first!' },
                ],
                note: 'T = Tall (dominant), t = Short (recessive).',
            },
            {
                id: 'step-2',
                title: 'Step 2: Fill the First Box',
                illustration: 'monoGrid',
                fill: 1,
                lines: [
                    { speaker: 'guide', text: 'Top T and side T make TT!' },
                ],
                note: 'Each box = the allele above it + the allele beside it.',
            },
            {
                id: 'step-3',
                title: 'Step 3: Fill the Second Box',
                illustration: 'monoGrid',
                fill: 2,
                lines: [
                    { speaker: 'gene', text: 'Top t with side T makes Tt!' },
                ],
                note: 'Write the dominant (capital) letter first: Tt, not tT.',
            },
            {
                id: 'step-4',
                title: 'Step 4: Fill the Third Box',
                illustration: 'monoGrid',
                fill: 3,
                lines: [
                    { speaker: 'guide', text: 'Top T with side t makes Tt!' },
                ],
            },
            {
                id: 'step-5',
                title: 'Step 5: Fill the Last Box',
                illustration: 'monoGrid',
                fill: 4,
                lines: [
                    { speaker: 'guide', text: 'Top t and side t make tt! Now the square is complete!' },
                ],
                note: 'A 2×2 grid = 4 possible outcomes, each with a 1-in-4 (25%) chance.',
            },
            {
                id: 'reading-result',
                title: 'Step 6: Write the Ratios',
                illustration: 'monoGrid',
                fill: 4,
                lines: [
                    { speaker: 'guide', text: 'So Tt × Tt gives TT, Tt, Tt, and tt... that\'s 3 tall to 1 short?' },
                    { speaker: 'gene', text: 'Exactly! TT and Tt both look tall, so the phenotype ratio is 3:1 even though the genotype ratio is 1:2:1.' },
                ],
                note: 'Genotype ratio counts exact allele combos. Phenotype ratio counts what you can SEE.',
            },
            {
                id: 'grid-master',
                title: 'Grid Master',
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: 'Top, side, combine, count. I can read any Punnett square now!' },
                ],
                note: 'Remember: top + left = each cell. Count phenotypes to get the ratio.',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Punnett Squares — Level 2: Probability & Ratios
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'punnett',
        levelId: 2,
        panels: [
            {
                id: 'squares-are-probability',
                title: 'Punnett Squares Are Just Probability',
                illustration: 'gene',
                lines: [
                    { speaker: 'gene', text: 'Every cell in the grid has an equal chance of happening — that\'s all a Punnett square really shows.' },
                ],
                note: 'A 2×2 grid: each cell = 1/4. A 4×4 grid: each cell = 1/16.',
            },
            {
                id: 'reading-fractions',
                title: 'Reading the Fractions',
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'guide', text: 'If 1 out of 4 boxes is tt, does that mean exactly 1 in 4 offspring will be short?' },
                    { speaker: 'gene', text: 'Not exactly — each offspring has a 1-in-4 CHANCE. With only a few offspring, the real numbers can vary.' },
                ],
                note: 'Probabilities predict what happens on average over many, many offspring.',
            },
            {
                id: 'adding-probabilities',
                title: 'Adding Probabilities',
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'gene', text: 'Want the chance of EITHER TT or tt? Just add their individual probabilities together: 1/4 + 1/4 = 1/2.' },
                ],
                note: "Add probabilities for 'either/or' outcomes within the same cross.",
            },
            {
                id: 'testcross-preview',
                title: 'A Sneak Peek at Test Crosses',
                illustration: 'testcross',
                lines: [
                    { speaker: 'guide', text: "What if I don't know a plant's exact genotype?" },
                    { speaker: 'gene', text: "Then you'd run a test cross — cross the mystery plant with a homozygous recessive partner and see what shows up!" },
                ],
                note: 'More on test crosses in the next level...',
            },
            {
                id: 'probability-summary',
                title: 'Just Organized Probability',
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: "Punnett squares aren't magic — they're just organized probability!" },
                ],
                note: 'Each cell is equally likely, and you can add probabilities for combined outcomes.',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Punnett Squares — Level 3: Test Crosses
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'punnett',
        levelId: 3,
        panels: [
            {
                id: 'mystery-genotype',
                title: 'The Mystery Genotype',
                illustration: 'testcross',
                lines: [
                    { speaker: 'guide', text: 'A tall pea plant could be TT or Tt — they look identical! How do you tell them apart?' },
                    { speaker: 'gene', text: "That's exactly what a test cross is for." },
                ],
                note: 'Two different genotypes can produce the exact same phenotype.',
            },
            {
                id: 'cross-with-recessive',
                title: 'Cross with the Recessive',
                illustration: 'testcross',
                lines: [
                    { speaker: 'gene', text: 'Cross the mystery plant with a homozygous recessive partner (tt) — it can only contribute recessive alleles.' },
                    { speaker: 'gene', text: 'Whatever shows up in the offspring must have come from the mystery parent.' },
                ],
                note: "tt can't hide anything — it's genetically an open book.",
            },
            {
                id: 'reading-testcross-results',
                title: 'Reading the Results',
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'gene', text: 'All offspring tall? The mystery plant is TT.' },
                    { speaker: 'gene', text: 'About half tall, half short? The mystery plant is Tt.' },
                ],
                note: 'Zero recessive offspring = TT. A 1:1 split = Tt.',
            },
            {
                id: 'testcross-summary',
                title: "You're a Genetic Detective!",
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: "So a test cross is just crossing with tt and reading what comes back. I'm ready!" },
                ],
                note: 'Remember: zero recessive offspring = homozygous dominant. A 1:1 split = heterozygous.',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Monohybrid & Dihybrid Cross — Level 1: Monohybrid Crosses
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid',
        levelId: 1,
        panels: [
            {
                id: 'one-trait-at-a-time',
                title: 'One Trait at a Time',
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: "I've mastered Punnett squares for one trait — what's next?" },
                    { speaker: 'gene', text: "Let's make sure monohybrid crosses are second nature before we level up to TWO traits at once." },
                ],
                note: '"Mono" = one. A monohybrid cross tracks a single gene, like seed shape (R/r).',
            },
            {
                id: 'monohybrid-review',
                title: 'The Monohybrid Setup',
                illustration: 'punnettGrid',
                lines: [
                    { speaker: 'gene', text: 'Rr × Rr — one parent\'s alleles on top, the other\'s on the side. Fill in the 4 boxes.' },
                    { speaker: 'gene', text: 'RR, Rr, Rr, rr. Genotype ratio 1:2:1. Phenotype ratio 3 round : 1 wrinkled.' },
                ],
                note: 'Every monohybrid cross between two heterozygotes gives this same 3:1 phenotype pattern.',
            },
            {
                id: 'ready-for-two',
                title: 'Ready for Two Traits',
                illustration: 'seeds',
                lines: [
                    { speaker: 'guide', text: 'What if a plant has two traits I want to track — like seed shape AND seed color?' },
                    { speaker: 'gene', text: "Then you're ready for a dihybrid cross — same idea, just twice the genes and a bigger grid!" },
                ],
                note: 'Next level: two genes, four gametes, and a 4×4 grid.',
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Monohybrid & Dihybrid Cross — Level 2: Dihybrid Crosses
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid',
        levelId: 2,
        panels: [
            // ── Part 1: The Great Pea Plant Mystery — Mendel's Law of Independent Assortment ──
            {
                id: 'new-mystery',
                title: 'A New Mystery!',
                illustration: 'mendel',
                lines: [
                    { speaker: 'guide', text: 'Can we predict TWO traits at the same time?' },
                    { speaker: 'mendel', text: 'Excellent work! We already learned how ONE trait is inherited.' },
                    { speaker: 'gene', text: "Now let's study TWO traits at the same time!" },
                ],
            },
            {
                id: 'two-traits',
                title: 'Two Traits at Once!',
                illustration: 'seeds',
                lines: [
                    { speaker: 'mendel', text: 'I observed offspring with different combinations of seed shape and seed color.' },
                ],
                note: 'Round Yellow, Round Green, Wrinkled Yellow, Wrinkled Green — four possible combinations.',
            },
            {
                id: 'two-genes',
                title: 'Meet the Two Genes!',
                illustration: 'assort',
                lines: [
                    { speaker: 'gene', text: 'Seed COLOR gene: Y = Yellow (dominant), y = Green (recessive).' },
                    { speaker: 'gene', text: 'Seed SHAPE gene: R = Round (dominant), r = Wrinkled (recessive).' },
                ],
                note: 'A plant that is YyRr is heterozygous for BOTH genes.',
            },
            {
                id: 'inside-plant',
                title: 'Inside the Parent Plant',
                illustration: 'chromosome',
                lines: [
                    { speaker: 'chromosome', text: 'Two different pairs of chromosomes carry the genes for these two traits.' },
                    { speaker: 'chromosome', text: 'Pair 1 carries the gene for seed color (Y / y). Pair 2 carries the gene for seed shape (R / r).' },
                ],
            },
            {
                id: 'meiosis',
                title: 'Meiosis: The Pairs Line Up Independently',
                illustration: 'meiosis',
                lines: [
                    { speaker: 'chromosome', text: 'During meiosis, the chromosome pairs line up randomly and independently.' },
                    { speaker: 'chromosome', text: 'Sometimes Y lines up with R, and sometimes Y lines up with r — different ways they can line up!' },
                ],
            },
            {
                id: 'four-gametes',
                title: 'Four Kinds of Gametes Are Formed!',
                illustration: 'gametes4',
                lines: [
                    { speaker: 'gene', text: 'From a YyRr parent, meiosis produces FOUR kinds of gametes: YR, Yr, yR, yr.' },
                    { speaker: 'guide', text: 'Each gamete receives ONE allele from each gene. Now I understand why there are FOUR kinds!' },
                ],
            },
            {
                id: 'third-law',
                title: "Mendel's Third Law",
                illustration: 'mendel',
                lines: [
                    { speaker: 'mendel', text: 'Law of Independent Assortment: alleles of different genes assort (separate) independently of each other during meiosis and gamete formation.' },
                    { speaker: 'guide', text: 'So one gene does not affect how another gene separates!' },
                ],
                note: 'This law explains why we get Round Yellow, Round Green, Wrinkled Yellow AND Wrinkled Green seeds.',
            },
            {
                id: 'know-so-far',
                title: 'What We Know So Far!',
                illustration: 'summary',
                lines: [
                    { speaker: 'gene', text: 'Law of Dominance — the dominant allele masks the recessive allele.' },
                    { speaker: 'gene', text: 'Law of Segregation — alleles separate during gamete formation.' },
                    { speaker: 'gene', text: 'Law of Independent Assortment — alleles of different genes assort independently.' },
                ],
            },

            // ── Part 2: How to make a Punnett square for a dihybrid cross (YyRr × YyRr) ──
            {
                id: 'dsq-step-1',
                title: 'Step 1: Write the Parent Genotypes',
                illustration: 'assort',
                lines: [
                    { speaker: 'guide', text: 'Father: YyRr  ×  Mother: YyRr.' },
                ],
                note: 'Both parents are heterozygous for seed color AND seed shape.',
            },
            {
                id: 'dsq-step-2',
                title: 'Step 2: Find the Gametes (FOIL)',
                illustration: 'foil',
                genotype: 'YyRr',
                lines: [
                    { speaker: 'gene', text: 'Take ONE allele from each gene. Use FOIL: First, Outer, Inner, Last.' },
                    { speaker: 'gene', text: 'For YyRr: First = YR, Outer = Yr, Inner = yR, Last = yr.' },
                ],
                note: 'Each parent makes the same 4 gametes: YR, Yr, yR, yr.',
            },
            {
                id: 'dsq-step-3',
                title: 'Step 3: Gametes Outside the Square',
                illustration: 'dihybridSquare',
                fill: 0,
                lines: [
                    { speaker: 'gene', text: "Write Dad's 4 gametes across the TOP and Mom's 4 gametes down the SIDE. Don't fill the boxes yet!" },
                ],
                note: 'Top = from Dad. Side = from Mom.',
            },
            {
                id: 'dsq-step-4',
                title: 'Step 4: Fill ONLY the First Box',
                illustration: 'dihybridSquare',
                fill: 1,
                lines: [
                    { speaker: 'gene', text: 'Side YR + top YR = YYRR.' },
                ],
                note: 'Take one allele from the TOP and one from the SIDE. Keep the color letters together, then the shape letters.',
            },
            {
                id: 'dsq-step-5-7',
                title: 'Steps 5–7: Finish the First Row',
                illustration: 'dihybridSquare',
                fill: 4,
                lines: [
                    { speaker: 'gene', text: 'Second box: YR + Yr = YYRr. Third box: YR + yR = YyRR. Fourth box: YR + yr = YyRr.' },
                ],
            },
            {
                id: 'dsq-step-8',
                title: 'Step 8: Keep Going, Row by Row',
                illustration: 'dihybridSquare',
                fill: 8,
                lines: [
                    { speaker: 'guide', text: 'Take one gamete from Dad and one from Mom — ONE BOX AT A TIME!' },
                ],
            },
            {
                id: 'dsq-step-9',
                title: 'Step 9: The Completed Square',
                illustration: 'dihybridSquare',
                fill: 16,
                lines: [
                    { speaker: 'gene', text: 'All 16 boxes filled! Each box has a 1/16 chance.' },
                ],
            },

            // ── Part 3: Genotypic ratio vs phenotypic ratio ──
            {
                id: 'genotypic-ratio',
                title: 'Step 10: Write the Genotypic Ratio',
                illustration: 'genotypeRatio',
                lines: [
                    { speaker: 'gene', text: 'List each UNIQUE genotype and count how many boxes it appears in. There are 9 unique genotypes.' },
                    { speaker: 'guide', text: 'Different genotypes can have the same phenotype!' },
                ],
                note: 'Genotypic ratio = 1 : 2 : 1 : 2 : 4 : 2 : 1 : 2 : 1 (adds up to 16).',
            },
            {
                id: 'phenotypic-ratio',
                title: 'Steps 11–12: Group the Phenotypes',
                illustration: 'dihybridGrid',
                lines: [
                    { speaker: 'gene', text: 'Use the key: Y_ = yellow, yy = green, R_ = round, rr = wrinkled.' },
                    { speaker: 'gene', text: 'Round Yellow (Y_R_) = 9, Wrinkled Yellow (Y_rr) = 3, Round Green (yyR_) = 3, Wrinkled Green (yyrr) = 1.' },
                ],
                note: 'Phenotypic ratio = 9 : 3 : 3 : 1. Y_ means YY or Yy (at least one Y). R_ means RR or Rr.',
            },
            {
                id: 'dihybrid-summary',
                title: 'Great Work, Genetic Detectives!',
                illustration: 'summary',
                lines: [
                    { speaker: 'guide', text: 'A dihybrid cross tracks two traits. Each YyRr parent makes FOUR kinds of gametes, and a 4×4 square shows all 16 combinations.' },
                    { speaker: 'mendel', text: 'We now understand ALL THREE LAWS OF MENDEL!' },
                ],
                note: 'Genotypic ratio shows the genetic make-up (letters). Phenotypic ratio shows the observable traits. Always group by phenotype first, then count.',
                references: [CAMPBELL, OPENSTAX],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  Monohybrid & Dihybrid Cross — Level 3: Multi-Trait Mastery
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid',
        levelId: 3,
        panels: [
            {
                id: 'shortcut-multiply',
                title: 'A Faster Way: Multiply',
                illustration: 'dihybridGrid',
                lines: [
                    { speaker: 'gene', text: "Drawing a 4×4 grid every time is slow. Here's a shortcut: multiply the individual probabilities!" },
                    { speaker: 'gene', text: 'P(round) = 3/4 and P(yellow) = 3/4, so P(round AND yellow) = 3/4 × 3/4 = 9/16.' },
                ],
                note: 'This only works because the two genes assort independently — no grid required.',
            },
            {
                id: 'why-multiply-works',
                title: 'Why This Works',
                illustration: 'assort',
                lines: [
                    { speaker: 'guide', text: 'Why is multiplying allowed here?' },
                    { speaker: 'gene', text: "Because of the Law of Independent Assortment — one gene's outcome never affects the other's, so their probabilities combine by multiplying." },
                ],
                note: 'If the genes were linked (not independent), this shortcut would NOT work.',
            },
            // ── FOIL Method worked examples (adapted from University of Nebraska–Lincoln, "FOIL method", 2000) ──
            {
                id: 'tricky-genotypes',
                title: 'Watch for Tricky Genotypes',
                illustration: 'gametes4',
                lines: [
                    { speaker: 'gene', text: 'Not every genotype makes 4 different gametes. When a gene is homozygous (YY, RR, rr...), some FOIL pairs come out the same.' },
                    { speaker: 'guide', text: "Let's use the FOIL method step by step to see how it works!" },
                ],
                note: 'FOIL = First, Outer, Inner, Last. Follow the steps and you\'ll get it right every time!',
            },
            {
                id: 'foil-yyrr-1',
                title: 'FOIL for YYRr — Steps 1 & 2',
                illustration: 'parentGametes',
                lines: [
                    { speaker: 'gene', text: 'Step 1: Write the genotype. YYRr is the genotype of ONE organism.' },
                    { speaker: 'gene', text: 'It got one gamete from each parent — each gamete carried one color allele AND one shape allele, like YR + Yr.' },
                    { speaker: 'gene', text: 'Step 2: List the alleles. YY → Y, Y (both the same). Rr → R, r (different).' },
                ],
                note: 'Careful: YY does NOT come from one parent and Rr from the other. Each parent gives one allele of EACH gene.',
                references: [UNL_FOIL],
            },
            {
                id: 'foil-yyrr-2',
                title: 'FOIL for YYRr — Steps 3 to 5',
                illustration: 'foil',
                genotype: 'YYRr',
                lines: [
                    { speaker: 'gene', text: 'Step 3: Use FOIL. First = YR, Outer = Yr, Inner = YR, Last = Yr.' },
                    { speaker: 'gene', text: 'Step 4: Write the gametes — YR, Yr, YR, Yr.' },
                    { speaker: 'guide', text: 'Step 5: Simplify by combining identical gametes. Final gametes for YYRr are YR and Yr!' },
                ],
            },
            {
                id: 'foil-yyRR',
                title: 'FOIL for YyRR',
                illustration: 'foil',
                genotype: 'YyRR',
                lines: [
                    { speaker: 'gene', text: 'Alleles: Yy → Y, y (different). RR → R, R (both the same).' },
                    { speaker: 'gene', text: 'FOIL: First = YR, Outer = YR, Inner = yR, Last = yR.' },
                    { speaker: 'guide', text: 'Simplify: YR, YR, yR, yR → the final gametes for YyRR are YR and yR!' },
                ],
            },
            {
                id: 'foil-practice',
                title: "Let's Practice! FOIL for YyRr",
                illustration: 'gametes4',
                lines: [
                    { speaker: 'guide', text: 'You try it step by step! Yy → alleles: Y, y. Rr → alleles: R, r.' },
                    { speaker: 'gene', text: 'First = Y + R, Outer = Y + r, Inner = y + R, Last = y + r. All four are different, so nothing to simplify!' },
                ],
                note: 'Final gametes for YyRr: YR, Yr, yR, yr. You will practice more of these in the quiz!',
            },
            {
                id: 'mastery-summary',
                title: "Multi-Trait Mastery",
                illustration: 'gene',
                lines: [
                    { speaker: 'guide', text: 'Multiply for speed, trust Independent Assortment, and always double-check for homozygous genes. I\'m ready for anything!' },
                ],
                note: 'Remember: multiplying probabilities is a shortcut for the full 4×4 grid — both give the same answer.',
            },
        ],
    },
];

export function getStory(lessonId: string, levelId: number): LevelStory | undefined {
    return STORIES.find((s) => s.lessonId === lessonId && s.levelId === levelId);
}
