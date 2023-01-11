import React from 'react';

import renderer from 'react-test-renderer';

import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../src/types';

import Screen from '../../src/screens/Home';

import Wrapper from '../Wrapper';

jest.mock('react-native-snap-carousel');

// @ts-ignore-next-line
const navigation: NativeStackNavigationProp<
  RootStackParamList,
  'Home',
  undefined
> = {
  navigate: jest.fn(),
};

const route: RouteProp<RootStackParamList, 'Home'> = {
  key: 'Home',
  name: 'Home',
  params: {},
  path: 'Home',
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
