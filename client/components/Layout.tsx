import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-quantum-cyan/20 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-quantum-cyan to-quantum-purple rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-quantum-cyan/30 transition-shadow">
                <span className="text-xs font-bold text-background">Q</span>
              </div>
              <span className="text-xl font-bold glow-text hidden sm:inline">
                Qryptix
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-2">
              <NavLink to="/" label="Home" />
              <NavLink to="/classical-encryption" label="Classical" />
              <NavLink to="/quantum-attack" label="Quantum Attack" />
              <NavLink to="/bb84" label="BB84 QKD" />
              <NavLink to="/dashboard" label="Dashboard" />
            </div>

            {/* Mobile menu button placeholder */}
            <div className="md:hidden flex items-center gap-2">
              <button className="p-2 hover:bg-card rounded-lg transition-colors text-quantum-cyan/70 hover:text-quantum-cyan">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-quantum-cyan/15 bg-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold glow-text mb-4">Qryptix</h3>
              <p className="text-sm text-muted-foreground">
                Quantum Cryptography & Attack Simulation Platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/"
                    className="hover:text-quantum-cyan transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/classical-encryption"
                    className="hover:text-quantum-cyan transition-colors duration-200"
                  >
                    Classical Encryption
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quantum-attack"
                    className="hover:text-quantum-cyan transition-colors duration-200"
                  >
                    Quantum Attack
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/bb84"
                    className="hover:text-quantum-cyan transition-colors duration-200"
                  >
                    BB84 Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-quantum-cyan transition-colors duration-200"
                  >
                    Security Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-quantum-cyan/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Qryptix. Securing the future in a post-quantum world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
}

function NavLink({ to, label }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-quantum-cyan transition-all duration-200 border border-transparent hover:border-quantum-cyan/40 hover:bg-quantum-cyan/5"
    >
      {label}
    </Link>
  );
}
