import React from "react";

export class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-indicator">
          <span className="error-indicator title">BOOM!</span>
          <span>something has gone terribly wrong</span>
          <span>(but we have sent a technicians to fix it)</span>
        </div>
      );
    }

    return this.props.children;
  }
}
