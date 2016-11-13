import React from 'react';
import Timer from './index';
import {mount} from 'enzyme';
import {jsdom} from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;


it('renders correctly and begins at 0', () => {
  const timer = mount(
    <Timer duration={10}>
      {(seconds, percent) => {
        return(<div>{seconds}</div>)
      }}
    </Timer>
  )

  expect(timer.text()).toEqual('0')
})
