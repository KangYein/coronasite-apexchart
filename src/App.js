
import Header from '../src/components/Header';
import CurrentChart from './components/CurrentChart';
import TotalChart from './components/TotalChart';
import './App.css';
import Vaccined from './components/Vaccined';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
      <Header></Header>
      <CurrentChart></CurrentChart>
      <TotalChart></TotalChart>
      <Vaccined></Vaccined>
      <Footer></Footer>
    </div>
  );
}

export default App;
