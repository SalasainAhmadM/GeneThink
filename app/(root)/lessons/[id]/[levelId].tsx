import { BackArrow } from '@/components/icons/Arrowicon';
import DragQuestion from '@/components/Lessons/DragQuestion';
import MCQQuestion from '@/components/Lessons/MCQQuestion';
import ResultsScreen from '@/components/Lessons/ResultsScreen';
import TimerRing from '@/components/Lessons/TimerRing';
import Button from '@/components/ui/Button';
import { AnswerRecord, HEARTS_PER_LEVEL, LESSONS, Question, sampleLevelQuestions } from '@/constants/lessons';
import { Progress, StarsMap } from '@/constants/prorgess';
import { DEFAULT_SETTINGS, Settings, STORAGE_KEYS } from '@/constants/settings';
import { cn } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BulbSvg from '../../../../assets/svgs/bulb-svgrepo-com.svg';

// ── Heart display ─────────────────────────────────────────────
const Hearts = ({ current, max }: { current: number; max: number; }) => (
    <View className='flex-row gap-x-0.5 flex-wrap justify-center'>
        {Array.from({ length: max }).map((_, i) => (
            // Note: Heart border white? or opacity is good?
            <Text key={i} className={cn('text-xl', i < current ? 'opacity-100' : 'opacity-30')} >❤️</Text>
        ))}
    </View>
);

// ── Back confirmation modal ───────────────────────────────────
const BackModal = ({ onStay, onLeave }: { onStay: () => void; onLeave: () => void; }) => (
    <View className='flex-1 items-center justify-center bg-black/50' >
        <View className='bg-white rounded-3xl mx-8 p-6 gap-4' >
            <Text className='font-fredoka-bold text-ink-300 text-xl text-center'>Leave this level?</Text>
            <Text className='font-nunito text-ink-400 text-sm text-center leading-5'>Your progress for this level will be reset. You'll start again with 5 hearts next time.
            </Text>

            <View className='gap-2.5 mt-1'>
                <Button label='Stay & Continue' btnType='secondary' width='full' size='md' fredokaBold onPress={onStay} />
                <Button label='Yes, Leave' btnType='ghost' width='full' size='md' onPress={onLeave} />
            </View>
        </View>
    </View>
);

