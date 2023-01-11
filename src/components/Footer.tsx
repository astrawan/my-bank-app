import React from 'react';

import { Dimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Box, HStack, Icon, Pressable } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { TabNavigationState } from '@react-navigation/native';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../types';

import { useAppContext } from './AppContext';

export default function Footer({
  descriptors,
  navigation,
  state: _state,
}: BottomTabBarProps) {
  const { footerVisible } = useAppContext();

  const state = _state as TabNavigationState<RootStackParamList>;
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  const focusGradHeight = 72;
  const focusGradWidth = 72;
  const tabPadding = 16;
  const tabButtonIconWidth = (screenWidth - tabPadding * 2) / 4;

  const getFocusGradLeft = (index: number) => {
    return (
      tabButtonIconWidth * index +
      tabPadding +
      tabButtonIconWidth / 2 -
      focusGradWidth / 2
    );
  };

  const bottomMargin = useSharedValue(0);

  const defaultFooterStyles = useAnimatedStyle(() => {
    return {
      marginBottom: withSpring(bottomMargin.value),
    };
  });

  const focusGradLeft = useSharedValue(getFocusGradLeft(0));

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      left: withSpring(focusGradLeft.value),
    };
  });

  // istanbul ignore next
  React.useEffect(() => {
    bottomMargin.value = footerVisible ? 0 : -128;
  }, [bottomMargin, footerVisible, screenHeight]);

  return (
    <Animated.View style={[defaultFooterStyles]}>
      <Box height={70} safeAreaBottom>
        <LinearGradient
          colors={['#2F395B', '#131B31']}
          start={[0, 0]}
          end={[0, 0.3]}
          style={{
            borderRadius: 48,
            height: screenHeight / 2,
            marginTop: -48,
          }}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
              },
            ]}
          >
            <HStack
              style={{
                padding: tabPadding,
                zIndex: 20,
              }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const focused = state.index === index;
                const icon = options?.tabBarIcon?.({
                  color: '',
                  focused,
                  size: 0,
                }) || (
                  <Icon
                    as={Ionicons}
                    color="#ffffff"
                    name={route.params?.item?.icon || 'help-circle-outline'}
                    size="xl"
                  />
                );
                // istanbul ignore next
                const onButtonPress = () => {
                  const evt = navigation.emit({
                    canPreventDefault: true,
                    target: route.key,
                    type: 'tabPress',
                  });

                  if (!focused) {
                    if (!evt.defaultPrevented) {
                      navigation.navigate(route.name);
                    }
                    focusGradLeft.value = getFocusGradLeft(index);
                  }
                };

                return (
                  <Box
                    alignItems="center"
                    flex={1}
                    key={`box-item-${route.name}`}
                  >
                    <Pressable
                      onPress={onButtonPress}
                      style={{
                        alignItems: 'center',
                        height: 72,
                        justifyContent: 'center',
                        width: 72,
                      }}
                    >
                      {icon}
                    </Pressable>
                  </Box>
                );
              })}
            </HStack>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: tabPadding,
                },
                defaultSpringStyles,
              ]}
            >
              <LinearGradient
                colors={['#5D9EFF', '#7751FD']}
                start={[0, 0]}
                end={[0, 1]}
                style={[
                  {
                    alignItems: 'center',
                    borderRadius: 9999,
                    height: focusGradHeight,
                    width: focusGradWidth,
                  },
                ]}
              />
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </Box>
    </Animated.View>
  );
}

// istanbul ignore next
Footer.createIcon = (props: { name: string }, focused: boolean) => {
  return (
    <Icon
      as={Ionicons}
      color={!focused ? '#7A91D2' : '#FFFFFF'}
      name={props.name}
      size="xl"
    />
  );
};
