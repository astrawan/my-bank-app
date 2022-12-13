import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Dimensions } from 'react-native';

import { ScrollView, Text, VStack } from 'native-base';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { SharedElement } from 'react-navigation-shared-element';

import type { CardItem, RootStackParamList } from '../types';

import { CurrencyNumberFormat } from '../utils';

import CCard from '../components/CreditCard';

import CardBgP1 from '../../assets/card-bg-p-1.png';
import CardBgP2 from '../../assets/card-bg-p-2.png';
import CardBgP3 from '../../assets/card-bg-p-3.png';
import CardBgL1 from '../../assets/card-bg-l-1.png';
import CardBgL2 from '../../assets/card-bg-l-2.png';
import CardBgL3 from '../../assets/card-bg-l-3.png';

import CardIssuerPLogo from '../../assets/card-issuer-p-logo.png';

import CardIssuerLLogo from '../../assets/card-issuer-l-logo.png';

import MCPLogo from '../../assets/mc-p-logo.png';
import MCLLogo from '../../assets/mc-l-logo.png';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const cardData: Array<CardItem> = [
  {
    balance: 2748.0,
    cardBackgroundL: CardBgL1,
    cardBackgroundP: CardBgP1,
    cardExpiryMonth: 4,
    cardExpiryYear: 2024,
    cardIssuerLogoL: CardIssuerLLogo,
    cardIssuerLogoP: CardIssuerPLogo,
    cardLogoL: MCLLogo,
    cardLogoP: MCPLogo,
    cardNumber: '5489 7452 5726 9827',
    name: 'Card 1',
  },
  {
    balance: 3596.0,
    cardBackgroundL: CardBgL2,
    cardBackgroundP: CardBgP2,
    cardExpiryMonth: 4,
    cardExpiryYear: 2024,
    cardIssuerLogoL: CardIssuerLLogo,
    cardIssuerLogoP: CardIssuerPLogo,
    cardLogoL: MCLLogo,
    cardLogoP: MCPLogo,
    cardNumber: '5489 7452 5726 9828',
    name: 'Card 2',
  },
  {
    balance: 1314.0,
    cardBackgroundL: CardBgL3,
    cardBackgroundP: CardBgP3,
    cardExpiryMonth: 4,
    cardExpiryYear: 2024,
    cardIssuerLogoL: CardIssuerLLogo,
    cardIssuerLogoP: CardIssuerPLogo,
    cardLogoL: MCLLogo,
    cardLogoP: MCPLogo,
    cardNumber: '5489 7452 5726 9829',
    name: 'Card 3',
  },
];

export default function Home({ navigation }: HomeProps) {
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  // screen height - header width - footer width
  const bodyHeight = screenHeight - 124 - 70;
  const cardHeight = bodyHeight * 0.5;

  const [activeCarouselIndex, setActiveCarouselIndex] = React.useState(0);
  const [activeCard, setActiveCard] = React.useState(cardData[0]);
  const carouselRef = React.useRef<Carousel<CardItem> | null>();

  React.useEffect(() => {
    setActiveCard(cardData[activeCarouselIndex]);
  }, [activeCarouselIndex]);

  return (
    <ScrollView
      style={{
        minHeight: bodyHeight,
      }}
    >
      <VStack padding={6} space={4}>
        <VStack>
          <Text color="#94A3D3" fontSize="xl" fontWeight="bold">
            Balance
          </Text>
          <Text color="#fff" fontSize="3xl" fontWeight="bold">
            {CurrencyNumberFormat.format(activeCard.balance)}
          </Text>
        </VStack>
      </VStack>
      <Carousel<CardItem>
        data={cardData}
        itemWidth={cardHeight * 0.63}
        onSnapToItem={(index) => setActiveCarouselIndex(index)}
        ref={(c) => {
          carouselRef.current = c;
        }}
        renderItem={({ item }) => {
          // Edited node_modules files: react-navigation-shared-elements/build/SharedElementRendererView.js:20
          const onCardPress = () => {
            navigation.navigate('SharedCardDetail', { item });
          };

          return (
            <SharedElement
              id={`card-${item.cardNumber.replace(' ', '')}`}
              style={{
                justifyContent: 'flex-end',
              }}
            >
              <CCard
                cardBackground={item.cardBackgroundL}
                cardExpiryMonth={item.cardExpiryMonth}
                cardExpiryYear={item.cardExpiryYear}
                width={cardHeight}
                cardIssuerLogo={item.cardIssuerLogoL}
                cardLogo={item.cardLogoL}
                cardNumber={item.cardNumber}
                onPress={onCardPress}
                style={{
                  height: cardHeight,
                  transform: [
                    {
                      rotate: '-90deg',
                    },
                  ],
                  width: cardHeight,
                }}
                withShadow={false}
              />
            </SharedElement>
          );
        }}
        sliderWidth={screenWidth}
      />
      <Pagination
        activeDotIndex={activeCarouselIndex}
        /* TODO: fix carousel ref problem */
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore */
        carouselRef={carouselRef}
        dotColor="#FFFFFF"
        dotContainerStyle={{
          marginHorizontal: 2,
        }}
        dotsLength={cardData.length}
        dotStyle={{
          borderRadius: 4,
          height: 4,
          marginHorizontal: 0,
          width: 30,
        }}
        inactiveDotColor="#2D3757"
        inactiveDotOpacity={1}
        inactiveDotScale={0.75}
      />
    </ScrollView>
  );
}
