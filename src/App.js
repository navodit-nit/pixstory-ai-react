import React, { useState } from "react";
import "./App.css";
import Advanced from "./examples/Advanced";
import Simple from "./examples/Simple";
import Advanced2 from "./examples/Advanced2";

import NavBar from "./components/NavBar";

function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  return (
    <div className="app">
      <NavBar />
      {showAdvanced ? <Advanced2 /> : <Simple />}
      <div className="row">
        {/* <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} /> */}
      </div>
    </div>
  );
}

export default App;
