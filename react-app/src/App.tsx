// import { useState } from "react";
// import Alert from "./components/Alert";
import ButtonCss from "./components/ButtonCss/ButtonCss";
// import ListGroup from "./components/ListGroup";
import { BsCalendar2DayFill } from "react-icons/bs";
import "./App.css";
import ListGroupInJS from "./components/ListGroupInJS/ListGroupInJS";
import Like from "./components/Like/Like";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  // const [alertVisible, setAlertVisibility] = useState(false);
  // const handleClose = () => setAlertVisibility(false);
  const items = ["Banglore", "London"];
  const handleSelectItem = () => console.log("item");
  const [cartitems, setCartItems] = useState(["Product1", "Product2"]);
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });
  const handleClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom", "Tomato"],
  });

  const addTopping = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "Cheese"] });
  };

  const [cart,setCart] = useState({
    discount:0.1,
    items:[
      { id: 1,title:'Product 1',quantity:1},
      { id:2, title:'Product 2',quantity:1}
    ]
  });

  const updateCart = () => {
    setCart({
      ...cart,
      items:cart.items.map(item => item.id === 1 ? { ...item,quantity:item.quantity+1}:item)
    });
  }
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
      <Like onClick={() => console.log("Liked")} />

      <NavBar cartItemsCount={cartitems.length} />
      <Cart cartItems={cartitems} onClear={() => setCartItems([])} />
      <p>Player name: {game.player.name}</p>
      <button onClick={handleClick}>Update Game</button>
      <p>Pizza toppings: {pizza.toppings.join(" ")}</p>
      <button onClick={addTopping}>Add Topping</button>
      <p>Cart items: {cart.items[0].quantity}</p>
      <button onClick={updateCart}>Update quantity</button>
    </div>
  );
}

export default App;
