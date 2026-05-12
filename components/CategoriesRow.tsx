import { Category } from "@/app/types/Product";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";


interface Props {
  categories: Category[];
  onSelect?: (slug: string) => void; // 👈 pass slug back
  selectedSlug?: string; // 👈 optional highlight
}

export default function CategoriesRow({
  categories,
  onSelect,
  selectedSlug,
}: Props) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
  const isActive = selectedSlug === item.slug;

  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      activeOpacity={0.8}
      onPress={() => onSelect?.(item.slug)}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : null}

      <Text
        numberOfLines={1}
        style={[styles.text, isActive && styles.activeText]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeCard: {
    backgroundColor: "#6C63FF",
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
});