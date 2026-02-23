import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiGet } from "../api/apiClient";

const { width } = Dimensions.get("window");

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  isFavorite: boolean;
};

const banners = [
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505",
];

const products: Product[] = [
  {
    id: "1",
    title: "iPhone 15 Pro",
    description: "Latest Apple smartphone",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484e5c9f",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Nike Shoes",
    description: "Comfortable running shoes",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    isFavorite: true,
  },
];

export default function HomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
const [productss, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await apiGet<Product[]>("products");
      setProducts(data);
    }

    loadProducts();
  }, []);
  // Auto scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);
console.log('====================================');
console.log("product: ", productss);
console.log('====================================');
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 30 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.username}>Bunheng 👋</Text>
          </View>
        </View>

        <Ionicons name="notifications-outline" size={24} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Search product..."
          style={styles.searchInput}
        />
      </View>

      {/* BANNER SLIDER */}
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.banner} />
        )}
      />

      {/* PRODUCTS */}
      <Text style={styles.sectionTitle}>Popular Products</Text>

      <View style={styles.productContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price}</Text>

              <TouchableOpacity>
                <Ionicons
                  name={
                    item.isFavorite ? "heart" : "heart-outline"
                  }
                  size={20}
                  color={item.isFavorite ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // dark mode light mode
    backgroundColor: "#e9e9e9",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  welcome: {
    fontSize: 14,
    color: "#777",
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },

  searchInput: {
    flex: 1,
  },

  banner: {
    width: width - 32,
    height: 150,
    borderRadius: 15,
    marginRight: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },

  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fafafa",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },

  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },

  productTitle: {
    fontWeight: "bold",
    marginTop: 8,
  },

  productDesc: {
    fontSize: 12,
    color: "#666",
    marginVertical: 4,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },

  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});