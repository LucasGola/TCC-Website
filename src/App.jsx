import Header from './components/Header';
import PlantList from './components/PlantList';

const App = () => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Header />
        <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <PlantList />
        </main>
      </div>
    </>
  );
}

export default App;
