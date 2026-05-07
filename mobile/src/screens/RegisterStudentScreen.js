import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../theme/theme';
import { User, School, Home, MapPin, Users } from 'lucide-react-native';

export default function RegisterStudentScreen({ route, navigation }) {
  const { phone } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    hostelName: '',
    roomNumber: '',
    gender: 'MALE',
  });

  const handleRegister = () => {
    // Logic to register
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Finish Signing Up</Text>
        <Text style={styles.subtitle}>Tell us a bit more about you to start ordering.</Text>

        <View style={styles.form}>
          <InputField 
            label="Full Name" 
            placeholder="John Doe" 
            icon={<User size={20} color={COLORS.grey} />} 
            value={formData.name}
            onChangeText={(val) => setFormData({...formData, name: val})}
          />
          
          <InputField 
            label="College Name" 
            placeholder="IIT Bombay" 
            icon={<School size={20} color={COLORS.grey} />} 
            value={formData.collegeName}
            onChangeText={(val) => setFormData({...formData, collegeName: val})}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: SPACING.md }}>
              <InputField 
                label="Hostel Name" 
                placeholder="Hostel 12" 
                icon={<Home size={20} color={COLORS.grey} />} 
                value={formData.hostelName}
                onChangeText={(val) => setFormData({...formData, hostelName: val})}
              />
            </View>
            <View style={{ width: 100 }}>
              <InputField 
                label="Room #" 
                placeholder="302" 
                icon={<MapPin size={20} color={COLORS.grey} />} 
                value={formData.roomNumber}
                onChangeText={(val) => setFormData({...formData, roomNumber: val})}
              />
            </View>
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {['MALE', 'FEMALE', 'OTHER'].map((g) => (
              <TouchableOpacity 
                key={g} 
                style={[styles.genderButton, formData.gender === g && styles.genderButtonActive]}
                onPress={() => setFormData({...formData, gender: g})}
              >
                <Text style={[styles.genderText, formData.gender === g && styles.genderTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Complete Registration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InputField({ label, placeholder, icon, value, onChangeText }) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  genderButton: {
    flex: 1,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  genderButtonActive: {
    backgroundColor: COLORS.primary,
  },
  genderText: {
    color: COLORS.black,
    fontWeight: '500',
  },
  genderTextActive: {
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.secondary,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
