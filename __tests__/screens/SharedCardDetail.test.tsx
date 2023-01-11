import React from 'react';

import renderer from 'react-test-renderer';

import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { CardItem, RootStackParamList } from '../../src/types';

import Screen from '../../src/screens/SharedCardDetail';

import CardBgP1 from '../../assets/card-bg-p-1.png';
import CardBgL1 from '../../assets/card-bg-l-1.png';

import CardIssuerPLogo from '../../assets/card-issuer-p-logo.png';
import CardIssuerLLogo from '../../assets/card-issuer-l-logo.png';

import MCPLogo from '../../assets/mc-p-logo.png';
import MCLLogo from '../../assets/mc-l-logo.png';

import Wrapper from '../Wrapper';

const card: CardItem = {
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
};

// @ts-ignore-next-line
const navigation: NativeStackNavigationProp<
  RootStackParamList,
  'SharedCardDetail',
  undefined
> = {
  navigate: jest.fn(),
};

const route: RouteProp<RootStackParamList, 'SharedCardDetail'> = {
  key: 'SharedCardDetail',
  name: 'SharedCardDetail',
  params: {
    item: card,
  },
  path: 'SharedCardDetail',
};

describe('<Home />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Wrapper>
          <Screen navigation={navigation} route={route} />
        </Wrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
