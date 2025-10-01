import { Text, View, StyleSheet, Image } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  boldText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
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

  regularText: {
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
  },

  languageText: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },

  statLabel: {
    fontFamily: theme.fonts.main,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.boldText}>{repository.fullName}</Text>
          <Text style={styles.regularText}>{repository.description}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </View>
        </View>
      </View>
      {/* Stats row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.stargazersCount}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.forksCount}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.boldText}>{repository.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
