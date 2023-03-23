jest.mock('react-native-reanimated', () =>
  jest.requireActual('react-native-reanimated/mock'),
);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/Easing', () => ({
  bezier: jest.fn(),
  elastic: jest.fn(),
  in: jest.fn(),
  inOut: jest.fn(),
  poly: jest.fn(),
  out: jest.fn(),
}));
jest.mock('react-native/Libraries/Animated/animations/TimingAnimation');

jest.mock(
  'native-base/lib/commonjs/core/hybrid-overlay/HybridProvider',
  () => 'HybridProvider',
);
jest.mock('native-base/lib/commonjs/utils/useKeyboardBottomInset');

jest.mock('react-native-snap-carousel/src/carousel/Carousel', () => 'Carousel');
jest.mock(
  'react-native-snap-carousel/src/pagination/Pagination',
  () => 'Pagination',
);

jest.mock(
  '@gorhom/bottom-sheet/lib/commonjs/hooks/useBottomSheetTimingConfigs',
);
jest.mock(
  '@gorhom/bottom-sheet/lib/commonjs/components/bottomSheetScrollable/BottomSheetScrollView',
  () => 'BottomSheetScrollView',
);
jest.mock(
  '@gorhom/bottom-sheet/lib/commonjs/components/bottomSheet/BottomSheet',
  () => 'BottomSheet',
);

jest.mock('@expo/vector-icons/build/Ionicons', () => 'Ionicons');

jest.mock(
  '@react-navigation/stack/lib/commonjs/TransitionConfigs/TransitionSpecs',
  () => 'TransitionSpecs',
);
jest.mock(
  '@react-navigation/stack/lib/commonjs/TransitionConfigs/TransitionPresets',
  () => 'TransitionPresets',
);
