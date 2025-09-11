import { View, Text, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarTab,
    paddingBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={styles.text}>Repositories</Text>
      </View>
    </Pressable>
  );
};

export default AppBar;
