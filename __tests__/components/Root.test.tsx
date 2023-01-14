import React from 'react';

import renderer from 'react-test-renderer';

import Wrapper from '../Wrapper';

import Root from '../../src/components/Root';

describe('<Root />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Wrapper>
          <Root />
        </Wrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
