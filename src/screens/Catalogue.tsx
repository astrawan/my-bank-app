import React from 'react';

import { View } from 'react-native';

import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import DashedLine from 'react-native-dashed-line';

import type { TransactionHistory } from '../types';
import { CurrencyNumberFormat } from '../utils';

const catalogueData: Array<TransactionHistory> = [
  {
    amount: 34.0,
    colors: ['#68ADFF', '#4F45FF'],
    icon: 'call',
    name: 'Mobile',
  },
  {
    amount: 21.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Online',
    icon: 'wifi',
    name: 'Internet and TV',
  },
  {
    amount: 1221.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'car',
    name: 'Traffic fines',
  },
  {
    amount: 0.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'home',
    name: 'Housing services',
  },
  {
    amount: 442.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'flash',
    name: 'Utility payment',
  },
  {
    amount: 34.0,
    colors: ['#68ADFF', '#4F45FF'],
    icon: 'call',
    name: 'Mobile',
  },
  {
    amount: 21.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Online',
    icon: 'wifi',
    name: 'Internet and TV',
  },
  {
    amount: 1221.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'car',
    name: 'Traffic fines',
  },
  {
    amount: 0.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'home',
    name: 'Housing services',
  },
  {
    amount: 442.0,
    colors: ['#68ADFF', '#4F45FF'],
    description: 'Service',
    icon: 'flash',
    name: 'Utility payment',
  },
];

export default function Catalogue() {
  const [dashedLineVisible, setDashedLineVisibility] = React.useState(false);

  return (
    <Box safeAreaBottom>
      {dashedLineVisible && <DashedLine dashColor="#2D3757" />}
      <FlatList
        bounces={false}
        data={catalogueData}
        onScroll={({
          nativeEvent: {
            contentOffset: { y },
          },
        }) => {
          setDashedLineVisibility(y > 30);
        }}
        renderItem={({ item }) => {
          return (
            <HStack
              space={4}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <LinearGradient
                colors={item.colors}
                style={{
                  alignItems: 'center',
                  borderRadius: 9999,
                  height: 40,
                  justifyContent: 'center',
                  width: 40,
                }}
              >
                <Icon as={Ionicons} color="#FFF" name={item.icon} size="md" />
              </LinearGradient>
              <HStack
                style={{
                  borderBottomColor: '#2D3757',
                  borderBottomWidth: 1,
                  flex: 1,
                  height: 80,
                }}
              >
                <VStack
                  flex={1}
                  style={{
                    justifyContent: 'center',
                  }}
                >
                  <Text color="#FFF" fontSize="lg">
                    {item.name}
                  </Text>
                  <Text color="#94A3D3" fontSize="md">
                    {`The debt is ${CurrencyNumberFormat.format(item.amount)}`}
                  </Text>
                </VStack>
                <Pressable
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(114, 149, 251, 0.4)',
                    borderRadius: 10,
                    borderWidth: 2,
                    height: 38,
                    justifyContent: 'center',
                    width: 65,
                  }}
                >
                  <Text color="#7295FB" fontSize="lg" fontWeight="medium">
                    Pay
                  </Text>
                </Pressable>
              </HStack>
            </HStack>
          );
        }}
        style={{
          height: '100%',
        }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{
          marginBottom: 70,
        }}
      />
    </Box>
  );
}
