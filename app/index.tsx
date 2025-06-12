import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/auth.styles";


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      
      <Image source={{
        uri: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1094874726.png?crop=1.00xw:0.753xh;0,0.161xh&resize=1200:*"}} 
        style={styles.image} />
      
      <TouchableOpacity onPress={() => alert("You touched")}>
        <Text>Press mee!</Text>
      </TouchableOpacity> 

    </View>
  );
}