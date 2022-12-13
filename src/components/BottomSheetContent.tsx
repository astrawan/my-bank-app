import React from 'react';

import { HStack, Icon, Text, VStack } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { TransactionHistory } from '../types';

import { CurrencyNumberFormat } from '../utils';

const TransactionHistories: Array<TransactionHistory> = [
  {
    amount: 143.0,
    colors: ['#EC5B8F', '#DA3181'],
    description: 'Maria',
    icon: 'share',
    name: 'Card to card',
  },
  {
    amount: -467.0,
    colors: ['#FEC946', '#E9912A'],
    description: 'Online',
    icon: 'musical-note',
    name: 'Apple Music',
  },
  {
    amount: -467.0,
    colors: ['#3DA2FF', '#2167F0'],
    description: 'Service',
    icon: 'car',
    name: 'Uber',
  },
  {
    amount: -2467.0,
    colors: ['#3DA2FF', '#2167F0'],
    description: 'Service',
    icon: 'car',
    name: 'Uber',
  },
];

export default function BottomSheetContentComponent() {
  return (
    <BottomSheetScrollView>
      <VStack paddingLeft={6} paddingRight={6} paddingTop={2} space={2}>
        <Text color="#FFF" fontSize="xl" fontWeight="bold">
          Today
        </Text>
        <VStack>
          {TransactionHistories.map((item, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <HStack key={`current-transaction-${index}`} space={4}>
              <LinearGradient
                colors={item.colors}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
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
                    {item.description}
                  </Text>
                </VStack>
                <Text
                  alignSelf="center"
                  color="#FFF"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  {item.amount > 0 ? '+ ' : '- '}
                  {CurrencyNumberFormat.format(item.amount)}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </BottomSheetScrollView>
  );
}
