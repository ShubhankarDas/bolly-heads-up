import { useEffect } from "react";

import * as ScreenOrientation from "expo-screen-orientation";

const useLandscapeMode = () => {
  useEffect(() => {
    const setLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    };

    const unsetLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      );
    };

    setLandscape();

    return () => {
      unsetLandscape();
    };
  }, []);

  return null;
};

export default useLandscapeMode;
