import React from 'react';
import ReactDOM from 'react-dom';
import AdminHome from './AdminHome';
import { withRouter } from 'react-router-dom'

describe('Admin Home', () => {
    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( withRouter(<AdminHome />), div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

