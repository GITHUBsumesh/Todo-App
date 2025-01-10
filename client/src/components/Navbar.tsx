import { CalendarIcon, Home, LogOut, Menu, User } from "lucide-react";
import { NavbarIcon } from "./features.tsx";
import { useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card.tsx";
import { Button } from "./ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";
import { Context, server } from "@/main.tsx";
import { useContext, useState } from "preact/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Switch } from "./ui/switch.tsx";
import { Label } from "./ui/label.tsx";
import { useTheme } from "./theme-provider.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar.tsx";
import Layout from "@/Layout/sidebarLayout.tsx";
import { AppSidebar } from "./sidebar.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setLoading } =
    useContext(Context);
  const handleHome = () => {
    console.log("Home");
    navigate("/");
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const req = await axios.get(`${server}/auth/logout`, {
        withCredentials: true,
      });
      toast.success(req.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    // Toggle between "light" and "dark" themes
    setTheme(checked ? "dark" : "light");
  };
  // Menu items.
  // const items = [
  //   // {
  //   //   title: "Theme",
  //   //   url: "#",
  //   //   icon: Search,
  //   // },
  //   {
  //     title: "Home",
  //     url: "/",
  //     icon: Home,
  //   },
  //   {
  //     title: "Profile",
  //     url: "#",
  //     icon: User,
  //   },
  //   {
  //     title: "Logout",
  //     url: "#",
  //     icon: LogOut,
  //   },
  // ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-screen h-[64px] px-2">
      {/* Left Section: App Name */}
      <div className="flex justify-start text-2xl">
        <button onClick={handleHome}>
          <h1 className="text-4xl font-bold ml-2">TodoApp</h1>
        </button>
      </div>

      {/* Right Section: Actions */}

      <div className="flex justify-end items-center gap-5">
        <div className=" ">
          <Switch
            id="theme"
            checked={theme === "dark"}
            onCheckedChange={handleThemeChange}
          />{" "}
          <Label htmlFor="theme"></Label>
          {isAuthenticated ? (
            <>
              {/* Home Button */}
              <NavbarIcon
                Icon={<Home strokeWidth={3} />}
                Content="Home"
                EventHandler={handleHome}
              />

              {/* User Avatar with Tooltip */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost">
                    <User strokeWidth={3} />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-50">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@{user.name}</h4>
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined {moment(user?.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {/* Logout Icon */}
              <NavbarIcon
                Icon={<LogOut strokeWidth={3} size={5} />}
                Content="Logout"
                EventHandler={handleLogout}
              />
            </>
          ) : (
            ""
          )}
        </div>
        {/* <div className="block ">
          <SidebarProvider open={open} onOpenChange={setOpen}>
        
            <SidebarTrigger>
              <Button
                variant="ghost"
                onClick={() => setOpen(!open)} 
                aria-label="Toggle Sidebar"
              >
                <Menu /> 
              </Button>
            </SidebarTrigger>
            <AppSidebar />
            <SidebarRail />
          </SidebarProvider>
          <Layout>
            <div>
              <h1>Welcome to My App</h1>
              <p>Use the menu icon to open the sidebar.</p>
            </div>
          </Layout>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
