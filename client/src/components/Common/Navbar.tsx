import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
    const { token, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="w-full px-4 py-3 border-b border-border flex items-center justify-between bg-card text-card-foreground">
            <h1 className="text-xl font-semibold">Task Manager</h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
                {token && user && (
                    <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
