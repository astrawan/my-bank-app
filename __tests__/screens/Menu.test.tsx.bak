import React from 'react';

import renderer from 'react-test-renderer';

import Screen from '../../src/screens/Menu';

import Wrapper from '../Wrapper';

describe('<Menu />', () => {
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
