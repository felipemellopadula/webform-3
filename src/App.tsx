import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Calendar } from "./components/Calender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
