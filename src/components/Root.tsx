import React from 'react';

import { Easing } from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
  type BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { AppContextProvider, useAppContext } from './AppContext';
import Footer from './Footer';

import { Catalogue, History, Home, Menu, SharedCardDetail } from '../screens';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tab = createBottomTabNavigator();

function FooterWrapper(props: BottomTabBarProps) {
  return <Footer {...props} />;
}

const Stack = createSharedElementStackNavigator();

function RootStack() {
  const { setFooterVisibility } = useAppContext();

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
      <Stack.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () => setFooterVisibility?.(true),
        }}
      />
      <Stack.Screen
        name="SharedCardDetail"
        component={SharedCardDetail}
        listeners={{
          focus: () => setFooterVisibility?.(false),
        }}
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

function RootTab() {
  return (
    <Tab.Navigator
      initialRouteName="RootStack"
      tabBar={FooterWrapper}
      screenOptions={{
        headerShown: false,
        lazy: false,
      }}
    >
      <Tab.Screen
        name="RootStack"
        component={RootStack}
        options={{
          headerShown: false,
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
  );
}

export default function Root() {
  const [footerVisible, setFooterVisibility] = React.useState(true);

  return (
    <NavigationContainer theme={CustomTheme}>
      <AppContextProvider value={{ footerVisible, setFooterVisibility }}>
        <RootTab />
      </AppContextProvider>
    </NavigationContainer>
  );
}
