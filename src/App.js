import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Product from './containers/product/Product';

function App() {
  return (
    <>
    <Layout >
      <Switch>
      <Route path={'/product'} exact component={Product}></Route>
      </Switch>
    </Layout>
    </>
  );
}

export default App;
