import React from 'react';

import {
  Dimensions,
  ImageBackground,
  type ImageBackgroundProps,
  StatusBar,
} from 'react-native';

import { Box } from 'native-base';

import ViewBgImg from '../../assets/view-background.png';

export default function View({ children, ...props }: ImageBackgroundProps) {
  const { height: screenHeight } = Dimensions.get('window');
  return (
    <ImageBackground
      source={ViewBgImg}
      style={{
        minHeight: screenHeight,
      }}
      {...props}
    >
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
        translucent
      />
      <Box flex={1} safeAreaTop>
        {children}
      </Box>
    </ImageBackground>
  );
}
