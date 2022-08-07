import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Product from './containers/product/Product';
import Counter from './containers/Counter/Counter';
import {Provider} from 'react-redux';
import { configureStore } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'

function App() { 
  const {store , persistor} = configureStore()
  return ( 
    <>
      <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout >
          <Switch>
            <Route path={'/product'} exact component={Product}></Route>
            <Route path={'/counter'} exact component={Counter}></Route>
          </Switch>
        </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
