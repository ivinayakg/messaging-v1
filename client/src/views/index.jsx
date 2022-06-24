import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../services/utils";
import Homepage from "./homepage";
import Login from "./login";
import Register from "./register";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index path="*" element={<Homepage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default Main;
