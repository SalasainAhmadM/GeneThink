// App is locked out after this date (device clock, since the app is fully offline)
export const APP_EXPIRATION_DATE = '2026-12-31T23:59:59';

export const STORAGE_KEYS = {
    playerName: "gq_player_name",
    progress: "gq_progress", // JSON: { [lesssonId] : boolean[] }
    settings: "gq_settings", // JSON:  Settings object
    stars: 'gq_stars',
    pin: 'gq_pin', // 4-digit PIN, only present once access control has been set up
    explored: 'gq_explored' // JSON: ExploredSections
};

// ── Exploration tracking — which Home tabs has the student opened ──
export interface ExploredSections {
    lessons: boolean;
    progress: boolean;
    guide: boolean;
}

export const DEFAULT_EXPLORED: ExploredSections = {
    lessons: false,
    progress: false,
    guide: false
};

// ── Settings ──
export interface Settings {
    sound: boolean;
    timer: boolean;
    hints: boolean;
    animations: boolean;
    restrictAccess: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
    sound: true,
    timer: true,
    hints: false,
    animations: true,
    restrictAccess: false
};