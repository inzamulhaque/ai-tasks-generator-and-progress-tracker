import { LogOut, Monitor, Moon, Sun, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { TProfile } from "../../types/profile";
import { useTheme } from "next-themes";
import { getToken, removeToken } from "../../utils/tokenStore";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<TProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const profileRes = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken("accessToken") as string,
          },
        },
      );

      const profileData = await profileRes.json();

      setProfile(profileData?.data);
    })();
  }, []);

  const signOut = () => {
    removeToken("accessToken");
    navigate("/signin");
  };
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="h-7 w-7" />
            </div>

            <Link to={"/dashboard"}>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  Welcome back, {profile?.name} 👋
                </h1>

                <p className="text-sm text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer rounded-xl"
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : theme === "light" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Monitor className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="destructive"
              className="rounded-xl cursor-pointer gap-2"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
