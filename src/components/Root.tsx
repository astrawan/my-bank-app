import React from 'react';

import { Dimensions, Easing } from 'react-native';

import type { HeaderTitleProps } from '@react-navigation/elements';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Avatar, HStack, Text } from 'native-base';

import View from './View';
import Footer from './Footer';

import {
  CardDetail,
  Catalogue,
  History,
  Home,
  Menu,
  SharedCardDetail,
} from '../screens';

import ProfileImg from '../../assets/profile.jpeg';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tab = createBottomTabNavigator();

function createFooter(props: BottomTabBarProps) {
  return <Footer {...props} />;
}

function createHeader({ children }: HeaderTitleProps) {
  const { width: screenWidth } = Dimensions.get('window');

  return (
    <HStack
      style={{
        justifyContent: 'center',
        margin: 0,
        width: screenWidth - 16 * 2,
      }}
    >
      <Text flex={1} color="#fff" fontSize="5xl" fontWeight="bold">
        {children}
      </Text>
      <Avatar alignSelf="center" source={ProfileImg} />
    </HStack>
  );
}

function RootTab() {
  return (
    <View>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={createFooter}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            height: 124,
            shadowColor: 'rgba(0, 0, 0, 0)',
          },
          headerTitle: createHeader,
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: '#FFF',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return Footer.createIcon(
                {
                  name: 'home-outline',
                },
                focused,
              );
            },
            title: 'Bank Cards',
          }}
        />
        <Tab.Screen
          name="Catalogue"
          component={Catalogue}
          options={{
            tabBarIcon: ({ focused }) => {
              return Footer.createIcon(
                {
                  name: 'albums-outline',
                },
                focused,
              );
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ focused }) => {
              return Footer.createIcon(
                {
                  name: 'time-outline',
                },
                focused,
              );
            },
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarIcon: ({ focused }) => {
              return Footer.createIcon(
                {
                  name: 'menu-outline',
                },
                focused,
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const Stack = createSharedElementStackNavigator();

// TODO: Shared navigation broke after tab navigation is used
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return { cardStyle: { opacity: progress } };
        },
        gestureEnabled: false,
        headerShown: false,
        transitionSpec: {
          close: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            },
          },
          open: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            },
          },
        },
      }}
    >
      <Stack.Screen name="RootTab" component={RootTab} />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        sharedElements={(route) => {
          const { item } = route.params;
          const id = `card-${item.cardNumber.replace(' ', '')}`;
          return [
            {
              align: 'center-bottom',
              animation:
                item.cardNumer === '5489 7452 5726 9828' ? 'move' : 'fade',
              // debug: true,
              id,
              resize: 'stretch',
            },
          ];
        }}
      />
      <Stack.Screen
        name="SharedCardDetail"
        component={SharedCardDetail}
        sharedElements={(route) => {
          const { item } = route.params;
          const id = `card-${item.cardNumber.replace(' ', '')}`;
          return [
            {
              align: 'center-bottom',
              animation: 'move',
              // debug: true,
              id,
              resize: 'stretch',
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
}

export default function Root() {
  return (
    <NavigationContainer theme={CustomTheme}>
      <RootStack />
    </NavigationContainer>
  );
}
