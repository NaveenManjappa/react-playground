import { useState } from "react";
import  './ListGroupInJS.css';
import styled from 'styled-components';

const List = styled.ul`
list-style:none;
padding:0;
`;
interface ListItemProps {
  active:boolean;
}

const ListItem = styled.li<ListItemProps>`
padding:5px 0;
background-color:${props => props.active ? 'lightblue': 'none'};
`;

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroupInJS({ items, heading, onSelectItem }: Props) {
  //Hook - a function to tap into features of react
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No Items found!</p>}
      <List>
        {items.map((item, index) => (
          <ListItem
            key={index}
            active={index === selectedIndex}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroupInJS;
