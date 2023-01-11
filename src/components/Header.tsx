import React from 'react';

import { Avatar, HStack, Text } from 'native-base';

import type { HeaderTitleProps } from '@react-navigation/elements';

import ProfileImg from '../../assets/profile.jpeg';

export default function Header({ children }: HeaderTitleProps) {
  return (
    <HStack
      alignItems="center"
      height="124px"
      paddingLeft={6}
      paddingRight={6}
      style={{
        justifyContent: 'center',
        margin: 0,
        width: '100%',
      }}
    >
      <Text flex={1} color="#fff" fontSize="5xl" fontWeight="bold">
        {children}
      </Text>
      <Avatar alignSelf="center" source={ProfileImg} />
    </HStack>
  );
}
