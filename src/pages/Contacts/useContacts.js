import { useState, useEffect } from "react";

export const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    getContacts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

