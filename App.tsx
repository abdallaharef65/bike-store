/* eslint-disable */
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoginComponent from "./screens/LoginScreen ";
import ProductDetails from "./screens/ProductDetails";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./navigation/Tabs";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login"
          >
            {/* {!isLogin ? (
            ) : (
            )} */}
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Home" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
