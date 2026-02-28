import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useEffect, useRef } from "react";

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 40;
    const colors = [
      "rgba(0, 245, 255, ", // cyan
      "rgba(157, 0, 255, ", // purple
      "rgba(100, 200, 255, ", // blue
    ];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.15,
        color: color,
      });
    }

    const animate = () => {
      // Clear canvas with very slight fade
      ctx.fillStyle = "rgba(11, 15, 26, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Oscillate opacity gently
        particle.opacity += (Math.random() - 0.5) * 0.03;
        particle.opacity = Math.max(0.08, Math.min(0.5, particle.opacity));

        // Draw particle with glow
        ctx.fillStyle = particle.color + particle.opacity + ")";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.fillStyle = particle.color + (particle.opacity * 0.3) + ")";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.05 * (1 - distance / 200)})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 top-16 z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Hero section */}
      <section className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tight">
              <span className="glow-text">Qryptix</span>
            </h1>
            <div className="h-0.5 w-32 bg-gradient-to-r from-quantum-cyan via-quantum-purple to-quantum-cyan mx-auto mb-8 rounded-full" style={{ boxShadow: "0 0 30px rgba(0, 245, 255, 0.5)" }} />
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl sm:text-3xl font-light text-quantum-glow mb-6 tracking-wide">
              Securing the Future in a Post-Quantum World
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore quantum cryptography, witness the power of Shor's algorithm,
              and discover how quantum key distribution keeps your data secure in
              the quantum era.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/classical-encryption"
              className="quantum-btn inline-block"
            >
              Start Simulation
            </Link>
            <button className="px-6 py-3 font-semibold text-sm rounded-lg border-1.5 border-quantum-cyan/60 text-quantum-cyan hover:bg-quantum-cyan/5 transition-all duration-300 hover:shadow-lg hover:shadow-quantum-cyan/20 hover:border-quantum-cyan/80">
              Learn More
            </button>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <FeatureCard
              title="Classical Encryption"
              description="Understand RSA and see how classical cryptography works with interactive simulations."
              icon="🔐"
            />
            <FeatureCard
              title="Quantum Attacks"
              description="Witness Shor's algorithm in action and how quantum computers break modern encryption."
              icon="⚛️"
            />
            <FeatureCard
              title="Quantum Security"
              description="Explore BB84 quantum key distribution and post-quantum cryptography solutions."
              icon="🛡️"
            />
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-quantum-cyan/5 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-quantum-purple/5 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </section>
    </Layout>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="quantum-card group hover:border-quantum-cyan/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-quantum-cyan/20">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-quantum-cyan transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
