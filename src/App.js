
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Signup from './Components/Signup';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import AllServicesSection from './Components/services';
import AllProductSection from './Components/products';
import ServiceDetails from './Components/ServiceDetail'
import ProductDetails from './Components/productDetail';
function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/services" component={AllServicesSection} />
    <Route exact path="/products" component={AllProductSection} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/service/:id" component={ServiceDetails} />
    <Redirect to="/not-found" />
  </Switch>
 </BrowserRouter>
  );
}

export default App;
