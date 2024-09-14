import { Sound } from "expo-av/build/Audio";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

import correct_sound from "@/assets/sounds/correct.mp3";
import pass_sound from "@/assets/sounds/whoosh.mp3";

const useSoundEffectPlayer = () => {
  const SOUNDS = {
    correct: "correct",
    pass: "pass",
    tick: "tick",
  };
  const [soundEffect, setSoundEffect] = useState<Sound>();

  async function playSound(effectname: string) {
    let sound_file;
    switch (effectname) {
      case SOUNDS.correct:
        sound_file = correct_sound;
        break;
      case SOUNDS.pass:
        sound_file = pass_sound;
        break;
    }
    if (!sound_file) return;

    const { sound } = await Audio.Sound.createAsync(sound_file);
    setSoundEffect(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return soundEffect
      ? () => {
          soundEffect.unloadAsync();
        }
      : undefined;
  }, [soundEffect]);

  return { SOUNDS, playSound };
};

export default useSoundEffectPlayer;
