// src/App.jsx
import TicketPurchaseForm from './components/TicketPurchaseForm.jsx'; // Import the component
import './App.css'; // Optional: for App-specific styles

function App() {
  return (
    <div className="App">
      {/* You could add a global header/navbar here if needed */}
      <TicketPurchaseForm />
      {/* You could add a global footer here */}
    </div>
  );
}

export default App;