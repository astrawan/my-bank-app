/* Fix inconsistent value of Pagination's inactiveDotScale in snapshot */
/* eslint-disable react/react-in-jsx-scope,no-restricted-exports */
const R = jest.requireActual('react-native');
const C = jest.requireActual('react-native-snap-carousel');

const { default: Carousel } = C;
function Pagination() {
  return <R.View />;
}

export { Carousel as default, Pagination };
