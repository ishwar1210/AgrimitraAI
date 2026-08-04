import React, { useState, useRef } from 'react';
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
  TextInput,
  ActivityIndicator,
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

type RoleType = 'farmer' | 'consultant' | 'nursery';

const profileSchema = z.object({
  fullName: z.string().nonempty('Full Name is required'),
  state: z.string().nonempty('State is required'),
  district: z.string().nonempty('District is required'),
  village: z.string().nonempty('Village is required'),
  address: z.string().nonempty('Address is required'),
  pinCode: z.string().nonempty('Pin Code is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  
  // 4-digit OTP state
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const otpInputs = useRef<Array<TextInput | null>>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      state: '',
      district: '',
      village: '',
      address: '',
      pinCode: '',
    },
  });

  const ROLES = [
    {
      id: 'farmer' as RoleType,
      title: 'Farmer',
      subtitle: 'Manage your crops & get AI advice',
      image: require('../../assets/images/farmer.png'),
    },
    {
      id: 'consultant' as RoleType,
      title: 'Consultant',
      subtitle: 'Provide expert agricultural guidance',
      image: require('../../assets/images/Consultant.png'),
    },
    {
      id: 'nursery' as RoleType,
      title: 'Nursery',
      subtitle: 'Sell seeds, plants & farm products',
      image: require('../../assets/images/Nurseri.png'),
    },
  ];

  const getRoleImage = () => {
    const roleObj = ROLES.find((r) => r.id === selectedRole);
    return roleObj ? roleObj.image : ROLES[0].image;
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      navigation.goBack();
    }
  };

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.trim().length < 10) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    setMobileError('');
    setStep(3);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next box
    if (text && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setOtpError('Please enter complete 4-digit OTP');
      return;
    }
    setOtpError('');
    setIsVerifying(true);

    // Show loading animation on the 4 circle boxes, then move to step 4
    setTimeout(() => {
      setIsVerifying(false);
      setStep(4);
    }, 1500);
  };

  const onSubmitFinalProfile = (data: ProfileFormData) => {
    console.log('Final Registration Data:', {
      role: selectedRole,
      mobileNumber,
      ...data,
    });
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
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#1A2E26" />
          </TouchableOpacity>

          {/* ================= STEP 1: CHOOSE YOUR ROLE ================= */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Choose Your Role</Text>
                <Text style={styles.subtitle}>
                  Select your role to get started with AgriMitra.
                </Text>
              </View>

              <View style={styles.roleList}>
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <TouchableOpacity
                      key={role.id}
                      style={[
                        styles.roleCard,
                        isSelected && styles.selectedRoleCard,
                      ]}
                      activeOpacity={0.85}
                      onPress={() => setSelectedRole(role.id)}
                    >
                      <Image
                        source={role.image}
                        style={styles.roleImage}
                        resizeMode="cover"
                      />

                      <View style={styles.roleTextContainer}>
                        <Text
                          style={[
                            styles.roleTitle,
                            isSelected && styles.selectedRoleTitle,
                          ]}
                        >
                          {role.title}
                        </Text>
                        <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
                      </View>

                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.selectedRadioCircle,
                        ]}
                      >
                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={16}
                            color="#FFFFFF"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  !selectedRole && styles.disabledBtn,
                ]}
                disabled={!selectedRole}
                activeOpacity={0.85}
                onPress={() => setStep(2)}
              >
                <Text style={styles.submitBtnText}>Next</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color="#FFFFFF"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* ================= STEP 2: ENTER MOBILE NUMBER ================= */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              {/* Top Banner Image corresponding to chosen role */}
              <View style={styles.bannerContainer}>
                <Image
                  source={getRoleImage()}
                  style={styles.bannerImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.header}>
                <Text style={styles.title}>Enter Mobile Number</Text>
                <Text style={styles.subtitle}>
                  We will send you a 4-digit verification code.
                </Text>
              </View>

              <View style={styles.form}>
                <CustomInput
                  label="Mobile Number"
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(val) => {
                    setMobileNumber(val);
                    if (mobileError) setMobileError('');
                  }}
                  value={mobileNumber}
                  error={mobileError}
                />

                <TouchableOpacity
                  style={styles.submitBtn}
                  activeOpacity={0.85}
                  onPress={handleSendOtp}
                >
                  <Text style={styles.submitBtnText}>Send OTP</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFFFFF"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ================= STEP 3: OTP VERIFICATION ================= */}
          {step === 3 && (
            <View style={styles.stepContainer}>
              {/* GIF Animation for OTP Verification */}
              <View style={styles.bannerContainer}>
                <Image
                  source={require('../../assets/images/OTPVerification.gif')}
                  style={styles.bannerImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.header}>
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.subtitle}>
                  Enter the 4-digit verification code sent to{'\n'}
                  <Text style={styles.highlightMobile}>+91 {mobileNumber}</Text>
                </Text>
              </View>

              {/* 4-digit OTP Boxes / Circular Loading Animation */}
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      isVerifying ? styles.otpCircleLoading : (digit ? styles.otpBoxFilled : null),
                    ]}
                  >
                    {isVerifying ? (
                      <ActivityIndicator size="small" color="#0F7038" />
                    ) : (
                      <TextInput
                        ref={(ref) => {
                          otpInputs.current[index] = ref;
                        }}
                        style={styles.otpInputText}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleOtpKeyPress(e, index)}
                      />
                    )}
                  </View>
                ))}
              </View>

              {!!otpError && <Text style={styles.errorText}>{otpError}</Text>}

              {!isVerifying && (
                <TouchableOpacity
                  style={styles.submitBtn}
                  activeOpacity={0.85}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.submitBtnText}>Verify & Proceed</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFFFFF"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* ================= STEP 4: COMPLETE YOUR PROFILE ================= */}
          {step === 4 && (
            <View style={styles.stepContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <Text style={styles.subtitle}>
                  Tell us more about you to personalize your experience.
                </Text>
              </View>

              {/* Profile Avatar */}
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../../assets/images/Profile-icon.png')}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.cameraBadge}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="camera" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Fields (Mobile Number excluded) */}
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
                  onPress={handleSubmit(onSubmitFinalProfile)}
                >
                  <Text style={styles.submitBtnText}>Save & Continue</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFFFFF"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  stepContainer: {
    width: '100%',
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
  highlightMobile: {
    fontWeight: '700',
    color: '#0F7038',
  },
  bannerContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  roleList: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: '#E2EFE7',
    elevation: 2,
    shadowColor: '#0F7038',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  selectedRoleCard: {
    borderColor: '#0F7038',
    backgroundColor: '#F0F9F3',
  },
  roleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D211A',
    marginBottom: 2,
  },
  selectedRoleTitle: {
    color: '#0F7038',
  },
  roleSubtitle: {
    fontSize: 12,
    color: '#667085',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D5DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioCircle: {
    borderColor: '#0F7038',
    backgroundColor: '#0F7038',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  otpBoxFilled: {
    borderColor: '#0F7038',
    backgroundColor: '#F0F9F3',
  },
  otpCircleLoading: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: '#0F7038',
    backgroundColor: '#E8F5E9',
    elevation: 4,
  },
  otpInputText: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#0D211A',
  },
  errorText: {
    color: '#D92D20',
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginBottom: SPACING.md,
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
  disabledBtn: {
    backgroundColor: '#94C7A7',
    elevation: 0,
    shadowOpacity: 0,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
});
