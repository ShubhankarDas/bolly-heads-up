import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

type Props = {
  triggerPass: () => void;
  triggerCorrect: () => void;
};

const GyroSensor = (props: Props) => {
  const SENSITIVITY = {
    pass: -4,
    correct: 4,
  };
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const _subscribe = () => {
    Gyroscope.setUpdateInterval(16);
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    if (gyroData.y < SENSITIVITY.pass) {
      props.triggerPass();
    } else if (gyroData.y > SENSITIVITY.correct) {
      props.triggerCorrect();
    }
  }, [gyroData.y]);

  return null;
};

export default GyroSensor;
