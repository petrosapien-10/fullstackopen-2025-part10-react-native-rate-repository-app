import { useFormik } from "formik";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
    backgroundColor: theme.colors.separator,
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 12,
    backgroundColor: theme.colors.mainBackGround,
  },
  button: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
  error: {
    color: "#d73a4a",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        autoCapitalize="none"
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username && { borderColor: styles.error.color },
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={true}
        autoCapitalize="none"
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password && { borderColor: styles.error.color },
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log("username: ", values.username);
    console.log("password: ", values.password);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
