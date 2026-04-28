import Navbar from "../Navbar/Navbar";
import { Button } from "../ui/button";
import dashboadImg from "../../assets/dashboadImg.png";
import { Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden pt-20 pb-28">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <section className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm bg-background/60">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-Powered Productivity Platform
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight">
            Automate Task Creation
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              & Track Progress With AI
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Intelligent project management that transforms your goals into
            actionable task lists and tracks progress in real time.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-8 rounded-full text-base font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full text-base"
            >
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-6 text-sm text-muted-foreground">
            Trusted by 2,000+ productivity-focused teams
          </p>

          {/* Dashboard Preview */}
          <div className="relative mx-auto mt-20 max-w-6xl">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary/30 via-blue-500/20 to-cyan-400/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background/70 shadow-2xl backdrop-blur-xl">
              <img
                src={dashboadImg}
                alt="TaskFlow AI Dashboard Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
