import { useState } from "react";
function ListGroup() {
  let items = ["New York", "Bangalore", "London", "Tokyo"];
  
  //Hook - a function to tap into features of react
  const [selectedIndex, setSelectedIndex ] = useState(-1);

  
  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Items found!</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className={ selectedIndex === index ? 'list-group-item active' : 'list-group-item'} onClick={() => setSelectedIndex(index)}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
