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
    const particleCount = 50;
    const colors = [
      "rgba(34, 211, 238, ", // cyan
      "rgba(168, 85, 247, ", // purple
      "rgba(59, 130, 246, ", // blue
    ];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: color,
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(220, 13%, 8%, 0.05)";
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

        // Oscillate opacity
        particle.opacity += (Math.random() - 0.5) * 0.05;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));

        // Draw particle
        ctx.fillStyle = particle.color + particle.opacity + ")";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
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
        style={{ opacity: 0.6 }}
      />

      {/* Hero section */}
      <section className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight">
              <span className="glow-text">Qryptix</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-quantum-cyan via-quantum-purple to-quantum-blue mx-auto mb-8 rounded-full" />
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl sm:text-3xl font-light text-muted-foreground mb-6">
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
            <button className="px-6 py-3 font-semibold text-sm rounded-lg border border-quantum-cyan/50 text-quantum-cyan hover:bg-quantum-cyan/10 transition-all duration-300 hover:shadow-lg">
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
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-quantum-cyan/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-quantum-purple/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
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
    <div className="quantum-card group hover:border-quantum-cyan/40 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-quantum-cyan/10">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
