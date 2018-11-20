import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/common/Header";
import List from './components/list/List.js';
import NotFound from './components/notfound/NotFound';
import Detail from './components/detail/Detail';
import './crypto.css';

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route path="/crypto/" component={List} exact />  
                    <Route path="/crypto/currency/:id" component={Detail} exact />
                    <Route component={NotFound} />   
                    {/* everything else other than above */}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

