import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { SignInForm } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId("usernameField"), "longnn");
      fireEvent.changeText(screen.getByTestId("passwordField"), "longnnpass");
      fireEvent.press(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "longnn",
          password: "longnnpass",
        });
      });
    });
  });
});
