import React from 'react';

import { Platform, View } from 'react-native';

import { Box, HStack, Icon, SectionList, Text, VStack } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

import DashedLine from 'react-native-dashed-line';

import type { TransactionHistory } from '../types';
import { CurrencyNumberFormat } from '../utils';

type HistoryItem = {
  title: string;
  data: Array<TransactionHistory>;
};

const HistoryItems: Array<HistoryItem> = [
  {
    data: [
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
        amount: -43.0,
        colors: ['#3DA2FF', '#2167F0'],
        description: 'Service',
        icon: 'car',
        name: 'Uber',
      },
      {
        amount: -2467.0,
        colors: ['#EC5B8F', '#DA3181'],
        description: 'Service',
        icon: 'share',
        name: 'Card to card',
      },
    ],
    title: '20 April',
  },
  {
    data: [
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
        amount: -43.0,
        colors: ['#3DA2FF', '#2167F0'],
        description: 'Service',
        icon: 'car',
        name: 'Uber',
      },
      {
        amount: -2467.0,
        colors: ['#EC5B8F', '#DA3181'],
        description: 'Service',
        icon: 'share',
        name: 'Card to card',
      },
    ],
    title: '12 March',
  },
  {
    data: [
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
        amount: -43.0,
        colors: ['#3DA2FF', '#2167F0'],
        description: 'Service',
        icon: 'car',
        name: 'Uber',
      },
      {
        amount: -2467.0,
        colors: ['#EC5B8F', '#DA3181'],
        description: 'Service',
        icon: 'share',
        name: 'Card to card',
      },
    ],
    title: '1 March',
  },
];

export default function History() {
  const [dashedLineVisible, setDashedLineVisibility] = React.useState(false);

  return (
    <Box safeAreaBottom>
      {dashedLineVisible && <DashedLine dashColor="#2D3757" />}
      <SectionList<TransactionHistory, Pick<HistoryItem, 'title'>>
        bounces={false}
        onScroll={({
          nativeEvent: {
            contentOffset: { y },
          },
        }) => {
          setDashedLineVisibility(y > 30 && Platform.OS === 'android');
        }}
        keyExtractor={(_, index) => `history-section-${index}`}
        renderItem={({ item }) => {
          return (
            <HStack
              space={4}
              style={{
                marginLeft: 16,
                marginRight: 16,
              }}
            >
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
                  {CurrencyNumberFormat.format(Math.abs(item.amount))}
                </Text>
              </HStack>
            </HStack>
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text
              color="#FFF"
              fontSize="xl"
              fontWeight="bold"
              style={{
                backgroundColor: 'rgba(47, 57, 91, 0.8)',
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
              }}
            >
              {title}
            </Text>
          );
        }}
        sections={HistoryItems}
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
