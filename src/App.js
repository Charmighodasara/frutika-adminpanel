import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Product from './containers/product/Product';
import Counter from './containers/Counter/Counter';
import {Provider} from 'react-redux';
import { configureStore } from './Redux/Store';

function App() { 
  const store = configureStore()
  return ( 
    <>
      <Provider store = { store}>
        <Layout >
          <Switch>
            <Route path={'/product'} exact component={Product}></Route>
            <Route path={'/counter'} exact component={Counter}></Route>
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
