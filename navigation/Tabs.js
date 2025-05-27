import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import CartScreen from "../screens/CartScreen";
import { COLORS, icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
const Tab = createBottomTabNavigator();

const TABS = [
  { name: "Home", icon: icons.store, component: Home },
  { name: "Like", icon: icons.map, component: Home },
  { name: "Cart", icon: icons.cart, component: CartScreen },
  { name: "User", icon: icons.user, component: Home },
  { name: "Search", icon: icons.doc, component: Home },
  // { name: "Salad", icon: icons.salad },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animatedValues = useRef(
    state.routes.map((_, i) => new Animated.Value(i === state.index ? -20 : 0))
  ).current;

  useEffect(() => {
    animatedValues.forEach((val, i) => {
      Animated.timing(val, {
        toValue: i === state.index ? -25 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index]);

  return (
    <LinearGradient
      colors={["#2b355b", "#2e366f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const icon = TABS[index].icon;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableWithoutFeedback key={index} onPress={onPress}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    top: animatedValues[index],
                  },
                ]}
              >
                <LinearGradient
                  colors={[
                    isFocused ? "#39b1ea" : "transparent",
                    isFocused ? "#4380ee" : "transparent",
                  ]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{
                    borderRadius: isFocused ? 15 : 0,
                    // transform:skew(20deg,0)
                    transform: [{ rotate: "-10deg" }, { scaleY: 0.9 }],
                  }}
                >
                  <View
                    style={{
                      width: 75,
                      height: 55,
                      // tintColor: isFocused ? COLORS.white : COLORS.secondary,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={icon}
                      resizeMode="contain"
                      style={{
                        // paddingHorizontal: 40,
                        transform: [{ rotate: "10deg" }, { scaleY: 1 }],
                        width: 25,
                        height: 25,
                        tintColor: isFocused ? COLORS.white : COLORS.secondary,
                      }}
                    />
                  </View>
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {TABS.map((tab, index) => (
        <Tab.Screen key={index} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "transparent",
    paddingHorizontal: 10,

  },
  iconContainer: {
    width: 50,
    height: 50,
    // borderRadius: 25,
    // backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 5,
  },
});

export default Tabs;
