import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Layout/Login/Login";
import { HomePage } from "./Layout/HomePage/HomePage";
import { Register } from "./Layout/Register/Register";
import User from "./Layout/User/User.jsx";
import { Admin } from "./Layout/Admin/Admin";
import { Trainer } from "./Layout/Trainer/Trainer";
import { Missing } from "./Layout/Missing/Missing";
import ProtectedRoute from "./Layout/ProtectedRoute";
import CourseSchedulePage from "./Layout/User/CourseSchedulePage";

const ROLES = {
  Client: "Client",
  Admin: "Admin",
  Trainer: "Trainer",
};

function App() {
  return (
    <main className="App">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="linkpage" element={<LinkPage />} /> */}

        {/* protected routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.Client, ROLES.Admin, ROLES.Trainer]}
            />
          }
        >
          <Route path="user" element={<User />} />
          <Route
            path="course-schedule/:courseId"
            element={<CourseSchedulePage />}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.Trainer]} />}>
          <Route path="trainer" element={<Trainer />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </main>
  );
}

export default App;
