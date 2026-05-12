import { apiGet } from "@/app/api/apiClient";
import { useTheme } from "@/app/context/ThemeContext";
import type { Category, Product } from "@/app/types/Product";
import CategoriesRow from "@/components/CategoriesRow";
import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState, } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  { type: "local", source: require("@/assets/banner2.jpg") },
  { type: "local", source: require("@/assets/banner.png") },
  { type: "remote", source: "https://images.unsplash.com/photo-1607083206968-13611e3d76db" },
  { type: "remote", source: "https://images.yourstory.com/cs/wordpress/2015/03/discount.jpg" },
];

export default function HomeScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const bannerRef = useRef<FlatList>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [LIMIT] = useState(5);
  // --- Load categories
  useEffect(() => {
    async function loadCategories() {
      const data = await apiGet<Category[]>("categories");
      const allCategory: Category = {
        id: 0,
        name: "All",
        slug: "all",
        image: "",
        creationAt: "",
        updatedAt: "",
      };
      setCategories([allCategory, ...data]);
    }
    loadCategories();
  }, []);

  // --- Load products depending on category
  const loadProducts = useCallback(
    async (categorySlug: string, offsetParam = 0, reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        let data: Product[] = [];

        if (categorySlug === "all") {
          // ✅ Correct pagination
          const url = `products?offset=${offsetParam}&limit=${LIMIT}`;
          data = await apiGet<Product[]>(url);

          if (reset) {
            setProducts(data);
          } else {
            setProducts((prev) => [...prev, ...data]);
          }

          // ✅ If less than limit → no more data
          setHasMore(data.length === LIMIT);

          // ✅ Always increment by LIMIT
          setOffset(offsetParam + LIMIT);
        } else {
          // ✅ Correct category filter
          const url = `products/?categorySlug=${categorySlug}`;
          data = await apiGet<Product[]>(url);

          setProducts(data);
          setHasMore(false);
          setOffset(0);
        }
      } catch (error) {
        console.log("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    },
    [LIMIT, loading]
  );

  // --- Fetch products when category changes
  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    loadProducts(selectedCategory, 0, true);
  }, [selectedCategory, loadProducts]);

  // --- Handle category select
  function handleFilter(slug: string) {
    setSelectedCategory(slug);
  }
  // --- Banner auto scroll
  const [, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // --- Render footer for loading more
  const renderFooter = () =>
    loading && selectedCategory === "all" ? (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    ) : null;

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
                  source={{ uri: "https://i.pravatar.cc/150" }}
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

            {/* CATEGORIES */}
            <CategoriesRow
              categories={categories}
              selectedSlug={selectedCategory}
              onSelect={handleFilter}
            />

            {/* BANNERS */}
            <FlatList
              ref={bannerRef}
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                const imageSource = item.type === "local" ? item.source : { uri: item.source };
                return <Image source={imageSource} style={styles.banner} contentFit="cover" />;
              }}
            />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Products</Text>
          </>
        }
        renderItem={({ item }) => <ProductCard item={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (!loading && hasMore && selectedCategory === "all") {
            loadProducts("all", offset);
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 40, marginBottom: 20 },
  profileContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  welcome: { fontSize: 14 },
  username: { fontSize: 18, fontWeight: "bold" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  themeToggle: { padding: 8, borderRadius: 20 },
  searchContainer: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 12, marginBottom: 20, gap: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  banner: { width: width - 32, height: 150, borderRadius: 15, marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
});