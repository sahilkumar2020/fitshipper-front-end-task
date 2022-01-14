import Address from "./pages/addresses";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <header className="App-header"></header>
      <Address />
      <ToastContainer />
    </div>
  );
}

export default App;
