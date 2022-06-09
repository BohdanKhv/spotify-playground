import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from './pages/Callback';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/callback' element={<Callback/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;