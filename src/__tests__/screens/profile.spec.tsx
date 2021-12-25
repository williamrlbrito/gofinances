import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

test('check if show correctly user input name placeholder', () => {
  const { getByPlaceholderText } = render(<Profile />);
  
  const inputName = getByPlaceholderText('Nome');

  expect(inputName).toBeTruthy();
});

test('check if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />);

  const imputName = getByTestId('input-name');
  const imputSurname = getByTestId('input-surname');

  expect(imputName.props.value).toBe('John');
  expect(imputSurname.props.value).toBe('Doe');
});

test('check if title renders correctly', () => {
  const { getByTestId } = render(<Profile />);

  const textTitle = getByTestId('text-title');

  expect(textTitle.props.children).toBe('Perfil');
});