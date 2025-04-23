import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CourseTypes from './pages/CourseTypes';
import Courses from './pages/Courses';
import Offerings from './pages/Offerings';
import Registrations from './pages/Registrations';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/course-types" element={<CourseTypes />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/offerings" element={<Offerings />} />
              <Route path="/registrations" element={<Registrations />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;