import React from 'react';
// import { withRouter } from 'react-router-dom'


class ScrollToTop extends React.Component{
  componentDidUpdate(prevProps) {
    // Scroll to top when location changes,
    // but only if the pathname doesnt include pagination.
    //
    // This stops the window from scrolling to the top
    // when we click a 'Load More'
    if (
      this.props.location !== prevProps.location &&
      this.props.location.pathname.indexOf('/page=') === -1
    ) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollToTop;
