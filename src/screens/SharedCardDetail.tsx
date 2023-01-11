import React from 'react';

import { Animated, Dimensions, Easing } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SharedElement } from 'react-navigation-shared-element';

import {
  Box,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamList } from '../types';
import { CurrencyNumberFormat } from '../utils';

import BottomSheet, {
  TransactionBottomSheetContent,
} from '../components/BottomSheet';
import CCard from '../components/CreditCard';
import View from '../components/View';

type SharedCardDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'SharedCardDetail'
>;

const AnimatedSharedElement = Animated.createAnimatedComponent(SharedElement);

export default function SharedCardDetail({
  navigation,
  route,
}: SharedCardDetailProps) {
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
  const bottomSheetRef = React.useRef<BottomSheetMethods>(null);
  const [buttonHistoryPressed, setButtonHistoryPressed] = React.useState(false);
  const [buttonSharePressed, setButtonSharePressed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [cardContainerOverflow, setCardContainerOverflow] = React.useState<
    'hidden' | 'scroll' | 'visible' | undefined
  >('hidden');
  const bottomSheetAnimationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
  });

  const animationDelay = 800;
  const cardSpin = React.useRef(new Animated.Value(0)).current;
  const cardRotate = cardSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });
  const sharedElementHeight = cardSpin.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [cardWidth, cardWidth + cardWidth * 0.1, cardHeight],
  });
  const sharedElementWidth = cardSpin.interpolate({
    easing: Easing.elastic(2),
    inputRange: [0, 1],
    outputRange: [cardHeight, cardWidth],
  });
  const sharedElementMarginTop = cardSpin.interpolate({
    easing: Easing.poly(5),
    inputRange: [0, 1],
    outputRange: [Math.round(cardWidth * 0.21), 0],
  });

  // istanbul ignore next
  const onGoBack = () => {
    bottomSheetRef?.current?.close();
    Animated.timing(cardSpin, {
      delay: 100,
      duration: animationDelay,
      toValue: 0,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        navigation.goBack();
      }
    });
  };

  // istanbul ignore next
  React.useEffect(() => {
    if (cardContainerOverflow === 'visible') {
      Animated.timing(cardSpin, {
        delay: 500,
        duration: animationDelay,
        toValue: 1,
        useNativeDriver: false,
      }).start(({ finished }) => finished && setMounted(finished));
    }

    if (!mounted) {
      setCardContainerOverflow('visible');
    }
  }, [cardContainerOverflow, cardSpin, mounted]);

  return (
    <View style={{ paddingBottom: 0 }}>
      <HStack
        marginBottom={8}
        style={{
          height: 48,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <Pressable
          onPress={onGoBack}
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
            <AnimatedSharedElement
              id={`card-${route.params.item.cardNumber.replace(' ', '')}`}
              style={{
                height: sharedElementHeight,
                marginTop: sharedElementMarginTop,
                width: sharedElementWidth,
              }}
            >
              <CCard
                cardBackground={route.params.item.cardBackgroundL}
                cardExpiryMonth={route.params.item.cardExpiryMonth}
                cardExpiryYear={route.params.item.cardExpiryYear}
                cardIssuerLogo={route.params.item.cardIssuerLogoL}
                cardLogo={route.params.item.cardLogoL}
                cardNumber={route.params.item.cardNumber}
                containerStyle={{
                  overflow: cardContainerOverflow,
                }}
                height={cardHeight}
                style={{
                  height: cardWidth,
                  transform: [
                    {
                      rotate: cardRotate,
                    },
                  ],
                  width: cardWidth,
                }}
                width={cardWidth}
                withShadow={false}
              />
            </AnimatedSharedElement>
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
                onPressIn={() => {
                  // istanbul ignore next
                  setButtonHistoryPressed(true);
                }}
                onPressOut={() => {
                  // istanbul ignore next
                  setButtonHistoryPressed(false);
                }}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor:
                    /* istanbul ignore next */ buttonHistoryPressed
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
                onPressIn={() => {
                  // istanbul ignore next
                  setButtonSharePressed(true);
                }}
                onPressOut={() => {
                  // istanbul ignore next
                  setButtonSharePressed(false);
                }}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: /* istanbul ignore next */ buttonSharePressed
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
        {
          /* istanbul ignore next */
          mounted && (
            <BottomSheet
              animationConfigs={bottomSheetAnimationConfigs}
              ref={bottomSheetRef}
              snapPoints={snapPoints}
            >
              <TransactionBottomSheetContent />
            </BottomSheet>
          )
        }
      </Box>
    </View>
  );
}
