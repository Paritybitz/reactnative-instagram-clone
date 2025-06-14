import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
    const {startSSOFlow} = useSSO();
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try{
        const {createdSessionId, setActive}=await startSSOFlow({strategy:"oauth_google"});
        if(setActive && createdSessionId){
            setActive({session:createdSessionId});
            router.replace("/(tabs)");
        }
    }
    catch (error){
        console.log("OAuth error:", error);

    }
  };

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
            // Handle further steps if needed
            console.error(JSON.stringify(signInAttempt, null, 2));
        }
    } catch (err) {
        console.error("Email sign-in error:", err);
    }
};

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="rocket-outline" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>IG Clone</Text>
        <Text style={styles.tagline}>🤖</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/evilrobot.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => router.push("/(auth)/email-signin")}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="mail" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
