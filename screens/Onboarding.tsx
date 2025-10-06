
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier
} from 'firebase/auth';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Firebase phone verification
  const sendPhoneVerification = async () => {
    try {
      // @ts-ignore: RecaptchaVerifier in Expo web environment
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(id);
      setStep(4);
    } catch (err: any) {
      console.log('Phone verification error:', err.message);
    }
  };

  const verifyOtp = async () => {
    if (!verificationId) return;
    const credential = PhoneAuthProvider.credential(verificationId, otp.join(''));
    try {
      await signInWithCredential(auth, credential);
      onComplete();
    } catch (err: any) {
      console.log('OTP verification error:', err.message);
    }
  };

  // Firebase email signup
  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onComplete();
    } catch (err: any) {
      console.log('Email signup error:', err.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <ThemeToggle />
            <Image source={require('figma:asset/951d7b6bc26bc5d785c229897ede74f87b9f4871.png')} style={styles.logo} />
            <Text style={styles.appName}>NdalaFlow</Text>
            <Text>Yendetsani ndalama zanu molingalira</Text>
            <Text>Smart budgeting for modern Malawians</Text>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.button}>
              <Text>Sign up with Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(3)} style={styles.outlineButton}>
              <Text>Sign up with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onComplete}>
              <Text>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text>Enter Phone Number</Text>
            <TextInput
              placeholder="0881 234 567"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TouchableOpacity onPress={sendPhoneVerification} disabled={phoneNumber.length < 10} style={styles.button}>
              <Text>Send Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)}>
              <Text>Back</Text>
            </TouchableOpacity>
            <View id="recaptcha-container" />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text>Create Account</Text>
            <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleEmailSignup} style={styles.button}>
              <Text>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text>Enter Verification Code</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
              ))}
            </View>
            <TouchableOpacity onPress={verifyOtp} disabled={otp.some((d) => !d)} style={styles.button}>
              <Text>Verify & Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Resend Code</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={[styles.container, { backgroundColor: colors.background }]}>{renderStep()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  stepContainer: { alignItems: 'center' },
  logo: { width: 128, height: 128 },
  appName: { fontSize: 28 },
  button: { padding: 16, backgroundColor: '#00796B', borderRadius: 16, marginVertical: 8 },
  outlineButton: { padding: 16, borderWidth: 2, borderColor: '#00796B', borderRadius: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 8, marginVertical: 8, width: 200, textAlign: 'center' },
  otpContainer: { flexDirection: 'row', marginVertical: 16 },
  otpInput: { borderWidth: 1, borderRadius: 8, width: 40, height: 40, textAlign: 'center', marginHorizontal: 4 },
});
