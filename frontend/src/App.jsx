import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import EventHandling from "./components/EventHandling";
import StateManagement from "./components/StateManagement";
import Todo from "./components/Todo";

import ManageUser from "./components/ManageUser";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./AppContext";
import UserAuth from "./UserAuth";
import UpdateUser from "./components/UpdateUser";
import Journal from "./components/Journal";
import MyJournals from "./components/MyJournals";

function App() {
  // loggedin

  return (
    <div>
      <Toaster position="top right" />
      <AnimatePresence mode="popLayout">
        <BrowserRouter>
          <AppProvider >
            {/* <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link> */}

            <Navbar />

            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<EventHandling />} path="/event" />
              <Route element={<StateManagement />} path="/state" />
              <Route element={<UserAuth> <Todo /> </UserAuth>} path="/todo" />
              <Route element={<UserAuth> <ManageUser /> </UserAuth>} path="/manageuser" />
              <Route element={<UpdateUser />} path="/updateuser/:id" />
              <Route element={<UserAuth> <Journal /> </UserAuth>} path="/journal" />
              <Route element={<UserAuth> <MyJournals /> </UserAuth>} path="/myjournal" />

              <Route element={<NotFound />} path="*" />
            </Routes>
          </AppProvider>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

// login
// signup

export default App;