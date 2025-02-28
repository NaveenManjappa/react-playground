import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users1"
        );
        setUsers(res.data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };
    fetchUsers();
    //.then((res) => setUsers(res.data))
    //.catch((error) => setError(error.message));
  }, []);
  return (
    <>
      {error && <p>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
