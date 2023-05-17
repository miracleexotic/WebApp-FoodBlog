import AppRouter from './components/AppRouter';

function App() {
  const token = true;

  return (
    <div>
      {token ? (<AppRouter />) : (<div>Sign In</div>)}
    </div>
  );
}

export default App;
