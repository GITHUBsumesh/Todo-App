import { render } from 'preact'
import './index.css'
import App  from './app.tsx'
import { createContext } from "preact";
import { useState } from "preact/hooks";

export const server = "http://localhost:4000/api/v1";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  user: {},
  setUser: (user: object) => {},
  loading: false,
  setLoading: (value: boolean) => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      <App />
    </Context.Provider>
  );
};
render(<AppWrapper />, document.getElementById('app')!)
