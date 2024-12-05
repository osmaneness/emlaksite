import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/DarkModeContext';
import Header from './components/Header';
import About from './sections/About';
import Properties from './sections/Properties';
import Footer from './components/Footer';
import PropertyDetails from './sections/PropertyDetails';
import axios from 'axios';
import AddListing from './sections/AddListing';
import DeleteProp from './sections/DeleteProp';
import AdminDashboard from './sections/AdminDashboard';
import AdminLogin from './sections/AdminLogin';
import ProtectedRoute from './sections/ProtectedRoute';

const App = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={
            <>

              <About />
              <Properties listings={listings} />

            </>
          } />
          <Route path="/property-details/:id" element={<PropertyDetails listings={listings} />} />
        </Routes>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-listing"
            element={
              <ProtectedRoute>
                <AddListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/delete-listing"
            element={
              <ProtectedRoute>
                <DeleteProp />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
