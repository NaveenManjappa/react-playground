// import { useState } from "react";
// import Alert from "./components/Alert";
import ButtonCss from "./components/ButtonCss/ButtonCss";
// import ListGroup from "./components/ListGroup";
import { BsCalendar2DayFill } from "react-icons/bs";
import "./App.css";
import ListGroupInJS from "./components/ListGroupInJS/ListGroupInJS";
import Like from "./components/Like/Like";

function App() {
  // const [alertVisible, setAlertVisibility] = useState(false);
  // const handleClose = () => setAlertVisibility(false);
  const items = ["Banglore", "London"];
  const handleSelectItem = () => console.log("item");
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
      {/* <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /> */}

      <ListGroupInJS
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <BsCalendar2DayFill color="blue" size="60" />
      <br />
      <ButtonCss />
      <br />
      <Like onClick={()=>console.log('Liked')}/>
    </div>
  );
}

export default App;
