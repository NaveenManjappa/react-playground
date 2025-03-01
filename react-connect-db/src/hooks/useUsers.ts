import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-client";
import { AxiosError } from "axios";

const useUsers = () => {
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

  return { users,error,isLoading,setUsers,setError}
}

export default useUsers;