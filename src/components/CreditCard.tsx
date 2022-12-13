import React from 'react';

import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { Box, HStack, Pressable, Text, VStack } from 'native-base';

import type { CreditCardProps } from '../types';

import WirelessLogo from '../../assets/wireless-l.png';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
  },
  wrapperShadow: {
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});

const defaultProps: Partial<CreditCardProps> = {
  containerStyle: {},
  height: 0,
  onPress: () => {},
  withShadow: true,
};

export default function CreditCard({
  cardBackground,
  cardExpiryMonth,
  cardExpiryYear,
  cardIssuerLogo,
  cardLogo,
  cardNumber,
  containerStyle,
  height,
  onPress,
  style,
  width,
  withShadow,
}: CreditCardProps) {
  let cardHeight = 0;
  let cardWidth = 0;
  let customStyle: ViewStyle = {};

  if (width > 0) {
    cardWidth = width;
    cardHeight = cardWidth * 0.63;
  } else if (height && height > 0) {
    cardHeight = height;
    cardWidth = cardHeight * 1.63;
  }

  if (withShadow) {
    customStyle = { ...customStyle, ...styles.wrapperShadow };
  }

  const padding = cardWidth * 0.06;
  const box1Height = (cardHeight - 8 * 3 - padding * 2) * 0.25;
  const box2Height = (cardHeight - 8 * 3 - padding * 2) * 0.25;
  const box3Height = (cardHeight - 8 * 3 - padding * 2) * 0.25;
  const box4Height = (cardHeight - 8 * 3 - padding * 2) * 0.25;

  return (
    <View
      style={{
        height: '100%',
        overflow: 'hidden',
        width: '100%',
        ...(containerStyle instanceof Object ? containerStyle : {}),
      }}
    >
      <Animated.View
        style={{
          ...(style instanceof Object ? style : {}),
          ...styles.wrapper,
          ...customStyle,
        }}
      >
        <ImageBackground
          source={cardBackground}
          style={{
            borderRadius: cardWidth * 0.04,
            height: cardHeight,
            overflow: 'hidden',
            padding,
            width: cardWidth,
          }}
        >
          <Pressable onPress={onPress}>
            <VStack space={2}>
              <Box
                style={{
                  height: box1Height,
                }}
              >
                <Image
                  resizeMode="stretch"
                  source={cardIssuerLogo}
                  style={{
                    height: cardHeight * 0.16,
                    width: cardWidth * 0.6,
                  }}
                />
              </Box>
              <Box
                style={{
                  height: box2Height,
                }}
              >
                <HStack>
                  <Box
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      // TODO: border radius scale by height
                      borderRadius: cardHeight * 0.04,
                      height: cardHeight * 0.2,
                      width: cardWidth * 0.16,
                    }}
                  />
                  <Box
                    style={{
                      alignItems: 'flex-end',
                      flex: 1,
                      justifyContent: 'center',
                      marginRight: width * 0.06,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={WirelessLogo}
                      style={{
                        height: cardHeight * 0.13,
                      }}
                    />
                  </Box>
                </HStack>
              </Box>
              <Box
                style={{
                  height: box3Height,
                  justifyContent: 'center',
                }}
              >
                <Text
                  fontSize="2xl"
                  style={{
                    color: '#FFF',
                    fontSize: cardHeight * 0.1,
                  }}
                >
                  {cardNumber}
                </Text>
              </Box>
              <Box
                style={{
                  height: box4Height,
                }}
              >
                <HStack>
                  <Text
                    style={{
                      color: '#FFF',
                      flex: 1,
                      fontSize: cardHeight * 0.06,
                    }}
                  >
                    {String(cardExpiryMonth).padStart(2, '0')}/
                    {String(cardExpiryYear % 2000).padStart(2, '0')}
                  </Text>
                  <Image
                    resizeMode="contain"
                    source={cardLogo}
                    style={{
                      height: cardHeight * 0.18,
                    }}
                  />
                </HStack>
              </Box>
            </VStack>
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

CreditCard.defaultProps = defaultProps;
