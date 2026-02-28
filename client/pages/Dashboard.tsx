import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="glow-text">Security Dashboard</span>
          </h1>
          
          <div className="quantum-card mb-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-muted-foreground text-lg mb-6">
              Compare classical encryption vs quantum key distribution security metrics and vulnerabilities.
            </p>
            <p className="text-sm text-muted-foreground">
              Visualization coming soon: Security comparison graphs, attack timelines, and infographics
            </p>
          </div>

          <div className="inline-block px-6 py-3 border border-quantum-cyan/50 rounded-lg text-quantum-cyan hover:bg-quantum-cyan/10 transition-colors">
            Continue implementing this page for comprehensive security dashboard
          </div>
        </div>
      </section>
    </Layout>
  );
}
