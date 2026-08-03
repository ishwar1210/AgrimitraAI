import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { CustomInput } from '../../components/inputs/CustomInput';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const registerSchema = z.object({
  fullName: z.string().nonempty('Full Name is required'),
  mobileNumber: z.string().nonempty('Mobile Number is required'),
  state: z.string().nonempty('State is required'),
  district: z.string().nonempty('District is required'),
  village: z.string().nonempty('Village is required'),
  address: z.string().nonempty('Address is required'),
  pinCode: z.string().nonempty('Pin Code is required'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      state: '',
      district: '',
      village: '',
      address: '',
      pinCode: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Registration Data:', data);
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A2E26" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>
              Tell us more about you to personalize your experience.
            </Text>
          </View>

          {/* Avatar / Profile Image with Camera Icon */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/images/Profile-icon.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Full Name"
                  placeholder="Ramesh Patil"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.fullName?.message}
                />
              )}
            />

            {/* Mobile Number */}
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Mobile Number"
                  placeholder="9876543210"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.mobileNumber?.message}
                />
              )}
            />

             {/* Address */}
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Address"
                  placeholder="Enter full address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.address?.message}
                />
              )}
            />

            {/* Village */}
            <Controller
              control={control}
              name="village"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Village"
                  placeholder="Enter your village name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.village?.message}
                />
              )}
            />

            {/* District */}
            <Controller
              control={control}
              name="district"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="District"
                  placeholder="Nashik"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.district?.message}
                />
              )}
            />

            {/* State */}
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="State"
                  placeholder="Maharashtra"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.state?.message}
                />
              )}
            />

            {/* Pin Code */}
            <Controller
              control={control}
              name="pinCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Pin Code"
                  placeholder="422001"
                  keyboardType="number-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.pinCode?.message}
                />
              )}
            />

            {/* Save & Continue Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.85}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitBtnText}>Save & Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF5',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.md : SPACING.xs,
    paddingBottom: SPACING.xl,
  },
  backBtn: {
    marginTop: Platform.OS === 'android' ? 16 : 8,
    marginBottom: SPACING.md,
    alignSelf: 'flex-start',
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D211A',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: '#556B61',
    lineHeight: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
    backgroundColor: '#E8F3E8',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0F7038',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  form: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#0F7038',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    elevation: 3,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
});
