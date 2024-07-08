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
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/About" element={<About/>}></Route>
            <Route exact path="/post" element={<Postrecipe/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/recipes" element={<Recipes/>}></Route>
            <Route exact path="/rec" element={<Rec/>}></Route>
      </Routes>
      </RecipeState>
    </div>
  );
}

export default App;
