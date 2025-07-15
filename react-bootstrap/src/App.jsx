import { useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './Pages/Home';
import CounterBanner from './Pages/Banner';
import Course from "./Pages/Courses"; // ✅ corrected import
import Location from './Pages/We Are/Location';

function App() {
  return (
    <>
      <Header />
      <Home />
      <CounterBanner />
      <Course />
      <Location />
      <Footer />
    </>
  );
}

export default App;
