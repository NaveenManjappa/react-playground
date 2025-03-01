import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/userService";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      let cancel = () => {};
      try {
        setIsLoading(true);
        await delay(5000);
        const response = userService.getAll<User>();
        const res = await response.request;
        cancel = response.cancel;
        setUsers(res.data);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
        cancel();
      }
    };
    fetchUsers();
    //.then((res) => setUsers(res.data))
    //.catch((error) => setError(error.message));

    return () => {
      controller.abort();
    };
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id != user.id));
    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Abc" };
    setUsers([newUser, ...users]);
      userService.create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
