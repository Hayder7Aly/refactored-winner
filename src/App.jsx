import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
     <Navbar />
      <Outlet />
    </>
  );
}

export default App;
