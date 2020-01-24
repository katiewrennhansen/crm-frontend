import React from 'react';
import ReactDOM from 'react-dom';
import UserHome from './UserHome';
import { withRouter } from 'react-router-dom'

describe('User Home', () => {
    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( withRouter(<UserHome />), div);
        ReactDOM.unmountComponentAtNode(div);
      });
})