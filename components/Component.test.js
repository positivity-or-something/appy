import React from 'react';
import Comment from './comment/Comment';
import Footer from './footer/Footer'
import renderer from 'react-test-renderer';
import LoginButton from './header/LoginButton';
import Search from './search/Search';

test('renders correctly', () => {
  const tree = renderer.create(<Comment />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly1', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly2', () => {
  const tree = renderer.create(<LoginButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly3x', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});