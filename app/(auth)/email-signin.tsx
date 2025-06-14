import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EmailSignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignIn = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        setError("Further steps required. Check your email.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Sign in failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.loginSection, { marginTop: 80 }]}> 
        <Text style={{ color: COLORS.primary, fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>Sign in with Email</Text>
        <TextInput
          style={{
            backgroundColor: COLORS.surfaceLight,
            color: COLORS.white,
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            width: "100%",
            maxWidth: 300,
          }}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={COLORS.grey}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={{
            backgroundColor: COLORS.surfaceLight,
            color: COLORS.white,
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            width: "100%",
            maxWidth: 300,
          }}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={COLORS.grey}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        {error ? <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.emailButton, { marginBottom: 0 }]}
          onPress={handleEmailSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="mail" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
