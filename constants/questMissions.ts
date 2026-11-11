// ── GeneQuest missions 1B → 4, adapted from the "suggestions as of Nov 9" worksheet ──
// Each mission plays before its level's quiz (see app/(root)/lessons/[id]/[levelId]/story.tsx).

import { PEA_TRAITS, TraitDef } from '@/lib/genetics';
import type { LevelMission, MissionBlock } from './missions';

const L = ['a', 'b', 'c', 'd'];

/** Quick-check helper: chk('Question?', ['A', 'B', 'C', 'D'], 'b', 'Why it is right') */
const chk = (question: string, choices: string[], answer: string, feedback: string, feedbackTitle = 'Correct!'): MissionBlock => ({
    type: 'check', question, answer, feedback, feedbackTitle,
    choices: choices.map((text, i) => ({ id: L[i], text })),
});

const CHICKEN: TraitDef[] = [
    { letter: 'C', trait: 'Crest', dominant: 'Crested', recessive: 'No crest' },
    { letter: 'B', trait: 'Feather color', dominant: 'Black', recessive: 'White' },
];

export const QUEST_MISSIONS: LevelMission[] = [
    // ══════════════════════════════════════════════════════════
    //  MISSION 1 · PART B — Dominant and Recessive Traits
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'terms', levelId: 2,
        title: 'GeneQuest', mission: 'Mission 1 · Part B', tagline: 'Dominant & Recessive Traits',
        screens: [
            {
                id: 'm1b-cover', title: 'Dominant and Recessive Traits',
                blocks: [
                    { type: 'cover', mission: 'Mission 1 · Part B', title: 'Dominant and Recessive Traits', text: "Help complete Mendel's field notes! Answer the questions to learn the dominant and recessive traits of garden pea plants." },
                ],
            },
            {
                id: 'm1b-alleles', title: 'Dominant and Recessive Alleles',
                blocks: [
                    { type: 'text', text: 'The **dominant** allele is written in **uppercase** (P, R, Y, G, A, T). The **recessive** allele is written in **lowercase** (p, r, y, g, a, t).' },
                    { type: 'visual', visual: 'domRecFlowers' },
                    { type: 'note', tone: 'tip', title: 'Remember', text: 'A **dominant allele** shows its trait even if there is only **one copy**.\nA **recessive allele** shows its trait only when there are **two copies**.' },
                    chk('Which genotype will show a purple flower?', ['PP', 'Pp', 'pp', 'Both A and B'], 'd', 'PP and Pp both contain the dominant allele P, so both show purple flowers.'),
                ],
            },
            {
                id: 'm1b-garden', kicker: 'Case File 02', title: "Mendel's Garden Pea Plants",
                blocks: [
                    { type: 'speech', who: 'mendel', text: 'I studied 7 different traits in pea plants. I crossed plants with contrasting traits to find out which traits are dominant and which are recessive.' },
                    chk('Why do you think Mendel used garden pea plants in his experiment?', ['They grow fast and are easy to care for.', 'They have many contrasting traits.', 'They produce many offspring.', 'All of the above.'], 'd', 'Pea plants grow fast, show clear contrasting traits, and produce many offspring — perfect for an experiment.'),
                ],
            },
            {
                id: 'm1b-table', title: 'The Pea Plant Traits',
                blocks: [
                    { type: 'text', text: 'Mendel studied **7 traits** with contrasting forms. The table shows the dominant and recessive form of each trait and the allele letters used for them.' },
                    { type: 'visual', visual: 'peaTraits' },
                    { type: 'note', tone: 'tip', title: 'Study the table', text: 'Use the allele letters in this table to answer the questions on the next screens.' },
                ],
            },
            {
                id: 'm1b-seeds', title: 'Trait Check — Seeds',
                blocks: [
                    chk('Seed shape: which genotype will show a wrinkled seed?', ['RR', 'Rr', 'rr', 'Both A and B'], 'c', 'Wrinkled is recessive, so it only shows with two recessive alleles: rr.'),
                    chk('Seed color: which genotypes will result in a yellow seed?', ['YY', 'Yy', 'yy', 'Both A and B'], 'd', 'Yellow (Y) is dominant, so YY and Yy are both yellow.'),
                ],
            },
            {
                id: 'm1b-pods', title: 'Trait Check — Pods',
                blocks: [
                    chk('Pod shape: which genotype will produce a constricted pod?', ['II', 'Ii', 'ii', 'Both A and B'], 'c', 'Constricted is recessive, so the plant needs two recessive alleles: ii.'),
                    chk('Pod color: which genotypes will result in a green pod?', ['GG', 'Gg', 'gg', 'Both A and B'], 'd', 'Green (G) is dominant, so GG and Gg both make green pods.'),
                ],
            },
            {
                id: 'm1b-flowers', title: 'Trait Check — Flowers & Height',
                blocks: [
                    chk('Flower position: which genotypes show axial flowers?', ['AA', 'Aa', 'aa', 'Both A and B'], 'd', 'Axial (A) is dominant, so AA and Aa both have axial flowers.'),
                    chk('Plant height: which genotypes will show a tall plant?', ['TT', 'Tt', 'tt', 'Both A and B'], 'd', 'Tall (T) is dominant, so TT and Tt are both tall.'),
                ],
            },
            {
                id: 'm1b-match', title: 'Matching Activity — Allele Symbols',
                blocks: [
                    {
                        type: 'classify',
                        prompt: 'Match each trait with its dominant (uppercase) allele symbol. The recessive allele is the same letter in lowercase.',
                        options: ['P', 'R', 'Y', 'I', 'G', 'A', 'T'],
                        rows: [
                            { label: 'Flower color', answer: 'P' },
                            { label: 'Seed shape', answer: 'R' },
                            { label: 'Seed color', answer: 'Y' },
                            { label: 'Pod shape', answer: 'I' },
                            { label: 'Pod color', answer: 'G' },
                            { label: 'Flower position', answer: 'A' },
                            { label: 'Plant height', answer: 'T' },
                        ],
                        feedbackTitle: 'All matched!',
                        feedback: 'You know every allele symbol Mendel used: P/p, R/r, Y/y, I/i, G/g, A/a, T/t.',
                    },
                ],
            },
            {
                id: 'm1b-phenotype', title: 'Identify the Phenotype',
                blocks: [
                    chk('Look at the genotype **Pp**. What is the observable trait (phenotype)?', ['Purple flower', 'White flower', 'Round seed', 'Wrinkled seed'], 'a', 'Pp has the dominant allele P, so the flower is purple.'),
                    { type: 'tapSort', prompt: 'Choose all that apply: which genotypes will show a yellow seed?', items: [{ text: 'YY', correct: true }, { text: 'Yy', correct: true }, { text: 'yy', correct: false }, { text: 'Gg', correct: false }], feedback: 'YY and Yy both carry the dominant yellow allele Y.' },
                ],
            },
            {
                id: 'm1b-scenario', title: 'Scenario & Fill in the Blank',
                blocks: [
                    chk('A pea plant has the genotype **Tt**. What can you say about this plant?', ['It is tall.', 'It is short.', 'It can be tall or short.', 'It is always tall and short at the same time.'], 'a', 'T (tall) is dominant over t, so Tt is tall.'),
                    chk('Complete the sentence: A plant with genotype ___ will show a wrinkled seed because the wrinkled seed trait is ___.', ['RR – dominant', 'Rr – dominant', 'rr – recessive', 'Rr – recessive'], 'c', 'Wrinkled is recessive, so it appears only in rr.'),
                ],
            },
            {
                id: 'm1b-challenge', title: 'Challenge Question',
                blocks: [
                    chk('A cross between Pp and Pp produced 74 purple flowers and 26 white flowers (out of 100 plants). What can you conclude?', ['Purple is dominant and white is recessive.', 'White is dominant and purple is recessive.', 'Both traits are recessive.', 'There is no dominant or recessive trait.'], 'a', 'About 3 purple : 1 white — the classic pattern when purple is dominant.', 'Excellent reasoning!'),
                    { type: 'complete', title: 'Case solved!', text: 'Great job, Genetics Investigator! You have completed Mission 1 · Part B: Dominant and Recessive Traits.', learned: ['Dominant alleles are uppercase; recessive are lowercase', 'One dominant allele is enough to show the dominant trait', 'Recessive traits need two recessive alleles', "Mendel's 7 pea plant traits"] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 2 · PART A — The Monk Who Counted Peas
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'mendel', levelId: 1,
        title: 'GeneQuest', mission: 'Mission 2 · Part A', tagline: 'The Monk Who Counted Peas',
        screens: [
            {
                id: 'm2a-cover', kicker: 'Case File 002', title: 'The Mystery of the Pea Garden',
                blocks: [
                    { type: 'cover', mission: 'Mission 2 · Part A', title: 'The Monk Who Counted Peas', text: 'A long time ago, a scientist carefully observed thousands of pea plants. He noticed something unusual: characteristics seemed to follow patterns from one generation to another.' },
                    chk('Who was this scientist?', ['Charles Darwin', 'Gregor Mendel', 'Louis Pasteur', 'Isaac Newton'], 'b', 'Gregor Mendel is known as the Father of Genetics.'),
                ],
            },
            {
                id: 'm2a-meet', title: 'Meet the Investigator of Inheritance',
                blocks: [
                    { type: 'speech', who: 'mendel', text: 'I was a monk and scientist who experimented with garden pea plants in the 1800s.' },
                    { type: 'steps', title: 'Instead of simply observing plants, Mendel…', steps: [
                        { label: '1', text: 'selected plants with different characteristics,' },
                        { label: '2', text: 'controlled which plants were crossed,' },
                        { label: '3', text: 'counted their offspring,' },
                        { label: '4', text: 'recorded the characteristics that appeared,' },
                        { label: '5', text: 'and used the results.' },
                    ] },
                    chk("What made Mendel's approach different?", ['He guessed the results without experiments.', 'He carefully crossed plants and counted the results.', 'He studied only one plant.', 'He changed the plants using chemicals.'], 'b', 'Mendel controlled his crosses and counted the offspring — real data, not guesses.'),
                ],
            },
            {
                id: 'm2a-why', title: 'Clue #1 — The Perfect Plant',
                blocks: [
                    { type: 'steps', title: 'Why did Mendel choose pea plants?', steps: [
                        { label: '✓', text: 'They grow relatively quickly.' },
                        { label: '✓', text: 'They produce many offspring.' },
                        { label: '✓', text: 'They have several easily observed characteristics.' },
                        { label: '✓', text: 'They can reproduce by self-pollination.' },
                        { label: '✓', text: 'They can also be deliberately crossed by humans.' },
                    ] },
                    chk('Which of the following is a useful characteristic of pea plants?', ['They are very large trees.', 'They can produce many offspring.', 'They cannot be crossed.', 'They live for many decades.'], 'b', 'Many offspring means lots of data to count.'),
                ],
            },
            {
                id: 'm2a-pollinate', title: 'Clue #2 — Two Ways to Pollinate',
                blocks: [
                    { type: 'visual', visual: 'pollination' },
                    { type: 'definition', term: 'Self-pollination', text: 'Pollen from a flower fertilizes the egg of the **same** plant.' },
                    { type: 'definition', term: 'Cross-pollination', text: 'Pollen from one plant is transferred to the flower of **another** plant.' },
                    chk('If Mendel wants to deliberately combine two different pea plants, which process will he use?', ['Self-pollination', 'Cross-pollination', 'Germination', 'Photosynthesis'], 'b', 'Cross-pollination moves pollen between two different plants.'),
                ],
            },
            {
                id: 'm2a-first', kicker: 'Evidence Card 02', title: 'The First Cross',
                blocks: [
                    { type: 'visual', visual: 'firstCross' },
                    { type: 'text', text: 'Mendel crossed a **true-breeding tall** plant with a **true-breeding dwarf** plant.' },
                    chk('What did the first-generation offspring look like?', ['All tall', 'All dwarf', 'Half tall and half dwarf', 'No offspring'], 'a', 'Every F₁ plant was tall — the dwarf characteristic seemed to vanish!'),
                ],
            },
            {
                id: 'm2a-p', title: 'What Does "P" Mean?',
                blocks: [
                    { type: 'table', title: 'Genetics Toolkit', headers: ['Symbol', 'Meaning'], rows: [['P', 'Parental generation (the original parents)'], ['F₁', 'First filial generation (the first offspring)'], ['F₂', 'Second filial generation (the offspring of F₁)']] },
                    { type: 'order', prompt: 'Arrange the generations in the correct order. Tap them from first to last.', items: ['P generation', 'F₁ generation', 'F₂ generation'], feedback: 'Parents (P) → their offspring (F₁) → the offspring of F₁ (F₂).' },
                ],
            },
            {
                id: 'm2a-second', title: 'The Second Generation Reveals a Clue!',
                blocks: [
                    { type: 'visual', visual: 'secondGen' },
                    { type: 'text', text: 'The F₁ plants (all tall) were allowed to cross with themselves (self-pollination). When the F₁ plants were crossed, Mendel found a pattern: **most plants were tall, and some were dwarf**.' },
                    chk('What pattern was observed?', ['1 tall : 3 dwarf', '2 tall : 2 dwarf', '3 tall : 1 dwarf', 'All dwarf'], 'c', 'About three tall plants for every one dwarf plant.'),
                ],
            },
            {
                id: 'm2a-count', kicker: 'Data Analysis', title: 'Count the Evidence',
                blocks: [
                    { type: 'table', headers: ['F₂ Phenotype', 'Number of Plants'], rows: [['Tall', '75'], ['Dwarf', '25'], ['Total', '100']] },
                    chk('What is the approximate ratio of tall to dwarf plants?', ['1 : 1', '2 : 1', '3 : 1', '4 : 1'], 'c', '75 : 25 simplifies to 3 : 1.'),
                ],
            },
            {
                id: 'm2a-where', title: 'But Where Did the Dwarf Characteristic Go?',
                blocks: [
                    { type: 'speech', who: 'investigator', text: 'The F₁ plants all appeared tall. But the F₂ generation contained dwarf plants. Hmm…' },
                    chk('What is the best scientific conclusion based on the evidence?', ['The dwarf characteristic was destroyed in F₁.', 'The dwarf characteristic disappeared forever.', 'The hereditary information could be passed on even when not expressed in F₁.', 'The plants suddenly changed species.'], 'c', 'The dwarf information was hidden (recessive) in F₁ and showed up again in F₂.', 'Clue found!'),
                ],
            },
            {
                id: 'm2a-case', kicker: 'Case File 002', title: 'Case Challenge: The Mystery Peas',
                blocks: [
                    { type: 'table', title: "A simplified version of Mendel's experiment", headers: ['Generation', 'Result'], rows: [['P', 'Purple-flowered × White-flowered'], ['F₁', 'All purple-flowered'], ['F₂', '60 purple : 20 white']] },
                    chk('1. What generation is represented by the 60 purple and 20 white plants?', ['P', 'F₁', 'F₂', 'None'], 'c', 'They are the offspring of the F₁ plants, so they are F₂.'),
                    chk('2. What is the approximate phenotypic ratio?', ['1 : 1', '2 : 1', '3 : 1', '4 : 1'], 'c', '60 : 20 = 3 : 1.'),
                    chk('3. What pattern does the data show?', ['Equal numbers', 'One is three times more', 'Only recessive', 'No pattern'], 'b', 'Purple is three times more common than white.'),
                ],
            },
            {
                id: 'm2a-final', title: 'The Final Investigation',
                blocks: [
                    { type: 'steps', title: 'Evidence collected', steps: [
                        { label: '1', text: 'Mendel studied pea plants.' },
                        { label: '2', text: 'He used controlled pollination.' },
                        { label: '3', text: 'He used plants with contrasting characteristics.' },
                        { label: '4', text: 'F₁ showed one phenotype.' },
                        { label: '5', text: 'F₂ showed an approximately 3 : 1 ratio.' },
                    ] },
                    chk("Which statement best summarizes what Mendel's experiment showed?", ['All offspring are exact copies.', 'Characteristics can be inherited in recognizable patterns across generations.', 'Only environmental factors create traits.', 'Only visible characteristics can be inherited.'], 'b', 'Heredity follows patterns you can predict.', 'Case solved!'),
                ],
            },
            {
                id: 'm2a-complete', title: 'Mission Complete!',
                blocks: [
                    { type: 'complete', title: 'You did it!', text: "You have completed Mission 2 · Part A. Next up: the laws behind the pattern.", learned: ['Gregor Mendel', 'Pea plant experiments', 'Self-pollination and cross-pollination', 'True-breeding plants', 'P, F₁ and F₂ generations', 'Phenotypic ratio — the classic 3 : 1 pattern'] },
                    { type: 'table', title: 'Genetics Toolkit — Mission 2', headers: ['Term', 'Meaning'], rows: [
                        ['P generation', 'The first (parental) generation, using pure plants'],
                        ['F₁ generation', 'The first filial generation (from true-breeding parents)'],
                        ['F₂ generation', 'The second filial generation (from selfing F₁ plants)'],
                        ['Self-pollination', 'Transfer of pollen within the same plant'],
                        ['Cross-pollination', 'Transfer of pollen between different plants'],
                        ['True-breeding', 'Plants that always produce the same kind of offspring'],
                        ['Phenotypic ratio', 'The ratio of observable traits (e.g. 3 tall : 1 dwarf)'],
                    ] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 2 · PART B — The Three Laws of Mendel
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'mendel', levelId: 2,
        title: 'GeneQuest', mission: 'Mission 2 · Part B', tagline: 'The Three Laws of Mendel',
        screens: [
            {
                id: 'm2b-cover', title: 'The Three Laws of Mendel',
                blocks: [
                    { type: 'cover', mission: 'Mission 2 · Part B', title: 'The Three Laws of Mendel', text: "Mendel discovered three important laws that explain how traits are passed from parents to offspring. Let's learn these laws one by one!" },
                    { type: 'visual', visual: 'threeLaws' },
                ],
            },
            {
                id: 'm2b-dom1', kicker: 'Law 1', title: 'Law of Dominance',
                blocks: [
                    { type: 'definition', term: 'Law of Dominance', text: 'When two different alleles are present, the **dominant** allele is expressed while the **recessive** allele is masked.', examples: 'Seed shape — R = round (dominant), r = wrinkled (recessive)' },
                    { type: 'punnett', p1: 'RR', p2: 'rr', caption: 'Cross: RR (round) × rr (wrinkled) → all F₁ offspring are Rr (round)' },
                    { type: 'note', tone: 'tip', title: 'Remember!', text: 'One dominant allele is enough to show the dominant trait.' },
                    chk('A plant has genotype **Rr**. What seed shape will it have?', ['Round', 'Wrinkled', 'Both round and wrinkled', 'Cannot be determined'], 'a', 'R is dominant, so Rr seeds are round.'),
                ],
            },
            {
                id: 'm2b-dom2', kicker: 'Law 1', title: 'Law of Dominance — Practice',
                blocks: [
                    chk('Which of the following genotypes will show a round seed shape?', ['RR only', 'Rr only', 'Rr and RR', 'rr only'], 'c', 'Any plant with at least one R allele has round seeds.'),
                    chk('What will be the seed shape of the offspring from the cross **Rr × Rr**?', ['All round', '3 round : 1 wrinkled', 'All wrinkled', '1 round : 3 wrinkled'], 'b', 'Rr × Rr gives RR, Rr, Rr, rr → 3 round : 1 wrinkled.'),
                    chk('Quick check: which genotype shows a wrinkled seed?', ['RR', 'Rr', 'rr', 'Both RR and Rr'], 'c', 'A wrinkled seed appears only when two recessive alleles (rr) are present.'),
                ],
            },
            {
                id: 'm2b-seg', kicker: 'Law 2', title: 'Law of Segregation',
                blocks: [
                    { type: 'definition', term: 'Law of Segregation', text: 'The two alleles for a trait **separate (segregate)** when gametes are formed. Each gamete gets only **one** allele.' },
                    { type: 'visual', visual: 'segregation' },
                    chk('A plant with genotype **Rr** can produce which gametes?', ['R only', 'r only', 'R and r', 'RR and rr'], 'c', 'The two alleles separate, so half the gametes carry R and half carry r.'),
                    chk('Which shows the correct gametes from a plant with genotype **rr**?', ['R and r', 'R only', 'r only', 'RR and rr'], 'c', 'A homozygous recessive plant produces only one kind of gamete: r.'),
                ],
            },
            {
                id: 'm2b-rr', kicker: 'Law 2', title: 'Results from Rr × Rr',
                blocks: [
                    { type: 'fillSquare', p1: 'Rr', p2: 'Rr', prompt: 'Complete the Punnett square for Rr × Rr. Tap each box to combine the alleles.' },
                    chk('What is the genotypic ratio of the offspring from Rr × Rr?', ['1 : 1', '3 : 1', '1 : 2 : 1', '2 : 2'], 'c', '1 RR : 2 Rr : 1 rr.'),
                    chk('What is the phenotypic ratio?', ['1 round : 1 wrinkled', '3 round : 1 wrinkled', '1 round : 2 wrinkled', '2 round : 2 wrinkled'], 'b', 'RR and Rr are round (3), rr is wrinkled (1).'),
                ],
            },
            {
                id: 'm2b-ia', kicker: 'Law 3', title: 'Law of Independent Assortment',
                blocks: [
                    { type: 'definition', term: 'Independent Assortment', text: 'Alleles of **different genes** assort independently when gametes are formed, producing different allele combinations.' },
                    { type: 'visual', visual: 'meiosis' },
                    { type: 'text', text: 'Example: seed shape (R/r) and seed color (Y/y). Cross: **RrYy × RrYy**. Because the two genes assort independently, **four** types of gametes are produced: RY, Ry, rY and ry. These gametes combine randomly in many ways.' },
                    chk('Which of the following is a possible gamete from a plant with genotype **RrYy**?', ['RR', 'RY', 'Rr', 'RYy'], 'b', 'A gamete carries one allele of each gene — RY is one of the four.'),
                    chk('How many different kinds of gametes can a plant with genotype **RrYy** produce?', ['2', '3', '4', '8'], 'c', 'RY, Ry, rY and ry — four kinds.'),
                    { type: 'note', tone: 'tip', title: 'Shortcut', text: 'Use the rule **2ⁿ**, where n is the number of heterozygous gene pairs. RrYy has 2 → 2² = 4 gametes.' },
                ],
            },
            {
                id: 'm2b-complete', title: 'Mission 2 Complete!',
                blocks: [
                    { type: 'complete', title: 'Mission 2 complete!', text: 'You learned the three laws Mendel discovered.', learned: ['The Law of Dominance', 'The Law of Segregation', 'The Law of Independent Assortment'] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 3 — Punnett Square Lab (theory)
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'punnett', levelId: 1,
        title: 'GeneQuest', mission: 'Mission 3', tagline: 'Punnett Square Lab',
        screens: [
            {
                id: 'm3-cover', title: 'Punnett Square Lab',
                blocks: [
                    { type: 'cover', mission: 'Mission 3', title: 'Punnett Square Lab', text: "In this mission you will learn how to use a Punnett square to predict the genotypes and phenotypes of offspring. Let's discover how traits are inherited!" },
                ],
            },
            {
                id: 'm3-what', title: 'What Is a Punnett Square?',
                blocks: [
                    { type: 'definition', term: 'Punnett square', text: 'A chart that helps us **predict the possible genotypes and phenotypes** of the offspring based on the parents’ genotypes.' },
                    { type: 'punnett', p1: 'Rr', p2: 'Rr', ringCells: true, caption: 'Each box shows a possible genotype of the offspring.' },
                    chk('How many boxes (possible offspring) are shown in this Punnett square?', ['1', '2', '3', '4'], 'd', 'There are 4 boxes. Notice that they hold only 3 different genotypes: RR, Rr and rr.'),
                ],
            },
            {
                id: 'm3-steps', title: 'How to Make a Punnett Square',
                blocks: [
                    { type: 'steps', title: 'Monohybrid cross — example Tt × Tt', steps: [
                        { label: 'Step 0', text: 'Make a 4-square grid (2 × 2) to represent the Punnett square.' },
                        { label: 'Step 1', text: 'Write the alleles of each parent OUTSIDE the box — one parent on top, the other on the side.' },
                        { label: 'Step 2', text: 'Combine the FIRST alleles. Fill only the FIRST small box (T + T = TT).' },
                        { label: 'Step 3', text: 'Combine the top t with the side T (Tt).' },
                        { label: 'Step 4', text: 'Combine the top T with the side t (Tt).' },
                        { label: 'Step 5', text: 'Lastly, combine the top t with the side t (tt).' },
                        { label: 'Step 6', text: 'Write the genotypic and phenotypic ratio: 1 TT : 2 Tt : 1 tt → 3 tall : 1 short.' },
                    ] },
                    { type: 'note', tone: 'important', title: 'Writing rule', text: 'Write the **dominant allele first** before the recessive: write **Tt**, not tT.' },
                    { type: 'fillSquare', p1: 'Tt', p2: 'Tt', prompt: 'Your turn! Tap each box, one at a time, to combine the alleles.' },
                ],
            },
            {
                id: 'm3-ratios', title: 'How to Get the Ratios',
                blocks: [
                    { type: 'punnett', p1: 'Tt', p2: 'Tt', caption: 'Tt × Tt (tall × tall) — T = tall (dominant), t = short (recessive)' },
                    { type: 'table', title: '1 · Determine the genotypic ratio', headers: ['Genotype', 'Count'], rows: [['TT', '1'], ['Tt', '2'], ['tt', '1']] },
                    { type: 'text', text: 'Count how many times each genotype appears → **Genotypic ratio: 1 TT : 2 Tt : 1 tt**' },
                    { type: 'table', title: '2 · Determine the phenotypic ratio', headers: ['Phenotype', 'Genotypes', 'Count'], rows: [['Tall (dominant)', 'TT + Tt', '1 + 2 = 3'], ['Short (recessive)', 'tt', '1']] },
                    { type: 'text', text: 'Group the genotypes with the same phenotype → **Phenotypic ratio: 3 tall : 1 short**' },
                ],
            },
            {
                id: 'm3-cu1', kicker: 'Check your understanding', title: 'Reading a Punnett Square',
                blocks: [
                    { type: 'punnett', p1: 'Rr', p2: 'Rr', ringEdges: true },
                    chk('What do the letters outside the four boxes represent?', ["The possible genotypes of the offspring", "The parents' gametes (alleles)", "The offspring's phenotypes", 'The dominant trait only'], 'b', 'The letters on the edges are the gametes each parent can give.'),
                    chk('What do the four small boxes in the center represent?', ["The parents' gametes", 'The possible genotypes of the offspring', 'The traits that will be expressed', 'The number of offspring'], 'b', 'Each box is one possible offspring genotype.'),
                ],
            },
            {
                id: 'm3-cu2', kicker: 'Check your understanding', title: 'Ratios from the Square',
                blocks: [
                    { type: 'punnett', p1: 'Rr', p2: 'Rr' },
                    chk('Which of the following shows the genotypic ratio of the offspring?', ['1 RR : 2 Rr : 1 rr', '3 dominant : 1 recessive', '2 RR : 2 Rr', '1 Rr : 1 rr'], 'a', 'Count each genotype: 1 RR, 2 Rr, 1 rr.'),
                    chk('R = round seeds (dominant), r = wrinkled seeds (recessive). What is the correct phenotypic ratio of the offspring?', ['1 round : 1 wrinkled', '2 round : 2 wrinkled', '3 round : 1 wrinkled', '4 round : 0 wrinkled'], 'c', 'RR + Rr + Rr are round (3), rr is wrinkled (1).'),
                    chk('Given R = round and r = wrinkled, which genotype-to-phenotype expression is INCORRECT?', ['RR – Round seeds', 'Rr – Round seeds', 'rr – Wrinkled seeds', 'Rr – Wrinkled seeds'], 'd', 'Rr has the dominant R allele, so it is round — not wrinkled.'),
                    chk('Which statement best describes what a Punnett square helps us do?', ['It shows the physical appearance of the parents.', 'It predicts the possible genotypes and phenotypes of the offspring and their probability.', 'It determines the number of offspring.', 'It shows only the dominant trait in the offspring.'], 'b', 'A Punnett square is a prediction tool.'),
                ],
            },
            {
                id: 'm3-gametes', title: 'Identifying Gametes',
                blocks: [
                    { type: 'tapSort', prompt: 'A heterozygous plant (Pp) produces two kinds of gametes. Tap them.', items: [{ text: 'P', correct: true }, { text: 'p', correct: true }, { text: 'PP', correct: false }, { text: 'pp', correct: false }], feedback: 'Pp makes P and p gametes — each gamete carries only one allele.' },
                    { type: 'punnett', p1: 'Pp', p2: 'Pp', caption: 'Pp × Pp — P = purple (dominant), p = white (recessive)' },
                    chk('How many offspring have the genotype Pp?', ['1', '2', '3', '4'], 'b', 'Two of the four boxes are Pp.'),
                    chk('What is the ratio of purple to white flowers in the offspring?', ['1 : 1', '3 : 1', '1 : 3', '2 : 2'], 'b', 'PP, Pp, Pp are purple; pp is white → 3 : 1.'),
                ],
            },
            {
                id: 'm3-another', title: 'Another Example',
                blocks: [
                    { type: 'text', text: 'Cross a **homozygous dominant** plant with a **homozygous recessive** plant: **PP × pp**.' },
                    { type: 'fillSquare', p1: 'PP', p2: 'pp', prompt: 'Complete the Punnett square.' },
                    chk('What are the genotypes of the offspring?', ['PP only', 'Pp only', 'pp only', 'Both PP and Pp'], 'b', 'Every box is Pp.'),
                    chk('What is the phenotype of the offspring?', ['All purple flowers', 'All white flowers', '3 purple : 1 white', '1 purple : 1 white'], 'a', 'Pp carries the dominant P, so all are purple.'),
                ],
            },
            {
                id: 'm3-real', title: 'Real-Life Scenario',
                blocks: [
                    { type: 'text', text: 'A gardener crossed a purple-flowered plant (**Pp**) with a white-flowered plant (**pp**).' },
                    { type: 'fillSquare', p1: 'Pp', p2: 'pp', prompt: 'Complete the Punnett square.' },
                    chk('What is the genotype ratio (PP : Pp : pp)?', ['1 : 1 : 0', '1 : 2 : 1', '3 : 1 : 0', '0 : 1 : 1'], 'd', 'No PP, two Pp and two pp → 0 : 1 : 1.'),
                    chk('A student got the results PP, Pp, Pp, pp from a different cross. What is the correct phenotype ratio?', ['1 purple : 1 white', '3 purple : 1 white', '2 purple : 2 white', '4 purple : 0 white'], 'b', 'Three boxes have P (purple), one is pp (white).'),
                ],
            },
            {
                id: 'm3-challenge', title: 'Challenge',
                blocks: [
                    { type: 'text', text: 'A tall plant (**Tt**) is crossed with a short plant (**tt**).' },
                    { type: 'fillSquare', p1: 'Tt', p2: 'tt', prompt: 'Complete the Punnett square.' },
                    chk('What is the phenotype ratio?', ['1 tall : 1 short', '3 tall : 1 short', 'All tall', 'All short'], 'a', '2 Tt (tall) and 2 tt (short) → 1 : 1.'),
                    { type: 'complete', title: 'Mission 3 complete!', text: 'You can now use a Punnett square like a real geneticist.', learned: ['Identify gametes', 'Make a Punnett square', 'Find the genotypes of offspring', 'Find the phenotypes of offspring', 'Determine genotype and phenotype ratios'] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 3 — Punnett Square Lab (practice)
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'punnett', levelId: 2,
        title: 'GeneQuest', mission: 'Mission 3', tagline: 'Punnett Square Lab — Let’s Practice',
        screens: [
            {
                id: 'm3lab-how', title: "Let's Practice!",
                blocks: [
                    { type: 'cover', mission: 'Mission 3 · Lab', title: 'Punnett Square Lab', text: 'Build the Punnett square yourself, then determine the genotypic and phenotypic ratio.' },
                    { type: 'steps', steps: [
                        { label: '1', text: 'Select the gametes of each parent.' },
                        { label: '2', text: 'Build the Punnett square: place the gametes outside, then tap each box.' },
                        { label: '3', text: 'Determine the ratios, then press Check Answer.' },
                    ] },
                ],
            },
            {
                id: 'm3lab-lab', title: 'Choose a Trait to Investigate',
                blocks: [{ type: 'lab' }],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 4 — Monohybrid Cross
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid', levelId: 1,
        title: 'GeneQuest', mission: 'Mission 4', tagline: 'Monohybrid Cross',
        screens: [
            {
                id: 'm4m-cover', title: 'Monohybrid Cross',
                blocks: [
                    { type: 'cover', mission: 'Mission 4', title: 'Monohybrid and Dihybrid Cross', text: 'In this mission you will solve new mysteries about pea plants, starting with the monohybrid cross — predicting offspring for ONE trait!' },
                ],
            },
            {
                id: 'm4m-case', kicker: 'Case File 04', title: 'The Mystery of the Pea Plants',
                blocks: [
                    { type: 'text', text: 'In a school garden, two **tall** pea plants were crossed. Their offspring included both tall **and short** plants!' },
                    { type: 'visual', visual: 'tallCross' },
                    chk('Why do you think short plants appeared even though both parents are tall?', ['Tall plants can produce short gametes.', 'Tall is a recessive trait.', 'Both parents may have recessive alleles.', 'Offspring traits are always different.'], 'c', 'Both parents are Tt — each carries a hidden recessive t allele.', 'Clue found!'),
                ],
            },
            {
                id: 'm4m-what', title: 'What Is a Monohybrid Cross?',
                blocks: [
                    { type: 'definition', term: 'Monohybrid cross', text: 'A genetic cross that involves **ONE** trait (one pair of contrasting traits). It uses a Punnett square to predict the possible genotypes and phenotypes of the offspring.' },
                    chk('Which of the following is an example of a monohybrid cross?', ['Seed color and plant height', 'Plant height only', 'Seed color and flower color', 'Plant height and pod shape'], 'b', 'Only one trait is being studied.'),
                ],
            },
            {
                id: 'm4m-example', kicker: 'Example word problem', title: 'Step-by-Step Solution',
                blocks: [
                    { type: 'text', text: 'In pea plants, purple flowers (P) are dominant over white flowers (p). If two heterozygous purple-flowered plants (Pp) are crossed, what are the genotypic and phenotypic ratios of the offspring?' },
                    { type: 'steps', steps: [
                        { label: 'Step 1', text: 'Identify the trait and alleles: flower color — P = purple (dominant), p = white (recessive).' },
                        { label: 'Step 2', text: 'Write the genotypes of the parents: Pp × Pp.' },
                        { label: 'Step 3', text: 'Determine the gametes of each parent: Pp → P, p.' },
                        { label: 'Step 4', text: 'Build the Punnett square.' },
                        { label: 'Step 5', text: 'Determine the ratios: genotypic 1 PP : 2 Pp : 1 pp, phenotypic 3 purple : 1 white.' },
                    ] },
                    { type: 'punnett', p1: 'Pp', p2: 'Pp' },
                ],
            },
            {
                id: 'm4m-wp1', kicker: 'Word problem', title: 'Tall × Short',
                blocks: [
                    { type: 'text', text: 'In pea plants, tall stem (T) is dominant over short stem (t). A heterozygous tall plant (**Tt**) is crossed with a short plant (**tt**). What are the genotypic and phenotypic ratios of the offspring?' },
                    { type: 'table', title: 'Step 1 · Understand the problem', headers: ['What is given?', 'What is asked?'], rows: [['Trait: plant height', 'The genotypic ratio'], ['T = tall, t = short', 'The phenotypic ratio'], ['Cross: Tt × tt', '']] },
                    { type: 'table', title: 'Steps 2–3 · Parents and gametes', headers: ['Parent', 'Genotype', 'Gametes'], rows: [['Parent 1 (heterozygous tall)', 'Tt', 'T, t'], ['Parent 2 (short)', 'tt', 't, t']] },
                    { type: 'fillSquare', p1: 'Tt', p2: 'tt', prompt: 'Step 4 · Build the Punnett square.' },
                    { type: 'table', title: 'Step 5 · Results', headers: ['', 'Ratio'], rows: [['Genotypic (Tt : tt)', '1 : 1'], ['Phenotypic (tall : short)', '1 : 1']] },
                    { type: 'note', tone: 'tip', title: 'Conclusion', text: 'The cross Tt × tt produces a genotypic ratio of **1 Tt : 1 tt** and a phenotypic ratio of **1 tall : 1 short**.' },
                ],
            },
            {
                id: 'm4m-practice', kicker: "Let's practice", title: 'Monohybrid Cross',
                blocks: [
                    { type: 'builder', problem: 'In pea plants, purple flowers (P) are dominant over white flowers (p). If two heterozygous purple-flowered plants (Pp) are crossed, what are the genotypic and phenotypic ratios of the offspring?', p1: 'Pp', p2: 'Pp', traits: [PEA_TRAITS.flowerColor] },
                ],
            },
            {
                id: 'm4m-quiz', title: 'Short Quiz',
                blocks: [
                    chk('Which of the following are the genotypes of two heterozygous parents for plant height?', ['TT × tt', 'Tt × Tt', 'TT × Tt', 'tt × tt'], 'b', 'Heterozygous means two different alleles: Tt.'),
                    chk('If two purebred tall pea plants are crossed, what is the genotype of their offspring?', ['Tt only', 'TT only', 'tt only', 'Both TT and Tt'], 'b', 'Purebred tall = TT; TT × TT gives only TT.'),
                    { type: 'complete', title: 'Monohybrid cross mastered!', text: 'Next, you will study TWO traits at the same time.', learned: ['What a monohybrid cross is', 'Solving a word problem step by step', 'Finding genotypic and phenotypic ratios'] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 4 — Dihybrid Cross
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid', levelId: 2,
        title: 'GeneQuest', mission: 'Mission 4', tagline: 'Dihybrid Cross',
        screens: [
            {
                id: 'm4d-cover', title: 'Dihybrid Cross',
                blocks: [
                    { type: 'cover', mission: 'Mission 4', title: 'Dihybrid Cross', text: 'In this part of the mission you will predict the possible genotypes and phenotypes of offspring involving TWO traits at the same time.' },
                ],
            },
            {
                id: 'm4d-case', kicker: 'Case File 05', title: 'Two Traits, One Cross',
                blocks: [
                    { type: 'text', text: 'A pea plant that is heterozygous for both **seed shape** and **pod color** (RrGg) is crossed with another heterozygous plant (RrGg).' },
                    { type: 'visual', visual: 'dihybridParents' },
                    chk('How many different gametes can each parent produce?', ['One (1)', 'Two (2)', 'Four (4)', 'Eight (8)'], 'c', 'RG, Rg, rG and rg — four kinds.'),
                ],
            },
            {
                id: 'm4d-what', title: 'What Is a Dihybrid Cross?',
                blocks: [
                    { type: 'definition', term: 'Dihybrid cross', text: 'A cross that studies **TWO traits** at the same time. It uses a **4 × 4** Punnett square to predict the possible genotypes and phenotypes of the offspring.' },
                    chk('Which of the following is an example of a dihybrid cross?', ['Plant height (Tt) × Plant height (Tt)', 'Seed shape (Rr) × Seed shape (Rr)', 'Seed shape and pod color (RrGg) × (RrGg)', 'Flower color (Pp) × Flower color (Pp)'], 'c', 'Two traits — seed shape and pod color — are studied together.'),
                ],
            },
            {
                id: 'm4d-genes', title: 'Meet the Two Genes',
                blocks: [
                    { type: 'visual', visual: 'twoGenes' },
                    chk('Which is the dominant allele for seed color?', ['y', 'Y', 'r', 'R'], 'b', 'Y (yellow) is dominant over y (green).'),
                    chk('What did Mendel discover by studying two traits at once?', ['Genes always stay together.', 'Different genes are inherited independently.', 'One gene controls two traits.', 'Traits are determined only by the environment.'], 'b', 'This is the Law of Independent Assortment.'),
                ],
            },
            {
                id: 'm4d-ia', title: "Mendel's Law of Independent Assortment",
                blocks: [
                    { type: 'visual', visual: 'meiosis' },
                    { type: 'text', text: 'During meiosis, the chromosome pairs line up independently. The alleles for different genes separate **independently**.' },
                    chk('What does "independent assortment" mean?', ['Alleles of different genes separate independently.', 'Only dominant alleles are inherited.', 'Genes always stay together.', 'Only one trait can be studied at a time.'], 'a', 'How one gene sorts does not affect how the other gene sorts.'),
                ],
            },
            {
                id: 'm4d-foil', title: 'The FOIL Method (Finding Gametes)',
                blocks: [
                    { type: 'text', text: 'Use the **FOIL** method to find all gametes from a dihybrid genotype. Pair the alleles: **F**irst, **O**uter, **I**nner, **L**ast.' },
                    { type: 'foil', genotype: 'YyRr' },
                    chk('What does FOIL stand for?', ['Front, Outer, Inside, Last', 'First, Outer, Inner, Last', 'Factor, Organize, Identify, Label', 'First, Only, Independent, Link'], 'b', 'First, Outer, Inner, Last.'),
                    chk('Which of the following is a possible gamete from a plant with genotype **RrYy**?', ['RR', 'RY', 'y', 'RYy'], 'b', 'A gamete has exactly one allele of each gene.'),
                ],
            },
            {
                id: 'm4d-identify', title: 'Identifying Gametes',
                blocks: [
                    { type: 'tapSort', prompt: 'A homozygous dominant plant (YY) produces only one kind of gamete. Tap it.', items: [{ text: 'Y', correct: true }, { text: 'y', correct: false }, { text: 'YY', correct: false }, { text: 'yy', correct: false }], feedback: 'YY can only pass on Y.' },
                    { type: 'tapSort', prompt: 'A homozygous recessive plant (rr) produces only one kind of gamete. Tap it.', items: [{ text: 'R', correct: false }, { text: 'r', correct: true }, { text: 'RR', correct: false }, { text: 'rr', correct: false }], feedback: 'rr can only pass on r.' },
                    { type: 'tapSort', prompt: 'A dihybrid plant (YyRr) produces four kinds of gametes. Tap all four.', items: [{ text: 'YR', correct: true }, { text: 'Yr', correct: true }, { text: 'YY', correct: false }, { text: 'yR', correct: true }, { text: 'Rr', correct: false }, { text: 'yr', correct: true }, { text: 'Yy', correct: false }, { text: 'rr', correct: false }], feedback: 'YR, Yr, yR and yr — one allele of each gene.' },
                ],
            },
            {
                id: 'm4d-solve', kicker: 'Example word problem', title: 'Step-by-Step: RrGg × RrGg',
                blocks: [
                    { type: 'text', text: 'In pea plants, round seeds (R) are dominant over wrinkled seeds (r), and green pods (G) are dominant over yellow pods (g). If two heterozygous plants (**RrGg**) are crossed, what are the genotypic and phenotypic ratios of the offspring?' },
                    { type: 'table', title: 'Step 1 · Identify the traits and alleles', headers: ['Trait', 'Dominant', 'Recessive'], rows: [['Seed shape', 'R (round)', 'r (wrinkled)'], ['Pod color', 'G (green)', 'g (yellow)']] },
                    { type: 'text', text: '**Step 2** · Parents: RrGg × RrGg.  **Step 3** · Find the gametes using FOIL:' },
                    { type: 'foil', genotype: 'RrGg' },
                    { type: 'fillSquare', p1: 'RrGg', p2: 'RrGg', prompt: 'Steps 4–9 · Write the gametes outside the square, then fill ONE box at a time, row by row, until all 16 boxes are complete.' },
                ],
            },
            {
                id: 'm4d-count', title: 'Count the Genotypes & Group the Phenotypes',
                blocks: [
                    { type: 'table', title: 'Step 10A · Count the genotypes', headers: ['Genotype', 'Boxes'], rows: [['RRGG', '1'], ['RRGg', '2'], ['RRgg', '1'], ['RrGG', '2'], ['RrGg', '4'], ['Rrgg', '2'], ['rrGG', '1'], ['rrGg', '2'], ['rrgg', '1']] },
                    { type: 'table', title: 'Step 10B · Group the phenotypes', headers: ['Phenotype', 'Genotypes', 'Count'], rows: [['Round, green pod (R_G_)', 'RRGG, RRGg, RrGG, RrGg', '9'], ['Round, yellow pod (R_gg)', 'RRgg, Rrgg', '3'], ['Wrinkled, green pod (rrG_)', 'rrGG, rrGg', '3'], ['Wrinkled, yellow pod (rrgg)', 'rrgg', '1']] },
                    { type: 'note', tone: 'tip', title: 'Result: the ratios', text: 'Genotypic ratio: **1 : 2 : 1 : 2 : 4 : 2 : 1 : 2 : 1**\nPhenotypic ratio: **9 : 3 : 3 : 1**' },
                    chk('What is the phenotypic ratio of a YyRr × YyRr cross?', ['1 : 1 : 1 : 1', '3 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'], 'c', 'Every heterozygous × heterozygous dihybrid cross gives 9 : 3 : 3 : 1.'),
                    chk('In a YyRr × YyRr cross, how many of the 16 boxes are YyRr?', ['1', '2', '4', '8'], 'c', 'The double heterozygote fills 4 of the 16 boxes.'),
                ],
            },
            {
                id: 'm4d-final', title: 'Final Challenge',
                blocks: [
                    chk('A pea plant that is heterozygous for both traits (YyRr) is crossed with another YyRr plant. Which statement is TRUE about the offspring?', ['There are 4 possible phenotypes.', 'The phenotypic ratio is 3 : 1.', 'The genotypic ratio is 9 : 3 : 3 : 1.', 'There are 16 possible genotype combinations.'], 'a', 'Four phenotypes in a 9 : 3 : 3 : 1 ratio. (There are 16 boxes but only 9 different genotypes.)'),
                ],
            },
            {
                id: 'm4d-practice', kicker: "Let's practice", title: 'Dihybrid Cross',
                blocks: [
                    { type: 'builder', problem: 'In pea plants, round seeds (R) are dominant over wrinkled seeds (r), and green pods (G) are dominant over yellow pods (g). If two heterozygous plants (RrGg) are crossed, what are the genotypic and phenotypic ratios of the offspring?', p1: 'RrGg', p2: 'RrGg', traits: [PEA_TRAITS.seedShape, PEA_TRAITS.podColor] },
                    { type: 'complete', title: 'Dihybrid cross complete!', text: 'You can now solve crosses with two traits.', learned: ['The meaning of independent assortment', 'Finding gametes with the FOIL method', 'Making a dihybrid Punnett square', 'Finding the genotypic ratio', 'Finding the phenotypic ratio'] },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  MISSION 4 — Checking of Understanding
    // ══════════════════════════════════════════════════════════
    {
        lessonId: 'dihybrid', levelId: 3,
        title: 'GeneQuest', mission: 'Mission 4', tagline: 'Checking of Understanding',
        screens: [
            {
                id: 'm4c-chicken', kicker: 'Check your understanding', title: 'The Crested Chickens',
                blocks: [
                    { type: 'builder', problem: 'In chickens, a crest (C) is dominant over no crest (c), and black feathers (B) are dominant over white feathers (b). If two heterozygous chickens (CcBb) are crossed, what are the genotypic and phenotypic ratios of their offspring?', p1: 'CcBb', p2: 'CcBb', traits: CHICKEN },
                ],
            },
            {
                id: 'm4c-quiz', title: 'Short Quiz',
                blocks: [
                    chk('In a dihybrid cross, a plant is heterozygous for seed shape and pod color (RrGg). How many different gametes can it produce?', ['1', '2', '4', '8'], 'c', 'RG, Rg, rG, rg.'),
                    chk('What are the genotypes of two chickens that are both heterozygous for crest (C) and feather color (B)?', ['CcBb × CcBb', 'CCBb × CcBb', 'CcBB × Ccbb', 'ccBb × CcBb'], 'a', 'Heterozygous for both → CcBb.'),
                    chk('In a dihybrid cross (RrTt × RrTt), what is the expected phenotypic ratio of the offspring?', ['1 : 1 : 1 : 1', '3 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'], 'c', 'The classic dihybrid ratio.'),
                ],
            },
            {
                id: 'm4c-final', title: 'Checking of Understanding',
                blocks: [
                    chk('Which statement best describes the Law of Independent Assortment?', ['Alleles of different genes separate independently during gamete formation.', 'A dominant allele always masks a recessive allele.', 'Two alleles of a gene unite during fertilization.', 'Genes for different traits are always inherited together.'], 'a', 'That is independent assortment.'),
                    chk('A pea plant with genotype **PpTt** (purple flowers, tall) can produce which set of gametes?', ['PT and pt only', 'Pp and Tt only', 'PT, Pt, pT, and pt', 'P, p, T, and t'], 'c', 'FOIL gives PT, Pt, pT, pt.'),
                    chk('In a dihybrid cross of PpTt × PpTt, what is the expected phenotypic ratio of the offspring?', ['1 : 2 : 1', '3 : 1', '1 : 1 : 1 : 1', '9 : 3 : 3 : 1'], 'd', '9 purple tall : 3 purple short : 3 white tall : 1 white short.'),
                    chk('In a dihybrid cross of PpTt × PpTt, what is the probability of an offspring that is white-flowered and short (pptt)?', ['50% (1/2)', '25% (1/4)', '12.5% (1/8)', '6.25% (1/16)'], 'd', 'Only 1 of the 16 boxes is pptt.'),
                    { type: 'complete', title: 'Mission 4 complete!', text: 'You have finished every GeneQuest mission. Try the Checking of Understanding test in Test Your Knowledge!', learned: ['Monohybrid crosses', 'Dihybrid crosses', 'FOIL method', 'Genotypic and phenotypic ratios'] },
                ],
            },
        ],
    },
];
