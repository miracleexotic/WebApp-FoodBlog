import AppRouter from './components/AppRouter';
import AuthRouter from './components/AuthRouter';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div>
      {token ? (<AppRouter />) : (<AuthRouter />)}
    </div>
  );
}

export default App;
