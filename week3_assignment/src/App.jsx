import { useState } from "react";
import Header from "./components/Header";
import BaseballGame from "./components/BaseballGame";
import Github from "./components/GitHub";

export default function App() {
  const [tab, setTab] = useState("github");
  return (
    <div className="min-h-screen bg-gray-50">
      <Header tab={tab} setTab={setTab} />
      <main className="pt-32">
        {tab === "github" && <Github />}
        {tab === "baseball" && <BaseballGame />}
      </main>
    </div>
  );
}