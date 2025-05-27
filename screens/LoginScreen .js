import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { COLORS, icons, images } from "../constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
const demoUser = [
  {
    username: "aref98",
    password: "aref98",
  },
  {
    username: "abdallah98",
    password: "abdallah98",
  },
];
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Username and password are required.",
      });
      return;
    }

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
        navigation.navigate("Home");
      }, 1500); // انتظر التوست ثم انتقل
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid username or password.",
      });
    }
  };
  const handleForgotPassword = () => {
    Toast.show({
      type: "info",
      text1: "Forgot Password",
      text2: "You will be redirected to reset your password.",
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={icons.car_tire}
        resizeMode="contain"
        style={{
          transform: [{ rotate: "-10deg" }, { scaleY: 1 }],
          width: 100,
          height: 100,
          marginVertical: 20,
          tintColor: true ? COLORS.primary : COLORS.secondary,
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

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Toast
        config={{
          success: (props) => (
            <BaseToast {...props} style={{ borderLeftColor: COLORS.primary }} />
          ),
          error: (props) => (
            <ErrorToast {...props} style={{ borderLeftColor: "red" }} />
          ),
          info: (props) => (
            <BaseToast {...props} style={{ borderLeftColor: "blue" }} />
          ),
        }}
      />
    </View>
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
  title: {
    fontSize: 28,
    color: "#ffffff",
    marginBottom: 40,
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
