import { LESSONS } from "./lessons";

export type Progress = Record<string, boolean[]>;
export type StarsMap = Record<string, number[]>;

export const getLevelsDone = (progress: Progress, lesssonId: string): number => (progress[lesssonId] ?? []).filter(Boolean).length;

export const isLevelPassed = (progress: Progress, lesssonId: string, levelIndex: number): boolean => (progress[lesssonId]?.[levelIndex] === true);

export const isLevelUnlocked = (progress: Progress, lesssonId: string, levelIndex: number): boolean => {
    if (levelIndex === 0)
        return true; return (progress[lesssonId]?.[levelIndex - 1]) === true;
};

export const getTotalDone = (progress: Progress): number => LESSONS.reduce((sum, l) => sum + getLevelsDone(progress, l.id), 0);

export const getTotalLevels = (): number => LESSONS.reduce((sum, l) => sum + l.levels.length, 0);