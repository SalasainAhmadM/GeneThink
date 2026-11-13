import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

// Lightweight UI sound effects. Each sound is a tiny WAV (a few KB) loaded
// once into its own player and replayed from the start on demand.

const SOURCES = {
    tap: require('../assets/sounds/tap.wav'),
    correct: require('../assets/sounds/correct.wav'),
    wrong: require('../assets/sounds/wrong.wav'),
} as const;

export type SoundName = keyof typeof SOURCES;

const VOLUME: Record<SoundName, number> = { tap: 0.5, correct: 0.8, wrong: 0.7 };

const players: Partial<Record<SoundName, AudioPlayer>> = {};
let enabled = DEFAULT_SETTINGS.sound;
let initialized = false;

/** Call once at app start: sets the audio mode, preloads sounds and reads the user's setting. */
export async function initSounds() {
    if (initialized) return;
    initialized = true;
    try {
        // Mix with the student's music instead of pausing it; respect the silent switch.
        await setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' });
    } catch { }
    (Object.keys(SOURCES) as SoundName[]).forEach(getPlayer);
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.settings);
        if (raw) enabled = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }.sound;
    } catch { }
}

/** Keep in sync with the "Sound Effects" toggle in Settings. */
export function setSoundEnabled(on: boolean) {
    enabled = on;
}

function getPlayer(name: SoundName) {
    let p = players[name];
    if (!p) {
        try {
            p = createAudioPlayer(SOURCES[name]);
            p.volume = VOLUME[name];
            players[name] = p;
        } catch {
            return undefined;
        }
    }
    return p;
}

export function playSound(name: SoundName) {
    if (!enabled) return;
    const p = getPlayer(name);
    if (!p) return;
    try {
        p.seekTo(0).catch(() => { });
        p.play();
    } catch { }
}
