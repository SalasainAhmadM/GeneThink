export type QuestionType = "mcq" | "drag";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Choice {
    id: string;
    text: string;
}

// Visual shown under an MCQ question (replaces the pictures in the source worksheet)
export type QuestionFigure =
    | {
        kind: 'punnett';
        top: string[];           // alleles across the top
        left: string[];          // alleles down the left side
        cells: string[];         // row by row
        topLabel?: string;       // e.g. 'Father'
        leftLabel?: string;      // e.g. 'Mother'
        cornerLabel?: string;    // e.g. 'Parental Genotype'
    }
    | { kind: 'seedPedigree' }; // round × wrinkled parents → F1 all round → F2 3 round : 1 wrinkled

export interface Question {
    id: string;
    difficulty: QuestionDifficulty;
    type: QuestionType;
    question: string;
    hint: string;
    explanation: string;
    figure?: QuestionFigure;     // MCQ only — optional illustration
    choices?: Choice[];          // MCQ only
    answer?: string;             // MCQ: choice id
    parentA?: string[];          // drag only
    parentB?: string[];          // drag only
    dragAnswers?: string[];      // drag only — expected cell values
}

// ── Answer key record — filled in as the user answers, revealed on Results ──
export interface AnswerRecord {
    question: Question;
    userAnswer: string | string[] | null;
    correct: boolean;
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
                    // EASY (5)
                    {
                        id: 'i2e1', difficulty: 'easy', type: 'mcq',
                        question: 'Which of the following best explains the role of alleles in genetic variation?',
                        hint: 'Think about why individuals in a population do not all look the same.',
                        explanation: 'Alleles are different versions of the same gene. Because individuals carry different combinations of alleles, a population shows a wide diversity of traits.',
                        choices: [{ id: 'a', text: 'Alleles determine dominant traits in an organism.' }, { id: 'b', text: 'Different alleles contribute to the diversity of traits within a population.' }, { id: 'c', text: 'Alleles result in physical differences among individuals.' }, { id: 'd', text: 'A single allele controls all genetic characteristics of an organism.' }], answer: 'b'
                    },
                    {
                        id: 'i2e2', difficulty: 'easy', type: 'mcq',
                        question: 'A heterozygous genotype refers to a genetic makeup where an organism has two different alleles for a specific gene. Which of the following represents a heterozygous genotype?',
                        hint: 'Look for one capital letter and one lowercase letter.',
                        explanation: 'Ss is heterozygous because it has two different alleles — one dominant (S) and one recessive (s). SS and ss are homozygous, and "short" is a phenotype, not a genotype.',
                        choices: [{ id: 'a', text: 'SS' }, { id: 'b', text: 'Ss' }, { id: 'c', text: 'ss' }, { id: 'd', text: 'short' }], answer: 'b'
                    },
                    {
                        id: 'i2e3', difficulty: 'easy', type: 'mcq',
                        question: 'A phenotype is the set of observable characteristics or traits of an organism. Which of the following is a phenotype?',
                        hint: 'A phenotype is something you can actually see.',
                        explanation: '"Short" is a phenotype because it describes an observable trait. Tt is a genotype, while dominant and heterozygous describe alleles and allele pairs.',
                        choices: [{ id: 'a', text: 'Tt' }, { id: 'b', text: 'Short' }, { id: 'c', text: 'Dominant' }, { id: 'd', text: 'Heterozygous' }], answer: 'b'
                    },
                    {
                        id: 'i2e4', difficulty: 'easy', type: 'mcq',
                        question: 'In pea plants, yellow seed color (Y) is dominant over green (y). Which of the following represents a homozygous dominant genotype for yellow seed color?',
                        hint: 'Homozygous dominant means two identical capital letters.',
                        explanation: 'YY is homozygous dominant — both alleles are the dominant Y. Yy is heterozygous, yy is homozygous recessive, and YG is not a valid genotype for one gene.',
                        choices: [{ id: 'a', text: 'Yy' }, { id: 'b', text: 'yy' }, { id: 'c', text: 'YY' }, { id: 'd', text: 'YG' }], answer: 'c'
                    },
                    {
                        id: 'i2e5', difficulty: 'easy', type: 'mcq',
                        question: 'In dogs, long fur (L) is dominant to short fur (l). What is the genotype of a dog that is homozygous recessive for this trait?',
                        hint: 'Homozygous recessive means two identical lowercase letters.',
                        explanation: 'A homozygous recessive dog has two recessive alleles: ll. This dog has short fur. "Short fur" itself is the phenotype, not the genotype.',
                        choices: [{ id: 'a', text: 'LL' }, { id: 'b', text: 'Ll' }, { id: 'c', text: 'll' }, { id: 'd', text: 'Short fur' }], answer: 'c'
                    },
                    // MEDIUM (5)
                    {
                        id: 'i2m1', difficulty: 'medium', type: 'mcq',
                        question: "Which terms correctly describe the relationship between an organism's genetic composition and its physical traits?",
                        hint: 'Geno- is the genetic code; pheno- is what shows.',
                        explanation: 'Genotype is the genetic makeup (the allele combination, like Tt), while phenotype is the observable characteristic that results from it (like tall).',
                        choices: [{ id: 'a', text: 'Genotype refers to the genetic makeup, while phenotype refers to observable characteristics.' }, { id: 'b', text: 'Phenotype refers to the genetic makeup, while genotype refers to observable characteristics.' }, { id: 'c', text: 'Dominant allele refers to genetic makeup, while recessive allele refers to observable characteristics.' }, { id: 'd', text: 'Homozygous refers to observable traits, while heterozygous refers to genetic makeup.' }], answer: 'a'
                    },
                    {
                        id: 'i2m2', difficulty: 'medium', type: 'mcq',
                        question: 'Given the genotype RRTt (where R = round, r = wrinkled, T = tall, t = dwarf), what will be the phenotypes of the organism?',
                        hint: 'Check each gene separately — is there at least one dominant allele?',
                        explanation: 'RR has dominant alleles, so the seeds are round. Tt has one dominant T, so the plant is tall. The phenotype is round seeds, tall plant.',
                        choices: [{ id: 'a', text: 'Round seeds, tall plant' }, { id: 'b', text: 'Round seeds, dwarf plant' }, { id: 'c', text: 'Wrinkled seeds, tall plant' }, { id: 'd', text: 'Wrinkled seeds, dwarf plant' }], answer: 'a'
                    },
                    {
                        id: 'i2m3', difficulty: 'medium', type: 'mcq',
                        question: 'Brown fur is dominant. White fur is recessive. One parent is homozygous for brown fur and the other is heterozygous. Which of the following is a correct genotype of the parents?',
                        hint: 'Homozygous brown = two capital B; heterozygous = one of each.',
                        explanation: 'The homozygous brown parent is BB and the heterozygous parent is Bb, so the cross is BB × Bb.',
                        choices: [{ id: 'a', text: 'BB × bb' }, { id: 'b', text: 'Bb × bb' }, { id: 'c', text: 'BB × Bb' }, { id: 'd', text: 'Bb × Bb' }], answer: 'c'
                    },
                    {
                        id: 'i2m4', difficulty: 'medium', type: 'mcq',
                        question: "Look at the Punnett square. What type of allele pair is the mother's genotype?",
                        hint: 'Read the two alleles on the mother\'s side of the square.',
                        explanation: 'The mother contributes C and c, so her genotype is Cc — two different alleles, which makes her heterozygous.',
                        figure: { kind: 'punnett', cornerLabel: 'Parental Genotype', topLabel: 'Father', leftLabel: 'Mother', top: ['C', 'c'], left: ['C', 'c'], cells: ['CC', 'Cc', 'Cc', 'cc'] },
                        choices: [{ id: 'a', text: 'Homozygous Dominant' }, { id: 'b', text: 'Homozygous Recessive' }, { id: 'c', text: 'Heterozygous' }, { id: 'd', text: 'Dominant' }], answer: 'c'
                    },
                    {
                        id: 'i2m5', difficulty: 'medium', type: 'mcq',
                        question: 'C = curly hair (dominant), c = straight hair (recessive). Which genotype will show straight hair?',
                        hint: 'A recessive trait only shows when there is no dominant allele.',
                        explanation: 'Straight hair is recessive, so it only appears in cc. CC and Cc both have at least one dominant C allele and show curly hair.',
                        figure: { kind: 'punnett', cornerLabel: 'Parental Genotype', topLabel: 'Father', leftLabel: 'Mother', top: ['C', 'c'], left: ['C', 'c'], cells: ['CC', 'Cc', 'Cc', 'cc'] },
                        choices: [{ id: 'a', text: 'CC' }, { id: 'b', text: 'Cc' }, { id: 'c', text: 'cc' }, { id: 'd', text: 'all of them' }], answer: 'c'
                    },
                    // HARD (3)
                    {
                        id: 'i2h1', difficulty: 'hard', type: 'mcq',
                        question: 'Which of the following pairs is INCORRECTLY matched?',
                        hint: 'A hybrid has two different alleles.',
                        explanation: 'kk has two identical recessive alleles, so it is homozygous recessive — not a hybrid. A hybrid is heterozygous (like Hh), and RR is homozygous.',
                        choices: [{ id: 'a', text: 'kk = hybrid' }, { id: 'b', text: 'hybrid = heterozygous' }, { id: 'c', text: 'heterozygous = Hh' }, { id: 'd', text: 'homozygous = RR' }], answer: 'a'
                    },
                    {
                        id: 'i2h2', difficulty: 'hard', type: 'mcq',
                        question: 'Two pea plants can have the same phenotype but have different genotypes. Which of the following best explains how this is possible?',
                        hint: 'Compare TT and Tt — do they look different?',
                        explanation: 'A homozygous dominant plant (TT) and a heterozygous plant (Tt) both show the dominant trait, because one dominant allele is enough to mask the recessive allele.',
                        choices: [{ id: 'a', text: 'One plant could be heterozygous while the other is homozygous for the same trait.' }, { id: 'b', text: 'Both plants have different alleles, but they express identical phenotypes because they lack dominance.' }, { id: 'c', text: 'The genotype does not influence phenotype in plants.' }, { id: 'd', text: 'The phenotype of a plant only changes based on environmental factors, not genetics.' }], answer: 'a'
                    },
                    {
                        id: 'i2h3', difficulty: 'hard', type: 'mcq',
                        question: 'A plant with the genotype Gg (heterozygous) is crossed with a plant with the genotype GG (homozygous dominant). Which statement best analyzes the relationship between their genotypes and phenotypes?',
                        hint: 'The GG parent always passes a G. What does every offspring receive?',
                        explanation: 'Gg × GG gives GG and Gg offspring only. Every offspring has at least one dominant G, so all of them show the same dominant phenotype as the GG parent.',
                        choices: [{ id: 'a', text: 'The offspring will exhibit a recessive trait due to the presence of the g allele.' }, { id: 'b', text: 'The offspring will all have the same phenotype as the parent with the GG genotype because G is dominant.' }, { id: 'c', text: 'The offspring will have a 3:1 phenotypic ratio, demonstrating complete dominance.' }, { id: 'd', text: 'The presence of two dominant alleles in one parent will suppress any expression of the heterozygous genotype in the other parent.' }], answer: 'b'
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
                    // EASY (5)
                    {
                        id: 'm1e1', difficulty: 'easy', type: 'mcq',
                        question: "Which of the following is NOT one of Mendel's principles?",
                        hint: 'Mendel described three laws: Dominance, Segregation, and Independent Assortment.',
                        explanation: "Mendel's principles are the Law of Dominance, the Law of Segregation, and the Law of Independent Assortment. The \"Law of Uniformity\" is not one of them.",
                        choices: [{ id: 'a', text: 'Law of Segregation' }, { id: 'b', text: 'Law of Independent Assortment' }, { id: 'c', text: 'Law of Dominance' }, { id: 'd', text: 'Law of Uniformity' }], answer: 'd'
                    },
                    {
                        id: 'm1e2', difficulty: 'easy', type: 'mcq',
                        question: "How many alleles does an organism inherit for each gene in Mendel's experiment?",
                        hint: 'One comes from each parent.',
                        explanation: 'An organism inherits two alleles for each gene — one from the mother and one from the father.',
                        choices: [{ id: 'a', text: 'One' }, { id: 'b', text: 'Two' }, { id: 'c', text: 'Three' }, { id: 'd', text: 'Four' }], answer: 'b'
                    },
                    {
                        id: 'm1e3', difficulty: 'easy', type: 'mcq',
                        question: "What was the primary purpose of Mendel's experiments with pea plants?",
                        hint: 'Mendel is called the Father of Genetics — the study of heredity.',
                        explanation: 'Mendel crossed pea plants with contrasting traits to understand how traits are passed from parents to offspring.',
                        choices: [{ id: 'a', text: 'To study plant growth rates' }, { id: 'b', text: 'To understand how traits are inherited' }, { id: 'c', text: 'To test the effects of fertilizers' }, { id: 'd', text: 'To breed new plant species' }], answer: 'b'
                    },
                    {
                        id: 'm1e4', difficulty: 'easy', type: 'mcq',
                        question: 'Which principle explains how alleles separate during gamete formation, ensuring that each gamete receives only one allele for a given trait?',
                        hint: 'To "segregate" means to separate.',
                        explanation: 'The Law of Segregation states that the two alleles for a trait separate during gamete formation, so each gamete carries only one allele.',
                        choices: [{ id: 'a', text: 'Law of Independent Assortment' }, { id: 'b', text: 'Law of Segregation' }, { id: 'c', text: 'Law of Continuous Variation' }, { id: 'd', text: 'Law of Codominance' }], answer: 'b'
                    },
                    {
                        id: 'm1e5', difficulty: 'easy', type: 'mcq',
                        question: 'What did Mendel conclude about recessive traits in his F2 generation?',
                        hint: 'The recessive trait was hidden in F1 — what happened in F2?',
                        explanation: 'The recessive trait disappeared in the F1 generation but reappeared in the F2 generation in a ratio of 3 dominant : 1 recessive.',
                        choices: [{ id: 'a', text: 'They disappear entirely' }, { id: 'b', text: 'They are always dominant' }, { id: 'c', text: 'They reappear in a 3:1 ratio' }, { id: 'd', text: 'They show incomplete dominance' }], answer: 'c'
                    },
                    // MEDIUM (7)
                    {
                        id: 'm1m1', difficulty: 'medium', type: 'mcq',
                        question: "How did Gregor Mendel's experiments with pea plants contribute to the foundation of modern genetics?",
                        hint: 'Mendel never saw DNA — he counted traits in offspring.',
                        explanation: 'Mendel showed that traits are inherited in predictable patterns through dominant and recessive "factors" (alleles), not by blending. DNA was identified much later.',
                        choices: [{ id: 'a', text: 'He identified DNA as the molecule responsible for inheritance.' }, { id: 'b', text: "He proved that environmental factors alone determine an organism's traits." }, { id: 'c', text: 'He discovered that all traits blend together rather than following specific inheritance patterns.' }, { id: 'd', text: 'He demonstrated that traits are inherited in predictable patterns through dominant and recessive alleles.' }], answer: 'd'
                    },
                    {
                        id: 'm1m2', difficulty: 'medium', type: 'mcq',
                        question: "What is the significance of Mendel's Law of Independent Assortment?",
                        hint: 'Think of two different traits, like seed color and seed shape.',
                        explanation: 'The Law of Independent Assortment means alleles for different traits are sorted into gametes independently — inheriting one trait does not affect inheriting another.',
                        choices: [{ id: 'a', text: 'Traits are inherited independently of each other.' }, { id: 'b', text: 'Traits blend from both parents.' }, { id: 'c', text: 'All offspring are identical to their parents.' }, { id: 'd', text: 'Only dominant traits are inherited.' }], answer: 'a'
                    },
                    {
                        id: 'm1m3', difficulty: 'medium', type: 'mcq',
                        question: "In Mendel's experiment comparing round-seeded and wrinkled-seeded pea plants, how did he classify the wrinkled-seeded trait?",
                        hint: 'Wrinkled seeds disappeared in F1 and came back in F2.',
                        explanation: 'Wrinkled seed shape is recessive. It is masked whenever the dominant round allele (R) is present and only shows in rr plants.',
                        choices: [{ id: 'a', text: 'A dominant trait that appears in every generation' }, { id: 'b', text: 'A recessive trait that is masked in the presence of a dominant allele' }, { id: 'c', text: 'A codominant trait that blends with the round-seeded trait' }, { id: 'd', text: 'A mutation that randomly appears in some offspring' }], answer: 'b'
                    },
                    {
                        id: 'm1m4', difficulty: 'medium', type: 'mcq',
                        question: "In Mendel's Law of Dominance, why is a dominant trait expressed over a recessive trait in a heterozygous organism?",
                        hint: 'What does the dominant allele do to the recessive one?',
                        explanation: 'In a heterozygote (like Tt), the dominant allele masks the expression of the recessive allele, so only the dominant trait shows.',
                        choices: [{ id: 'a', text: 'Dominant traits are always more common.' }, { id: 'b', text: 'Dominant alleles mask the expression of recessive alleles.' }, { id: 'c', text: 'Recessive alleles are never expressed.' }, { id: 'd', text: 'Recessive traits are always expressed in the phenotype.' }], answer: 'b'
                    },
                    {
                        id: 'm1m5', difficulty: 'medium', type: 'mcq',
                        question: 'In Mendelian genetics, what does a dominant allele do?',
                        hint: 'More than one choice may describe it.',
                        explanation: 'A dominant allele masks the effect of a recessive allele, and whenever it is present it is expressed in the phenotype — so both A and B are correct.',
                        choices: [{ id: 'a', text: 'Masks the effect of a recessive allele' }, { id: 'b', text: 'Is always expressed as a phenotype' }, { id: 'c', text: 'Is never expressed in the phenotype' }, { id: 'd', text: 'Both A and B' }], answer: 'd'
                    },
                    {
                        id: 'm1m6', difficulty: 'medium', type: 'mcq',
                        question: 'When Mendel crossed hybrids (F1 generation) in his experiments, which of the following was the result specifically on the pea plant height?',
                        hint: 'Tt × Tt — count the tall and short outcomes.',
                        explanation: 'Crossing hybrids (Tt × Tt) gave TT, Tt, Tt, tt — 3 tall to 1 short. That is 75% tall and 25% short.',
                        choices: [{ id: 'a', text: 'All the plants were tall.' }, { id: 'b', text: 'All the plants were short.' }, { id: 'c', text: '75% of the plants were tall and 25% were short.' }, { id: 'd', text: '25% of the plants were tall and 75% were short.' }], answer: 'c'
                    },
                    {
                        id: 'm1m7', difficulty: 'medium', type: 'mcq',
                        question: "In Mendel's experiment with seed color, why were only yellow seeds visible in the F1 generation after crossing a homozygous yellow-seeded plant (YY) with a homozygous green-seeded plant (yy)?",
                        hint: 'Every F1 plant is Yy. Which allele shows?',
                        explanation: 'YY × yy gives all Yy offspring. Because yellow (Y) is dominant over green (y), all F1 seeds are yellow.',
                        choices: [{ id: 'a', text: 'Green seed color is dominant over yellow.' }, { id: 'b', text: 'Yellow seed color is dominant over green.' }, { id: 'c', text: 'Both yellow and green colors were expressed equally in the F1 generation.' }, { id: 'd', text: 'Seed color is determined by multiple alleles.' }], answer: 'b'
                    },
                    // HARD (5)
                    {
                        id: 'm1h1', difficulty: 'hard', type: 'mcq',
                        question: 'What key principle did Mendel discover from his dihybrid cross experiments?',
                        hint: 'A dihybrid cross follows two traits at the same time.',
                        explanation: 'Dihybrid crosses showed that the inheritance of one trait does not affect the inheritance of another — the Law of Independent Assortment, giving the 9:3:3:1 ratio.',
                        choices: [{ id: 'a', text: 'Each offspring inherits all traits exclusively from one parent.' }, { id: 'b', text: 'Traits are inherited together and do not assort independently.' }, { id: 'c', text: 'Recessive traits disappear completely in the F₂ generation.' }, { id: 'd', text: 'The inheritance of one trait does not affect the inheritance of another, following the Law of Independent Assortment.' }], answer: 'd'
                    },
                    {
                        id: 'm1h2', difficulty: 'hard', type: 'mcq',
                        question: "Which of the following was NOT an advantage of using garden pea plants in Mendel's experiments?",
                        hint: 'Mendel needed plants he could grow in large numbers, generation after generation.',
                        explanation: 'Pea plants were ideal because they breed true, have clearly contrasting traits, allow controlled pollination, and mature quickly in little space. Needing years to mature and lots of space would NOT be an advantage.',
                        choices: [{ id: 'a', text: 'Pea plants show consistent traits across successive generations.' }, { id: 'b', text: 'Pea plants have clearly contrasting forms of observable traits.' }, { id: 'c', text: 'Pea plants allow controlled pollination through flower manipulation.' }, { id: 'd', text: 'Pea plants take many years to mature and require a large growing space.' }], answer: 'd'
                    },
                    {
                        id: 'm1h3', difficulty: 'hard', type: 'mcq',
                        question: "Which of the following statements states Mendel's law of independent assortment?",
                        hint: 'It is about factors for DIFFERENT traits.',
                        explanation: 'The law of independent assortment states that the factors (alleles) for different traits separate independently of one another during gamete formation.',
                        choices: [{ id: 'a', text: 'Parents of contrasting appearance produce offspring of intermediate appearance.' }, { id: 'b', text: 'Factors for different traits separate independently during gamete formation.' }, { id: 'c', text: 'Organisms have more factors for each trait.' }, { id: 'd', text: 'One allele masked another; one allele was dominant over the other in the F1 generation.' }], answer: 'b'
                    },
                    {
                        id: 'm1h4', difficulty: 'hard', type: 'mcq',
                        question: 'In each case where Mendel crossed true-breeding plants as parents, the offspring displayed only one of the two traits seen in the parents. This observation supports which principle of genetics?',
                        hint: 'One trait "hid" the other in the offspring.',
                        explanation: 'Only one parental trait appeared in the F1 offspring because one allele is dominant and masks the recessive one — the principle of dominance and recessiveness.',
                        choices: [{ id: 'a', text: 'segregation' }, { id: 'b', text: 'independent assortment' }, { id: 'c', text: 'dominance and recessiveness' }, { id: 'd', text: 'allele frequency' }], answer: 'c'
                    },
                    {
                        id: 'm1h5', difficulty: 'hard', type: 'mcq',
                        question: 'Which of the following is FALSE regarding the law of segregation?',
                        hint: 'Each gamete receives only ONE allele for a trait.',
                        explanation: 'The law of segregation says the two alleles for a trait separate into different gametes — they never end up together in the same gamete. The other statements are true.',
                        choices: [{ id: 'a', text: "It can account for the 3:1 ratio seen in the F2 generation of Mendel's crosses." }, { id: 'b', text: 'It states that each of two alleles for a given trait segregate into different gametes.' }, { id: 'c', text: 'It can be explained by the segregation of homologous chromosomes during meiosis.' }, { id: 'd', text: 'It states that both alleles for a given trait end up together in the same gamete.' }], answer: 'd'
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
                        question: 'Which tool could best be used to predict the likelihood of a specific phenotype in offspring?',
                        hint: 'It is a grid named after Reginald Punnett.',
                        explanation: 'A Punnett square is a grid that combines the alleles of two parents to predict the possible genotypes and phenotypes of their offspring.',
                        choices: [{ id: 'a', text: 'Punnett square' }, { id: 'b', text: 'Punnett cube' }, { id: 'c', text: 'Square Table' }, { id: 'd', text: 'Phenotypic Ratio' }], answer: 'a'
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
    //  LESSON 4 — Monohybrid & Dihybrid Cross
    // ══════════════════════════════════════════════════════════
    {
        id: 'dihybrid', title: 'Monohybrid & Dihybrid Cross', subtitle: 'One trait, then two',
        color: '#d0f2ee', accentColor: '#00897B',
        levels: [
            // ── Level 1: Monohybrid Crosses ───────────────────────
            {
                id: 1, title: 'Monohybrid Crosses',
                questions: [
                    // EASY (5)
                    {
                        id: 'x1e1', difficulty: 'easy', type: 'mcq',
                        question: 'Mendel crossed two heterozygous purple-flowered pea plants. Using his results, which of the following phenotypic ratios would you expect in the F2 generation?',
                        hint: 'Pp × Pp — only pp is white.',
                        explanation: 'Pp × Pp gives PP, Pp, Pp, pp. Three of the four boxes have a dominant P (purple) and one is pp (white): 3 purple : 1 white.',
                        choices: [{ id: 'a', text: '3 purple-flowered : 1 white-flowered' }, { id: 'b', text: '1 purple-flowered : 3 white-flowered' }, { id: 'c', text: '2 purple-flowered : 2 white-flowered' }, { id: 'd', text: 'All purple-flowered' }], answer: 'a'
                    },
                    {
                        id: 'x1e2', difficulty: 'easy', type: 'mcq',
                        question: 'Assume that R is the dominant trait for round and r is the recessive trait for wrinkled. The cross of parental genotypes Rr and Rr will have _______ of its phenotypes.',
                        hint: 'Rr × Rr gives RR, Rr, Rr, rr.',
                        explanation: 'Three of the four offspring (RR, Rr, Rr) have a dominant R and are round; only rr is wrinkled. So ¾ round and ¼ wrinkled.',
                        choices: [{ id: 'a', text: '¾ round and ¼ wrinkled' }, { id: 'b', text: '¼ round and ¾ wrinkled' }, { id: 'c', text: '½ round and ½ wrinkled' }, { id: 'd', text: 'All round' }], answer: 'a'
                    },
                    {
                        id: 'x1e3', difficulty: 'easy', type: 'mcq',
                        question: 'When Mendel crossed a true-breeding tall plant with a true-breeding short plant, what will be the expected offspring as shown in the Punnett square?',
                        hint: 'Every box in the square is Tt.',
                        explanation: 'TT × tt gives Tt in all four boxes. Each offspring has a dominant T, so 100% are tall.',
                        figure: { kind: 'punnett', top: ['T', 'T'], left: ['t', 't'], cells: ['Tt', 'Tt', 'Tt', 'Tt'] },
                        choices: [{ id: 'a', text: '100% tall' }, { id: 'b', text: '50% tall, 50% short' }, { id: 'c', text: '100% short' }, { id: 'd', text: '100% medium' }], answer: 'a'
                    },
                    {
                        id: 'x1e4', difficulty: 'easy', type: 'mcq',
                        question: "Two true-breeding parents are crossed, similar to Mendel's P generation. A purple flower (PP) is crossed with a white flower (pp). What is the expected outcome for the F1 generation?",
                        hint: 'Look at the boxes — every offspring is Pp.',
                        explanation: 'PP × pp gives Pp in all four boxes. Purple (P) is dominant, so all F1 flowers are purple.',
                        figure: { kind: 'punnett', top: ['P', 'P'], left: ['p', 'p'], cells: ['Pp', 'Pp', 'Pp', 'Pp'] },
                        choices: [{ id: 'a', text: 'all white' }, { id: 'b', text: 'all purple' }, { id: 'c', text: 'all red' }, { id: 'd', text: 'half purple, half white' }], answer: 'b'
                    },
                    {
                        id: 'x1e5', difficulty: 'easy', type: 'mcq',
                        question: 'If a homozygous black guinea pig (BB) is crossed with a homozygous white guinea pig (bb), what is the probability that an offspring will have black fur?',
                        hint: 'BB can only give B; bb can only give b.',
                        explanation: 'BB × bb gives Bb in every box. Each offspring has a dominant B, so the probability of black fur is 100%.',
                        choices: [{ id: 'a', text: '25%' }, { id: 'b', text: '50%' }, { id: 'c', text: '75%' }, { id: 'd', text: '100%' }], answer: 'd'
                    },
                    // MEDIUM (10)
                    {
                        id: 'x1m1', difficulty: 'medium', type: 'mcq',
                        question: 'In a cross of a round hybrid pea (Rr) with a true-breeding round parent (RR), what phenotypic proportions would be observed in the offspring?',
                        hint: 'The question asks about phenotypes — what the seeds look like.',
                        explanation: 'Rr × RR gives RR, RR, Rr, Rr. Every offspring has at least one dominant R, so all of them are round. (Half RR and half Rr describes genotypes, not phenotypes.)',
                        choices: [{ id: 'a', text: 'Half heterozygous, half homozygous dominant' }, { id: 'b', text: 'Half round, half wrinkled' }, { id: 'c', text: 'All heterozygous' }, { id: 'd', text: 'All round' }], answer: 'd'
                    },
                    {
                        id: 'x1m2', difficulty: 'medium', type: 'mcq',
                        question: 'In the cross Tt × Tt, what percent of offspring would have the same phenotype as the parents?',
                        hint: 'Both parents are tall. How many boxes show tall?',
                        explanation: 'Tt × Tt gives TT, Tt, Tt, tt. The parents are tall, and three of the four offspring (TT, Tt, Tt) are tall too: 75%.',
                        choices: [{ id: 'a', text: '25%' }, { id: 'b', text: '50%' }, { id: 'c', text: '75%' }, { id: 'd', text: '100%' }], answer: 'c'
                    },
                    {
                        id: 'x1m3', difficulty: 'medium', type: 'mcq',
                        question: 'If you crossed two heterozygous plants, how many of the offspring will also be heterozygous?',
                        hint: 'Count the boxes with one capital and one lowercase letter.',
                        explanation: 'Tt × Tt gives TT, Tt, Tt, tt. Two of the four boxes are heterozygous (Tt), so half of the offspring are heterozygous.',
                        choices: [{ id: 'a', text: 'all' }, { id: 'b', text: 'half' }, { id: 'c', text: '¾' }, { id: 'd', text: '¼' }], answer: 'b'
                    },
                    {
                        id: 'x1m4', difficulty: 'medium', type: 'mcq',
                        question: 'PP = purple, pp = white. What will be the offspring of a cross between two heterozygous purple-flowering plants?',
                        hint: 'Pp × Pp — can a pp offspring appear?',
                        explanation: 'Pp × Pp gives PP, Pp, Pp (purple) and pp (white). So the offspring include both purple-flowered and white-flowered plants.',
                        choices: [{ id: 'a', text: 'all purple-flowered plants' }, { id: 'b', text: 'all white-flowered plants' }, { id: 'c', text: 'two types of white-flowered plants: PP and Pp' }, { id: 'd', text: 'purple-flowered plants and white-flowered plants' }], answer: 'd'
                    },
                    {
                        id: 'x1m5', difficulty: 'medium', type: 'mcq',
                        question: 'In terms of the color of the pods, green is dominant to yellow. If a heterozygous plant is crossed with a homozygous yellow pod plant, what is the probability that the offspring will be yellow?',
                        hint: 'Gg × gg — count the gg boxes.',
                        explanation: 'Gg × gg gives Gg, Gg, gg, gg. Two of the four boxes are gg (yellow), so the probability is 1/2.',
                        choices: [{ id: 'a', text: '1/2' }, { id: 'b', text: '1' }, { id: 'c', text: '1/8' }, { id: 'd', text: '0' }], answer: 'a'
                    },
                    {
                        id: 'x1m6', difficulty: 'medium', type: 'mcq',
                        question: 'C = curly hair, c = straight hair. Based on the Punnett square, what is the probability of the parents having an offspring with curly hair?',
                        hint: 'Any box with at least one capital C is curly.',
                        explanation: 'Cc × Cc gives CC, Cc, Cc, cc. Three of the four boxes have a dominant C (curly), so the probability is 75%.',
                        figure: { kind: 'punnett', cornerLabel: 'Parental Genotype', topLabel: 'Father', leftLabel: 'Mother', top: ['C', 'c'], left: ['C', 'c'], cells: ['CC', 'Cc', 'Cc', 'cc'] },
                        choices: [{ id: 'a', text: '100%' }, { id: 'b', text: '75%' }, { id: 'c', text: '50%' }, { id: 'd', text: '25%' }], answer: 'b'
                    },
                    {
                        id: 'x1m7', difficulty: 'medium', type: 'mcq',
                        question: "In Mendel's experiment, a pea plant that has purple flowers is crossed with one that has white flowers. The offspring were half white and half purple. What were the genotypes of the parents?",
                        hint: 'For white offspring to appear, the purple parent must carry a hidden p.',
                        explanation: 'Pp × pp gives Pp, Pp, pp, pp — half purple and half white. PP × pp would give all purple, and W is not an allele of this gene.',
                        choices: [{ id: 'a', text: 'Pp × pp' }, { id: 'b', text: 'Pp × Pp' }, { id: 'c', text: 'PP × pp' }, { id: 'd', text: 'PP × WW' }], answer: 'a'
                    },
                    {
                        id: 'x1m8', difficulty: 'medium', type: 'mcq',
                        question: 'In tomatoes, red fruit (R) is dominant over yellow fruit (r). A plant that is heterozygous for red fruit is crossed with a plant that has yellow fruit. What would be the phenotypes of the offspring?',
                        hint: 'Rr × rr — count the red and yellow boxes.',
                        explanation: 'Rr × rr gives Rr, Rr, rr, rr. Half are red (Rr) and half are yellow (rr).',
                        choices: [{ id: 'a', text: '100% red fruit' }, { id: 'b', text: '100% yellow fruit' }, { id: 'c', text: '50% red & 50% yellow fruit' }, { id: 'd', text: '75% red fruit & 25% yellow fruit' }], answer: 'c'
                    },
                    {
                        id: 'x1m9', difficulty: 'medium', type: 'mcq',
                        question: 'As shown in the Punnett square, what happened when Mendel crossed hybrids (F1 generation)?',
                        hint: 'Count the boxes that have at least one capital T.',
                        explanation: 'Tt × Tt gives TT, Tt, Tt, tt. Three boxes are tall and one is short: ¾ tall and ¼ short.',
                        figure: { kind: 'punnett', top: ['T', 't'], left: ['T', 't'], cells: ['TT', 'Tt', 'Tt', 'tt'] },
                        choices: [{ id: 'a', text: 'all the plants were tall' }, { id: 'b', text: 'all the plants were medium' }, { id: 'c', text: '¾ of the plants were tall, ¼ of the plants were short' }, { id: 'd', text: '½ of the plants were tall, ½ of the plants were short' }], answer: 'c'
                    },
                    {
                        id: 'x1m10', difficulty: 'medium', type: 'drag',
                        question: 'Complete the Punnett square for Rr × Rr.',
                        hint: 'Top row: R and r. Left column: R and r. Combine each pair.',
                        explanation: 'Rr × Rr gives RR (top-left), Rr (top-right), Rr (bottom-left), rr (bottom-right). Ratio: 1 RR : 2 Rr : 1 rr.',
                        parentA: ['R', 'r'], parentB: ['R', 'r'], dragAnswers: ['RR', 'Rr', 'Rr', 'rr']
                    },
                    // HARD (6)
                    {
                        id: 'x1h1', difficulty: 'hard', type: 'mcq',
                        question: 'Which cross would produce offspring with a 3:1 phenotypic ratio, demonstrating how a dominant allele masks a recessive allele in a heterozygous organism?',
                        hint: 'Both parents must carry a hidden recessive allele.',
                        explanation: 'Only Tt × Tt gives TT, Tt, Tt, tt — 3 dominant : 1 recessive. TT × tt and TT × Tt give all dominant, and tt × tt gives all recessive.',
                        choices: [{ id: 'a', text: 'TT × tt' }, { id: 'b', text: 'TT × Tt' }, { id: 'c', text: 'Tt × Tt' }, { id: 'd', text: 'tt × tt' }], answer: 'c'
                    },
                    {
                        id: 'x1h2', difficulty: 'hard', type: 'mcq',
                        question: "In Mendel's pea plant experiment, crossing two F₁ plants resulted in an F₂ generation with approximately three tall plants for every one short plant. Which explanation best accounts for this result based on the Law of Segregation?",
                        hint: 'Alleles do not blend or disappear — they separate and recombine.',
                        explanation: 'Each F₁ plant (Tt) separates its two alleles into different gametes. At fertilization the gametes combine randomly, giving TT, Tt, Tt, tt — a 3:1 ratio.',
                        choices: [{ id: 'a', text: 'The tall and short alleles blend in F₁ plants and separate again in F₂ plants.' }, { id: 'b', text: 'The recessive allele disappears in F₁ plants and reappears in some F₂ plants.' }, { id: 'c', text: 'The two alleles separate during gamete formation and reunite during fertilization.' }, { id: 'd', text: 'The dominant allele is inherited more frequently than the recessive allele during reproduction.' }], answer: 'c'
                    },
                    {
                        id: 'x1h3', difficulty: 'hard', type: 'mcq',
                        question: 'Refer to the illustration. What are the possible genotypes of the parents?',
                        hint: 'All F1 seeds are round, but wrinkled comes back in F2.',
                        explanation: 'One parent is wrinkled (rr). Since every F1 seed is round and wrinkled reappears in F2, the round parent must be true-breeding RR. The parents are RR and rr.',
                        figure: { kind: 'seedPedigree' },
                        choices: [{ id: 'a', text: 'RR and Rr' }, { id: 'b', text: 'Rr and Rr' }, { id: 'c', text: 'RR and rr' }, { id: 'd', text: 'Rr and rr' }], answer: 'c'
                    },
                    {
                        id: 'x1h4', difficulty: 'hard', type: 'mcq',
                        question: 'Refer to the illustration. What is the ratio of the F2 generation?',
                        hint: 'Count the round and wrinkled seeds in the F2 row.',
                        explanation: 'The F2 row shows 3 round seeds and 1 wrinkled seed, a 3:1 phenotypic ratio. (1:2:1 is the genotypic ratio RR : Rr : rr.)',
                        figure: { kind: 'seedPedigree' },
                        choices: [{ id: 'a', text: '1:2:1' }, { id: 'b', text: '3:1' }, { id: 'c', text: '1:1' }, { id: 'd', text: '4:0' }], answer: 'b'
                    },
                    {
                        id: 'x1h5', difficulty: 'hard', type: 'mcq',
                        question: 'Refer to the illustration. Assuming that both parent plants are homozygous, why would all offspring of the F1 generation have round phenotypes?',
                        hint: 'Every F1 seed is Rr. Which allele shows?',
                        explanation: 'RR × rr gives all Rr F1 seeds. They are heterozygous, but round is dominant over wrinkled, so they all look round.',
                        figure: { kind: 'seedPedigree' },
                        choices: [{ id: 'a', text: 'Because the F1 genotypes are homozygous.' }, { id: 'b', text: 'Because round is dominant over wrinkled seed.' }, { id: 'c', text: 'Because both parents passed on the round alleles.' }, { id: 'd', text: 'Because both parental genotypes are heterozygous.' }], answer: 'b'
                    },
                    {
                        id: 'x1h6', difficulty: 'hard', type: 'drag',
                        question: 'Complete the Punnett square for RR × rr.',
                        hint: 'RR parent gives only R; rr parent gives only r.',
                        explanation: 'RR × rr: every cell is Rr. All 4 offspring are heterozygous round — this is why crossing two purebred parents always gives all-hybrid F1 offspring.',
                        parentA: ['R', 'R'], parentB: ['r', 'r'], dragAnswers: ['Rr', 'Rr', 'Rr', 'Rr']
                    },
                ],
            },

            // ── Level 2: Dihybrid Crosses ─────────────────────────
            {
                id: 2, title: 'Dihybrid Crosses',
                questions: [
                    // EASY (5)
                    {
                        id: 'x2e1', difficulty: 'easy', type: 'mcq',
                        question: 'A dihybrid cross tracks how many traits at once?',
                        hint: '"Di" means two.',
                        explanation: 'A dihybrid cross follows the inheritance of TWO traits at once — like seed shape AND seed color together.',
                        choices: [{ id: 'a', text: 'One' }, { id: 'b', text: 'Two' }, { id: 'c', text: 'Three' }, { id: 'd', text: 'Four' }], answer: 'b'
                    },
                    {
                        id: 'x2e2', difficulty: 'easy', type: 'mcq',
                        question: 'In a dihybrid cross, how many boxes does the Punnett square have?',
                        hint: 'Each parent now makes 4 kinds of gametes instead of 2.',
                        explanation: 'A dihybrid cross uses a 4×4 Punnett square = 16 total boxes, since each parent can make 4 different gamete combinations.',
                        choices: [{ id: 'a', text: '4' }, { id: 'b', text: '8' }, { id: 'c', text: '16' }, { id: 'd', text: '32' }], answer: 'c'
                    },
                    {
                        id: 'x2e3', difficulty: 'easy', type: 'mcq',
                        question: 'How many kinds of gametes does a fully heterozygous parent (YyRr) produce?',
                        hint: 'Two genes, each with two alleles — combine them.',
                        explanation: 'A YyRr parent produces 4 kinds of gametes: YR, Yr, yR, and yr — one for every combination of the two genes\' alleles.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '4' }, { id: 'd', text: '8' }], answer: 'c'
                    },
                    {
                        id: 'x2e4', difficulty: 'easy', type: 'mcq',
                        question: 'What does F.O.I.L. stand for when finding gametes for a dihybrid cross?',
                        hint: 'It\'s the same trick used to multiply two binomials in algebra.',
                        explanation: 'F.O.I.L. stands for First, Outer, Inner, Last — a systematic way to pair up alleles from a genotype like YyRr to find all 4 gametes.',
                        choices: [{ id: 'a', text: 'First, Outer, Inner, Last' }, { id: 'b', text: 'Female, Offspring, Inherited, Line' }, { id: 'c', text: 'Fast, Organized, Ideal, Linked' }, { id: 'd', text: 'Formula, Order, Input, Logic' }], answer: 'a'
                    },
                    {
                        id: 'x2e5', difficulty: 'easy', type: 'mcq',
                        question: 'For genotype YyRr, using FOIL, what is the "First" gamete?',
                        hint: 'Pair the first letter of each gene pair.',
                        explanation: 'FOIL\'s "First" step pairs the first letters of each gene pair: Y (first of Yy) and R (first of Rr) → YR.',
                        choices: [{ id: 'a', text: 'YR' }, { id: 'b', text: 'yR' }, { id: 'c', text: 'Yr' }, { id: 'd', text: 'yr' }], answer: 'a'
                    },
                    // MEDIUM (4)
                    {
                        id: 'x2m1', difficulty: 'medium', type: 'mcq',
                        question: 'Using FOIL on genotype YyRr, what are ALL 4 gametes?',
                        hint: 'First = YR. Now find Outer, Inner, and Last.',
                        explanation: 'FOIL on YyRr gives: First = YR, Outer = Yr, Inner = yR, Last = yr. Those four gametes fill the top and side of the 4×4 grid.',
                        choices: [{ id: 'a', text: 'YR, Yr, yR, yr' }, { id: 'b', text: 'YY, yy, RR, rr' }, { id: 'c', text: 'YR, YR, yr, yr' }, { id: 'd', text: 'yR, yR, Yr, Yr' }], answer: 'a'
                    },
                    {
                        id: 'x2m2', difficulty: 'medium', type: 'mcq',
                        question: 'A dihybrid cross YyRr × YyRr produces how many distinct PHENOTYPE classes?',
                        hint: 'Think: round/wrinkled × yellow/green.',
                        explanation: 'A standard dihybrid cross produces 4 phenotype classes: Round Yellow, Round Green, Wrinkled Yellow, Wrinkled Green — in a 9:3:3:1 ratio.',
                        choices: [{ id: 'a', text: '2' }, { id: 'b', text: '4' }, { id: 'c', text: '9' }, { id: 'd', text: '16' }], answer: 'b'
                    },
                    {
                        id: 'x2m3', difficulty: 'medium', type: 'mcq',
                        question: 'What is the classic phenotype ratio for a dihybrid cross (YyRr × YyRr)?',
                        hint: 'It\'s the signature ratio of a dihybrid cross — memorize this one!',
                        explanation: 'A dihybrid cross between two double-heterozygotes always gives a 9:3:3:1 phenotype ratio, assuming the two genes assort independently.',
                        choices: [{ id: 'a', text: '3:1' }, { id: 'b', text: '1:2:1' }, { id: 'c', text: '9:3:3:1' }, { id: 'd', text: '1:1:1:1' }], answer: 'c'
                    },
                    {
                        id: 'x2m4', difficulty: 'medium', type: 'mcq',
                        question: 'YyRr × YyRr cross. What fraction of offspring will show BOTH dominant traits (Round, Yellow)?',
                        hint: 'That\'s the "9" in the 9:3:3:1 ratio, out of 16 total.',
                        explanation: 'Round Yellow (Y_R_) is the "9" group in the 9:3:3:1 ratio — 9 out of 16 boxes, so the fraction is 9/16.',
                        choices: [{ id: 'a', text: '1/16' }, { id: 'b', text: '3/16' }, { id: 'c', text: '9/16' }, { id: 'd', text: '9/9' }], answer: 'c'
                    },
                    // HARD (4)
                    {
                        id: 'x2h1', difficulty: 'hard', type: 'mcq',
                        question: 'Genotype YYRr. Using FOIL, how many UNIQUE gametes are possible?',
                        hint: 'YY can only ever give Y — it has no second option.',
                        explanation: 'FOIL on YYRr gives YR, YR, Yr, Yr — but since YY only contributes Y, there are only 2 UNIQUE gametes: YR and Yr.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '4' }, { id: 'd', text: '8' }], answer: 'b'
                    },
                    {
                        id: 'x2h2', difficulty: 'hard', type: 'mcq',
                        question: 'Genotype YyRR — what are the two unique gametes?',
                        hint: 'RR only ever gives R. Y or y still varies.',
                        explanation: 'FOIL on YyRR gives YR, YR, yR, yR — but RR only contributes R, so the unique gametes are YR and yR.',
                        choices: [{ id: 'a', text: 'YR and yR' }, { id: 'b', text: 'YR and Yr' }, { id: 'c', text: 'YY and RR' }, { id: 'd', text: 'Yr and yr' }], answer: 'a'
                    },
                    {
                        id: 'x2h3', difficulty: 'hard', type: 'mcq',
                        question: 'In YyRr × YyRr, what fraction of offspring will be double-recessive (yyrr)?',
                        hint: 'That\'s the "1" in the 9:3:3:1 ratio.',
                        explanation: 'yyrr (wrinkled, green) is the "1" group in the 9:3:3:1 ratio — only 1 out of 16 boxes, so the fraction is 1/16.',
                        choices: [{ id: 'a', text: '1/16' }, { id: 'b', text: '3/16' }, { id: 'c', text: '9/16' }, { id: 'd', text: '1/4' }], answer: 'a'
                    },
                    {
                        id: 'x2h4', difficulty: 'hard', type: 'mcq',
                        question: 'In YyRr × YyRr, what fraction of offspring will be Round but green (dominant shape, recessive color)?',
                        hint: 'That\'s one of the "3" groups in 9:3:3:1.',
                        explanation: 'Round Green (yyR_) is one of the "3" groups in the 9:3:3:1 ratio — 3 out of 16 boxes, so the fraction is 3/16.',
                        choices: [{ id: 'a', text: '1/16' }, { id: 'b', text: '3/16' }, { id: 'c', text: '9/16' }, { id: 'd', text: '6/16' }], answer: 'b'
                    },
                    {
                        id: 'x2e6', difficulty: 'easy', type: 'mcq',
                        question: 'During meiosis, how do the chromosome pair for seed color (Y/y) and the pair for seed shape (R/r) line up?',
                        hint: "Think about Mendel's third law.",
                        explanation: 'The two chromosome pairs line up independently — in one cell Y may sit beside R, in another Y may sit beside r. That is why all 4 gamete combinations appear.',
                        choices: [{ id: 'a', text: 'Independently of each other' }, { id: 'b', text: 'Always Y with R' }, { id: 'c', text: 'Always Y with r' }, { id: 'd', text: 'Only one pair lines up' }], answer: 'a'
                    },
                    {
                        id: 'x2m5', difficulty: 'medium', type: 'mcq',
                        question: 'In the shorthand used to group phenotypes, what does Y_ mean?',
                        hint: 'The blank can be filled by either allele.',
                        explanation: 'Y_ means "at least one Y" — the genotype is YY or Yy. Both look yellow because Y is dominant.',
                        choices: [{ id: 'a', text: 'YY only' }, { id: 'b', text: 'Yy only' }, { id: 'c', text: 'YY or Yy' }, { id: 'd', text: 'yy only' }], answer: 'c'
                    },
                    {
                        id: 'x2m6', difficulty: 'medium', type: 'mcq',
                        question: 'How many DIFFERENT genotypes appear in the 16 boxes of a YyRr × YyRr Punnett square?',
                        hint: 'List them: YYRR, YYRr, YYrr, YyRR...',
                        explanation: 'There are 9 unique genotypes: YYRR, YYRr, YYrr, YyRR, YyRr, Yyrr, yyRR, yyRr, yyrr. Several boxes repeat the same genotype.',
                        choices: [{ id: 'a', text: '4' }, { id: 'b', text: '9' }, { id: 'c', text: '16' }, { id: 'd', text: '3' }], answer: 'b'
                    },
                    {
                        id: 'x2h5', difficulty: 'hard', type: 'mcq',
                        question: 'What is the GENOTYPIC ratio for YyRr × YyRr?',
                        hint: 'Count each of the 9 unique genotypes across the 16 boxes.',
                        explanation: 'Counting the 9 genotypes in order (YYRR, YYRr, YYrr, YyRR, YyRr, Yyrr, yyRR, yyRr, yyrr) gives 1 : 2 : 1 : 2 : 4 : 2 : 1 : 2 : 1, which adds up to 16.',
                        choices: [{ id: 'a', text: '9:3:3:1' }, { id: 'b', text: '1:2:1' }, { id: 'c', text: '1:2:1:2:4:2:1:2:1' }, { id: 'd', text: '1:1:1:1' }], answer: 'c'
                    },
                    {
                        id: 'x2h6', difficulty: 'hard', type: 'mcq',
                        question: 'In a YyRr × YyRr Punnett square, how many of the 16 boxes contain YyRr?',
                        hint: 'It is the "4" in the middle of the genotypic ratio.',
                        explanation: 'YyRr appears in 4 of the 16 boxes — it is the most common genotype, matching the 4 in the 1:2:1:2:4:2:1:2:1 ratio.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '4' }, { id: 'd', text: '9' }], answer: 'c'
                    },
                ],
            },

            // ── Level 3: Multi-Trait Mastery ──────────────────────
            {
                id: 3, title: 'Multi-Trait Mastery',
                questions: [
                    // EASY (5)
                    {
                        id: 'x3e1', difficulty: 'easy', type: 'mcq',
                        question: 'To find the probability of two independent traits BOTH appearing, you should…',
                        hint: 'Think "AND" — combine, don\'t just pick one.',
                        explanation: 'For independent events, "AND" means multiply. P(trait A) × P(trait B) gives the probability both happen together.',
                        choices: [{ id: 'a', text: 'Add their probabilities' }, { id: 'b', text: 'Multiply their probabilities' }, { id: 'c', text: 'Subtract their probabilities' }, { id: 'd', text: 'Divide their probabilities' }], answer: 'b'
                    },
                    {
                        id: 'x3e2', difficulty: 'easy', type: 'mcq',
                        question: 'P(round seeds) = 3/4. P(yellow seeds) = 3/4. What is P(round AND yellow)?',
                        hint: 'Multiply: 3/4 × 3/4.',
                        explanation: '3/4 × 3/4 = 9/16 — matching the "9" group in the classic 9:3:3:1 dihybrid ratio.',
                        choices: [{ id: 'a', text: '3/4' }, { id: 'b', text: '6/16' }, { id: 'c', text: '9/16' }, { id: 'd', text: '3/8' }], answer: 'c'
                    },
                    {
                        id: 'x3e3', difficulty: 'easy', type: 'mcq',
                        question: 'A completed dihybrid Punnett square has 16 boxes. Each box represents what probability?',
                        hint: 'Every box is equally likely.',
                        explanation: 'Each of the 16 boxes in a dihybrid Punnett square represents an equal 1/16 chance, assuming random fertilization.',
                        choices: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/9' }, { id: 'c', text: '1/16' }, { id: 'd', text: '1/32' }], answer: 'c'
                    },
                    {
                        id: 'x3e4', difficulty: 'easy', type: 'mcq',
                        question: 'In a 9:3:3:1 ratio, which number represents the double-recessive phenotype?',
                        hint: 'It\'s the smallest, rarest group.',
                        explanation: 'The "1" in 9:3:3:1 always represents the double-recessive phenotype (both traits recessive) — the rarest of the four outcomes.',
                        choices: [{ id: 'a', text: '9' }, { id: 'b', text: '3' }, { id: 'c', text: '1' }, { id: 'd', text: 'It varies each time' }], answer: 'c'
                    },
                    {
                        id: 'x3e5', difficulty: 'easy', type: 'mcq',
                        question: 'YyRr × YyRr. What fraction shows Round Green (dominant shape, recessive color)?',
                        hint: 'This is one of the two "3" groups.',
                        explanation: 'Round Green (yyR_) is 3/16 of offspring — one of the two "3" groups in the 9:3:3:1 ratio.',
                        choices: [{ id: 'a', text: '1/16' }, { id: 'b', text: '3/16' }, { id: 'c', text: '9/16' }, { id: 'd', text: '4/16' }], answer: 'b'
                    },
                    // MEDIUM (4)
                    {
                        id: 'x3m1', difficulty: 'medium', type: 'mcq',
                        question: 'YyRr × yyrr (a dihybrid test cross). How many kinds of gametes does the yyrr parent make?',
                        hint: 'yyrr is homozygous recessive for both genes.',
                        explanation: 'yyrr is homozygous for both genes, so it can only make ONE kind of gamete: yr. It contributes nothing but recessive alleles.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '4' }, { id: 'd', text: '8' }], answer: 'a'
                    },
                    {
                        id: 'x3m2', difficulty: 'medium', type: 'mcq',
                        question: 'YyRr × yyrr cross. What is the resulting phenotype ratio?',
                        hint: 'The YyRr parent makes 4 gamete types; the yyrr parent makes only 1.',
                        explanation: 'YyRr × yyrr produces all 4 phenotype combinations in equal numbers — a 1:1:1:1 ratio. This dihybrid test cross reveals the unknown parent\'s alleles.',
                        choices: [{ id: 'a', text: '9:3:3:1' }, { id: 'b', text: '1:1:1:1' }, { id: 'c', text: '3:1' }, { id: 'd', text: 'All identical' }], answer: 'b'
                    },
                    {
                        id: 'x3m3', difficulty: 'medium', type: 'mcq',
                        question: 'P(wrinkled) = 1/4 and P(green) = 1/4. What is P(wrinkled AND green)?',
                        hint: 'Multiply the two fractions.',
                        explanation: '1/4 × 1/4 = 1/16 — matching the "1" group (double-recessive) in the 9:3:3:1 ratio.',
                        choices: [{ id: 'a', text: '1/8' }, { id: 'b', text: '1/16' }, { id: 'c', text: '2/4' }, { id: 'd', text: '1/4' }], answer: 'b'
                    },
                    {
                        id: 'x3m4', difficulty: 'medium', type: 'mcq',
                        question: 'In a dihybrid cross, if the two genes are on DIFFERENT chromosomes, their alleles assort…',
                        hint: 'This is one of Mendel\'s three laws.',
                        explanation: 'Genes on different chromosomes follow the Law of Independent Assortment — each gene\'s alleles separate into gametes independently of the other gene.',
                        choices: [{ id: 'a', text: 'Together, always linked' }, { id: 'b', text: 'Independently of one another' }, { id: 'c', text: 'Only from the mother' }, { id: 'd', text: 'In alphabetical order' }], answer: 'b'
                    },
                    // HARD (4)
                    {
                        id: 'x3h1', difficulty: 'hard', type: 'mcq',
                        question: 'YyRr × YyRr. What fraction of offspring will be heterozygous for BOTH genes (YyRr)?',
                        hint: 'P(Rr) = 1/2 and P(Yy) = 1/2 — multiply them.',
                        explanation: 'P(Rr) = 1/2 and P(Yy) = 1/2. Multiplying: 1/2 × 1/2 = 1/4 of offspring will be YyRr, heterozygous for both genes.',
                        choices: [{ id: 'a', text: '1/16' }, { id: 'b', text: '1/4' }, { id: 'c', text: '9/16' }, { id: 'd', text: '1/2' }], answer: 'b'
                    },
                    {
                        id: 'x3h2', difficulty: 'hard', type: 'mcq',
                        question: 'A dihybrid cross yields a 9:3:3:1 ratio. Out of 32 total offspring, how many are expected to be double-recessive?',
                        hint: '32 × 1/16 = ?',
                        explanation: 'The double-recessive group is 1/16 of offspring. 32 × 1/16 = 2 offspring expected to be double-recessive.',
                        choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '4' }, { id: 'd', text: '8' }], answer: 'b'
                    },
                    {
                        id: 'x3h3', difficulty: 'hard', type: 'mcq',
                        question: 'Which law explains why we can MULTIPLY individual trait probabilities together in a dihybrid cross?',
                        hint: 'It\'s the same law that lets genes sort into gametes without affecting each other.',
                        explanation: 'The Law of Independent Assortment guarantees the two genes are inherited independently — which is exactly why their probabilities can be multiplied together.',
                        choices: [{ id: 'a', text: 'Law of Dominance' }, { id: 'b', text: 'Law of Segregation' }, { id: 'c', text: 'Law of Independent Assortment' }, { id: 'd', text: 'Law of Probability' }], answer: 'c'
                    },
                    {
                        id: 'x3h4', difficulty: 'hard', type: 'mcq',
                        question: 'Genotype YyRr — using FOIL, which gamete comes from the INNER letters?',
                        hint: 'First: Y+R. Outer: Y+r. Inner: y+R. Last: y+r.',
                        explanation: 'In Y y R r, the two INNER letters are y and R, so Inner = yR. Full FOIL order: First = YR, Outer = Yr, Inner = yR, Last = yr.',
                        choices: [{ id: 'a', text: 'YR' }, { id: 'b', text: 'Yr' }, { id: 'c', text: 'yR' }, { id: 'd', text: 'yr' }], answer: 'c'
                    },
                    {
                        id: 'x3e6', difficulty: 'easy', type: 'mcq',
                        question: 'In the FOIL method, what does Step 5 "Simplify" mean?',
                        hint: 'Look for gametes that appear more than once.',
                        explanation: 'After FOIL gives 4 gametes, combine identical ones. For YYRr: YR, Yr, YR, Yr simplifies to just YR and Yr.',
                        choices: [{ id: 'a', text: 'Combine identical gametes' }, { id: 'b', text: 'Delete the recessive alleles' }, { id: 'c', text: 'Multiply the ratios' }, { id: 'd', text: 'Draw a 2×2 grid' }], answer: 'a'
                    },
                    {
                        id: 'x3m5', difficulty: 'medium', type: 'mcq',
                        question: 'Using FOIL on YyRR, what are the 4 gametes before simplifying?',
                        hint: 'Y y R R — First, Outer, Inner, Last.',
                        explanation: 'First = YR, Outer = YR, Inner = yR, Last = yR. Simplified, the unique gametes are YR and yR.',
                        choices: [{ id: 'a', text: 'YR, YR, yR, yR' }, { id: 'b', text: 'YR, Yr, yR, yr' }, { id: 'c', text: 'YY, RR, yy, RR' }, { id: 'd', text: 'Yr, Yr, yr, yr' }], answer: 'a'
                    },
                    {
                        id: 'x3m6', difficulty: 'medium', type: 'mcq',
                        question: 'Using FOIL on YYRr, what is the "Outer" gamete?',
                        hint: 'The outer letters of Y Y R r are the very first and very last.',
                        explanation: 'The outer letters are the first Y and the last r, so Outer = Yr.',
                        choices: [{ id: 'a', text: 'YR' }, { id: 'b', text: 'Yr' }, { id: 'c', text: 'YY' }, { id: 'd', text: 'Rr' }], answer: 'b'
                    },
                    {
                        id: 'x3h5', difficulty: 'hard', type: 'mcq',
                        question: 'An organism has genotype YYRr. Which statement about where its alleles came from is correct?',
                        hint: 'Each gamete carries one allele of EACH gene.',
                        explanation: 'Each parent gave a gamete with one color allele and one shape allele — for example YR from one parent and Yr from the other. It is NOT "YY from one parent and Rr from the other".',
                        choices: [{ id: 'a', text: 'One parent gave YY and the other gave Rr' }, { id: 'b', text: 'Each parent gave one Y and one R-or-r allele (e.g. YR + Yr)' }, { id: 'c', text: 'Both parents gave YYRr' }, { id: 'd', text: 'Only the mother passed on alleles' }], answer: 'b'
                    },
                ],
            },
        ],
    },

    // ══════════════════════════════════════════════════════════
    //  LESSON 5 — Test Your Knowledge
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