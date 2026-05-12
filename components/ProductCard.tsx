// components/ProductCard.tsx
import { useTheme } from "@/app/context/ThemeContext";
import { Product } from "@/app/types/Product";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { 
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
    }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.productImage}
        />

        <TouchableOpacity style={[styles.favoriteBtn, { backgroundColor: colors.favoriteBtnBg }]}>
          <Ionicons 
            name="heart-outline" 
            size={18} 
            color={colors.favoriteIcon} 
          />
        </TouchableOpacity>

        <View style={[styles.categoryBadge, { backgroundColor: colors.badgeBg }]}>
          <Text style={styles.categoryText}>
            {item.category.name}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        <Text style={[styles.price, { color: colors.text }]}>
          ${item.price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    marginBottom: 16,
    marginHorizontal: 6,
    overflow: "hidden",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageContainer: { position: "relative" },
  productImage: { width: "100%", height: 150 },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
    elevation: 4,
  },
  categoryBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  info: { padding: 12 },
  title: { fontWeight: "bold", fontSize: 15, marginBottom: 4 },
  description: { fontSize: 12, marginBottom: 8 },
  price: { fontSize: 16, fontWeight: "bold" },
});