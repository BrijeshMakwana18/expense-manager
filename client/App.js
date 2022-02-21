/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Routes from './src/routes';
import SplashScreen from 'react-native-splash-screen';
import {rootReducer} from './src/screens';
export default function App() {
  useEffect(async () => {
    SplashScreen.hide();
  });
  return (
    <>
      <Routes />
    </>
  );
}
