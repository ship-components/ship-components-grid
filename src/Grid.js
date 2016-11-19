import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

/**
 * Used for server rendering
 * @type {Boolean}
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Masonry React Component for dynampic grids
 */
export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.forceLayout = this.forceLayout.bind(this);
  }

  /**
   * Setup
   * @return {[type]} [description]
   */
  componentDidMount() {
    if (this.masonry || this.props.disabled || !isBrowser) {
      return;
    }

    let el = ReactDOM.findDOMNode(this.refs.container);

    // create masonry for specified container
    this.masonry = new Masonry(el, {
      transitionDuration: 0,
      fitWidth: this.props.fitWidth,
      itemSelector: this.props.itemSelector,
      columnWidth: this.props.columnWidth,
      percentPosition: this.props.percentPosition
    });

    // relayout when images are loaded
    if (this.props.imagesLoaded) {
      this.reloadWhenImagesAreLoaded();
    } else {
      this.masonry.layout();
    }
  }

  /**
   * Update
   */
  componentDidUpdate() {
    if (!this.masonry || !isBrowser) {
      return;
    }

    // reload all items in container (bad for performance - should find a way
    // to append/prepend by disabling react render)
    this.masonry.reloadItems();

    // relayout after reloading items
    this.masonry.layout();

    // relayout again when images are loaded
    if (this.props.imagesLoaded) {
      this.reloadWhenImagesAreLoaded();
    }

    // force resize event
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  /**
   * Allow external components to froce the layout to update
   */
  forceLayout() {
    this.masonry.layout();
  }

  /**
   * Check if images are loaded yet
   */
  reloadWhenImagesAreLoaded() {
    if (!isBrowser) {
      return;
    }

    let el = ReactDOM.findDOMNode(this.refs.container);
    imagesLoaded(el, () => {
      this.masonry.layout();
    });
  }

  /**
   * Render
   * @return {React}
   */
  render() {
    return (
      <this.props.component
        className={classNames('ship-components-grid', this.props.className)}
        ref='container'
      >
        {React.Children.map(this.props.children, child => {
          if (!child) {
            return child;
          }

          // Inject itemSelector class
          return React.cloneElement(child, {
            className: classNames(child.props.className, this.props.itemSelector.substr(1, this.props.itemSelector.length - 1))
          });
        })}
      </this.props.component>
    );
  }
}

/**
 * Defaults
 * @type {Object}
 */
Grid.defaultProps = {
  imagesLoaded: false,
  fitWidth: false,
  itemSelector: '.ship-components-grid--item',
  component: 'div',
  percentPosition: false
};
