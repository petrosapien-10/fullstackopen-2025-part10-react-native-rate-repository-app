import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    paddingBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  scrollView: {
    backgroundColor: "purple",
  },
});

const AppBar = () => {
  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.scrollView}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;
