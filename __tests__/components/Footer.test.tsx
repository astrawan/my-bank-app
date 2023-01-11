import React from 'react';

import renderer from 'react-test-renderer';

import { AppContextProvider } from '../../src/components/AppContext';

import Footer from '../../src/components/Footer';

import Wrapper from '../Wrapper';

const state = {
  routes: [
    {
      key: 'RootStack--aCknbAZFQ1Ft6OZEmJ__',
      name: 'RootStack',
      params: undefined,
    },
    {
      key: 'Catalogue-DuMRh764RXL48xnNgJCHL',
      name: 'Catalogue',
      params: undefined,
    },
    {
      key: 'History-rlRHO5jWN9_eWCkAd12WE',
      name: 'History',
      params: undefined,
    },
    {
      key: 'Menu-PKsDVXPRl62u0P3wT5A6-',
      name: 'Menu',
      params: undefined,
    },
  ],
};

const descriptors = {
  'Catalogue-DuMRh764RXL48xnNgJCHL': {
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      return Footer.createIcon(
        {
          name: 'albums-outline',
        },
        focused,
      );
    },
  },
  'History-rlRHO5jWN9_eWCkAd12WE': {
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      return Footer.createIcon(
        {
          name: 'time-outline',
        },
        focused,
      );
    },
  },
  'Menu-PKsDVXPRl62u0P3wT5A6-': {
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      return Footer.createIcon(
        {
          name: 'menu-outline',
        },
        focused,
      );
    },
  },
  'RootStack--aCknbAZFQ1Ft6OZEmJ__': {
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      return Footer.createIcon(
        {
          name: 'home-outline',
        },
        focused,
      );
    },
  },
};

describe('<Footer />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Wrapper>
          <AppContextProvider
            value={{ footerVisible: true, setFooterVisibility: () => {} }}
          >
            {/* @ts-ignore-next-line */}
            <Footer descriptors={descriptors} state={state} />
          </AppContextProvider>
        </Wrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
