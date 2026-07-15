export const STORAGE_KEYS = {
    playerName: "gq_player_name",
    progress: "gq_progress", // JSON: { [lesssonId] : boolean[] }
    settings: "gq_settings", // JSON:  Settings object
    stars: 'gq_stars',
    pin: 'gq_pin' // 4-digit PIN, only present once access control has been set up
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