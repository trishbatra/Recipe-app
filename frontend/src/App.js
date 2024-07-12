import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import {Route, Routes} from 'react-router-dom'
import Postrecipe from './Components/Postrecipe';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Recipes from './Components/Recipes';
import Rec from './Components/Rec';
import RecipeState from './Context/RecipeState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
            <ToastContainer
        position="bottom-center"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RecipeState>
      <Routes>
            <Route  path="/" element={<Home/>}></Route>
            <Route  path="/About" element={<About/>}></Route>
            <Route  path="/post" element={<Postrecipe/>}></Route>
            <Route  path="/signup" element={<Signup/>}></Route>
            <Route  path="/login" element={<Login/>}></Route>
            <Route  path="/recipes" element={<Recipes/>}></Route>
            <Route  path="/rec" element={<Rec/>}></Route>
      </Routes>
      </RecipeState>
    </div>
  );
}

export default App;
