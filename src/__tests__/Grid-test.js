jest.unmock('../Grid');
jest.unmock('masonry-layout');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Grid from '../Grid';

describe('Grid', function(){
  it('should support a className prop', function() {
    const customClassName = 'test-class';

    let reactTree = TestUtils.renderIntoDocument(
      <Grid
        className={customClassName}
      />
    );

    let el = TestUtils.findRenderedDOMComponentWithClass(reactTree, customClassName);

    expect(el).toBeDefined();
  });

  it('should inject itemSelector class into all children', function() {
    const customClassName = 'test-class';

    let reactTree = TestUtils.renderIntoDocument(
      <Grid
        itemSelector={'.' + customClassName}
      >
        <div />
      </Grid>
    );

    let el = TestUtils.findRenderedDOMComponentWithClass(reactTree, customClassName);

    expect(el).toBeDefined();
  });
});
