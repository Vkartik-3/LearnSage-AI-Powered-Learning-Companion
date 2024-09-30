// import "./index.css";
import "./App.css";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
} from "./sections";

import Courses from "./components/courses/Courses";
import LearnCourse from "./components/LearnCourse/LearnCourse";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Subject from "./components/Subject/Subject";
import Quiz from "./components/quiz/Quiz";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <main className="relative">
                <section className="xl:padding-l wide:padding-r padding-b" 
                style={{ backgroundImage: `url('src/assets/background-01.png')`,backgroundSize:'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
                  <Hero />
                </section>
                <section className="padding-x py-10" style={{ backgroundColor: '#e1e7eb' }}>
                  <Services />
                </section>
                <section className="padding">
                  <SpecialOffer />
                </section>
                <section className="padding-x sm:py-16 py-8 w-full" style={{ backgroundColor: '#e1e7eb' }}>
                  <Subscribe />
                </section>
                <section className="bg-black padding-x  pb-8">
                  <Footer />
                </section>
              </main>
            </>
          }
        />
        <Route path="/register" element={<Register toast={toast} />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/learn-course/:courseid"
          element={<LearnCourse toast={toast} />}
        />
        <Route path="/login" element={<Login toast={toast} />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
};

export default App;