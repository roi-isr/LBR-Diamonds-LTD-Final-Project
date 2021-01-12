

/* using react-router-dom for implementing multi-page application with a router component */

import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import BasicTable from '../Components/StockTable/StockTable';
import DeliveryTable from '../Components/DeliveryCheck/DeliveryFile';
import SellTable from '../Components/SellTable/SellTable';

const paths = [
    { attr: { path: '/admin/reports' }, component: <BasicTable /> },
    { attr: { path: '/admin/delivery' }, component: <DeliveryTable /> },
    { attr: { path: '/admin/sell' }, component: <SellTable /> },
]

class AdminRouter extends React.Component {
    render() {
        const switchContainer =
            <Switch>
                {paths.map((item, index) =>
                    <Route
                        key={index}
                        {...item.attr}>
                        {item.component}
                    </Route>
                )}
            </Switch>;
        return (
            <Router>
                {switchContainer}
            </Router>
        );
    }
}

export default AdminRouter;