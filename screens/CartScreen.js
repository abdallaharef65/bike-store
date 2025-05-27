import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLORS, icons } from "../constants";

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem("cart");
          if (storedCart !== null) {
            const parsedCart = JSON.parse(storedCart);
            const updatedCart = parsedCart.filter(Boolean).map((item) => ({
              ...item,
              quantity: item.quantity ?? 1,
            }));
            setCartItems(updatedCart);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
      fetchCart();
    }, [])
  );

  const updateQuantity = async (id, change) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);

      AsyncStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const applyPromoCode = () => {
    const trimmedCode = promoCode.trim().toUpperCase();
    if (trimmedCode === "AREF10") {
      setDiscount(0.1);
    } else if (trimmedCode === "AREF20") {
      setDiscount(0.2);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return (total - total * discount).toFixed(2);
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.header}>My Shopping Cart</Text>

        {/* Render items manually instead of FlatList */}
        {cartItems.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.image[0] }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButtonPlus}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantityCount}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButtonMinus}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Promo Code Section */}
        <View style={styles.promoContainer}>
          <TextInput
            placeholder="Enter Promo Code"
            placeholderTextColor="#aaa"
            value={promoCode}
            onChangeText={setPromoCode}
            style={styles.promoInput}
          />
          <TouchableOpacity style={styles.promoButton} onPress={applyPromoCode}>
            <Text style={styles.promoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Total and Checkout */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.checkoutText}>Go to Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 16,

    backgroundColor: "#0d162c",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 16,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1e2b4d",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "#58a6ff",
    fontSize: 14,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quantityButtonPlus: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityButtonMinus: {
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityCount: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 6,
  },
  promoContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#1e2b4d",
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    marginRight: 10,
  },
  promoButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  promoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#2b3b61",
    paddingTop: 5,
    marginVertical: 30,
  },
  totalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "flex-end",
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
