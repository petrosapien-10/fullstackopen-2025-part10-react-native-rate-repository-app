import { useFormik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 15,
    backgroundColor: "white",
    fontFamily: theme.fonts.main,
    marginBottom: 5,
  },
  textInputError: {
    borderColor: "#d73a4a",
  },
  multilineInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 15,
    backgroundColor: "white",
    fontFamily: theme.fonts.main,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 5,
  },
  button: {
    borderRadius: 4,
    padding: 15,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main,
  },
  errorText: {
    color: "#d73a4a",
    fontSize: 14,
    marginBottom: 15,
    fontFamily: theme.fonts.main,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  text: yup.string(),
});

const Review = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];

        if (graphQLError.extensions?.code === "REPOSITORY_ALREADY_REVIEWED") {
          alert("You have already reviewed this repository");
        } else if (
          graphQLError.extensions?.code === "GITHUB_REPOSITORY_NOT_FOUND"
        ) {
          alert(
            "Repository not found. Please check the owner name and repository name."
          );
        } else {
          alert("An error occurred while creating the review");
        }
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.textInput,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.textInputError,
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={[
          styles.textInput,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.textInputError,
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        keyboardType="numeric"
        style={[
          styles.textInput,
          formik.touched.rating &&
            formik.errors.rating &&
            styles.textInputError,
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline={true}
        style={[
          styles.multilineInput,
          formik.touched.text && formik.errors.text && styles.textInputError,
        ]}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default Review;
