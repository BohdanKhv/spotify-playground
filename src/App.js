import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Callback from './pages/Callback';
import { Nav } from './components';


const App = () => {

  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/callback' element={<Callback/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;