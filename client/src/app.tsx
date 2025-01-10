import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { lazy, Suspense, useContext, useEffect } from "preact/compat";
import { Context, server } from "./main.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home.tsx"));
const MainLayout = lazy(() => import("./Layout/MainLayout.tsx"));
const LoginSignUpPage = lazy(() => import("./pages/LoginSignUpPage.tsx"));

const App = () => {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/auth/profile`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, [setUser, setIsAuthenticated, setLoading]);
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <BrowserRouter>
        <Suspense fallback>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/auth" element={<LoginSignUpPage />} />
              
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
