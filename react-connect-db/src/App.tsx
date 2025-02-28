import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        await delay(5000);
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setUsers(res.data);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
    //.then((res) => setUsers(res.data))
    //.catch((error) => setError(error.message));

    return () => {
      controller.abort();
    };
  }, []);

  const deleteUser = (user:User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id != user.id));
    axios.delete('https://jsonplaceholder.typicode.com/users1/'+user.id)
    .catch(error => {
      setError(error.message);
      setUsers(originalUsers);
    })
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}

      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between">{user.name} <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button></li>
        ))}
      </ul>
    </>
  );
}

export default App;
