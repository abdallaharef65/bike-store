/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  FlatList,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Appbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, icons, images } from "../constants";

import BikeData from "./BikeData.json";
const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bikeData, setBikeData] = useState(BikeData);
  const [originalData, setOriginalData] = useState(BikeData);
  const HeaderHomePages = () => {
    const _handleSearch = () => {
      if (searchQuery.trim() === "") {
        // في حالة أن المستخدم مسح البحث نرجع كل العناصر
        setBikeData(originalData);
      } else {
        const filtered = originalData.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBikeData(filtered);
      }
    };

    return (
      <>
        <LinearGradient
          colors={["#2b355b", "#2e366f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Appbar.Header
            style={[
              styles.HeaderContainer,
              {
                backgroundColor: "transparent",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <Appbar.Action
              icon={icons.logout}
              color={COLORS.white}
              style={{ ...styles.icon }}
              size={30}
              onPress={() => navigation.navigate("Login")}
            />

            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
              />

              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery("");
                    setBikeData(originalData);
                  }}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* زر البحث */}
            <Appbar.Action
              icon={icons.search}
              color={COLORS.white}
              style={styles.icon}
              onPress={_handleSearch}
            />
          </Appbar.Header>
        </LinearGradient>
      </>
    );
  };

  const toggleLike = (id) => {
    const updated = bikeData.map((product) =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setBikeData(updated);
  };

  const ProductCard = ({ item }) => {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <LinearGradient
          colors={["rgba(58,91,142,0.6)", "rgba(41,62,117,0.6)"]}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Favorite Icon */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetails", { data: item })
            }
          >
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => toggleLike(item.id)}
            >
              <Image
                source={icons.like}
                // style={styles.heartIcon}
                style={[
                  styles.heartIcon,
                  item.isLiked && styles.activeHeartIcon,
                ]}
              />
            </TouchableOpacity>

            {/* Product Image */}
            <Image
              source={{ uri: item.image[0] }}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Product Info */}
            <Text style={styles.subtitle}>Road Helmet</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>
        <View style={styles.HeaderPages}>{HeaderHomePages()}</View>

        <FlatList
          data={bikeData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }} // توزيع متساوي
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={styles.productsWrapper}
        />
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  HeaderPages: { marginBottom: 20 },
  background: {
    flex: 1,
  },

  ///////////////////////////
  HeaderContainer: {
    marginTop: -20,
    // marginVertical:20,
    flexDirection: "row",
    // height: 20,
    paddingHorizontal: 8,
  },
  icon: {
    width: 40,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#ffffff33",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
  },
  input: {
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  /////////////////////////
  card: {
    borderRadius: 20,
    padding: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    width: "48%",
    marginBottom: 15,
    // marginHorizontal: 4, ❌ أزل هذا السطر
  },

  favoriteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: "70%",
    height: 70,
    marginBottom: 16,
    alignSelf: "center",
    marginLeft: -10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    color: "#ccc",
    fontSize: 16,
  },
  heartIcon: {
    // marginTop: -20,
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  activeHeartIcon: {
    tintColor: "red",
  },

  productsWrapper: {
    paddingHorizontal: 4, // تباعد جانبي خارجي
    paddingBottom: 10,
  },

  searchContainer: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#ffffff33",
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 8,
    padding: 4,
    backgroundColor: "#ffffff33",
    borderRadius: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Home;
