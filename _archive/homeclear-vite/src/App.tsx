import { useState } from "react";
import { addProject, type Project } from "./lib/projects";
import { StartPage } from "./pages/StartPage";
import { DashboardPage } from "./pages/DashboardPage";

type View = "start" | "dashboard";

function App() {
  const [view, setView] = useState<View>("start");

  function handleProjectCreated(_project: Project) {
    setView("dashboard");
  }

  if (view === "dashboard") {
    return <DashboardPage onBackToStart={() => setView("start")} />;
  }

  return <StartPage onProjectCreated={handleProjectCreated} />;
}

export default App;
