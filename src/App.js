import Create from './Components/Create/Create';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Read from './Components/Read/Read';
import Update from './Components/Update/Update';
import View from './Components/Read/ViewModal';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main">
        {/* <h2 className="main-header">Employee Management App</h2>
        <nav>
          <ul>
            <li><Link to='/read'>Home</Link></li>
            <li><Link to='/create'>Create New Employee</Link></li>
          </ul>
        </nav> */}
        <Routes>

          <Route path='/' exact element={<Read />} />


          <Route path='/create' exact element={<Create />} />


          <Route path='/read' exact element={<Read />} />



          <Route path='/update' exact element={<Update />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
