import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Layout from "./layout/Layout";
import UserDetails from "./pages/userDetails";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
