import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { CustomInput } from '../../components/inputs/CustomInput';
import { CustomButton } from '../../components/buttons/CustomButton';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Zod Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Mobile Number is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(clearError());
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigation.replace('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Welcome')}
        >
          <Ionicons name="arrow-back" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/Loginimage.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>
            Sign in to access your AgriMitra account
          </Text>
        </View>

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.globalErrorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Mobile Number"
                placeholder="9*******0"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Password"
                placeholder="Enter your password"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <CustomButton
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.submitBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    padding: SPACING.xs,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBackground,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  globalErrorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  submitBtn: {
    marginTop: SPACING.md,
  },
});
