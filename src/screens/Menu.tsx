import React from 'react';

import { ScrollView } from 'native-base';

import Header from '../components/Header';
import View from '../components/View';

export default function Menu() {
  return (
    <View>
      <Header>Menu</Header>
      <ScrollView height="100%" />
    </View>
  );
}
