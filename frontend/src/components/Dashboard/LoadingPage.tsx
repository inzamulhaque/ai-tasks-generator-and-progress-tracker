import { Loader2, Sparkles } from "lucide-react";

const LoadingPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card/80 backdrop-blur-xl shadow-2xl p-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">
            Generating Your Plan
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            This may take a few moments. Please wait while we create your
            personalized roadmap.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          AI is preparing your learning journey...
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;
