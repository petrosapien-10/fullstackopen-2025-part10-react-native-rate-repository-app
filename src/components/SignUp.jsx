import { useFormik } from "formik";
import { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import theme from "../theme";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";

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
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match password"
    )
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      await signIn({ username, password });

      navigate("/");
    } catch (error) {
      console.log("Error creating user:", error);

      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];

        if (graphQLError.extensions?.code === "USERNAME_TAKEN") {
          setErrorMessage(
            `Username ${graphQLError.extensions.username} is already taken. Choose another username`
          );
        } else {
          setErrorMessage("An error occurred while creating the account");
        }
      } else {
        setErrorMessage("An error occurred while creating the account");
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
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        autoCapitalize="none"
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.textInputError,
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.textInputError,
        ]}
        autoCapitalize="none"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        secureTextEntry
        style={[
          styles.textInput,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.textInputError,
        ]}
        autoCapitalize="none"
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
