import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import { ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import useSignOut from "../hooks/usseSignOut";
import { useQuery } from "@apollo/client";

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
  const { data, error, loading } = useQuery(ME);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const hasId = Boolean(data?.me?.id);
  const hasUsername = Boolean(data?.me?.username);
  const isSignedIn = hasId && hasUsername;

  console.log(data);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  if (loading) {
    return <Text>Loading out...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Pressable>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.scrollView}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          {isSignedIn ? (
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          ) : (
            <Link to="/signin">
              <Text style={styles.text}>Sign in</Text>
            </Link>
          )}
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default AppBar;
