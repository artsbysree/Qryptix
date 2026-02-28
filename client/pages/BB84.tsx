import Layout from "@/components/Layout";

export default function BB84() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="glow-text">BB84 Quantum Key Distribution</span>
          </h1>

          <div className="quantum-card mb-8">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-muted-foreground text-lg mb-6">
              The BB84 quantum key distribution protocol enables two users to establish a shared secret key with provable security.
            </p>
            <p className="text-sm text-muted-foreground">
              Visualization coming soon: Alice & Bob photon polarization exchange and secure key generation
            </p>
          </div>

          <button className="px-6 py-3 border-1.5 border-quantum-cyan/60 rounded-lg text-quantum-cyan hover:bg-quantum-cyan/5 transition-all duration-300 hover:shadow-lg hover:shadow-quantum-cyan/20 hover:border-quantum-cyan/80 font-semibold">
            Continue implementing this page for interactive key exchange simulation
          </button>
        </div>
      </section>
    </Layout>
  );
}
