import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { styles } from "../styles/auth.styles";


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title Style</Text>
      <TouchableOpacity onPress={() => alert("You touched")}>
        <Text>Press mee!</Text>
      </TouchableOpacity>

    </View>
  );
}