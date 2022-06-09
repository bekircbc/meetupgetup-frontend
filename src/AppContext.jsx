import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const url = "https://meetupgetup-backend.herokuapp.com/";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      setLoadedMeetups((await axios.get(url)).data);
      setIsLoading(false);
    })();
  }, [loadedMeetups]);

  function toggleFavoriteStatusHandler(meetup) {
    meetup.isFavorite = !meetup.isFavorite;
    setLoadedMeetups([...loadedMeetups]);
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loadedMeetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
