import { Image } from 'expo-image';
import React from 'react';

// The two GeneThink lab students from the mission mockups, as painted art
// (assets/images/characters). `Teacher` is the boy holding the glowing pea,
// `Student` is the girl with the DNA tablet; the exported names are kept so
// every screen that already places them keeps working.
// Pass `size` for the width; the height follows each image's aspect ratio.

const BOY = require('../../assets/images/characters/student-boy.png');
const GIRL = require('../../assets/images/characters/student-girl.png');

// trimmed image sizes (w / h)
const BOY_RATIO = 533 / 560;
const GIRL_RATIO = 528 / 560;

// ── Boy: hoodie under the lab coat, backpack, holding out a glowing pea ──
export const Teacher = ({ size = 120 }: { size?: number; }) => (
    <Image source={BOY} style={{ width: size, height: size / BOY_RATIO }} contentFit='contain' />
);

// ── Girl: curly hair, blue headband + yellow bow, DNA tablet ──
export const Student = ({ size = 120 }: { size?: number; }) => (
    <Image source={GIRL} style={{ width: size, height: size / GIRL_RATIO }} contentFit='contain' />
);
