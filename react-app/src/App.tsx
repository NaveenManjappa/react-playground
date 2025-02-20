import ListGroup from "./components/ListGroup";

let items = ["New York", "Bangalore", "London", "Tokyo","Paris"];
const handleSelectItem = (item:string) => console.log(item);

function App() {
  return <div>
    <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
  </div>
}

export default App;