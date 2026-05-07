import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSocket } from '../../context/SocketContext';
import { COLORS, SPACING, BORDER_RADIUS } from '../../theme/theme';
import { Users, Timer, ShoppingCart } from 'lucide-react-native';

export default function GroupCartScreen({ route }) {
  const { roomCode } = route.params || { roomCode: 'ROOM123' };
  const socket = useSocket();
  const [cart, setCart] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (!socket) return;

    // Join the room
    socket.emit('join_room', roomCode);

    // Listen for updates
    socket.on('cart_updated', (updatedCart) => {
      console.log('Cart updated:', updatedCart);
      setCart(updatedCart);
    });

    socket.on('order_placed', (order) => {
      alert('Order has been placed by your roommate!');
    });

    return () => {
      socket.off('cart_updated');
      socket.off('order_placed');
    };
  }, [socket, roomCode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Users size={24} color={COLORS.primary} />
          <Text style={styles.title}>Group Cart: {roomCode}</Text>
        </View>
        <View style={styles.timerBadge}>
          <Timer size={16} color={COLORS.error} />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      {!cart ? (
        <View style={styles.emptyState}>
          <ShoppingCart size={64} color={COLORS.lightGrey} />
          <Text style={styles.emptyText}>Waiting for roommates to add items...</Text>
        </View>
      ) : (
        <FlatList
          data={cart.members}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <View style={styles.memberSection}>
              <Text style={styles.memberName}>Roommate {item.userId.substring(0, 4)}</Text>
              {item.items.map((prod, idx) => (
                <View key={idx} style={styles.productRow}>
                  <Text style={styles.productName}>{prod.name}</Text>
                  <Text style={styles.productPrice}>₹{prod.price} x {prod.quantity}</Text>
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Pay My Share</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  timerText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  listContent: {
    padding: SPACING.md,
  },
  memberSection: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.md,
  },
  memberName: {
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    color: COLORS.primary,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    color: COLORS.black,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.grey,
  },
  checkoutBtn: {
    margin: SPACING.md,
    backgroundColor: COLORS.secondary,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
