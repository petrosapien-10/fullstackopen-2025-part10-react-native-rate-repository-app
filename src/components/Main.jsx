import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import Text from "./Text";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
}); // Make sure this closing parenthesis and semicolon are present

const Main = () => {
  return (
    <>
      <AppBarTab />

      <View style={styles.container}>
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;
