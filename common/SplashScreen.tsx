// src/components/SplashScreen/SplashScreen.js
import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

type SplashScreenComponentProps = {
  onAnimationEnd: () => void;
};
const SplashScreenComponent: React.FC<SplashScreenComponentProps> = ({
  onAnimationEnd,
}) => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      onAnimationEnd();
    }, 5000); // Adjust the duration as needed
  }, []);

  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require('../assets/fireworks.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      /> */}
      <Image source={require("../assets/splashLogo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE3D5", // Background color
  },
  backgroundAnimation: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreenComponent;
