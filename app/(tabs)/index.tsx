// app/index.tsx (or wherever HomeScreen lives)
import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiGet } from "../api/apiClient";
import { useTheme } from "../context/ThemeContext";
import type { Product } from "../types/Product";

const { width } = Dimensions.get("window");

const banners = [
  require("@/assets/images/banner.avif"),
  require("../assets/images/banner.png"), 
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505",
];

export default function HomeScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const bannerRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await apiGet<Product[]>("products");
      setProducts(data);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      bannerRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={[styles.welcome, { color: colors.textMuted }]}>
                    Welcome
                  </Text>
                  <Text style={[styles.username, { color: colors.text }]}>
                    Bunheng 👋
                  </Text>
                </View>
              </View>

              <View style={styles.headerActions}>
                {/* 🌓 Theme Toggle */}
                <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                  <Ionicons 
                    name={isDark ? "sunny-outline" : "moon-outline"} 
                    size={24} 
                    color={colors.icon} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.themeToggle}>
                  <Ionicons name="notifications-outline" size={24} color={colors.icon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* SEARCH */}
            <View style={[styles.searchContainer, { backgroundColor: colors.searchBg }]}>
              <Ionicons name="search-outline" size={20} color={colors.textMuted} />
              <TextInput
                placeholder="Search product..."
                placeholderTextColor={colors.textMuted}
                style={[styles.searchInput, { color: colors.text }]}
              />
            </View>

            {/* BANNERS */}
            <FlatList
              ref={bannerRef}
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.banner}
                  contentFit="cover"
                />
              )}
            />

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Popular Products
            </Text>
          </>
        }
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
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
  welcome: { fontSize: 14 },
  username: { fontSize: 18, fontWeight: "bold" },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 16 },
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
});