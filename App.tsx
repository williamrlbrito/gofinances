import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Routes } from './src/routes'; 

import { SignIn } from './src/screens/Signin';

import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  
  if (!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.primary} 
        />

        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  )
}


