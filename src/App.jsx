import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Arquivo: routes/index.jsx

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
