import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import AllServicesSection from './Components/services';
import AllProductSection from './Components/products';
import ServiceDetails from './Components/ServiceDetail';
import ProductDetails from './Components/productDetail';
import Cart from './Components/Cart';
import CheckoutPage from './Components/checkout';
import Profile from './Components/profile';
import BookService from './Components/BookService';
import { CartProvider } from './Context/cartcontext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route exact path="/services" component={AllServicesSection} />
          <Route exact path="/products" component={AllProductSection} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/service/:id" component={ServiceDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/book-service" component={BookService} /> {/* Added BookService Route */}
          <Redirect to="/not-found" />
        </Switch>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
