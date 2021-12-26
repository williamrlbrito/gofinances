import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

import { Register } from ".";

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register Screen", () => {
  it("should be open category modal when user click on button", () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Provider
      }
    );

    const categoryModal = getByTestId("modal-category");
    const buttonModal = getByTestId("button-category");
    fireEvent.press(buttonModal);

    waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});