import { useEffect, useState } from "react";
import { Text } from "react-native";

type Props = {
  styles: any;
  startTimer: number;
  onComplete: () => void;
};

const getTimeToDisplay = (time: number) => {
  if (time < 60) {
    return `${time}`;
  } else {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  }
};

const CountDownTimer = ({ styles, startTimer, onComplete }: Props) => {
  const [displayTimer, setDisplayTimer] = useState(
    getTimeToDisplay(startTimer)
  );

  useEffect(() => {
    let currentTimer = startTimer;
    const timer = setInterval(() => {
      if (currentTimer > 0) {
        currentTimer -= 1;
        setDisplayTimer(getTimeToDisplay(currentTimer));
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTimer]);

  return <Text style={styles}>{displayTimer}</Text>;
};

export default CountDownTimer;
