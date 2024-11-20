// src/App.jsx
import Home from './pages/Home/Home';
import './styles.css';

const App = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Home />
    </div>
  );
};

export default App;