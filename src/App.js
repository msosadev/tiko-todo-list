import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Todo from './components/Todo/Todo';
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Welcome /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Todo />
    </div>
  );
}

export default App;
