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
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import HookForm from "./components/HookForm";
import ZodForm from "./components/ZodForm";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import categories from "./expense-tracker/categories";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ProductList from "./components/ProductList";

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

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const updateCart = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  const [expenses, setExpenses] = useState([
    { id: 1, description: "AAA", amount: 10, category: "Utilities" },
    { id: 2, description: "BBB", amount: 10, category: "Utilities" },
    { id: 3, description: "CCC", amount: 10, category: "Utilities" },
    { id: 4, description: "DDD", amount: 10, category: "Entertainment" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category == selectedCategory)
    : expenses;
    const [category,setCategory] = useState('');
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

      {/* <ListGroupInJS
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

      <ExpandableText>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate harum error quis aperiam quidem ea perspiciatis eaque aspernatur tenetur a sequi repudiandae corrupti dicta distinctio fugit, nihil fuga? Sed ipsa quisquam, voluptas laudantium quasi deserunt id nisi? Eius asperiores nostrum eligendi fugiat fuga voluptatem, recusandae odit itaque minus dolore repellendus distinctio eum tenetur illo perspiciatis earum modi ducimus magni. Error quia id, doloribus voluptatibus delectus non cupiditate excepturi odit beatae quas cumque libero ex fugit eaque animi ratione consequuntur veritatis illo! Animi fugit optio neque temporibus eum adipisci commodi quam et nulla, officia at perspiciatis reiciendis necessitatibus accusantium eius praesentium?</ExpandableText>
    </div> 
    <Form />
    <h2>Hook Form</h2>
    <HookForm />
    
    <h2>Zod plus Hook form</h2>
    <ZodForm />
    

    <ExpenseTracker />
*/}
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-5">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <select className="form-select" onChange={(event) => setCategory(event.target.value) }>
        <option value="Clothing">Clothing</option>
        <option value="Household">Housing</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}



export default App;
