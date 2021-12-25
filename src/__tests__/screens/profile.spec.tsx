import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe('Profile', () => {
  it('should have placeholder correctly in user name input', () => {
    const { getByPlaceholderText } = render(<Profile />);
    
    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should be load user data', () => {
    const { getByTestId } = render(<Profile />);

    const imputName = getByTestId('input-name');
    const imputSurname = getByTestId('input-surname');

    expect(imputName.props.value).toBe('John');
    expect(imputSurname.props.value).toBe('Doe');
  });

  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toBe('Perfil');
  });
});