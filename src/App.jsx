import { Routes, Route } from 'react-router-dom';
import { ApplicationViews } from './views/ApplicationViews.jsx';
import { LocationList } from './components/locations/LocationList';
import { MyReviews } from './components/reviews/MyReviews.jsx';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Authorized } from './views/Authorized';

export const App = () => {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected routes for logged-in users */}
      <Route path='*' element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      }>
        {/* Nested routes that will be rendered in Outlet */}
        <Route path="locations" element={<LocationList />} />
        <Route path="my-reviews" element={<MyReviews />} />
      </Route>
    </Routes>
  );
};

export default App;
