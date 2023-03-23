import React from 'react';

import {
  ImageBackground,
  type ImageBackgroundProps,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import { Box } from 'native-base';

import ViewBgImg from '../../assets/view-background.png';

type ViewProps = Omit<ImageBackgroundProps, 'source'>;

export default function View({
  children,
  style,
  ...props
}: ViewProps) {
  const { height: screenHeight } = useWindowDimensions();
  return (
    <ImageBackground
      source={ViewBgImg}
      style={[
        {
          minHeight: screenHeight,
          paddingBottom: 166,
        },
        style,
      ]}
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
