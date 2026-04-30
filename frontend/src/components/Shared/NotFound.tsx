import { Link } from "react-router";
import { ArrowLeft, AlertTriangle } from "lucide-react";

import { Button } from "../ui/button";

const NotFoundPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border bg-background/80 shadow-xl backdrop-blur-xl">
          <AlertTriangle className="h-10 w-10 text-primary" />
        </div>

        <h1 className="bg-gradient-to-b from-foreground to-muted-foreground/50 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent md:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold md:text-3xl">Page Not Found</h2>

        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you’re looking for doesn’t exist, may have been moved, or the
          URL might be incorrect.
        </p>

        <Link to="/">
          <Button
            size="lg"
            className="group mt-8 rounded-full px-8 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
