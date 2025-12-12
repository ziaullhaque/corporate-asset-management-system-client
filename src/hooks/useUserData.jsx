import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
        .then((res) => {
          setUserData(res.data);
          setLoadingUserData(false);
        })
        .catch(() => setLoadingUserData(false));
    }
  }, [user]);
  console.log(userData);

  return { userData, loadingUserData };
};

export default useUserData;