export default function LevelScreen() {
    const { id, levelId } = useLocalSearchParams<{ id: string; levelId: string; }>();
    const MAX_TIME = levelId === '1' ? 80 : levelId === '2' ? 60 : 40;
    // const MAX_TIME = levelId === '1' ? 1 : levelId === '2' ? 60 : 40;

    const lesson = LESSONS.find(l => l.id === id);
    const levelIndex = lesson?.levels.findIndex(l => String(l.id) === levelId) ?? -1;
    const level = lesson?.levels[levelIndex];

    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [showBackModal, setShowBackModal] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hearts, setHearts] = useState<number>(HEARTS_PER_LEVEL);
    const [timeLeft, setTimeLeft] = useState<number>(MAX_TIME);
    const [timeUsed, setTimeUsed] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [phase, setPhase] = useState<"quiz" | "results">("quiz");
    const [passed, setPassed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [answerLog, setAnswerLog] = useState<AnswerRecord[]>([]);

    // Timer paused when user has answered (waiting for Next press)
    const [timerPaused, setTimerPaused] = useState(false);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // #region UseEffects
    // Sample fresh questions each time the level is opened
    const initLevel = () => {
        if (!level) return;
        setQuestions(sampleLevelQuestions(level));
        setQIndex(0);
        setHearts(HEARTS_PER_LEVEL);
        setTimeLeft(MAX_TIME);
        setTimeUsed(0);
        setPhase("quiz");
        setTimerPaused(false);
        setCorrectCount(0);
        setAnswerLog([]);
    };

    useEffect(() => { initLevel(); }, [id, levelId]);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEYS.settings).then((raw) => {
            if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
        });
    }, []);

    const currentQuestion = questions[qIndex];
    // const currentQuestion = questions.find(q => q.type === 'drag');
    // console.log('questions: ', questions);

    const isLastQuestion = qIndex === questions.length - 1;

    // ── Timer ──────────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'quiz') { clearTimer(); return; }
        if (timerPaused || (settings.timer && timeLeft <= 0)) return;

        timerRef.current = setInterval(() => {
            setTimeUsed((t) => t + 1);
            setTimeLeft((t) => t - 1);
        }, 1000);

        return clearTimer;
    }, [phase, timerPaused, qIndex, settings.timer]);

    // ── Time up → fail the level (only when the timer is enabled) ──
    useEffect(() => {
        if (settings.timer && timeLeft <= 0 && phase === 'quiz') {
            clearTimer();
            setPassed(false);
            setTimeout(() => {
                setPhase('results');
            }, 1000);
        }
    }, [timeLeft]);

    // #region Functions
    const clearTimer = () => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };

    const goHome = () => router.replace('/Home' as any);

    // Records the answer and immediately advances (or finishes the level) —
    // uses freshly-computed counts rather than stale state, since both happen
    // in one synchronous step now that correctness isn't revealed per-question.
    const submitAnswer = (correct: boolean, userAnswer?: string | string[]) => {
        setShowHint(false);
        setAnswerLog((prev) => [...prev, { question: currentQuestion, userAnswer: userAnswer ?? null, correct }]);

        const newCorrectCount = correct ? correctCount + 1 : correctCount;
        const newHearts = correct ? hearts : hearts - 1;
        setCorrectCount(newCorrectCount);
        setHearts(newHearts);

        const nextIndex = qIndex + 1;

        if (nextIndex >= questions.length || newHearts <= 0) {
            const didPass = newHearts > 0 && (newCorrectCount / questions.length) >= 0.6;

            // Calculate stars here so we can save them
            const heartsUsed = HEARTS_PER_LEVEL - newHearts;
            const accuracy = newCorrectCount / questions.length;
            const levelMaxTime = levelIndex === 0 ? 80 : levelIndex === 1 ? 60 : 40;
            const timeRatio = timeUsed / levelMaxTime;
            const starCount = !didPass ? 0
                : accuracy === 1 && heartsUsed <= 1 && timeRatio <= 0.5 ? 3
                    : accuracy >= 0.75 && heartsUsed <= 2 && timeRatio <= 0.75 ? 2
                        : 1;

            if (didPass) saveProgress(starCount);  // ← pass starCount
            setPassed(didPass);
            setPhase('results');
            return;
        }

        // Advance
        setQIndex(nextIndex);
        setTimerPaused(false);
    };

    // ── Save progress ──────────────────────────────────────────────
    const saveProgress = async (starCount: number) => {
        try {
            const [progressRaw, starsRaw] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.progress),
                AsyncStorage.getItem(STORAGE_KEYS.stars),
            ]);

            // Save passed boolean
            const progress: Progress = progressRaw ? JSON.parse(progressRaw) : {};
            const progressArr = [...(progress[id] ?? [])];
            progressArr[levelIndex] = true;

            // Save stars — only update if new score is higher
            const starsMap: StarsMap = starsRaw ? JSON.parse(starsRaw) : {};
            const starsArr = [...(starsMap[id] ?? [])];
            const prevStars = starsArr[levelIndex] ?? 0;
            starsArr[levelIndex] = Math.max(prevStars, starCount);

            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.progress, JSON.stringify({ ...progress, [id]: progressArr })),
                AsyncStorage.setItem(STORAGE_KEYS.stars, JSON.stringify({ ...starsMap, [id]: starsArr })),
            ]);
        } catch (e) {
            console.warn('Failed to save progress/stars:', e);
        }
    };

    const onResultAction = (option: number) =>
        option === 1 ?
            router.replace(`/(root)/lessons/${id}/${lesson?.levels[levelIndex + 1].id}` as any)
            : option === 2 ?
                initLevel()
                : goHome();

    if (!lesson || !level) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='font-nunito text-ink-100'>{!lesson ? 'Lesson' : 'Level'} not found.</Text>
        </View>
    );

    // Results screen
    if (phase === "results") return (
        <ResultsScreen passed={passed} lesson={lesson} correctCount={correctCount} totalCount={questions.length} timeUsed={timeUsed} levelIndex={levelIndex} totalLevels={lesson.levels.length} heartsLeft={hearts} answerLog={answerLog}
            //  onRetry={initLevel} onNext={goNext}
            onResultAction={onResultAction} />
    );

    if (!currentQuestion) return null;

    return (
        <View className='flex-1 bg-bg-light'>
            {/* ── Header ─────────────────────────────────────────── */}
            <LinearGradient colors={[lesson.accentColor + 'cc', lesson.accentColor]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <SafeAreaView edges={['top']}>
                    <View className='p-4'>
                        {/* Top row: back | title | hint-toggle */}
                        <View className='flex-row items-center justify-between mb-3'>
                            <Button btnType='glass' size='sm' icon={<BackArrow color='#fff' size={14} />} label='Back' onPress={() => setShowBackModal(true)} />

                            <Text className='font-fredoka-bold text-white text-base'>{lesson.title} · Lv{level.id}</Text>

                            <Button btnType='glass' size='sm' icon={<BulbSvg width={14} height={14} />} className='h-9' onPress={() => setShowHint(!showHint)} />
                        </View>

                        {/* Hearts | Timer | Elapsed */}
                        <View className='flex-row items-center justify-between'>
                            <Hearts current={hearts} max={HEARTS_PER_LEVEL} />

                            {settings.timer && <TimerRing timeLeft={timeLeft} maxTime={MAX_TIME} />}
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* ── Question ───────────────────────────────────────── */}
            {/* <SafeAreaView className='flex-1'> */}
            <ScrollView contentContainerClassName='flex-1 p-4 pb-8' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {currentQuestion.type === 'mcq' ? (
                    <MCQQuestion key={currentQuestion.id} showHint={showHint} question={currentQuestion} onAnswered={submitAnswer} accentColor={lesson.accentColor} isLast={isLastQuestion} quizNumberLabel={`${qIndex + 1} / ${questions.length}`} />
                ) : (
                    <DragQuestion
                        key={currentQuestion.id}
                        showHint={showHint}
                        question={currentQuestion}
                        onAnswered={submitAnswer}
                        accentColor={lesson.accentColor}
                        isLast={isLastQuestion}
                        quizNumberLabel={`${qIndex + 1} / ${questions.length}`}
                    />
                )}
            </ScrollView>
            {/* </SafeAreaView> */}

            <Modal visible={showBackModal} transparent animationType='fade'>
                <BackModal onStay={() => setShowBackModal(false)} onLeave={() => { setShowBackModal(false); goHome(); }} />
            </Modal>
        </View>
    );
}