import React from 'react';

import { Animated, Dimensions, Easing } from 'react-native';

import {
  Box,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BottomSheet from '@gorhom/bottom-sheet';

import { SharedElement } from 'react-navigation-shared-element';

import CCard from '../components/CreditCard';
import BottomSheetContent from '../components/BottomSheetContent';
import { RootStackParamList } from '../types';
import { CurrencyNumberFormat } from '../utils';

type CardDetailProps = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;

export default function CardDetail({ navigation, route }: CardDetailProps) {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  const padding = 16;
  const headerHeight = 48;
  const cardWidth = screenWidth - padding * 2;
  const cardHeight = cardWidth * 0.63;
  const balanceInfoHeight = 72;
  const snapPoint0 =
    ((screenHeight -
      (cardHeight + balanceInfoHeight + padding * 3 + headerHeight)) /
      screenHeight) *
    100;

  const snapPoints = React.useMemo(
    () => [`${snapPoint0}%`, '100%'],
    [snapPoint0],
  );
  const [buttonHistoryPressed, setButtonHistoryPressed] = React.useState(false);
  const [buttonSharePressed, setButtonSharePressed] = React.useState(false);

  const cardOpacity = React.useRef(new Animated.Value(0.0)).current;

  React.useEffect(() => {
    Animated.timing(cardOpacity, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [cardOpacity]);

  return (
    <>
      <HStack
        marginBottom={8}
        style={{
          height: 48,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 12,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            width: 48,
            zIndex: 20,
          }}
        >
          <Icon as={Ionicons} color="#FFF" name="arrow-back" size="4xl" />
        </Pressable>
        <Text
          color="#fff"
          flex={1}
          fontSize="2xl"
          fontWeight="bold"
          style={{
            marginLeft: -48,
          }}
          textAlign="center"
        >
          {route.params.item.name}
        </Text>
      </HStack>
      <Box flex={1}>
        <ScrollView bounces={false}>
          <VStack paddingLeft={4} paddingRight={4} space={4}>
            <SharedElement
              id={`card-${route.params.item.cardNumber.replace(' ', '')}`}
            >
              <CCard
                cardBackground={route.params.item.cardBackgroundL}
                cardExpiryMonth={route.params.item.cardExpiryMonth}
                cardExpiryYear={route.params.item.cardExpiryYear}
                cardIssuerLogo={route.params.item.cardIssuerLogoL}
                cardLogo={route.params.item.cardLogoL}
                cardNumber={route.params.item.cardNumber}
                height={cardHeight}
                style={{
                  opacity: cardOpacity,
                }}
                width={cardWidth}
                withShadow={false}
              />
            </SharedElement>
            <HStack
              space={2}
              style={{
                height: balanceInfoHeight,
                justifyContent: 'center',
              }}
            >
              <VStack flex={1}>
                <Text color="#94A3D3" fontSize="lg" fontWeight="bold">
                  Balance
                </Text>
                <Text color="#fff" fontSize="3xl" fontWeight="bold">
                  {CurrencyNumberFormat.format(route.params.item.balance)}
                </Text>
              </VStack>
              <Pressable
                onPressIn={() => setButtonHistoryPressed(true)}
                onPressOut={() => setButtonHistoryPressed(false)}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: buttonHistoryPressed
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 10,
                  borderWidth: 2,
                  height: 54,
                  justifyContent: 'center',
                  width: 54,
                }}
              >
                <Icon
                  as={Ionicons}
                  color="#FFF"
                  name="time-outline"
                  size="xl"
                />
              </Pressable>
              <Pressable
                onPressIn={() => setButtonSharePressed(true)}
                onPressOut={() => setButtonSharePressed(false)}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: buttonSharePressed
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 10,
                  borderWidth: 2,
                  height: 54,
                  justifyContent: 'center',
                  width: 54,
                }}
              >
                <Icon
                  as={Ionicons}
                  color="#FFF"
                  name="share-outline"
                  size="xl"
                />
              </Pressable>
            </HStack>
          </VStack>
        </ScrollView>
        <BottomSheet
          animateOnMount={false}
          backgroundStyle={{
            backgroundColor: '#1C2641',
          }}
          handleIndicatorStyle={{
            backgroundColor: '#2D3757',
            width: 55,
          }}
          index={0}
          snapPoints={snapPoints}
        >
          <BottomSheetContent />
        </BottomSheet>
      </Box>
    </>
  );
}
