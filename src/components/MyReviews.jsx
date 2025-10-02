import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import useMe from "../hooks/useMe";
import theme from "../theme";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.separator,
  },
  reviewItem: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  reviewContent: {
    flex: 1,
  },
  repositoryName: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 5,
    fontSize: theme.fontSizes.subheading,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  reviewText: {
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#d73a4a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  const handleViewRepository = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "CANCEL", style: "cancel" },
        { text: "DELETE", onPress: () => onDelete(review.id) },
      ]
    );
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text style={styles.repositoryName}>
            {review.repository.fullName}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable style={styles.viewButton} onPress={handleViewRepository}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDeleteReview}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me, loading, error, refetch } = useMe(true);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview({
        variables: { deleteReviewId: reviewId },
      });
      refetch();
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const reviewNodes = me?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item} onDelete={handleDeleteReview} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
