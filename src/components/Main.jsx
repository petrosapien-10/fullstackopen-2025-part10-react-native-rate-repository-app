import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import Text from "./Text";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
      <AppBarTab />

      <View style={styles.container}>
        <Text>Rate Repository </Text>
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;
