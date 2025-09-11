import { Text, View, StyleSheet, Image } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  boldText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },

  headerContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
  },

  headerTextContainer: {
    flexDirection: "column",
    flex: 1,
    gap: 8,
  },

  languageTag: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },

  statItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginLeft: 8,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.boldText}>{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <View style={styles.languageTag}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      {/* Stats row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.forksCount}</Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
