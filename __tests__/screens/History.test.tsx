import React from 'react';

import renderer from 'react-test-renderer';

import Screen from '../../src/screens/History';

import Wrapper from '../Wrapper';

describe('<History />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Wrapper>
          <Screen />
        </Wrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
