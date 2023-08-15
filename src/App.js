import { BrowserRouter,Routes,Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import PrivateComponents from "./components/PrivateComponent";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn"

// import Switch from 'react-ios-switch'
// import Advanced from './examples/Advanced'
// import Simple from './examples/Simple'

function App () {
  // const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className='app'>
    
      {/* {showAdvanced ? <Advanced /> : <Simple />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div> */}
      <BrowserRouter>
     <NavBar/>
     <LandingPage/>

      <Routes>
        <Route element={<PrivateComponents/>}>
         
          <Route path="/card" element={<Card/>}/>
        </Route>
        <Route path="/sign" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
      
        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
