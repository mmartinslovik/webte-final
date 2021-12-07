
import './App.css';
import LogoList from './components/LogoList';


function App() {
  const appendName = (name) => {
    return `Hi ${name}!`
  }

  return (
    <div className="App">
     <div className="container">
       <h1>{appendName('Melman')}</h1>
     </div>
     <LogoList />
    </div>
  );
}

export default App;
