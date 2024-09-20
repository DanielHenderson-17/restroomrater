import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews.jsx";

export const App = () => {
  return (
    <Router>
      <ApplicationViews />
    </Router>
  );
};
