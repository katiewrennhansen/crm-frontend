import React from 'react';
import ReactDOM from 'react-dom';
import BrokerHome from './BrokerHome';
import { withRouter } from 'react-router-dom'

describe('Broker Home', () => {
    //smoke test
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render( withRouter(<BrokerHome />), div);
        ReactDOM.unmountComponentAtNode(div);
      });
})