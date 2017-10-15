// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { store } from '../store';
// import { Provider } from 'react-redux';
// class Modal extends Component {
//   comoponentDidMount() {
//     this.modalTarget = document.createElement('div');
//     this.modalTarget.className = 'modal';
//     document.body.appendChild(this.modalTarget);
//     this._render();
//   }
//
//   _render() {
//     ReactDOM.render(
//       <Provider store={store}>
//         <div>{this.props.children}</div>
//       </Provider>,
//       this.modalTarget
//     );
//   }
//
//   componentWillUpdate() {
//     this._render();
//   }
//
//   componentWillUnmount() {
//     ReactDOM.unmountComponentAtNode(this.modalTarget);
//     document.body.removeChild(this.modalTarget);
//   }
//
//   render() {
//     return <noscript />;
//   }
// }
