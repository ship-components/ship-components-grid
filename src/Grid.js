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

    // Ensure the right contexts
    this._resizeHandler = this._resizeHandler.bind(this);
    this.forceLayout = this.forceLayout.bind(this);
    this.setupMasonry = this.setupMasonry.bind(this);
    this.destroyMasonry = this.destroyMasonry.bind(this);
  }

  /**
   * Setup
   */
  componentDidMount() {
    if (!isBrowser) {
      return;
    }

    // Bind resize so we can make responsive checks
    window.addEventListener('resize', this._resizeHandler);

    if (typeof this.props.minWidth !== 'number' || this.props.minWidth <= 0) {
      this.setupMasonry();
    } else {
      this._resizeHandler();
    }
  }

  /**
   * Disable masonry if we switch to disable mode
   */
  componentWillReceiveProps(nextProps) {
    if (this.masonry && this.props.disabled === false && nextProps.disabled === true) {
      this.destroyMasonry();
    } else if (!this.masonry && this.props.disabled === true && nextProps.disabled === false){
      this.setupMasonry();
    }
  }

  /**
   * Updates
   */
  componentDidUpdate() {
    if (this.props.disabled || !this.masonry || !isBrowser) {
      return;
    }

    // reload all items in container (bad for performance - should find a way
    // to append/prepend by disabling react render)
    this.masonry.reloadItems();

    if (this.props.imagesLoaded) {
      // relayout again when images are loaded
      this.reloadWhenImagesAreLoaded();
    } else {
      // relayout after reloading items
      this.masonry.layout();
    }

    // force resize event
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
    this.destroyMasonry();
  }

  /**
   * Setup masonry but only if were not already setup or disabled
   */
  setupMasonry() {
    if (this.props.disabled || this.masonry) {
      return;
    }
    let el = ReactDOM.findDOMNode(this.refs.container);

    // create masonry for specified container
    this.masonry = new Masonry(el, {
      transitionDuration: this.props.transitionDuration,
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
   * Disable and cleanup
   */
  destroyMasonry() {
    if (this.masonry) {
      this.masonry.destroy();
      delete this.masonry;
    }
  }

  /**
   * Responsive toggle
   */
  _resizeHandler() {
    if (typeof this.props.minWidth !== 'number' || this.props.minWidth <= 0) {
      return;
    }
    if (window.innerWidth < this.props.minWidth) {
      this.destroyMasonry();
    } else {
      this.setupMasonry();
    }
  }

  /**
   * Used to allow external components to update the grid using refs
   */
  forceLayout() {
    if (this.masonry) {
      this.masonry.layout();
    }
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
  percentPosition: false,
  transitionDuration: 0,
  minWidth: 0
};
