export type QuestionType = "mcq" | "drag";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Choice {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    difficulty: QuestionDifficulty;
    type: QuestionType;
    question: string;
    hint: string;
    explanation: string;
    choices?: Choice[];          // MCQ only
    answer?: string;             // MCQ: choice id
    parentA?: string[];          // drag only
    parentB?: string[];          // drag only
    dragAnswers?: string[];      // drag only — expected cell values
}

export interface Level {
    id: number;
    title: string;
    questions: Question[];
}

export interface Lesson {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    accentColor: string;
    levels: Level[];
}

// ── Hearts config ─────────────────────────────────────────────
export const HEARTS_PER_LEVEL = 5;

// Questions per phase per play (randomly sampled from pool)
export const QUESTIONS_PER_PHASE: Record<QuestionDifficulty, number> = {
    easy: 3,
    medium: 3,
    hard: 2,
};

// ── Lessons + questions ───────────────────────────────────────
export const LESSONS: Lesson[] = [

    // ══════════════════════════════════════════════════════════
    //  LESSON 1 — Intro to Genetics
    // ══════════════════════════════════════════════════════════
    {
        id: 'intro', title: 'Intro to Genetics', subtitle: 'DNA, genes & traits',
        color: '#d0f0e8', accentColor: '#4CAF50',
        levels: [
            // ── Level 1: The Basics ───────────────────────────────
            {
                id: 1, title: 'The Basics',
                questions: [
                    // EASY (5)
                    {
                        id: 'i1e1', difficulty: 'easy', type: 'mcq',
                        question: 'What molecule carries genetic information inside a cell?',
                        hint: 'Think of the famous twisted ladder structure in the nucleus.',
                        explanation: 'DNA (deoxyribonucleic acid) is the molecule that stores all genetic instructions. It is found in the nucleus of every cell.',
                        choices: [{ id: 'a', text: 'Protein' }, { id: 'b', text: 'DNA' }, { id: 'c', text: 'Lipid' }, { id: 'd', text: 'Glucose' }], answer: 'b'
                    },
                    {
                        id: 'i1e2', difficulty: 'easy', type: 'mcq',
                        question: 'Where is DNA found inside a cell?',
                        hint: 'It is inside the control center of the cell.',
                        explanation: 'DNA is stored in the nucleus, which acts as the cell\'s control center. It is protected there and rarely leaves.',
                        choices: [{ id: 'a', text: 'Mitochondria' }, { id: 'b', text: 'Cell wall' }, { id: 'c', text: 'Nucleus' }, { id: 'd', text: 'Ribosome' }], answer: 'c'
                    },
                    {
                        id: 'i1e3', difficulty: 'easy', type: 'mcq',
                        question: 'What is a gene?',
                        hint: 'Genes are sections of a larger molecule that code for traits.',
                        explanation: 'A gene is a specific segment of DNA that contains instructions for building a protein or expressing a trait, such as eye color or height.',
                        choices: [{ id: 'a', text: 'A type of protein' }, { id: 'b', text: 'A segment of DNA that codes for a trait' }, { id: 'c', text: 'A cell organelle' }, { id: 'd', text: 'A type of carbohydrate' }], answer: 'b'
                    },
                    {
                        id: 'i1e4', difficulty: 'easy', type: 'mcq',
                        question: 'How many chromosomes do humans normally have?',
                        hint: 'Think of 23 pairs.',
                        explanation: 'Humans have 46 chromosomes arranged in 23 pairs. One chromosome in each pair comes from the mother, and the other comes from the father.',
                        choices: [{ id: 'a', text: '23' }, { id: 'b', text: '46' }, { id: 'c', text: '44' }, { id: 'd', text: '48' }], answer: 'b'
                    },
                    {
                        id: 'i1e5', difficulty: 'easy', type: 'mcq',
                        question: 'What is the shape of the DNA molecule?',
                        hint: 'Imagine a ladder that has been twisted.',
                        explanation: 'DNA has a double helix shape — like a twisted ladder. The sides are sugar-phosphate backbones, and the rungs are base pairs.',
                        choices: [{ id: 'a', text: 'Straight line' }, { id: 'b', text: 'Circle' }, { id: 'c', text: 'Double helix' }, { id: 'd', text: 'Triple helix' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'i1m1', difficulty: 'medium', type: 'mcq',
                        question: 'What are the two different forms of the same gene called?',
                        hint: 'You get one from each parent.',
                        explanation: 'Alleles are alternative forms of the same gene. For example, the gene for eye color has alleles for brown and blue.',
                        choices: [{ id: 'a', text: 'Chromosomes' }, { id: 'b', text: 'Proteins' }, { id: 'c', text: 'Alleles' }, { id: 'd', text: 'Codons' }], answer: 'c'
                    },
                    {
                        id: 'i1m2', difficulty: 'medium', type: 'mcq',
                        question: 'A rabbit has genotype "Bb" (B = black, dominant). What is its fur color?',
                        hint: 'One dominant allele is enough to express the dominant trait.',
                        explanation: 'Bb is heterozygous. Since B (black) is dominant over b (white), the rabbit shows black fur. The white allele is hidden but can still be passed to offspring.',
                        choices: [{ id: 'a', text: 'White' }, { id: 'b', text: 'Black' }, { id: 'c', text: 'Grey' }, { id: 'd', text: 'Brown' }], answer: 'b'
                    },
                    {
                        id: 'i1m3', difficulty: 'medium', type: 'mcq',
                        question: 'Which correctly describes a homozygous genotype?',
                        hint: 'Homo means same — both alleles are identical.',
                        explanation: 'Homozygous means both alleles for a gene are the same, such as TT (homozygous dominant) or tt (homozygous recessive).',
                        choices: [{ id: 'a', text: 'Two different alleles (Tt)' }, { id: 'b', text: 'Two identical alleles (TT or tt)' }, { id: 'c', text: 'No alleles at all' }, { id: 'd', text: 'One allele only' }], answer: 'b'
                    },
                    {
                        id: 'i1m4', difficulty: 'medium', type: 'mcq',
                        question: 'How many alleles does each parent contribute to their offspring per gene?',
                        hint: 'Parents contribute one from their pair.',
                        explanation: 'Each parent contributes exactly ONE allele per gene to their offspring. The offspring then has two alleles — one from mom, one from dad.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '3' }, { id: 'd', text: '4' }], answer: 'a'
                    },
                    // HARD (4)
                    {
                        id: 'i1h1', difficulty: 'hard', type: 'mcq',
                        question: 'A trait that only appears when two recessive alleles are present is called…',
                        hint: 'It is hidden when paired with a dominant allele.',
                        explanation: 'A recessive trait is only expressed when both alleles are recessive (e.g., tt). If even one dominant allele is present, the dominant trait masks it.',
                        choices: [{ id: 'a', text: 'Dominant' }, { id: 'b', text: 'Codominant' }, { id: 'c', text: 'Recessive' }, { id: 'd', text: 'Polygenic' }], answer: 'c'
                    },
                    {
                        id: 'i1h2', difficulty: 'hard', type: 'mcq',
                        question: 'If T = tall (dominant) and t = short (recessive), what is the phenotype of "tt"?',
                        hint: 'Both alleles are recessive — no dominant allele to mask it.',
                        explanation: 'tt is homozygous recessive. With no dominant T allele present, the recessive phenotype (short) is fully expressed.',
                        choices: [{ id: 'a', text: 'Tall' }, { id: 'b', text: 'Short' }, { id: 'c', text: 'Medium height' }, { id: 'd', text: 'Cannot be determined' }], answer: 'b'
                    },
                    {
                        id: 'i1h3', difficulty: 'hard', type: 'mcq',
                        question: 'Two brown-eyed parents (Bb × Bb) have a blue-eyed child (bb). Is this possible?',
                        hint: 'Heterozygous parents carry a hidden recessive allele.',
                        explanation: 'Yes! Both parents are Bb. Each parent can pass their b allele, giving a 25% chance of a bb (blue-eyed) child. This is why traits can "skip" generations.',
                        choices: [{ id: 'a', text: 'No, impossible' }, { id: 'b', text: 'Yes, 25% chance' }, { id: 'c', text: 'Only if the mother is blue-eyed' }, { id: 'd', text: 'Yes, 50% chance' }], answer: 'b'
                    },
                    {
                        id: 'i1h4', difficulty: 'hard', type: 'mcq',
                        question: 'Which term describes the actual allele combination of an organism?',
                        hint: 'This is the genetic "recipe", not the visible result.',
                        explanation: 'Genotype refers to the specific allele combination (e.g., Tt, BB, rr). Phenotype is what you can see or observe.',
                        choices: [{ id: 'a', text: 'Phenotype' }, { id: 'b', text: 'Trait' }, { id: 'c', text: 'Genotype' }, { id: 'd', text: 'Chromosome' }], answer: 'c'
                    },
                ],
            },

            // ── Level 2: Inheritance Patterns ────────────────────
            {
                id: 2, title: 'Inheritance Patterns',
                questions: [
                    {
                        id: 'i2e1', difficulty: 'easy', type: 'mcq',
                        question: 'The physical appearance produced by a genotype is called its…',
                        hint: 'What you can actually see or observe.',
                        explanation: 'Phenotype is the observable trait — what you can see, such as flower color or plant height. Genotype is the underlying genetic code.',
                        choices: [{ id: 'a', text: 'Genotype' }, { id: 'b', text: 'Phenotype' }, { id: 'c', text: 'Allele' }, { id: 'd', text: 'Chromosome' }], answer: 'b'
                    },
                    {
                        id: 'i2e2', difficulty: 'easy', type: 'mcq',
                        question: 'The actual allele combination of an organism is its…',
                        hint: 'The genetic recipe, not the visible result.',
                        explanation: 'Genotype is the specific pair of alleles an organism carries for a gene (e.g., Tt, BB). It determines what traits can be passed to offspring.',
                        choices: [{ id: 'a', text: 'Phenotype' }, { id: 'b', text: 'Trait' }, { id: 'c', text: 'Genotype' }, { id: 'd', text: 'Chromosome' }], answer: 'c'
                    },
                    {
                        id: 'i2e3', difficulty: 'easy', type: 'mcq',
                        question: 'Which of these is an example of a phenotype?',
                        hint: 'It is something you can observe about the organism.',
                        explanation: 'Purple flower color is a phenotype — an observable trait. Genotypes like "Pp" are the underlying genetic codes that produce phenotypes.',
                        choices: [{ id: 'a', text: 'Tt genotype' }, { id: 'b', text: 'Purple flower color' }, { id: 'c', text: 'The bb allele pair' }, { id: 'd', text: 'A chromosome' }], answer: 'b'
                    },
                    {
                        id: 'i2e4', difficulty: 'easy', type: 'mcq',
                        question: 'A dominant allele is represented by…',
                        hint: 'Genetics uses a capital/lowercase convention.',
                        explanation: 'By convention, dominant alleles are written with capital letters (e.g., T for tall) and recessive alleles with lowercase letters (e.g., t for short).',
                        choices: [{ id: 'a', text: 'A lowercase letter' }, { id: 'b', text: 'A capital letter' }, { id: 'c', text: 'A number' }, { id: 'd', text: 'A symbol' }], answer: 'b'
                    },
                    {
                        id: 'i2e5', difficulty: 'easy', type: 'mcq',
                        question: 'What does "heterozygous" mean?',
                        hint: 'Hetero means different.',
                        explanation: 'Heterozygous means having two different alleles for a gene (e.g., Tt or Bb). The organism carries both a dominant and a recessive allele.',
                        choices: [{ id: 'a', text: 'Two identical alleles' }, { id: 'b', text: 'Two different alleles' }, { id: 'c', text: 'No alleles' }, { id: 'd', text: 'Three alleles' }], answer: 'b'
                    },
                    // MEDIUM (4)
                    {
                        id: 'i2m1', difficulty: 'medium', type: 'mcq',
                        question: 'Which genotype is heterozygous?',
                        hint: 'Look for the pair with two different alleles.',
                        explanation: 'Tt is heterozygous because it has one dominant (T) and one recessive (t) allele. TT and tt are homozygous because both alleles are the same.',
                        choices: [{ id: 'a', text: 'TT' }, { id: 'b', text: 'tt' }, { id: 'c', text: 'Tt' }, { id: 'd', text: 'None of the above' }], answer: 'c'
                    },
                    {
                        id: 'i2m2', difficulty: 'medium', type: 'mcq',
                        question: 'A dominant trait appears whenever…',
                        hint: 'Even one copy of the dominant allele is sufficient.',
                        explanation: 'A dominant allele only needs to appear once in the genotype to be expressed. So both TT and Tt will show the dominant trait.',
                        choices: [{ id: 'a', text: 'Two dominant alleles are present' }, { id: 'b', text: 'At least one dominant allele is present' }, { id: 'c', text: 'No recessive alleles are present' }, { id: 'd', text: 'Only in males' }], answer: 'b'
                    },
                    {
                        id: 'i2m3', difficulty: 'medium', type: 'mcq',
                        question: 'Two tall plants (Tt × Tt). What % of offspring will be short (tt)?',
                        hint: 'Draw the Punnett square: TT, Tt, Tt, tt.',
                        explanation: 'The Punnett square for Tt × Tt gives TT, Tt, Tt, tt. Only tt shows the recessive (short) phenotype — that is 1 out of 4 = 25%.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'b'
                    },
                    {
                        id: 'i2m4', difficulty: 'medium', type: 'mcq',
                        question: 'If both parents are Bb (brown eyes), what fraction of children will have blue eyes (bb)?',
                        hint: 'Cross Bb × Bb and count the bb boxes.',
                        explanation: 'Bb × Bb gives BB, Bb, Bb, bb. The bb (blue-eyed) outcome appears once in four boxes, so 1/4 or 25% of children will have blue eyes.',
                        choices: [{ id: 'a', text: '0' }, { id: 'b', text: '1/4' }, { id: 'c', text: '1/2' }, { id: 'd', text: '3/4' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'i2h1', difficulty: 'hard', type: 'mcq',
                        question: 'Two carrier parents (Aa × Aa). Probability child shows the disease?',
                        hint: 'Only aa shows the recessive disease.',
                        explanation: 'Aa × Aa gives AA, Aa, Aa, aa. Only aa (1 out of 4) shows the disease, so there is a 25% chance. This is why carrier parents can have affected children.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'b'
                    },
                    {
                        id: 'i2h2', difficulty: 'hard', type: 'mcq',
                        question: 'A blue-eyed child (bb) with two brown-eyed parents. Parents\' genotypes?',
                        hint: 'The parents must each carry a hidden recessive allele.',
                        explanation: 'Both parents must be Bb — they each carry one hidden b allele. When both pass b, the child gets bb (blue eyes). This shows how recessive traits can be carried silently.',
                        choices: [{ id: 'a', text: 'BB × BB' }, { id: 'b', text: 'Bb × Bb' }, { id: 'c', text: 'BB × bb' }, { id: 'd', text: 'bb × bb' }], answer: 'b'
                    },
                    {
                        id: 'i2h3', difficulty: 'hard', type: 'mcq',
                        question: 'Which cross will produce ONLY offspring with the dominant phenotype?',
                        hint: 'Both parents must be homozygous dominant.',
                        explanation: 'BB × BB gives only BB offspring — all of them show the dominant phenotype. No recessive allele is present, so the recessive trait cannot appear.',
                        choices: [{ id: 'a', text: 'Tt × tt' }, { id: 'b', text: 'Tt × Tt' }, { id: 'c', text: 'BB × BB' }, { id: 'd', text: 'Bb × bb' }], answer: 'c'
                    },
                    {
                        id: 'i2h4', difficulty: 'hard', type: 'mcq',
                        question: 'The allele that is always expressed when present, regardless of the other allele, is called…',
                        hint: 'This allele "dominates" its partner.',
                        explanation: 'A dominant allele is always expressed when present — whether the organism is homozygous (TT) or heterozygous (Tt). The recessive allele is masked.',
                        choices: [{ id: 'a', text: 'Recessive' }, { id: 'b', text: 'Codominant' }, { id: 'c', text: 'Dominant' }, { id: 'd', text: 'Polygenic' }], answer: 'c'
                    },
                ],
            },

            // ── Level 3: DNA Deep Dive ────────────────────────────
            {
                id: 3, title: 'DNA Deep Dive',
                questions: [
                    {
                        id: 'i3e1', difficulty: 'easy', type: 'mcq',
                        question: 'DNA stands for…',
                        hint: 'It is a long name for a very small molecule.',
                        explanation: 'DNA stands for Deoxyribonucleic Acid. The "deoxy" refers to a missing oxygen atom in the sugar component compared to RNA.',
                        choices: [{ id: 'a', text: 'Deoxyribonucleic Acid' }, { id: 'b', text: 'Deoxyribose Nucleotide Atom' }, { id: 'c', text: 'Double Nucleic Acid' }, { id: 'd', text: 'Dinucleotide Acid' }], answer: 'a'
                    },
                    {
                        id: 'i3e2', difficulty: 'easy', type: 'mcq',
                        question: 'The shape of a DNA molecule is a…',
                        hint: 'Imagine a ladder that has been twisted.',
                        explanation: 'DNA forms a double helix — two strands wound around each other like a twisted ladder. The rungs of the ladder are the base pairs.',
                        choices: [{ id: 'a', text: 'Single helix' }, { id: 'b', text: 'Double helix' }, { id: 'c', text: 'Triple helix' }, { id: 'd', text: 'Straight ladder' }], answer: 'b'
                    },
                    {
                        id: 'i3e3', difficulty: 'easy', type: 'mcq',
                        question: 'The four bases in DNA are Adenine, Thymine, Guanine, and…',
                        hint: 'Starts with C and rhymes with "machine".',
                        explanation: 'The four DNA bases are Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). They pair specifically: A with T, and G with C.',
                        choices: [{ id: 'a', text: 'Cytosine' }, { id: 'b', text: 'Cellulose' }, { id: 'c', text: 'Chlorine' }, { id: 'd', text: 'Chromatin' }], answer: 'a'
                    },
                    {
                        id: 'i3e4', difficulty: 'easy', type: 'mcq',
                        question: 'Which process makes an exact copy of DNA before cell division?',
                        hint: 'It makes a replica — the word sounds like it.',
                        explanation: 'DNA replication copies the entire DNA molecule so each daughter cell receives a complete set of genetic instructions. It happens in the nucleus before cell division.',
                        choices: [{ id: 'a', text: 'Transcription' }, { id: 'b', text: 'Translation' }, { id: 'c', text: 'Replication' }, { id: 'd', text: 'Mutation' }], answer: 'c'
                    },
                    {
                        id: 'i3e5', difficulty: 'easy', type: 'mcq',
                        question: 'Which base always pairs with Adenine in DNA?',
                        hint: 'Remember: A pairs with T.',
                        explanation: 'Adenine (A) always pairs with Thymine (T), and Guanine (G) always pairs with Cytosine (C). This complementary base pairing holds the two DNA strands together.',
                        choices: [{ id: 'a', text: 'Guanine' }, { id: 'b', text: 'Cytosine' }, { id: 'c', text: 'Thymine' }, { id: 'd', text: 'Adenine' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'i3m1', difficulty: 'medium', type: 'mcq',
                        question: 'Which base always pairs with Guanine in DNA?',
                        hint: 'G pairs with C.',
                        explanation: 'Guanine (G) always pairs with Cytosine (C). This G-C pairing involves three hydrogen bonds, making it slightly stronger than the A-T pair which has two.',
                        choices: [{ id: 'a', text: 'Adenine' }, { id: 'b', text: 'Thymine' }, { id: 'c', text: 'Cytosine' }, { id: 'd', text: 'Guanine' }], answer: 'c'
                    },
                    {
                        id: 'i3m2', difficulty: 'medium', type: 'mcq',
                        question: 'What is a mutation?',
                        hint: 'It is a change — not always harmful.',
                        explanation: 'A mutation is any change in the DNA sequence. Mutations can be harmful, neutral, or even beneficial. They can occur spontaneously or be caused by environmental factors like UV radiation.',
                        choices: [{ id: 'a', text: 'A change in the DNA sequence' }, { id: 'b', text: 'Normal cell division' }, { id: 'c', text: 'A type of protein' }, { id: 'd', text: 'A chromosome copy' }], answer: 'a'
                    },
                    {
                        id: 'i3m3', difficulty: 'medium', type: 'mcq',
                        question: 'Where in the cell does DNA replication take place?',
                        hint: 'DNA lives here.',
                        explanation: 'DNA replication occurs in the nucleus, where DNA is stored. The process unzips the double helix and builds two identical copies using complementary base pairing.',
                        choices: [{ id: 'a', text: 'Ribosome' }, { id: 'b', text: 'Cell wall' }, { id: 'c', text: 'Cytoplasm' }, { id: 'd', text: 'Nucleus' }], answer: 'd'
                    },
                    {
                        id: 'i3m4', difficulty: 'medium', type: 'mcq',
                        question: 'During which phase of mitosis do chromosomes line up in the center of the cell?',
                        hint: 'It comes right after Prophase.',
                        explanation: 'In Metaphase, chromosomes line up along the cell\'s equator (the metaphase plate). This ensures that when the cell divides, each daughter cell gets the correct chromosomes.',
                        choices: [{ id: 'a', text: 'Anaphase' }, { id: 'b', text: 'Telophase' }, { id: 'c', text: 'Metaphase' }, { id: 'd', text: 'Interphase' }], answer: 'c'
                    },
                    // HARD (4)
                    {
                        id: 'i3h1', difficulty: 'hard', type: 'mcq',
                        question: 'If one DNA strand reads A-T-G-C, what is the complementary strand?',
                        hint: 'A pairs with T, and G pairs with C.',
                        explanation: 'Complementary base pairing: A pairs with T, T pairs with A, G pairs with C, C pairs with G. So A-T-G-C becomes T-A-C-G on the complementary strand.',
                        choices: [{ id: 'a', text: 'A-T-G-C' }, { id: 'b', text: 'T-A-C-G' }, { id: 'c', text: 'G-C-A-T' }, { id: 'd', text: 'C-G-T-A' }], answer: 'b'
                    },
                    {
                        id: 'i3h2', difficulty: 'hard', type: 'mcq',
                        question: 'What type of mutation involves inserting an extra base into the DNA sequence?',
                        hint: 'Adding something extra changes the reading frame.',
                        explanation: 'An insertion mutation adds one or more extra base pairs to the DNA. This shifts the entire reading frame, often producing a non-functional protein — called a frameshift mutation.',
                        choices: [{ id: 'a', text: 'Substitution' }, { id: 'b', text: 'Deletion' }, { id: 'c', text: 'Insertion' }, { id: 'd', text: 'Inversion' }], answer: 'c'
                    },
                    {
                        id: 'i3h3', difficulty: 'hard', type: 'mcq',
                        question: 'What does it mean for DNA to be "semi-conservative" during replication?',
                        hint: 'Each new molecule keeps one original strand.',
                        explanation: 'Semi-conservative replication means each new DNA molecule contains one original (parental) strand and one newly synthesized strand. This ensures accurate copying of genetic information.',
                        choices: [{ id: 'a', text: 'Both strands are brand new' }, { id: 'b', text: 'One strand is kept, one is new' }, { id: 'c', text: 'Both strands are kept' }, { id: 'd', text: 'DNA is destroyed and rebuilt' }], answer: 'b'
                    },
                    {
                        id: 'i3h4', difficulty: 'hard', type: 'mcq',
                        question: 'Which enzyme "unzips" the DNA double helix during replication?',
                        hint: 'It breaks hydrogen bonds between base pairs.',
                        explanation: 'Helicase is the enzyme that unwinds and unzips the DNA double helix by breaking the hydrogen bonds between base pairs, creating a replication fork.',
                        choices: [{ id: 'a', text: 'Ligase' }, { id: 'b', text: 'Polymerase' }, { id: 'c', text: 'Helicase' }, { id: 'd', text: 'Primase' }], answer: 'c'
                    },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  LESSON 2 — Mendel's Laws
    // ══════════════════════════════════════════════════════════
    {
        id: 'mendel', title: "Mendel's Laws", subtitle: 'Father of Genetics',
        color: '#ead5f0', accentColor: '#9C27B0',
        levels: [
            // ── Level 1: Mendel's Experiments ────────────────────
            {
                id: 1, title: "Mendel's Experiments",
                questions: [
                    {
                        id: 'm1e1', difficulty: 'easy', type: 'mcq',
                        question: 'What plant did Gregor Mendel use in his genetics experiments?',
                        hint: 'It is a common garden vegetable with edible seeds.',
                        explanation: 'Mendel chose pea plants (Pisum sativum) because they have distinct, easily observable traits, reproduce quickly, and can be self-pollinated or cross-pollinated.',
                        choices: [{ id: 'a', text: 'Corn' }, { id: 'b', text: 'Pea plant' }, { id: 'c', text: 'Rose' }, { id: 'd', text: 'Tomato' }], answer: 'b'
                    },
                    {
                        id: 'm1e2', difficulty: 'easy', type: 'mcq',
                        question: 'Mendel is known as the Father of…',
                        hint: 'The science of heredity and variation.',
                        explanation: 'Gregor Mendel is called the Father of Genetics because his experiments with pea plants in the 1860s established the fundamental laws of inheritance.',
                        choices: [{ id: 'a', text: 'Evolution' }, { id: 'b', text: 'Cell biology' }, { id: 'c', text: 'Genetics' }, { id: 'd', text: 'Botany' }], answer: 'c'
                    },
                    {
                        id: 'm1e3', difficulty: 'easy', type: 'mcq',
                        question: 'A pea plant has genotype "Pp" (P = purple, dominant). What color are its flowers?',
                        hint: 'One dominant allele is enough to express the dominant trait.',
                        explanation: 'Pp is heterozygous. Since P (purple) dominates p (white), the plant shows purple flowers. The white allele is present but not expressed.',
                        choices: [{ id: 'a', text: 'White' }, { id: 'b', text: 'Purple' }, { id: 'c', text: 'Pink' }, { id: 'd', text: 'Yellow' }], answer: 'b'
                    },
                    {
                        id: 'm1e4', difficulty: 'easy', type: 'mcq',
                        question: 'Which pea trait is dominant — round seeds or wrinkled seeds?',
                        hint: 'It appeared in every F1 generation plant.',
                        explanation: 'Round seeds are dominant over wrinkled. When Mendel crossed pure round × pure wrinkled plants, ALL F1 offspring had round seeds — proving round is dominant.',
                        choices: [{ id: 'a', text: 'Wrinkled' }, { id: 'b', text: 'Round' }, { id: 'c', text: 'Both' }, { id: 'd', text: 'Neither' }], answer: 'b'
                    },
                    {
                        id: 'm1e5', difficulty: 'easy', type: 'mcq',
                        question: 'In Mendel\'s experiments, what does the "P generation" refer to?',
                        hint: 'P stands for "parental."',
                        explanation: 'The P generation is the original parental generation — the purebred plants Mendel started with. Crossing P plants produces the F1 generation.',
                        choices: [{ id: 'a', text: 'The offspring generation' }, { id: 'b', text: 'The purebred parental generation' }, { id: 'c', text: 'The hybrid generation' }, { id: 'd', text: 'The final generation' }], answer: 'b'
                    },
                    // MEDIUM (4)
                    {
                        id: 'm1m1', difficulty: 'medium', type: 'mcq',
                        question: 'Mendel\'s Law of Segregation states that allele pairs separate during…',
                        hint: 'When sex cells (gametes) are formed.',
                        explanation: 'Allele pairs separate during meiosis — the process that forms gametes (egg and sperm). Each gamete receives only one allele per gene, which reunite at fertilization.',
                        choices: [{ id: 'a', text: 'Mitosis' }, { id: 'b', text: 'Fertilization' }, { id: 'c', text: 'Meiosis' }, { id: 'd', text: 'Growth' }], answer: 'c'
                    },
                    {
                        id: 'm1m2', difficulty: 'medium', type: 'mcq',
                        question: 'Tt × Tt cross. What is the ratio of tall to short offspring?',
                        hint: 'Count the Punnett square outcomes: TT, Tt, Tt, tt.',
                        explanation: 'Tt × Tt gives TT, Tt, Tt, tt. Three show the dominant (tall) phenotype; one shows recessive (short). The ratio is 3:1 — a classic Mendelian result.',
                        choices: [{ id: 'a', text: '1:1' }, { id: 'b', text: '2:1' }, { id: 'c', text: '3:1' }, { id: 'd', text: '4:0' }], answer: 'c'
                    },
                    {
                        id: 'm1m3', difficulty: 'medium', type: 'mcq',
                        question: 'In Mendel\'s F1 cross (Pp × Pp), what fraction of offspring will have white flowers (pp)?',
                        hint: 'Only homozygous recessive plants show white.',
                        explanation: 'Pp × Pp gives PP, Pp, Pp, pp. Only pp (1 of 4) shows white flowers. So 1/4 or 25% will have white flowers. This is Mendel\'s famous 3:1 ratio.',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/2' }, { id: 'c', text: '3/4' }, { id: 'd', text: '0' }], answer: 'a'
                    },
                    {
                        id: 'm1m4', difficulty: 'medium', type: 'mcq',
                        question: 'What does the F2 generation represent in Mendel\'s experiments?',
                        hint: 'F2 comes from crossing F1 plants with each other.',
                        explanation: 'The F2 generation is the offspring of F1 × F1 crosses. This is where Mendel observed the 3:1 phenotype ratio and 1:2:1 genotype ratio.',
                        choices: [{ id: 'a', text: 'The original purebred parents' }, { id: 'b', text: 'Offspring of F1 × F1 cross' }, { id: 'c', text: 'First hybrid generation' }, { id: 'd', text: 'Third generation' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'm1h1', difficulty: 'hard', type: 'mcq',
                        question: 'Law of Independent Assortment: genes for different traits are inherited…',
                        hint: 'One gene\'s allele sorting does not affect another gene\'s alleles.',
                        explanation: 'Mendel\'s Law of Independent Assortment states that alleles for different genes separate independently during gamete formation — one gene\'s inheritance does not influence another\'s.',
                        choices: [{ id: 'a', text: 'Together always' }, { id: 'b', text: 'Independently of one another' }, { id: 'c', text: 'In dominant-to-recessive order' }, { id: 'd', text: 'Only from the mother' }], answer: 'b'
                    },
                    {
                        id: 'm1h2', difficulty: 'hard', type: 'mcq',
                        question: 'Dihybrid cross RrYy × RrYy. How many different PHENOTYPE combinations are possible?',
                        hint: 'Round/wrinkled × yellow/green — think of all the combinations.',
                        explanation: 'A dihybrid cross produces 4 phenotype classes: Round Yellow, Round Green, Wrinkled Yellow, Wrinkled Green. In a 9:3:3:1 ratio — 4 phenotype combinations.',
                        choices: [{ id: 'a', text: '2' }, { id: 'b', text: '4' }, { id: 'c', text: '9' }, { id: 'd', text: '16' }], answer: 'b'
                    },
                    {
                        id: 'm1h3', difficulty: 'hard', type: 'mcq',
                        question: 'In Mendel\'s monohybrid cross (Tt × Tt), what is the genotype ratio?',
                        hint: 'Count each distinct genotype: TT, Tt, tt.',
                        explanation: 'The genotype ratio from Tt × Tt is 1 TT : 2 Tt : 1 tt. The phenotype ratio is 3 tall : 1 short. These are different — genotype and phenotype ratios differ.',
                        choices: [{ id: 'a', text: '1:1:1' }, { id: 'b', text: '1:2:1' }, { id: 'c', text: '3:1' }, { id: 'd', text: '2:1:1' }], answer: 'b'
                    },
                    {
                        id: 'm1h4', difficulty: 'hard', type: 'mcq',
                        question: 'Why did Mendel choose pea plants with traits that showed no blending?',
                        hint: 'Think about what makes traits easy to analyze statistically.',
                        explanation: 'Mendel chose traits with clear-cut dominant/recessive patterns (no blending) so he could count ratios precisely. Blended traits would have made the pattern impossible to see.',
                        choices: [{ id: 'a', text: 'Pea plants grow faster with blended traits' }, { id: 'b', text: 'Clear ratios could be counted and analyzed statistically' }, { id: 'c', text: 'Blended traits are always dominant' }, { id: 'd', text: 'He had no choice — peas only blend' }], answer: 'b'
                    },
                ],
            },

            // ── Level 2: Beyond Mendel ────────────────────────────
            {
                id: 2, title: 'Beyond Mendel',
                questions: [
                    {
                        id: 'm2e1', difficulty: 'easy', type: 'mcq',
                        question: 'In codominance, both alleles are…',
                        hint: 'Neither allele hides the other.',
                        explanation: 'In codominance, both alleles are fully expressed at the same time. For example, a red-and-white spotted flower shows both red AND white — not a blend.',
                        choices: [{ id: 'a', text: 'Only dominant expressed' }, { id: 'b', text: 'Only recessive expressed' }, { id: 'c', text: 'Both fully expressed' }, { id: 'd', text: 'Neither expressed' }], answer: 'c'
                    },
                    {
                        id: 'm2e2', difficulty: 'easy', type: 'mcq',
                        question: 'A trait controlled by many genes is called…',
                        hint: 'Poly means many.',
                        explanation: 'Polygenic traits are controlled by two or more genes. Human height, skin color, and eye color are polygenic traits — this explains the wide range of variation in populations.',
                        choices: [{ id: 'a', text: 'Codominant' }, { id: 'b', text: 'Polygenic' }, { id: 'c', text: 'Recessive' }, { id: 'd', text: 'Dominant' }], answer: 'b'
                    },
                    {
                        id: 'm2e3', difficulty: 'easy', type: 'mcq',
                        question: 'Incomplete dominance produces a…',
                        hint: 'Neither allele fully masks the other — you get a blend.',
                        explanation: 'In incomplete dominance, neither allele is fully dominant, so the heterozygous phenotype is a blend of both. Red × White = Pink flowers is the classic example.',
                        choices: [{ id: 'a', text: 'Stronger dominant trait' }, { id: 'b', text: 'Blend of both traits' }, { id: 'c', text: 'Only recessive trait' }, { id: 'd', text: 'No trait at all' }], answer: 'b'
                    },
                    {
                        id: 'm2e4', difficulty: 'easy', type: 'mcq',
                        question: 'Which blood type is an example of codominance?',
                        hint: 'Two alleles are both fully expressed.',
                        explanation: 'Blood type AB shows codominance — both the I^A (type A) and I^B (type B) alleles are fully expressed. The person has BOTH A and B antigens on their red blood cells.',
                        choices: [{ id: 'a', text: 'Type O' }, { id: 'b', text: 'Type A' }, { id: 'c', text: 'Type AB' }, { id: 'd', text: 'Type B' }], answer: 'c'
                    },
                    {
                        id: 'm2e5', difficulty: 'easy', type: 'mcq',
                        question: 'Which pattern of inheritance produces a BLEND of the two parental phenotypes?',
                        hint: 'Neither allele dominates — they mix.',
                        explanation: 'Incomplete dominance produces a blended phenotype in heterozygotes. Example: Red (RR) × White (WW) → Pink (RW). Neither red nor white fully masks the other.',
                        choices: [{ id: 'a', text: 'Complete dominance' }, { id: 'b', text: 'Codominance' }, { id: 'c', text: 'Incomplete dominance' }, { id: 'd', text: 'Polygenic inheritance' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'm2m1', difficulty: 'medium', type: 'mcq',
                        question: 'Red (RR) × White (WW) flowers → all pink (RW). This is an example of…',
                        hint: 'The heterozygote shows a blend.',
                        explanation: 'This is incomplete dominance. The red and white alleles are equally "strong," so the RW heterozygote produces a pink phenotype — a blend of the two parents.',
                        choices: [{ id: 'a', text: 'Codominance' }, { id: 'b', text: 'Incomplete dominance' }, { id: 'c', text: 'Complete dominance' }, { id: 'd', text: 'Polygenic inheritance' }], answer: 'b'
                    },
                    {
                        id: 'm2m2', difficulty: 'medium', type: 'mcq',
                        question: 'Human skin color is controlled by multiple genes. This is an example of…',
                        hint: 'Many genes working together to produce a range of phenotypes.',
                        explanation: 'Polygenic inheritance means several genes contribute to the same trait, producing a continuous range of phenotypes. Human skin color, height, and weight are all polygenic.',
                        choices: [{ id: 'a', text: 'Simple dominant/recessive' }, { id: 'b', text: 'Codominance' }, { id: 'c', text: 'Polygenic inheritance' }, { id: 'd', text: 'Incomplete dominance' }], answer: 'c'
                    },
                    {
                        id: 'm2m3', difficulty: 'medium', type: 'mcq',
                        question: 'Pink × Pink (RW × RW). Expected ratio of red:pink:white offspring?',
                        hint: 'Draw the Punnett square: RR, RW, RW, WW.',
                        explanation: 'RW × RW gives RR (red), RW (pink), RW (pink), WW (white). The ratio is 1 red : 2 pink : 1 white. This is the 1:2:1 ratio characteristic of incomplete dominance.',
                        choices: [{ id: 'a', text: '3:0:1' }, { id: 'b', text: '1:2:1' }, { id: 'c', text: '1:1:0' }, { id: 'd', text: '0:4:0' }], answer: 'b'
                    },
                    {
                        id: 'm2m4', difficulty: 'medium', type: 'mcq',
                        question: 'A person with genotype I^A I^B has blood type…',
                        hint: 'Both alleles are equally expressed in codominance.',
                        explanation: 'I^A I^B is an example of codominance — both A and B antigens are present on the red blood cells, resulting in blood type AB. Neither allele masks the other.',
                        choices: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'AB' }, { id: 'd', text: 'O' }], answer: 'c'
                    },
                    // HARD (4)
                    {
                        id: 'm2h1', difficulty: 'hard', type: 'mcq',
                        question: 'In a cross between two pink snapdragons (RW × RW), what fraction will be red (RR)?',
                        hint: 'RW × RW — count the RR boxes.',
                        explanation: 'RW × RW gives RR, RW, RW, WW. Only 1 out of 4 is RR (red). So 1/4 or 25% of offspring will be red.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'b'
                    },
                    {
                        id: 'm2h2', difficulty: 'hard', type: 'mcq',
                        question: 'Man (I^A I^O) × Woman (I^B I^O). Which blood type CAN their children NOT have?',
                        hint: 'Cross the alleles: I^A, I^O from dad and I^B, I^O from mom.',
                        explanation: 'I^A I^O × I^B I^O gives: I^A I^B (AB), I^A I^O (A), I^B I^O (B), I^O I^O (O). All four blood types are possible! None is excluded in this cross.',
                        choices: [{ id: 'a', text: 'Type A' }, { id: 'b', text: 'Type B' }, { id: 'c', text: 'Type AB' }, { id: 'd', text: 'All types are possible' }], answer: 'd'
                    },
                    {
                        id: 'm2h3', difficulty: 'hard', type: 'mcq',
                        question: 'Why does incomplete dominance NOT support blending inheritance?',
                        hint: 'What happens when you cross two pink flowers?',
                        explanation: 'If traits truly blended, crossing two pink flowers should give all pink offspring. But RW × RW gives RR (red), RW (pink), and WW (white). The original colors reappear — proving alleles stay separate.',
                        choices: [{ id: 'a', text: 'Pink offspring never appear' }, { id: 'b', text: 'Original red and white traits reappear in F2' }, { id: 'c', text: 'Only pink offspring appear forever' }, { id: 'd', text: 'Alleles permanently mix together' }], answer: 'b'
                    },
                    {
                        id: 'm2h4', difficulty: 'hard', type: 'mcq',
                        question: 'What distinguishes codominance from incomplete dominance?',
                        hint: 'In one, both traits appear side by side; in the other, they blend.',
                        explanation: 'Codominance: both alleles are FULLY expressed simultaneously (e.g., red AND white spots). Incomplete dominance: alleles BLEND to produce a new intermediate phenotype (e.g., pink).',
                        choices: [{ id: 'a', text: 'Codominance produces a blend; incomplete dominance does not' }, { id: 'b', text: 'Both alleles fully appear in codominance; blend in incomplete dominance' }, { id: 'c', text: 'There is no difference' }, { id: 'd', text: 'Incomplete dominance shows both traits separately' }], answer: 'b'
                    },
                ],
            },

            // ── Level 3: Sex-Linked Traits ────────────────────────
            {
                id: 3, title: 'Sex-Linked Traits',
                questions: [
                    {
                        id: 'm3e1', difficulty: 'easy', type: 'mcq',
                        question: 'Which chromosomes determine biological sex in humans?',
                        hint: 'X and Y.',
                        explanation: 'Humans have 23 pairs of chromosomes. The 23rd pair are the sex chromosomes — females are XX and males are XY. The Y chromosome from the father determines male sex.',
                        choices: [{ id: 'a', text: 'Chromosomes 1 and 2' }, { id: 'b', text: 'X and Y chromosomes' }, { id: 'c', text: 'Autosomes' }, { id: 'd', text: 'Mitochondrial DNA' }], answer: 'b'
                    },
                    {
                        id: 'm3e2', difficulty: 'easy', type: 'mcq',
                        question: 'A female human has which sex chromosome combination?',
                        hint: 'Females have two of the same sex chromosome.',
                        explanation: 'Females are XX — they have two X chromosomes. Males are XY. Females always pass an X to their children; males pass either X (daughter) or Y (son).',
                        choices: [{ id: 'a', text: 'XY' }, { id: 'b', text: 'XX' }, { id: 'c', text: 'YY' }, { id: 'd', text: 'X only' }], answer: 'b'
                    },
                    {
                        id: 'm3e3', difficulty: 'easy', type: 'mcq',
                        question: 'Color blindness is more common in males because…',
                        hint: 'Males have only one X chromosome.',
                        explanation: 'Males (XY) have only one X chromosome. If their single X carries the color blindness allele, there is no second X to mask it. Females need two copies to be color blind.',
                        choices: [{ id: 'a', text: 'Males have two X chromosomes' }, { id: 'b', text: 'Males have only one X so one recessive allele shows' }, { id: 'c', text: 'Color blindness is autosomal' }, { id: 'd', text: 'Females cannot carry the allele' }], answer: 'b'
                    },
                    {
                        id: 'm3e4', difficulty: 'easy', type: 'mcq',
                        question: 'A trait carried on the X chromosome is said to be…',
                        hint: 'It is linked to a specific sex chromosome.',
                        explanation: 'X-linked traits are carried on the X chromosome. Because males only have one X, they are more likely to show X-linked recessive traits than females.',
                        choices: [{ id: 'a', text: 'Autosomal' }, { id: 'b', text: 'X-linked' }, { id: 'c', text: 'Y-linked' }, { id: 'd', text: 'Polygenic' }], answer: 'b'
                    },
                    {
                        id: 'm3e5', difficulty: 'easy', type: 'mcq',
                        question: 'Why can\'t fathers pass X-linked traits directly to their sons?',
                        hint: 'Think about what chromosome a father gives to a son.',
                        explanation: 'Fathers give the Y chromosome to their sons (XY). The X chromosome is passed to daughters. So X-linked traits go from father → daughter, never father → son directly.',
                        choices: [{ id: 'a', text: 'Fathers give Y to sons, not X' }, { id: 'b', text: 'Fathers give X to sons' }, { id: 'c', text: 'Sons do not inherit from fathers' }, { id: 'd', text: 'X-linked traits skip generations' }], answer: 'a'
                    },
                    // MEDIUM (4)
                    {
                        id: 'm3m1', difficulty: 'medium', type: 'mcq',
                        question: 'Carrier mother (X^B X^b) × normal father (X^B Y). Chance their son is color blind?',
                        hint: 'Sons get their X from mom, Y from dad.',
                        explanation: 'Sons get one X from mom. Mom is X^B X^b, so 50% of her X gametes carry X^B and 50% carry X^b. A son who gets X^b Y will be color blind. So 50% chance.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'c'
                    },
                    {
                        id: 'm3m2', difficulty: 'medium', type: 'mcq',
                        question: 'Carrier mother × normal father. Probability a DAUGHTER is a carrier?',
                        hint: 'Daughters get one X from each parent.',
                        explanation: 'Daughters get X^B from dad and either X^B or X^b from mom. X^B X^b daughters are carriers. X^B X^B daughters are normal. So 50% of daughters are carriers.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'c'
                    },
                    {
                        id: 'm3m3', difficulty: 'medium', type: 'mcq',
                        question: 'A color-blind father (X^b Y) × normal homozygous mother (X^B X^B). All daughters will be…',
                        hint: 'Daughters get X^b from dad, X^B from mom.',
                        explanation: 'All daughters get X^b from dad and X^B from mom, making them all X^B X^b — carriers. They show normal vision but carry the color blindness allele.',
                        choices: [{ id: 'a', text: 'Color blind' }, { id: 'b', text: 'Carriers' }, { id: 'c', text: 'Normal (not carriers)' }, { id: 'd', text: 'Half normal, half color blind' }], answer: 'b'
                    },
                    {
                        id: 'm3m4', difficulty: 'medium', type: 'mcq',
                        question: 'Hemophilia is X-linked recessive. A carrier mother × normal father. Risk a son has hemophilia?',
                        hint: 'Sons get one X from mom — which one will they get?',
                        explanation: 'The carrier mother is X^H X^h. Sons get Y from dad and either X^H or X^h from mom. Sons who get X^h Y will have hemophilia. Probability = 50%.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'c'
                    },
                    // HARD (4)
                    {
                        id: 'm3h1', difficulty: 'hard', type: 'mcq',
                        question: 'Color-blind mother (X^b X^b) × normal father (X^B Y). What fraction of sons are color blind?',
                        hint: 'All sons get the only X mom has — X^b.',
                        explanation: 'A color-blind mother only has X^b to pass. All sons receive X^b from mom and Y from dad. Therefore ALL sons (100%) will be color blind.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'd'
                    },
                    {
                        id: 'm3h2', difficulty: 'hard', type: 'mcq',
                        question: 'A girl is color blind (X^b X^b). What must be true about her parents?',
                        hint: 'She has two X^b alleles — where did each come from?',
                        explanation: 'She has X^b X^b. She got one X^b from each parent. Her father MUST be color blind (X^b Y). Her mother must carry at least one X^b (either carrier X^B X^b or color blind X^b X^b).',
                        choices: [{ id: 'a', text: 'Father is color blind; mother is at least a carrier' }, { id: 'b', text: 'Only the mother is color blind' }, { id: 'c', text: 'Neither parent needs to be affected' }, { id: 'd', text: 'Father must have two X chromosomes' }], answer: 'a'
                    },
                    {
                        id: 'm3h3', difficulty: 'hard', type: 'mcq',
                        question: 'Why are X-linked recessive disorders more common in males than females?',
                        hint: 'Compare X chromosome counts between sexes.',
                        explanation: 'Males (XY) have only one X. If it carries the recessive allele, the disorder is expressed — there is no second X to compensate. Females (XX) need two recessive alleles to show the disorder.',
                        choices: [{ id: 'a', text: 'Males have stronger immune systems' }, { id: 'b', text: 'Males have only one X so the recessive allele is always expressed' }, { id: 'c', text: 'Females cannot carry recessive alleles' }, { id: 'd', text: 'Y chromosome suppresses X-linked traits' }], answer: 'b'
                    },
                    {
                        id: 'm3h4', difficulty: 'hard', type: 'mcq',
                        question: 'If a man is X^b Y (color blind) and his wife is X^B X^b (carrier), what are the possible phenotypes of their children?',
                        hint: 'Cross all X combinations from both parents.',
                        explanation: 'Cross: X^b Y × X^B X^b → X^B X^b (carrier daughter), X^b X^b (color blind daughter), X^B Y (normal son), X^b Y (color blind son). All four phenotypes are possible.',
                        choices: [{ id: 'a', text: 'All children will be color blind' }, { id: 'b', text: 'Only sons will be color blind' }, { id: 'c', text: 'Carrier daughters, color blind daughters, normal sons, color blind sons' }, { id: 'd', text: 'No daughters will be affected' }], answer: 'c'
                    },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  LESSON 3 — Punnett Squares
    // ══════════════════════════════════════════════════════════
    {
        id: 'punnett', title: 'Punnett Squares', subtitle: 'Predict offspring',
        color: '#cfe4fa', accentColor: '#1565C0',
        levels: [
            // ── Level 1: Reading the Grid ─────────────────────────
            {
                id: 1, title: 'Reading the Grid',
                questions: [
                    {
                        id: 'p1e1', difficulty: 'easy', type: 'mcq',
                        question: 'What is a Punnett square used for?',
                        hint: 'It predicts what offspring might look like genetically.',
                        explanation: 'A Punnett square is a grid diagram used to predict the possible genotypes and phenotypes of offspring from a specific genetic cross between two parents.',
                        choices: [{ id: 'a', text: 'Drawing cell structures' }, { id: 'b', text: 'Predicting offspring genotypes' }, { id: 'c', text: 'Mapping chromosomes' }, { id: 'd', text: 'Counting mutations' }], answer: 'b'
                    },
                    {
                        id: 'p1e2', difficulty: 'easy', type: 'mcq',
                        question: 'In a Punnett square, parent alleles are placed…',
                        hint: 'One parent on top, the other on the left side.',
                        explanation: 'Parent alleles are written along the TOP and LEFT side of the grid. Each cell is then filled by combining the allele from the top with the allele from the left.',
                        choices: [{ id: 'a', text: 'Inside the cells' }, { id: 'b', text: 'Along the top and left side' }, { id: 'c', text: 'In the bottom corners' }, { id: 'd', text: 'Randomly anywhere' }], answer: 'b'
                    },
                    {
                        id: 'p1e3', difficulty: 'easy', type: 'mcq',
                        question: 'TT × tt cross. What is the genotype of ALL offspring?',
                        hint: 'Every T from one parent meets every t from the other.',
                        explanation: 'TT × tt: every gamete from the TT parent carries T, and every gamete from tt carries t. All offspring are Tt — heterozygous and showing the dominant trait.',
                        choices: [{ id: 'a', text: 'TT' }, { id: 'b', text: 'tt' }, { id: 'c', text: 'Tt' }, { id: 'd', text: 'Mix of all' }], answer: 'c'
                    },
                    {
                        id: 'p1e4', difficulty: 'easy', type: 'mcq',
                        question: 'Tt × tt cross. Which genotypes appear in offspring?',
                        hint: 'Combine each allele from the top with each allele from the side.',
                        explanation: 'Tt × tt gives: T×t=Tt, T×t=Tt, t×t=tt, t×t=tt. Half the offspring are Tt (tall) and half are tt (short). This is a 1:1 phenotype ratio.',
                        choices: [{ id: 'a', text: 'Only TT' }, { id: 'b', text: 'Tt and tt' }, { id: 'c', text: 'Only Tt' }, { id: 'd', text: 'TT and Tt' }], answer: 'b'
                    },
                    {
                        id: 'p1e5', difficulty: 'easy', type: 'mcq',
                        question: 'In a Punnett square, each cell represents…',
                        hint: 'It shows one possible outcome for one offspring.',
                        explanation: 'Each cell in the Punnett square represents one possible genotype for an offspring. The probability of each outcome equals 1/total number of cells (usually 1/4 for a 2×2 grid).',
                        choices: [{ id: 'a', text: 'A chromosome' }, { id: 'b', text: 'A parent allele' }, { id: 'c', text: 'A possible offspring genotype' }, { id: 'd', text: 'A completed DNA molecule' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'p1m1', difficulty: 'medium', type: 'mcq',
                        question: 'Tt × Tt. Fraction of offspring that are homozygous dominant (TT)?',
                        hint: 'Count the TT boxes in the 4-cell grid.',
                        explanation: 'Tt × Tt produces: TT, Tt, Tt, tt. Only the top-left cell is TT — 1 out of 4. So 1/4 (25%) of offspring are homozygous dominant.',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '2/4' }, { id: 'c', text: '3/4' }, { id: 'd', text: '4/4' }], answer: 'a'
                    },
                    {
                        id: 'p1m2', difficulty: 'medium', type: 'mcq',
                        question: 'Tt × Tt. Phenotype ratio (tall:short)?',
                        hint: 'TT and Tt are both tall. Only tt is short.',
                        explanation: 'From Tt × Tt: TT (tall), Tt (tall), Tt (tall), tt (short). Three are tall, one is short. The phenotype ratio is 3 tall : 1 short — the classic Mendelian ratio.',
                        choices: [{ id: 'a', text: '1:1' }, { id: 'b', text: '2:1' }, { id: 'c', text: '3:1' }, { id: 'd', text: '4:0' }], answer: 'c'
                    },
                    {
                        id: 'p1m3', difficulty: 'medium', type: 'mcq',
                        question: 'Tt × tt. What fraction of offspring will show the dominant (tall) phenotype?',
                        hint: 'Cross gives: Tt, Tt, tt, tt — count the tall ones.',
                        explanation: 'Tt × tt produces Tt, Tt, tt, tt. Two of four offspring are Tt (tall) and two are tt (short). So 2/4 = 1/2 (50%) are tall.',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/2' }, { id: 'c', text: '3/4' }, { id: 'd', text: 'All' }], answer: 'b'
                    },
                    {
                        id: 'p1m4', difficulty: 'medium', type: 'mcq',
                        question: 'From a Tt × Tt cross, what is the genotype ratio?',
                        hint: 'Count each distinct genotype: 1 TT, 2 Tt, 1 tt.',
                        explanation: 'Tt × Tt gives one TT, two Tt, and one tt. The genotype ratio is 1:2:1 (TT:Tt:tt). Note this is different from the 3:1 phenotype ratio!',
                        choices: [{ id: 'a', text: '1:1:1' }, { id: 'b', text: '1:2:1' }, { id: 'c', text: '3:1' }, { id: 'd', text: '2:2' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'p1h1', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Tt × Tt.',
                        hint: 'Top row: T and t. Left column: T and t. Combine each pair.',
                        explanation: 'Tt × Tt gives TT (top-left), Tt (top-right), Tt (bottom-left), tt (bottom-right). The ratio is 1 TT : 2 Tt : 1 tt.',
                        parentA: ['T', 't'], parentB: ['T', 't'], dragAnswers: ['TT', 'Tt', 'Tt', 'tt']
                    },
                    {
                        id: 'p1h2', difficulty: 'hard', type: 'mcq',
                        question: 'BB × bb cross. What fraction of offspring are heterozygous?',
                        hint: 'BB contributes only B; bb contributes only b.',
                        explanation: 'BB × bb: all offspring receive one B from the BB parent and one b from the bb parent. All offspring are Bb — 100% heterozygous. This is why all F1 offspring show the dominant trait.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'd'
                    },
                    {
                        id: 'p1h3', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for TT × tt.',
                        hint: 'TT parent gives only T; tt parent gives only t.',
                        explanation: 'TT × tt: every cell is Tt. All 4 offspring are heterozygous dominant. This shows why crossing purebred parents always gives all-hybrid F1 offspring.',
                        parentA: ['T', 'T'], parentB: ['t', 't'], dragAnswers: ['Tt', 'Tt', 'Tt', 'Tt']
                    },
                    {
                        id: 'p1h4', difficulty: 'hard', type: 'mcq',
                        question: 'In a 2×2 Punnett square, each cell has what probability of occurring?',
                        hint: 'There are 4 equally likely outcomes.',
                        explanation: 'Each cell in a standard 2×2 Punnett square represents a 1 in 4 chance (25%). This assumes all gametes are equally likely and fertilization is random.',
                        choices: [{ id: 'a', text: '10%' }, { id: 'b', text: '20%' }, { id: 'c', text: '25%' }, { id: 'd', text: '50%' }], answer: 'c'
                    },
                ],
            },

            // ── Level 2: Probability & Ratios ─────────────────────
            {
                id: 2, title: 'Probability & Ratios',
                questions: [
                    {
                        id: 'p2e1', difficulty: 'easy', type: 'mcq',
                        question: '"3/4 of offspring show the dominant trait." What does this mean practically?',
                        hint: 'Think of 3 out of every 4 offspring.',
                        explanation: '3/4 means that in a large group of offspring, approximately 3 out of every 4 will show the dominant phenotype. This is a probability, not a guarantee for small families.',
                        choices: [{ id: 'a', text: '3 dominant : 4 recessive' }, { id: 'b', text: '3 out of 4 offspring show that trait' }, { id: 'c', text: '4 genotypes are possible' }, { id: 'd', text: 'None of the above' }], answer: 'b'
                    },
                    {
                        id: 'p2e2', difficulty: 'easy', type: 'mcq',
                        question: 'bb × Bb cross. What fraction of offspring will be bb?',
                        hint: 'Cross: b+b=bb, b+B=Bb, b+b=bb, b+B=Bb.',
                        explanation: 'bb × Bb gives Bb, Bb, bb, bb. Two out of four are bb. So 2/4 = 1/2 (50%) of offspring will be bb (showing the recessive phenotype).',
                        choices: [{ id: 'a', text: '0' }, { id: 'b', text: '1/4' }, { id: 'c', text: '1/2' }, { id: 'd', text: '3/4' }], answer: 'c'
                    },
                    {
                        id: 'p2e3', difficulty: 'easy', type: 'mcq',
                        question: 'BB × bb produces offspring with what genotype?',
                        hint: 'One B from BB parent, one b from bb parent.',
                        explanation: 'BB can only give B gametes; bb can only give b gametes. Every offspring gets one B and one b, making ALL offspring Bb (heterozygous dominant).',
                        choices: [{ id: 'a', text: 'BB' }, { id: 'b', text: 'bb' }, { id: 'c', text: 'Bb' }, { id: 'd', text: 'Half BB, half bb' }], answer: 'c'
                    },
                    {
                        id: 'p2e4', difficulty: 'easy', type: 'mcq',
                        question: 'Rr × rr cross. What fraction of offspring are Rr?',
                        hint: 'Cross: R+r=Rr, R+r=Rr, r+r=rr, r+r=rr.',
                        explanation: 'Rr × rr gives Rr, Rr, rr, rr. Two of four are Rr — that is 1/2 (50%) heterozygous. The other 50% are rr (homozygous recessive).',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/2' }, { id: 'c', text: '3/4' }, { id: 'd', text: 'All' }], answer: 'b'
                    },
                    {
                        id: 'p2e5', difficulty: 'easy', type: 'mcq',
                        question: 'In a Tt × Tt cross, what is the probability of a TT offspring?',
                        hint: 'Count TT boxes in the 4-cell grid.',
                        explanation: 'Tt × Tt gives one TT, two Tt, and one tt. TT appears in 1 of 4 cells, so the probability is 1/4 (25%).',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '2/4' }, { id: 'c', text: '3/4' }, { id: 'd', text: '4/4' }], answer: 'a'
                    },
                    // MEDIUM (4)
                    {
                        id: 'p2m1', difficulty: 'medium', type: 'drag',
                        question: 'Complete the Punnett square for Aa × Aa.',
                        hint: 'Same pattern as Tt × Tt.',
                        explanation: 'Aa × Aa gives AA (top-left), Aa (top-right), Aa (bottom-left), aa (bottom-right). Ratio: 1 AA : 2 Aa : 1 aa. 75% show dominant, 25% recessive.',
                        parentA: ['A', 'a'], parentB: ['A', 'a'], dragAnswers: ['AA', 'Aa', 'Aa', 'aa']
                    },
                    {
                        id: 'p2m2', difficulty: 'medium', type: 'mcq',
                        question: 'Blue-eyed man (bb) × Brown-eyed woman (Bb). % of children with blue eyes?',
                        hint: 'Cross bb × Bb and count the bb children.',
                        explanation: 'bb × Bb gives Bb, Bb, bb, bb. Two of four children are bb (blue eyes) = 50%. The other two are Bb (brown eyes, carriers). A 1:1 phenotype ratio.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'c'
                    },
                    {
                        id: 'p2m3', difficulty: 'medium', type: 'mcq',
                        question: 'Tt × Tt. Probability of getting a homozygous offspring (TT OR tt)?',
                        hint: 'Add TT probability + tt probability.',
                        explanation: 'TT appears with probability 1/4 and tt appears with probability 1/4. The probability of any homozygous offspring = 1/4 + 1/4 = 2/4 = 1/2 (50%).',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/2' }, { id: 'c', text: '3/4' }, { id: 'd', text: '1' }], answer: 'b'
                    },
                    {
                        id: 'p2m4', difficulty: 'medium', type: 'mcq',
                        question: 'In a Tt × tt cross, what is the phenotype ratio?',
                        hint: 'Tt is tall; tt is short. Count each.',
                        explanation: 'Tt × tt gives Tt, Tt, tt, tt. Two tall (Tt) and two short (tt). The phenotype ratio is 1:1 — equal numbers of each phenotype. This is a test cross result.',
                        choices: [{ id: 'a', text: '3:1' }, { id: 'b', text: '1:1' }, { id: 'c', text: '1:2:1' }, { id: 'd', text: 'All tall' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'p2h1', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Bb × bb.',
                        hint: 'Top row: B and b. Left column: b and b.',
                        explanation: 'Bb × bb gives Bb (top-left), bb (top-right), Bb (bottom-left), bb (bottom-right). Half are Bb (dominant phenotype), half are bb (recessive phenotype). 1:1 ratio.',
                        parentA: ['B', 'b'], parentB: ['b', 'b'], dragAnswers: ['Bb', 'bb', 'Bb', 'bb']
                    },
                    {
                        id: 'p2h2', difficulty: 'hard', type: 'mcq',
                        question: 'In a cross, 50% of offspring show the recessive phenotype. The parents\' genotypes are most likely…',
                        hint: 'A 1:1 ratio comes from a specific cross type.',
                        explanation: 'A 50% recessive (1:1 phenotype ratio) result is the hallmark of a testcross: heterozygous × homozygous recessive (Tt × tt or Bb × bb).',
                        choices: [{ id: 'a', text: 'TT × TT' }, { id: 'b', text: 'Tt × Tt' }, { id: 'c', text: 'Tt × tt' }, { id: 'd', text: 'tt × tt' }], answer: 'c'
                    },
                    {
                        id: 'p2h3', difficulty: 'hard', type: 'mcq',
                        question: 'Pp × pp cross. What fraction of offspring will have purple flowers (P_)?',
                        hint: 'P_ means at least one P allele.',
                        explanation: 'Pp × pp gives Pp, Pp, pp, pp. The Pp offspring (2/4 = 50%) show purple flowers. The pp offspring (50%) show white flowers. This is a 1:1 phenotype ratio.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'c'
                    },
                    {
                        id: 'p2h4', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Rr × Rr.',
                        hint: 'Top: R and r. Left: R and r.',
                        explanation: 'Rr × Rr gives RR, Rr, Rr, rr. Ratio: 1 RR : 2 Rr : 1 rr. Three show dominant phenotype (R_), one shows recessive (rr). Classic 3:1 ratio.',
                        parentA: ['R', 'r'], parentB: ['R', 'r'], dragAnswers: ['RR', 'Rr', 'Rr', 'rr']
                    },
                ],
            },

            // ── Level 3: Test Crosses ─────────────────────────────
            {
                id: 3, title: 'Test Crosses',
                questions: [
                    {
                        id: 'p3e1', difficulty: 'easy', type: 'mcq',
                        question: 'A test cross helps determine if an organism showing a dominant trait is…',
                        hint: 'Is it TT or Tt?',
                        explanation: 'A test cross reveals whether an organism is TT (homozygous dominant) or Tt (heterozygous). This matters because both look the same but have different alleles to pass on.',
                        choices: [{ id: 'a', text: 'Homozygous or heterozygous' }, { id: 'b', text: 'Male or female' }, { id: 'c', text: 'Dominant or recessive' }, { id: 'd', text: 'A carrier' }], answer: 'a'
                    },
                    {
                        id: 'p3e2', difficulty: 'easy', type: 'mcq',
                        question: 'In a test cross, the unknown organism is always crossed with…',
                        hint: 'The simplest recessive genotype.',
                        explanation: 'The unknown organism is crossed with a homozygous recessive individual (tt or bb). If any recessive offspring appear, the unknown must carry a recessive allele (Tt, not TT).',
                        choices: [{ id: 'a', text: 'A homozygous dominant' }, { id: 'b', text: 'A heterozygous individual' }, { id: 'c', text: 'A homozygous recessive (tt)' }, { id: 'd', text: 'Another unknown' }], answer: 'c'
                    },
                    {
                        id: 'p3e3', difficulty: 'easy', type: 'mcq',
                        question: 'A test cross produces ALL tall offspring. The unknown parent\'s genotype is…',
                        hint: 'No short offspring means the unknown has no t allele to give.',
                        explanation: 'If all offspring from an unknown × tt cross are tall, the unknown gave only T to every offspring. This means the unknown must be TT — homozygous dominant.',
                        choices: [{ id: 'a', text: 'Tt' }, { id: 'b', text: 'TT' }, { id: 'c', text: 'tt' }, { id: 'd', text: 'Cannot tell' }], answer: 'b'
                    },
                    {
                        id: 'p3e4', difficulty: 'easy', type: 'mcq',
                        question: 'Why do we use homozygous RECESSIVE individuals in test crosses?',
                        hint: 'They cannot contribute a dominant allele to hide the unknown\'s alleles.',
                        explanation: 'Homozygous recessive individuals (tt) can only contribute recessive alleles. So the phenotype of offspring reveals what allele came from the unknown parent — nothing is hidden.',
                        choices: [{ id: 'a', text: 'They are more common' }, { id: 'b', text: 'They reveal the unknown\'s alleles since they contribute only recessive alleles' }, { id: 'c', text: 'They produce more offspring' }, { id: 'd', text: 'It is just tradition' }], answer: 'b'
                    },
                    {
                        id: 'p3e5', difficulty: 'easy', type: 'mcq',
                        question: 'A test cross produces 50% tall and 50% short offspring. The unknown parent is…',
                        hint: 'Short offspring must have gotten t from the unknown parent.',
                        explanation: '50% recessive offspring (1:1 ratio) means the unknown contributed a t allele to half the offspring and a T allele to the other half. The unknown must be Tt (heterozygous).',
                        choices: [{ id: 'a', text: 'TT' }, { id: 'b', text: 'tt' }, { id: 'c', text: 'Tt' }, { id: 'd', text: 'Cannot be determined' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'p3m1', difficulty: 'medium', type: 'drag',
                        question: 'Complete the Punnett square for Pp × Pp (P = purple, dominant).',
                        hint: 'Same pattern as Tt × Tt.',
                        explanation: 'Pp × Pp gives PP, Pp, Pp, pp. Three show purple flowers; one shows white. The classic 3:1 Mendelian ratio applies here too.',
                        parentA: ['P', 'p'], parentB: ['P', 'p'], dragAnswers: ['PP', 'Pp', 'Pp', 'pp']
                    },
                    {
                        id: 'p3m2', difficulty: 'medium', type: 'mcq',
                        question: 'A tall plant (unknown genotype) is test-crossed with tt. If 12 tall and 13 short offspring appear, the tall plant is…',
                        hint: 'The ratio is approximately 1:1.',
                        explanation: 'A ~1:1 ratio of tall:short is consistent with a Tt × tt cross. If the plant were TT, all offspring would be tall. The presence of short offspring proves it is Tt.',
                        choices: [{ id: 'a', text: 'TT' }, { id: 'b', text: 'Tt' }, { id: 'c', text: 'tt' }, { id: 'd', text: 'Cannot determine from this data' }], answer: 'b'
                    },
                    {
                        id: 'p3m3', difficulty: 'medium', type: 'mcq',
                        question: 'A tall plant test-crossed with tt gives 23 tall and 0 short offspring. The tall plant is most likely…',
                        hint: 'No recessive offspring means the dominant parent could not pass a recessive allele.',
                        explanation: 'Zero short offspring strongly suggests TT (homozygous dominant). If it were Tt, we would expect ~50% short offspring. The more offspring tested with no recessive, the more confident we are it is TT.',
                        choices: [{ id: 'a', text: 'Tt' }, { id: 'b', text: 'TT' }, { id: 'c', text: 'tt' }, { id: 'd', text: 'Cannot tell with any certainty' }], answer: 'b'
                    },
                    {
                        id: 'p3m4', difficulty: 'medium', type: 'drag',
                        question: 'Complete the Punnett square for Bb × bb.',
                        hint: 'Bb parent gives B or b; bb parent gives only b.',
                        explanation: 'Bb × bb gives Bb, bb, Bb, bb. Half dominant (Bb), half recessive (bb). This 1:1 outcome confirms the Bb parent was heterozygous.',
                        parentA: ['B', 'b'], parentB: ['b', 'b'], dragAnswers: ['Bb', 'bb', 'Bb', 'bb']
                    },
                    // HARD (4)
                    {
                        id: 'p3h1', difficulty: 'hard', type: 'mcq',
                        question: 'Dihybrid cross TtRr × TtRr. How many GENOTYPE combinations fill a 4×4 Punnett square?',
                        hint: 'A 4×4 grid has 4 × 4 cells.',
                        explanation: 'A dihybrid cross uses a 4×4 Punnett square = 16 total cells. These represent 9 unique genotype combinations and 4 phenotype classes in a 9:3:3:1 ratio.',
                        choices: [{ id: 'a', text: '4' }, { id: 'b', text: '8' }, { id: 'c', text: '16' }, { id: 'd', text: '9' }], answer: 'c'
                    },
                    {
                        id: 'p3h2', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Pp × pp (P = purple).',
                        hint: 'Pp gives P or p; pp gives only p.',
                        explanation: 'Pp × pp gives Pp, pp, Pp, pp. Half are Pp (purple), half are pp (white). This 1:1 ratio confirms Pp was heterozygous.',
                        parentA: ['P', 'p'], parentB: ['p', 'p'], dragAnswers: ['Pp', 'pp', 'Pp', 'pp']
                    },
                    {
                        id: 'p3h3', difficulty: 'hard', type: 'mcq',
                        question: 'How many phenotypically distinct classes appear in a standard dihybrid cross (AaBb × AaBb)?',
                        hint: 'Think about combinations of dominant/recessive for two independent traits.',
                        explanation: 'A dihybrid cross produces 4 phenotype classes: A_B_ (both dominant), A_bb (dominant A, recessive B), aaB_ (recessive A, dominant B), aabb (both recessive). Ratio = 9:3:3:1.',
                        choices: [{ id: 'a', text: '2' }, { id: 'b', text: '3' }, { id: 'c', text: '4' }, { id: 'd', text: '9' }], answer: 'c'
                    },
                    {
                        id: 'p3h4', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Tt × tt.',
                        hint: 'Tt gives T or t; tt gives only t.',
                        explanation: 'Tt × tt gives Tt, tt, Tt, tt. Half tall (Tt), half short (tt). The 1:1 ratio is the signature of a heterozygous × homozygous recessive (test) cross.',
                        parentA: ['T', 't'], parentB: ['t', 't'], dragAnswers: ['Tt', 'tt', 'Tt', 'tt']
                    },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  LESSON 4 — Test Your Knowledge
    // ══════════════════════════════════════════════════════════
    {
        id: 'quiz', title: 'Test Your Knowledge', subtitle: 'Challenge Mode',
        color: '#fef3cd', accentColor: '#FF9800',
        levels: [
            // ── Level 1: Mixed Review A ───────────────────────────
            {
                id: 1, title: 'Mixed Review A',
                questions: [
                    {
                        id: 'q1e1', difficulty: 'easy', type: 'mcq',
                        question: 'What is the basic unit of heredity?',
                        hint: 'A segment of DNA that codes for a trait.',
                        explanation: 'A gene is the basic unit of heredity — a specific segment of DNA that carries instructions for a trait. Humans have approximately 20,000–25,000 genes.',
                        choices: [{ id: 'a', text: 'Cell' }, { id: 'b', text: 'Gene' }, { id: 'c', text: 'Chromosome' }, { id: 'd', text: 'Protein' }], answer: 'b'
                    },
                    {
                        id: 'q1e2', difficulty: 'easy', type: 'mcq',
                        question: 'Which letter represents a recessive allele by convention?',
                        hint: 'Lowercase = recessive in genetics notation.',
                        explanation: 'Recessive alleles are written in lowercase (e.g., t, b, p). Dominant alleles are written in uppercase (T, B, P). This convention helps show the relationship between alleles.',
                        choices: [{ id: 'a', text: 'T' }, { id: 'b', text: 'B' }, { id: 'c', text: 't' }, { id: 'd', text: 'A' }], answer: 'c'
                    },
                    {
                        id: 'q1e3', difficulty: 'easy', type: 'mcq',
                        question: 'A trait masked by another allele is called…',
                        hint: 'Opposite of dominant.',
                        explanation: 'A recessive trait is masked when a dominant allele is present. It only becomes visible when both alleles are recessive (homozygous recessive, e.g., tt).',
                        choices: [{ id: 'a', text: 'Dominant' }, { id: 'b', text: 'Codominant' }, { id: 'c', text: 'Recessive' }, { id: 'd', text: 'Polygenic' }], answer: 'c'
                    },
                    {
                        id: 'q1e4', difficulty: 'easy', type: 'mcq',
                        question: 'What tool predicts possible offspring genotypes from a genetic cross?',
                        hint: 'It looks like a grid or square.',
                        explanation: 'The Punnett square is the tool used to predict offspring genotypes. It was devised by British geneticist Reginald Crundall Punnett in the early 1900s.',
                        choices: [{ id: 'a', text: 'Karyotype' }, { id: 'b', text: 'Pedigree chart' }, { id: 'c', text: 'Punnett square' }, { id: 'd', text: 'Protein gel' }], answer: 'c'
                    },
                    {
                        id: 'q1e5', difficulty: 'easy', type: 'mcq',
                        question: 'Which scientist laid the foundation for modern genetics with pea plant experiments?',
                        hint: 'His name sounds like "men-dell."',
                        explanation: 'Gregor Mendel (1822–1884), an Austrian monk and scientist, conducted pea plant experiments that established the laws of inheritance — the foundation of genetics.',
                        choices: [{ id: 'a', text: 'Darwin' }, { id: 'b', text: 'Mendel' }, { id: 'c', text: 'Watson' }, { id: 'd', text: 'Crick' }], answer: 'b'
                    },
                    // MEDIUM (4)
                    {
                        id: 'q1m1', difficulty: 'medium', type: 'mcq',
                        question: 'Two tall plants (Tt × Tt). What % will be short (tt)?',
                        hint: 'Draw the Punnett square and count tt boxes.',
                        explanation: 'Tt × Tt gives TT, Tt, Tt, tt. Only tt (1/4) is short. So 25% of offspring will be short. This shows how two tall parents can produce a short child!',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'b'
                    },
                    {
                        id: 'q1m2', difficulty: 'medium', type: 'mcq',
                        question: 'The law that says alleles separate during gamete formation?',
                        hint: 'Mendel\'s first major law.',
                        explanation: 'Mendel\'s Law of Segregation states that allele pairs separate when gametes form, so each gamete carries only one allele per gene. They reunite at fertilization.',
                        choices: [{ id: 'a', text: 'Law of Dominance' }, { id: 'b', text: 'Law of Segregation' }, { id: 'c', text: 'Law of Independent Assortment' }, { id: 'd', text: 'Law of Codominance' }], answer: 'b'
                    },
                    {
                        id: 'q1m3', difficulty: 'medium', type: 'mcq',
                        question: 'White flowers (pp) × Purple (Pp). What fraction have purple flowers?',
                        hint: 'Cross: p+P=Pp, p+p=pp, p+P=Pp, p+p=pp.',
                        explanation: 'pp × Pp gives Pp, Pp, pp, pp. Two of four (50%) have purple flowers (Pp). Two (50%) have white flowers (pp). A 1:1 phenotype ratio.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'c'
                    },
                    {
                        id: 'q1m4', difficulty: 'medium', type: 'mcq',
                        question: 'What cross produces a 1:1 phenotype ratio?',
                        hint: 'This is the result of a test cross.',
                        explanation: 'A 1:1 phenotype ratio (equal dominant and recessive phenotypes) results from a heterozygous × homozygous recessive cross (e.g., Tt × tt). This is the basis of the test cross.',
                        choices: [{ id: 'a', text: 'TT × TT' }, { id: 'b', text: 'Tt × Tt' }, { id: 'c', text: 'Tt × tt' }, { id: 'd', text: 'TT × tt' }], answer: 'c'
                    },
                    // HARD (4)
                    {
                        id: 'q1h1', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Aa × Aa.',
                        hint: 'A is dominant, a is recessive. Same as Tt × Tt pattern.',
                        explanation: 'Aa × Aa gives AA, Aa, Aa, aa. Ratio: 1 AA : 2 Aa : 1 aa genotype, and 3 dominant : 1 recessive phenotype. This is the classic monohybrid ratio.',
                        parentA: ['A', 'a'], parentB: ['A', 'a'], dragAnswers: ['AA', 'Aa', 'Aa', 'aa']
                    },
                    {
                        id: 'q1h2', difficulty: 'hard', type: 'mcq',
                        question: 'Man blood type AB × woman blood type O (ii). Children\'s possible blood types?',
                        hint: 'AB = I^A I^B; O = ii. Cross the alleles.',
                        explanation: 'I^A I^B × ii: children can be I^A i (type A) or I^B i (type B). No AB or O children are possible from this cross. 50% Type A, 50% Type B.',
                        choices: [{ id: 'a', text: 'Only AB' }, { id: 'b', text: 'A and B only' }, { id: 'c', text: 'A, B, AB, and O' }, { id: 'd', text: 'Only O' }], answer: 'b'
                    },
                    {
                        id: 'q1h3', difficulty: 'hard', type: 'mcq',
                        question: 'If a disease is autosomal recessive (aa), both parents are Aa. Risk per child?',
                        hint: 'Aa × Aa — count aa boxes.',
                        explanation: 'Aa × Aa gives AA, Aa, Aa, aa. The probability of aa (affected child) is 1/4 = 25%. Each pregnancy has an independent 25% risk.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '75%' }], answer: 'b'
                    },
                    {
                        id: 'q1h4', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Tt × tt.',
                        hint: 'Tt gives T or t. tt gives only t.',
                        explanation: 'Tt × tt gives Tt, tt, Tt, tt. 50% tall (Tt), 50% short (tt). The 1:1 ratio proves that the Tt parent was heterozygous — the basis of the test cross.',
                        parentA: ['T', 't'], parentB: ['t', 't'], dragAnswers: ['Tt', 'tt', 'Tt', 'tt']
                    },
                ],
            },

            // ── Level 2: Mixed Review B ───────────────────────────
            {
                id: 2, title: 'Mixed Review B',
                questions: [
                    {
                        id: 'q2e1', difficulty: 'easy', type: 'mcq',
                        question: 'Who co-discovered the structure of DNA in 1953?',
                        hint: 'Watson and ___.',
                        explanation: 'James Watson and Francis Crick built the first accurate model of DNA\'s double helix structure in 1953, using X-ray diffraction data produced by Rosalind Franklin.',
                        choices: [{ id: 'a', text: 'Mendel' }, { id: 'b', text: 'Darwin' }, { id: 'c', text: 'Crick' }, { id: 'd', text: 'Lamarck' }], answer: 'c'
                    },
                    {
                        id: 'q2e2', difficulty: 'easy', type: 'mcq',
                        question: 'Chromosomes are made of DNA wrapped around…',
                        hint: 'They are spool-shaped proteins.',
                        explanation: 'Chromosomes are DNA wrapped tightly around histone proteins. This packaging compresses the long DNA molecule so it fits inside the tiny cell nucleus.',
                        choices: [{ id: 'a', text: 'Lipids' }, { id: 'b', text: 'Histones' }, { id: 'c', text: 'Ribosomes' }, { id: 'd', text: 'Glucose' }], answer: 'b'
                    },
                    {
                        id: 'q2e3', difficulty: 'easy', type: 'mcq',
                        question: 'How many pairs of chromosomes do humans have?',
                        hint: '46 total ÷ 2 = ? pairs.',
                        explanation: 'Humans have 23 pairs of chromosomes (46 total). 22 pairs are autosomes (non-sex chromosomes) and 1 pair are sex chromosomes (XX or XY).',
                        choices: [{ id: 'a', text: '46' }, { id: 'b', text: '23' }, { id: 'c', text: '12' }, { id: 'd', text: '24' }], answer: 'b'
                    },
                    {
                        id: 'q2e4', difficulty: 'easy', type: 'mcq',
                        question: 'What process produces gametes (egg and sperm) with half the normal chromosome number?',
                        hint: 'It involves two rounds of cell division.',
                        explanation: 'Meiosis is the cell division process that reduces the chromosome number by half (from 46 to 23). This ensures that when egg and sperm fuse, the offspring has 46 chromosomes.',
                        choices: [{ id: 'a', text: 'Mitosis' }, { id: 'b', text: 'Meiosis' }, { id: 'c', text: 'Replication' }, { id: 'd', text: 'Transcription' }], answer: 'b'
                    },
                    {
                        id: 'q2e5', difficulty: 'easy', type: 'mcq',
                        question: 'The reuniting of egg and sperm nuclei is called…',
                        hint: 'It happens when sperm meets egg.',
                        explanation: 'Fertilization is the fusion of egg and sperm. This restores the full chromosome number (diploid = 46) after meiosis reduced it to haploid (23) in each gamete.',
                        choices: [{ id: 'a', text: 'Meiosis' }, { id: 'b', text: 'Mitosis' }, { id: 'c', text: 'Fertilization' }, { id: 'd', text: 'Replication' }], answer: 'c'
                    },
                    // MEDIUM (4)
                    {
                        id: 'q2m1', difficulty: 'medium', type: 'mcq',
                        question: 'Incomplete dominance: red (RR) × white (WW). All offspring are…',
                        hint: 'Neither allele dominates — the result is blended.',
                        explanation: 'RR × WW cross produces all RW offspring. Since neither R nor W dominates, all F1 offspring are pink — a blend of both parental phenotypes.',
                        choices: [{ id: 'a', text: 'All red' }, { id: 'b', text: 'All white' }, { id: 'c', text: 'All pink' }, { id: 'd', text: 'Half red, half white' }], answer: 'c'
                    },
                    {
                        id: 'q2m2', difficulty: 'medium', type: 'mcq',
                        question: 'Mendel\'s F1 generation is produced by crossing…',
                        hint: 'F1 comes from crossing the original parents.',
                        explanation: 'The F1 generation is the offspring of a cross between two purebred (P generation) parents. Mendel found all F1 plants showed only the dominant trait.',
                        choices: [{ id: 'a', text: 'F1 × F1' }, { id: 'b', text: 'Two purebred P generation parents' }, { id: 'c', text: 'F2 × F2' }, { id: 'd', text: 'F1 × recessive plant' }], answer: 'b'
                    },
                    {
                        id: 'q2m3', difficulty: 'medium', type: 'mcq',
                        question: 'Down syndrome is caused by an extra copy of chromosome…',
                        hint: 'Trisomy 21.',
                        explanation: 'Down syndrome is caused by trisomy 21 — having three copies of chromosome 21 instead of two. This usually results from an error in meiosis called non-disjunction.',
                        choices: [{ id: 'a', text: '21' }, { id: 'b', text: '13' }, { id: 'c', text: '18' }, { id: 'd', text: '23' }], answer: 'a'
                    },
                    {
                        id: 'q2m4', difficulty: 'medium', type: 'mcq',
                        question: 'What is a pedigree chart used for in genetics?',
                        hint: 'It maps family members and their traits.',
                        explanation: 'A pedigree chart is a diagram that traces the inheritance of a genetic trait through multiple generations of a family. It helps identify patterns of inheritance and carriers.',
                        choices: [{ id: 'a', text: 'Predicting offspring ratios' }, { id: 'b', text: 'Tracing a trait through a family tree' }, { id: 'c', text: 'Mapping chromosomes' }, { id: 'd', text: 'Comparing DNA sequences' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'q2h1', difficulty: 'hard', type: 'mcq',
                        question: 'I^A I^B genotype = which blood type?',
                        hint: 'Both alleles are fully expressed — codominance.',
                        explanation: 'I^A I^B is blood type AB. This is a classic example of codominance — both the A and B antigens are present on red blood cells simultaneously.',
                        choices: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }, { id: 'c', text: 'AB' }, { id: 'd', text: 'O' }], answer: 'c'
                    },
                    {
                        id: 'q2h2', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Tt × tt.',
                        hint: 'Top: T and t. Left: t and t.',
                        explanation: 'Tt × tt gives Tt, tt, Tt, tt. Half are Tt (tall dominant phenotype), half are tt (short recessive phenotype). This 1:1 ratio confirms Tt was heterozygous.',
                        parentA: ['T', 't'], parentB: ['t', 't'], dragAnswers: ['Tt', 'tt', 'Tt', 'tt']
                    },
                    {
                        id: 'q2h3', difficulty: 'hard', type: 'mcq',
                        question: 'A genetic disorder caused by a dominant allele will appear in…',
                        hint: 'Dominant alleles are always expressed when present.',
                        explanation: 'A dominant disorder is expressed in any individual who carries at least one copy of the dominant allele. This means heterozygotes (Aa) are also affected, not just homozygotes (AA).',
                        choices: [{ id: 'a', text: 'Only homozygous dominant individuals' }, { id: 'b', text: 'Anyone with at least one dominant allele' }, { id: 'c', text: 'Only males' }, { id: 'd', text: 'Only homozygous individuals' }], answer: 'b'
                    },
                    {
                        id: 'q2h4', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Pp × Pp.',
                        hint: 'Same pattern as Tt × Tt.',
                        explanation: 'Pp × Pp gives PP, Pp, Pp, pp. Three out of four show the dominant (purple) phenotype. One out of four shows the recessive (white) phenotype. Classic 3:1 ratio.',
                        parentA: ['P', 'p'], parentB: ['P', 'p'], dragAnswers: ['PP', 'Pp', 'Pp', 'pp']
                    },
                ],
            },

            // ── Level 3: Grand Final ──────────────────────────────
            {
                id: 3, title: 'Grand Final',
                questions: [
                    {
                        id: 'q3e1', difficulty: 'easy', type: 'mcq',
                        question: 'A carrier of a genetic disorder…',
                        hint: 'They carry but do not show the disease.',
                        explanation: 'A carrier is heterozygous (Aa) for a recessive disorder. They do not show symptoms because the dominant A allele masks the recessive a. They can pass the a allele to their children.',
                        choices: [{ id: 'a', text: 'Shows the disorder' }, { id: 'b', text: 'Has one recessive allele but shows no symptoms' }, { id: 'c', text: 'Has two dominant alleles' }, { id: 'd', text: 'Cannot pass the allele to offspring' }], answer: 'b'
                    },
                    {
                        id: 'q3e2', difficulty: 'easy', type: 'mcq',
                        question: 'Meiosis produces cells with…',
                        hint: 'Half the normal number of chromosomes.',
                        explanation: 'Meiosis halves the chromosome number from diploid (46 in humans) to haploid (23). This ensures that when two gametes fuse at fertilization, the full diploid number is restored.',
                        choices: [{ id: 'a', text: 'Same chromosomes as the parent' }, { id: 'b', text: 'Double the chromosomes' }, { id: 'c', text: 'Half the chromosomes' }, { id: 'd', text: 'No chromosomes' }], answer: 'c'
                    },
                    {
                        id: 'q3e3', difficulty: 'easy', type: 'mcq',
                        question: 'Fertilization restores the full chromosome number by joining…',
                        hint: 'Two half-sets combine to make a full set.',
                        explanation: 'At fertilization, a haploid egg (23 chromosomes) and a haploid sperm (23 chromosomes) fuse to create a diploid zygote (46 chromosomes) — the first cell of a new organism.',
                        choices: [{ id: 'a', text: 'Two body cells' }, { id: 'b', text: 'Two gametes (egg + sperm)' }, { id: 'c', text: 'A gamete and a body cell' }, { id: 'd', text: 'Two chromosomes' }], answer: 'b'
                    },
                    {
                        id: 'q3e4', difficulty: 'easy', type: 'mcq',
                        question: 'Which type of cell division produces body cells (skin, muscle, bone)?',
                        hint: 'It produces two genetically identical daughter cells.',
                        explanation: 'Mitosis produces genetically identical daughter cells used for growth, repair, and replacement of body cells. Meiosis produces gametes for sexual reproduction.',
                        choices: [{ id: 'a', text: 'Meiosis' }, { id: 'b', text: 'Mitosis' }, { id: 'c', text: 'Binary fission' }, { id: 'd', text: 'Fertilization' }], answer: 'b'
                    },
                    {
                        id: 'q3e5', difficulty: 'easy', type: 'mcq',
                        question: 'What is a karyotype?',
                        hint: 'It is a picture that shows all chromosomes organized by size.',
                        explanation: 'A karyotype is an image of all chromosomes in a cell, arranged in pairs by size and numbered. Scientists use karyotypes to identify chromosomal abnormalities like trisomy 21.',
                        choices: [{ id: 'a', text: 'A type of DNA mutation' }, { id: 'b', text: 'An organized image of all chromosomes' }, { id: 'c', text: 'A Punnett square for many genes' }, { id: 'd', text: 'A family tree of traits' }], answer: 'b'
                    },
                    // MEDIUM (4)
                    {
                        id: 'q3m1', difficulty: 'medium', type: 'mcq',
                        question: 'Down syndrome is caused by having an extra copy of chromosome 21. This is called…',
                        hint: 'Tri means three.',
                        explanation: 'Trisomy 21 (Down syndrome) occurs when a person has three copies of chromosome 21 instead of two. It results from non-disjunction during meiosis — chromosomes fail to separate properly.',
                        choices: [{ id: 'a', text: 'Monosomy' }, { id: 'b', text: 'Trisomy 21' }, { id: 'c', text: 'Deletion mutation' }, { id: 'd', text: 'Inversion' }], answer: 'b'
                    },
                    {
                        id: 'q3m2', difficulty: 'medium', type: 'drag',
                        question: 'Complete the Punnett square for Pp × pp.',
                        hint: 'Pp gives P or p; pp gives only p.',
                        explanation: 'Pp × pp gives Pp, pp, Pp, pp. Half are Pp (purple flowers) and half are pp (white flowers). The 1:1 ratio shows Pp was heterozygous.',
                        parentA: ['P', 'p'], parentB: ['p', 'p'], dragAnswers: ['Pp', 'pp', 'Pp', 'pp']
                    },
                    {
                        id: 'q3m3', difficulty: 'medium', type: 'mcq',
                        question: 'A dominant genetic disorder appears in…',
                        hint: 'You only need one copy of the dominant allele.',
                        explanation: 'Dominant disorders (like Huntington\'s disease) appear in individuals who carry even one dominant allele. Both Aa and AA individuals are affected.',
                        choices: [{ id: 'a', text: 'Only homozygous recessive individuals' }, { id: 'b', text: 'Anyone with at least one dominant allele' }, { id: 'c', text: 'Only males' }, { id: 'd', text: 'Only if both alleles are dominant' }], answer: 'b'
                    },
                    {
                        id: 'q3m4', difficulty: 'medium', type: 'mcq',
                        question: 'What is non-disjunction?',
                        hint: 'Chromosomes fail to pull apart during meiosis.',
                        explanation: 'Non-disjunction is the failure of chromosomes to separate properly during meiosis. This can result in gametes with too many or too few chromosomes, leading to trisomy or monosomy.',
                        choices: [{ id: 'a', text: 'DNA replication error' }, { id: 'b', text: 'Chromosomes fail to separate during meiosis' }, { id: 'c', text: 'A type of gene mutation' }, { id: 'd', text: 'Failure of fertilization' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'q3h1', difficulty: 'hard', type: 'mcq',
                        question: 'Sickle cell disease is caused by a mutation in the gene for…',
                        hint: 'It carries oxygen in red blood cells.',
                        explanation: 'Sickle cell disease results from a single nucleotide substitution in the hemoglobin gene. This causes red blood cells to become sickle-shaped and clump, blocking blood flow.',
                        choices: [{ id: 'a', text: 'Insulin' }, { id: 'b', text: 'Hemoglobin' }, { id: 'c', text: 'Collagen' }, { id: 'd', text: 'Keratin' }], answer: 'b'
                    },
                    {
                        id: 'q3h2', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for Rr × Rr.',
                        hint: 'R is dominant, r is recessive.',
                        explanation: 'Rr × Rr gives RR, Rr, Rr, rr. The 1:2:1 genotype ratio and 3:1 phenotype ratio. This is Mendel\'s classic monohybrid result.',
                        parentA: ['R', 'r'], parentB: ['R', 'r'], dragAnswers: ['RR', 'Rr', 'Rr', 'rr']
                    },
                    {
                        id: 'q3h3', difficulty: 'hard', type: 'mcq',
                        question: 'Cystic fibrosis is autosomal recessive (ff). Two carrier parents (Ff × Ff). Probability of an UNAFFECTED carrier child?',
                        hint: 'Ff children are unaffected carriers. How many Ff appear?',
                        explanation: 'Ff × Ff gives FF, Ff, Ff, ff. FF (1/4) and Ff (2/4) are unaffected. But only Ff children are carriers — that is 2/4 = 50%. FF children are unaffected but not carriers.',
                        choices: [{ id: 'a', text: '25%' }, { id: 'b', text: '50%' }, { id: 'c', text: '75%' }, { id: 'd', text: '100%' }], answer: 'b'
                    },
                    {
                        id: 'q3h4', difficulty: 'hard', type: 'mcq',
                        question: 'Huntington\'s disease is caused by a dominant allele (H). A parent is Hh. Risk per child?',
                        hint: 'Hh × hh — the other parent is normal (hh).',
                        explanation: 'Hh × hh gives Hh (affected) and hh (unaffected) in 50:50 ratio. Every child has a 50% chance of inheriting H and developing Huntington\'s disease.',
                        choices: [{ id: 'a', text: '0%' }, { id: 'b', text: '25%' }, { id: 'c', text: '50%' }, { id: 'd', text: '100%' }], answer: 'c'
                    },
                ],
            },
        ],
    },
];

// ── Question sampler (Duolingo-style random per play) ─────────
export function sampleLevelQuestions(level: Level): Question[] {
    const byDiff = (d: QuestionDifficulty) => level.questions.filter(q => q.difficulty === d);

    const pick = (pool: Question[], n: number): Question[] => {
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(n, shuffled.length));
    };

    return [
        ...pick(byDiff("easy"), QUESTIONS_PER_PHASE.easy),
        ...pick(byDiff("medium"), QUESTIONS_PER_PHASE.medium),
        ...pick(byDiff("hard"), QUESTIONS_PER_PHASE.hard)
    ];
}