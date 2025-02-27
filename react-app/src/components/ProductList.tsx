import { useEffect, useState } from "react";


const connect = () => console.log('Connecting');
const disconnect = () => console.log('Disconnecting');

const ProductList = ({category}:{category:string}) => {
  const [products,setProducts] = useState<string[]>([]);

  useEffect(() => {
    connect();
    console.log('Fetching products');
    setProducts(['Clothing','Housing']);
    document.title = 'My App';

    return () => disconnect();//cleanup function which runs after dismounting the component

  },[category]);

  return (
    <div>
      <h2>Product List</h2>
    </div>
  )
}

export default ProductList