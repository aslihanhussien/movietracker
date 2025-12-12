import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchResults />
    </div>
  );
}

export default App;