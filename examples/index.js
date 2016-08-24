/**
 * ES6 Grid Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src/Grid';

/**
 * Generate some blocks
 * @param  {Number} size Number to create
 * @return {Array<React>}
 */
function blocks(size) {
  let results = [];
  for (let i = 0; i < size; i++) {
    results.push(
      <div className='grid--item' />
    );
  }
  return results;
}

class Examples extends React.Component {
  render() {
    return (
      <div>
        <h1>Examples</h1>
        <div className='example-group'>
          <h2>{'<Grid />'}</h2>
          <Grid
            className='grid'
            fitWidth
          >
            {blocks(10)}
          </Grid>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
