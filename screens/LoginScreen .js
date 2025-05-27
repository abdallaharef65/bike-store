import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { COLORS, icons } from "../constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const demoUser = [
  { username: "aref98", password: "aref98" },
  { username: "abdallah98", password: "abdallah98" },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
    rotation.setValue(0);
  };

  useEffect(() => {
    if (isLoading) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [isLoading]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Username and password are required.",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userExists = demoUser.find(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        Toast.show({
          type: "success",
          text1: "Login Success",
          text2: "Welcome!",
        });

        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate("Home");
        }, 1500);
      } else {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid username or password.",
        });
      }
    }, 1000);
  };

  const handleForgotPassword = () => {
    Toast.show({
      type: "info",
      text1: "Forgot Password",
      text2: "You will be redirected to reset your password.",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#0d162c" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.Image
          source={icons.car_tire}
          resizeMode="contain"
          style={{
            transform: [
              { rotate: rotateInterpolate },
              { rotate: "-10deg" },
              { scaleY: 1 },
            ],
            width: 100,
            height: 100,
            marginVertical: 20,
            tintColor: COLORS.primary,
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Toast
          config={{
            success: (props) => (
              <BaseToast
                {...props}
                style={{ borderLeftColor: COLORS.primary }}
              />
            ),
            error: (props) => (
              <ErrorToast {...props} style={{ borderLeftColor: "red" }} />
            ),
            info: (props) => (
              <BaseToast {...props} style={{ borderLeftColor: "blue" }} />
            ),
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b355b",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
