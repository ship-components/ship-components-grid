# ship-components-grid
[React](http://facebook.github.io/react/) [masonry](http://masonry.desandro.com/) layout. Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and is compiled down to ES5 using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-grid.svg?maxAge=2592000)](https://www.npmjs.com/package/ship-components-grid)
[![Build Status](http://img.shields.io/travis/ship-components/ship-components-grid/master.svg?style=flat)](https://travis-ci.org/ship-components/ship-components-grid)
[![Coverage](http://img.shields.io/coveralls/ship-components/ship-components-grid.svg?style=flat)](https://coveralls.io/github/ship-components/ship-components-grid)
[![devDependencies](https://img.shields.io/david/dev/ship-components/ship-components-grid.svg?style=flat)](https://david-dm.org/ship-components/ship-components-grid?type=dev)

## Usage

### ES6/JSX (Recommended)
The component is written using ES6/JSX therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
import React from 'react';
import Grid from 'ship-components-grid';

export default class View extends React.Component {
  render() {
    return (
      <Grid
        className='grid'
        fitWidth
      >
        {this.props.items.map(item => {
          return (
            <div
              key={item.id}
              // Grid appends a classname to all children. It's required for
              // masonry to work.
              className={item.className}
            />
          )
        })}
      </Grid>
    );
  }
}
```

## Examples and Development
Examples can be found in the `examples/` folder. A development server can be run with:

```shell
$ npm install
$ npm start
```

This will live reload any changes you make and serve them at http://localhost:8080.

### Webpack Configuration
This module is designed to be used with webpack but requires a few loaders if you are pulling the source into another project.

```shell
$ npm install webpack babel-loader --save-dev
```

Below are is a sample of how to setup the loaders:

```js
/**
 * Relevant Webpack Configuration
 */
{
  [...]
  module: {
    loaders: [
      // Setup support for ES6
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      // ES6/JSX for external ship-components modules
      {
        test: /\.(jsx?|es6)$/,
        include: [
          /ship-components\-.*\/src/
        ],
        loader: 'babel'
      }
    ]
  }
  [...]
}
```

## Tests
1. `npm install`
2. `npm test`

## History
* 0.2.2 - Added more fixes for narrow screens
* 0.2.1 - Added a fix to not update layout when masonry isn't active
* 0.2.0 - Added option to disable under certain widths
* 0.1.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2016 SHIP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
