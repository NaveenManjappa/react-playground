function Message() {
  const name = "John";
  return <h1>Hello {name ? name : "World"}</h1>;
}

export default Message;
