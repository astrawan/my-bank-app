import React from 'react';

import renderer from 'react-test-renderer';

import BottomSheet, {
  TransactionBottomSheetContent,
} from '../../src/components/BottomSheet';

import Wrapper from '../Wrapper';

describe('<BottomSheet />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Wrapper>
          <BottomSheet snapPoints={['75%', '100%']}>
            <TransactionBottomSheetContent />
          </BottomSheet>
        </Wrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
