import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../theme/theme';
import { Search, ShoppingCart, Bell, Zap, Users, RotateCcw, Heart, Package } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Hostel Mart</Text>
        <View style={styles.topRight}>
          <View style={styles.pointsPill}>
            <Text style={styles.pointsText}>120 pts</Text>
          </View>
          <Bell size={24} color={COLORS.primary} style={{ marginHorizontal: SPACING.sm }} />
          <ShoppingCart size={24} color={COLORS.primary} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.addressBar}>
          <MapPin size={16} color={COLORS.secondary} />
          <Text style={styles.addressText}>Hostel 12, Room 302</Text>
          <View style={styles.primeBadge}>
            <Text style={styles.primeText}>PRIME</Text>
          </View>
        </View>

        {/* Section 1: Banners */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerCarousel}>
          <Banner color="#3D2C8D" title="Exams starting?" subtitle="Get your Exam Kit now!" cta="Shop Now" />
          <Banner color="#FF6B2C" title="Midnight Cravings?" subtitle="SOS Delivery is Live" cta="Order Now" />
        </ScrollView>

        {/* Section 2: Quick Actions */}
        <View style={styles.quickActions}>
          <QuickAction icon={<Zap color={COLORS.error} />} label="SOS" />
          <QuickAction 
            icon={<Users color={COLORS.primary} />} 
            label="Group" 
            onPress={() => navigation.navigate('GroupCart', { roomCode: 'ROOM302' })}
          />
          <QuickAction icon={<RotateCcw color={COLORS.secondary} />} label="Reorder" />
          <QuickAction icon={<Package color="#4CAF50" />} label="Kits" />
          <QuickAction icon={<Heart color="#E91E63" />} label="Wishlist" />
        </View>

        {/* Section 3: Essential Kits */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Essential Kits</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kitsScroll}>
          <KitCard name="Exam Kit" price="₹499" image="https://via.placeholder.com/150" tag="Best for Finals" />
          <KitCard name="Women's Essentials" price="₹899" image="https://via.placeholder.com/150" tag="Discreet Delivery" />
          <KitCard name="New Student Kit" price="₹1499" image="https://via.placeholder.com/150" tag="Must Have" />
        </ScrollView>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <View style={styles.categoriesGrid}>
          <CategoryItem label="Snacks" icon="🍎" />
          <CategoryItem label="Beverages" icon="🥤" />
          <CategoryItem label="Personal Care" icon="🧴" />
          <CategoryItem label="Stationery" icon="✏️" />
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function MapPin({ size, color }) {
  return <Text style={{ color, fontSize: size }}>📍</Text>;
}

function Banner({ color, title, subtitle, cta }) {
  return (
    <View style={[styles.banner, { backgroundColor: color }]}>
      <View>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.bannerBtn}>
          <Text style={styles.bannerBtnText}>{cta}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function QuickAction({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function KitCard({ name, price, image, tag }) {
  return (
    <TouchableOpacity style={styles.kitCard}>
      <Image source={{ uri: image }} style={styles.kitImage} />
      <View style={styles.kitInfo}>
        <Text style={styles.kitTag}>{tag}</Text>
        <Text style={styles.kitName}>{name}</Text>
        <Text style={styles.kitPrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

function CategoryItem({ label, icon }) {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.accent,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    height: 60,
    backgroundColor: COLORS.white,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsPill: {
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  primeBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  primeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bannerCarousel: {
    padding: SPACING.md,
  },
  banner: {
    width: 300,
    height: 140,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginRight: SPACING.md,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  bannerBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.md,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAll: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  kitsScroll: {
    paddingLeft: SPACING.md,
  },
  kitCard: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  kitImage: {
    width: '100%',
    height: 120,
  },
  kitInfo: {
    padding: SPACING.md,
  },
  kitTag: {
    fontSize: 10,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  kitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 2,
  },
  kitPrice: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.sm,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: COLORS.black,
  },
});
