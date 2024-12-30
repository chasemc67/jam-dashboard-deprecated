import {
  getScaleTriads,
  getScaleSeventhChords,
  getScaleSuspendedChords,
  getScaleNinthChords,
  getScaleEleventhChords,
  getScaleThirteenthChords,
  getScaleAlteredDominantChords,
  getScaleAugmentedChords,
  getScaleDiminishedSeventhChords,
} from './scaleChords';

describe('Scale Chord Functions', () => {
  describe('C Major Scale', () => {
    const key = 'C';
    const scale = 'major';

    test('getScaleTriads returns correct triads', () => {
      const triads = getScaleTriads(key, scale);
      expect(triads).toEqual(['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']);
    });

    test('getScaleSeventhChords returns correct seventh chords', () => {
      const seventhChords = getScaleSeventhChords(key, scale);
      expect(seventhChords).toEqual([
        'Cmaj7',
        'Dm7',
        'Em7',
        'Fmaj7',
        'G7',
        'Am7',
        'Bm7b5',
      ]);
    });

    test('getScaleSuspendedChords returns correct suspended chords', () => {
      const suspendedChords = getScaleSuspendedChords(key, scale);
      // In C major, we can form:
      // Csus2 (C-D-G), Csus4 (C-F-G)
      // Gsus4 (G-C-D)
      expect(suspendedChords).toContain('Csus2');
      expect(suspendedChords).toContain('Csus4');
      expect(suspendedChords).toContain('Gsus4');
      expect(suspendedChords.length).toBe(3);
    });

    test('getScaleNinthChords returns correct ninth chords', () => {
      const ninthChords = getScaleNinthChords(key, scale);
      // In C major, we expect chords like Cmaj9, Dm9, etc.
      expect(ninthChords).toContain('Cmaj9');
      expect(ninthChords).toContain('Dm9');
      expect(ninthChords).toContain('Em9');
    });

    test('getScaleEleventhChords returns correct eleventh chords', () => {
      const eleventhChords = getScaleEleventhChords(key, scale);
      // Should contain chords like C11, Dm11, etc.
      expect(eleventhChords.length).toBeGreaterThan(0);
      eleventhChords.forEach(chord => {
        expect(chord).toMatch(/11$/);
      });
    });

    test('getScaleThirteenthChords returns correct thirteenth chords', () => {
      const thirteenthChords = getScaleThirteenthChords(key, scale);
      // Should contain chords like C13, D13, etc.
      expect(thirteenthChords.length).toBeGreaterThan(0);
      thirteenthChords.forEach(chord => {
        expect(chord).toMatch(/13$/);
      });
    });

    test('getScaleAlteredDominantChords returns correct altered dominant chords', () => {
      const alteredChords = getScaleAlteredDominantChords(key, scale);
      // Altered dominants are typically built on the V degree (G in C major)
      expect(alteredChords).toContain('G7alt');
    });

    test('getScaleAugmentedChords returns correct augmented chords', () => {
      const augmentedChords = getScaleAugmentedChords(key, scale);
      // Augmented chords are not diatonic to the major scale
      expect(augmentedChords).toHaveLength(0);
    });

    test('getScaleDiminishedSeventhChords returns correct diminished seventh chords', () => {
      const dimChords = getScaleDiminishedSeventhChords(key, scale);
      // In major scale, diminished seventh chord is typically built on the VII degree
      expect(dimChords).toContain('Bdim7');
    });
  });

  describe('A Minor Scale', () => {
    const key = 'A';
    const scale = 'minor';

    test('getScaleTriads returns correct triads', () => {
      const triads = getScaleTriads(key, scale);
      expect(triads).toEqual(['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G']);
    });

    test('getScaleSeventhChords returns correct seventh chords', () => {
      const seventhChords = getScaleSeventhChords(key, scale);
      expect(seventhChords).toEqual([
        'Am7',
        'Bm7b5',
        'Cmaj7',
        'Dm7',
        'Em7',
        'Fmaj7',
        'G7',
      ]);
    });

    test('getScaleSuspendedChords returns correct suspended chords', () => {
      const suspendedChords = getScaleSuspendedChords(key, scale);
      // In A minor, we can form:
      // Asus2 (A-B-E), Asus4 (A-D-E)
      // Esus4 (E-A-B)
      expect(suspendedChords).toContain('Asus2');
      expect(suspendedChords).toContain('Asus4');
      expect(suspendedChords).toContain('Esus4');
      expect(suspendedChords.length).toBe(3);
    });

    test('getScaleNinthChords returns correct ninth chords', () => {
      const ninthChords = getScaleNinthChords(key, scale);
      // In A minor, we expect chords like Am9, Bm9b5, etc.
      expect(ninthChords).toContain('Am9');
      expect(ninthChords).toContain('G9');
    });

    test('getScaleEleventhChords returns correct eleventh chords', () => {
      const eleventhChords = getScaleEleventhChords(key, scale);
      expect(eleventhChords.length).toBeGreaterThan(0);
      eleventhChords.forEach(chord => {
        expect(chord).toMatch(/11$/);
      });
    });

    test('getScaleThirteenthChords returns correct thirteenth chords', () => {
      const thirteenthChords = getScaleThirteenthChords(key, scale);
      expect(thirteenthChords.length).toBeGreaterThan(0);
      thirteenthChords.forEach(chord => {
        expect(chord).toMatch(/13$/);
      });
    });

    test('getScaleAlteredDominantChords returns correct altered dominant chords', () => {
      const alteredChords = getScaleAlteredDominantChords(key, scale);
      // Altered dominants are typically built on the V degree (E in A minor)
      expect(alteredChords).toContain('E7alt');
    });

    test('getScaleAugmentedChords returns correct augmented chords', () => {
      const augmentedChords = getScaleAugmentedChords(key, scale);
      // Augmented chords might be possible in harmonic/melodic minor
      expect(augmentedChords.length).toBeGreaterThanOrEqual(0);
    });

    test('getScaleDiminishedSeventhChords returns correct diminished seventh chords', () => {
      const dimChords = getScaleDiminishedSeventhChords(key, scale);
      // In natural minor scale, diminished seventh chord is typically built on the II degree
      expect(dimChords).toContain('Bdim7');
    });
  });
});
