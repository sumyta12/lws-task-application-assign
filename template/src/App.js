import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Index from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/addnew" element={<Add />} />

          <Route path="/edit/:taskId" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
