import 'bootstrap/dist/css/bootstrap.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Loading from './components/Loading';
const Main = lazy(() => import("./components/Main"));
const ProductList = lazy(() => import("./features/shop/ProductList"));
const Home = lazy(() => import("./features/shop/Home"));
const LoginMain = lazy(() => import("./features/user/LoginMain"));
const Cart = lazy(() => import("./features/user/Cart"));
const Register = lazy(() => import("./features/user/Register"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Main />}>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Home />} />
            <Route path='category/:categoryId' element={<ProductList />} />
          </Route>
          <Route path="/user" element={<LoginMain />}>
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
