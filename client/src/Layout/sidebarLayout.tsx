import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button"; // Import your button component
import { Menu } from "lucide-react"; // Import the Menu icon

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar Component */}
      <AppSidebar />

      <main>
        {/* Sidebar Trigger with Custom Styling */}
        <SidebarTrigger>
          <Button
            variant="ghost"
            className="fixed top-4 left-4 z-50" // Example positioning
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} /> {/* Menu Icon */}
          </Button>
        </SidebarTrigger>

        {/* Main Content */}
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
