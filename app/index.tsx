import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/auth.styles";


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title Style</Text>
      <TouchableOpacity onPress={() => alert("You touched")}>
        <Text>Press me</Text>
      
      </TouchableOpacity>
    </View>
  );
}