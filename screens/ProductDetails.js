import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { COLORS, icons } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
const { width } = Dimensions.get("window");

const ProductDetailScreen = ({ navigation, route }) => {
  console.log("route >>>", route.params.data);
  const product = route.params.data;

  // Customize the base toast
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: COLORS.primary, // Green border
          //backgroundColor: "#3D6DFF", // Light green background
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#155724", // Dark green text
        }}
        text2Style={{
          fontSize: 14,
          color: "#155724",
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#dc3545",
          //  backgroundColor: "#f8d7da"
        }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#721c24" }}
        text2Style={{ fontSize: 14, color: "#721c24" }}
      />
    ),

    info: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#17a2b8",
          // backgroundColor: "#d1ecf1",
        }}
        text1Style={{ fontSize: 16, fontWeight: "bold", color: "#0c5460" }}
        text2Style={{ fontSize: 14, color: "#0c5460" }}
      />
    ),
  };

  const handleAddToCart = async (product) => {
    if (!product || !product.id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid product ❌",
      });
      return;
    }

    try {
      const existingCart = await AsyncStorage.getItem("cart");
      let cart = [];

      if (existingCart) {
        const parsed = JSON.parse(existingCart);
        cart = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
      }

      const isAlreadyInCart = cart.some((item) => item.id === product.id);

      if (!isAlreadyInCart) {
        const updatedCart = [...cart, product];
        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        Toast.show({
          type: "success",
          text1: "Added to Cart",
          text2: "Product added successfully 🛒",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Already in Cart",
          text2: "This product is already in your cart.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Error while adding product to cart ❌",
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Section */}

      <ImageBackground
        source={require("../assets/Background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <Toast config={toastConfig} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.productName}>{product.title}</Text>

        {/* Product Image Carousel */}
        <View style={styles.swiperContainer}>
          <Swiper
            showsPagination
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            autoplay
            autoplayTimeout={3}
          >
            {product.image.map((imgUrl, index) => (
              <Image
                key={index}
                source={{ uri: imgUrl }}
                style={styles.productImage}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        </View>
      </ImageBackground>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Specification</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descTitle}>{product.title}</Text>
          <Text style={styles.descText}>{product.description}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.rating}>
            Rating: ⭐ {product.rating.rate} ({product.rating.count})
          </Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.priceText}>$ {product.price.toFixed(2)}</Text>

        <TouchableOpacity onPress={() => handleAddToCart(product)}>
          <LinearGradient
            colors={["#5CD5FF", "#3D6DFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f111a",
  },
  topSection: {
    flex: 0.5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    // paddingTop: 30,
    // paddingHorizontal: 20,
  },

  productName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 30,
  },

  paginationDots: {
    flexDirection: "row",
    marginTop: 20,
  },

  bottomSection: {
    flex: 0.5,
    padding: 20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#1a1b2d",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  tabText: {
    color: "#777",
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: "#2c2e45",
  },
  activeTabText: {
    color: "#3b8beb",
    fontWeight: "bold",
  },
  descriptionContainer: {
    flex: 1,
  },
  descTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  descText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  category: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 4,
  },
  rating: {
    color: "#aaa",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  price: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  cartButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  //////////////////////////////////
  swiperContainer: {
    height: 260,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },

  activeDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  productImage: {
    width: "100%",
    height: 180,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    // fontSize: 20,
    // color: "#fff",
  },
  background: {
    flex: 0.7,
  },

  //////////////
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#1c2230",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  priceText: {
    color: "#5CD5FF",
    fontSize: 20,
    fontWeight: "600",
  },

  addToCartButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  addToCartText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
