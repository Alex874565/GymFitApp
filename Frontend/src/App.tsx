import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Layout/Login/Login";
import { HomePage } from "./Layout/HomePage/HomePage";
import { Register } from "./Layout/Register/Register";
import { User } from "./Layout/User/User";
import { Admin } from "./Layout/Admin/Admin";
import { Trainer } from "./Layout/Trainer/Trainer";
import { Missing } from "./Layout/Missing/Missing";
import ProtectedRoute from "./Layout/ProtectedRoute";

const ROLES = {
  User: 2001,
  Admin: 5150,
  Trainer: 3001,
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
        <Route element={<ProtectedRoute allowedRoles={[ROLES.User]} />}>
          <Route path="user" element={<User />} />
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
