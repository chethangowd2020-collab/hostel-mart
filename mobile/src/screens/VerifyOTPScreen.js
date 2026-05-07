import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';
import { ShieldCheck, ArrowRight } from 'lucide-react-native';

export default function VerifyOTPScreen({ route, navigation }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Logic to verify OTP
    // For now, if new user, go to Registration
    navigation.navigate('RegisterStudent', { phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.tagline}>Enter the 6-digit code sent to {phone}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ShieldCheck size={20} color={COLORS.grey} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="0 0 0 0 0 0"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              letterSpacing={10}
              textAlign="center"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify & Continue</Text>
            <ArrowRight size={20} color={COLORS.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Didn't receive code? Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  resendButton: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  resendText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
