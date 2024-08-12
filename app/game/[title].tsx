import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { GYRO_STATES } from "@/constants";
import useGyroSensor from "@/hooks/useGyroSensor";
import useLandscapeMode from "@/hooks/useLandscapeMode";
import { getDeckFromTitle, getRandomCard } from "@/utls";
import { Decks } from "@/constants/Decks";
import CountDownTimer from "@/components/CountDownTimer";

const COUNTDOWN = 5;
const GAME_DURATION = 3 * 60;

const Game = () => {
  useLandscapeMode();
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const [gameStyle, setGameStyle] = useState(styles.gameState);
  const [pauseGame, setPauseGame] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [bufferTimer, setBufferTimer] = useState<any>(null);
  const [currentDeck, setCurrentDeck] = useState(
    getDeckFromTitle(Decks, title?.toString())
  );
  const [currentCard, setCurrentCard] = useState("");
  const { setGyroEnabled, gyroState } = useGyroSensor();

  const showBufferScreen = (isCorrect: boolean) => {
    if (bufferTimer) return;
    Vibration.vibrate();
    setGameStyle(isCorrect ? styles.correctState : styles.passState);
    setPauseGame(true);
    setCurrentCard(isCorrect ? "Correct" : "Pass");
    const t = setTimeout(() => {
      setGameStyle(styles.gameState);
      setPauseGame(false);
      setBufferTimer(null);
      nextWord();
    }, 2000);
    setBufferTimer(t);
  };

  const startGame = () => {
    setHasGameStarted(true);
    setGyroEnabled(true);
    nextWord();
  };

  const endGame = () => {
    setGyroEnabled(false);
    setHasGameStarted(false);
    if (bufferTimer) clearTimeout(bufferTimer);
    router.back();
  };

  const nextWord = () => {
    if (currentDeck.cards.length) {
      const card = getRandomCard(currentDeck.cards);
      if (card) {
        setCurrentCard(card);
        setCurrentDeck({
          ...currentDeck,
          cards: currentDeck.cards.filter((i: string) => i !== card),
        });
      }
    } else {
      endGame();
    }
  };

  useEffect(() => {
    if (!pauseGame) {
      if (gyroState === GYRO_STATES.up) {
        // trigger correct
        showBufferScreen(true);
      } else if (gyroState === GYRO_STATES.down) {
        // trigger pass
        showBufferScreen(false);
      }
    }
  }, [gyroState]);

  return (
    <SafeAreaView style={[styles.container, gameStyle]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>x</Text>
      </TouchableOpacity>
      <View style={styles.center}>
        {hasGameStarted ? (
          <>
            <CountDownTimer
              styles={styles.timerText}
              startTimer={GAME_DURATION}
              onComplete={endGame}
            />
            <Text style={styles.cardText}>{currentCard}</Text>
          </>
        ) : (
          <CountDownTimer
            styles={styles.cardText}
            startTimer={COUNTDOWN}
            onComplete={startGame}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: 0,
    margin: 0,
  },
  gameState: {
    backgroundColor: "#60a5fa",
  },
  passState: {
    backgroundColor: "#f97316",
  },
  correctState: {
    backgroundColor: "#34d399",
  },
  timerText: {
    top: 0,
    position: "absolute",
    fontSize: 30,
    color: "white",
  },
  center: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 120,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    right: 20,
    fontSize: 50,
    // borderRadius: 50,
    fontWeight: "700",
    // backgroundColor: "grey",
    padding: 20,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#d1d5db",
  },
});

export default Game;
