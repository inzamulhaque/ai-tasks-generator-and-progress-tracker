import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { Sun, Moon, Monitor, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-6xl">
        <div className="flex items-center gap-2 cursor-pointer">
          <div
            className={`h-8 w-8 rounded-lg bg-primary flex items-center justify-center ${theme === "dark" ? "text-black" : "text-white"} font-bold`}
          >
            T
          </div>
          <span className="font-semibold text-lg">TaskFlow</span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
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
                <Sun className="mr-2 h-4 w-4" /> Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" /> Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" /> System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/signin">
            <Button className="rounded-full px-5 cursor-pointer">
              Get Started
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="rounded-full px-5 cursor-pointer bg-blue-400">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex items-center gap-2 my-2 ml-1 cursor-pointer">
                <div
                  className={`h-8 w-8 rounded-lg bg-primary flex items-center justify-center ${theme === "dark" ? "text-black" : "text-white"} font-bold`}
                >
                  T
                </div>
                <span className="font-semibold text-lg">TaskFlow</span>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setTheme("light")}
                  className="justify-start cursor-pointer"
                >
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setTheme("dark")}
                  className="justify-start"
                >
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setTheme("system")}
                  className="justify-start"
                >
                  <Monitor className="mr-2 h-4 w-4" /> System
                </Button>
              </div>

              <SheetClose asChild>
                <Link to="/signin">
                  <Button className="w-full rounded-full">Get Started</Button>
                </Link>

                <Link to="/signup">
                  <Button className="w-full rounded-full bg-blue-400">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
