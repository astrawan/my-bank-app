import type {
  Animated,
  ImageSourcePropType,
  RegisteredStyle,
  ViewStyle,
} from 'react-native';

type AnimatedComponentStyle =
  | false
  | Animated.Value
  | Animated.AnimatedInterpolation<string | number>
  | RegisteredStyle<ViewStyle>
  | Animated.WithAnimatedObject<ViewStyle>
  | Animated.WithAnimatedArray<ViewStyle>
  | null;

export type CreditCardProps = {
  cardBackground: ImageSourcePropType;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  cardIssuerLogo: ImageSourcePropType;
  cardLogo: ImageSourcePropType;
  cardNumber: string;
  containerStyle?: ViewStyle;
  height?: number;
  onPress?: () => void;
  style?: AnimatedComponentStyle;
  width: number;
  withShadow?: boolean;
};

export type CardItem = Pick<
  CreditCardProps,
  'cardExpiryMonth' | 'cardExpiryYear' | 'cardNumber'
> & {
  balance: number;
  cardBackgroundP: ImageSourcePropType;
  cardBackgroundL: ImageSourcePropType;
  cardIssuerLogoP: ImageSourcePropType;
  cardIssuerLogoL: ImageSourcePropType;
  cardLogoP: ImageSourcePropType;
  cardLogoL: ImageSourcePropType;
  name: string;
};

export type TransactionHistory = {
  name: string;
  icon: string;
  colors: [string, string];
  description?: string;
  amount: number;
};

export type RootStackParamList = {
  CardDetail: {
    item: CardItem;
  };
  Home: any;
  SharedCardDetail: {
    item: CardItem;
  };
};
