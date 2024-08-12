import { GYRO_STATES, SENSITIVITY } from "@/constants";
import { Gyroscope } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";
import { useEffect, useState } from "react";

const useGyroSensor = () => {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroState, setGyroState] = useState(GYRO_STATES.default);
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
    if (gyroEnabled) _subscribe();
    else _unsubscribe();
    return () => _unsubscribe();
  }, [gyroEnabled]);

  useEffect(() => {
    if (gyroData.y < SENSITIVITY.pass) {
      setGyroState(GYRO_STATES.up);
    } else if (gyroData.y > SENSITIVITY.correct) {
      setGyroState(GYRO_STATES.down);
    } else {
      setGyroState(GYRO_STATES.default);
    }
  }, [gyroData.y]);

  return { setGyroEnabled, gyroState };
};

export default useGyroSensor;
