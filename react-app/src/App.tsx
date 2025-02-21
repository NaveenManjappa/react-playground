// import { useState } from "react";
// import Alert from "./components/Alert";
// import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import './App.css';
function App() {
  // const [alertVisible, setAlertVisibility] = useState(false);
  // const handleClose = () => setAlertVisibility(false);
  const items = ['Banglore','London'];
  const handleSelectItem = () => console.log('item')
  return (
    <div>
      {/* {alertVisible && (
        <Alert onClose={handleClose}>
          Hello <span>World!</span>
        </Alert>
      )}
      <Button color="success" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button> */}
      <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />
    </div>
  );
}

export default App;
