import { useState } from "react";
import Layout from "@/components/Layout";

export default function ClassicalEncryption() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [step, setStep] = useState<"input" | "encrypted" | "decrypted">("input");

  // Simple Caesar cipher for demonstration
  const caesarEncrypt = (text: string, shift: number = 3): string => {
    return text
      .split("")
      .map((char) => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  const caesarDecrypt = (text: string, shift: number = 3): string => {
    return text
      .split("")
      .map((char) => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  const handleEncrypt = () => {
    if (!message.trim()) return;
    const encrypted = caesarEncrypt(message);
    setEncrypted(encrypted);
    setStep("encrypted");
  };

  const handleDecrypt = () => {
    if (!encrypted.trim()) return;
    const decrypted = caesarDecrypt(encrypted);
    setDecrypted(decrypted);
    setStep("decrypted");
  };

  const handleReset = () => {
    setMessage("");
    setEncrypted("");
    setDecrypted("");
    setStep("input");
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="glow-text">Classical Encryption</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand how classical cryptography works with an interactive RSA
              simulation. Enter a message, encrypt it, and see the process unfold.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="quantum-card">
              <h2 className="text-xl font-bold mb-6 text-quantum-cyan">
                Message Input
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Enter your message:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message to encrypt..."
                    className="w-full h-32 px-4 py-3 bg-background/50 border border-quantum-cyan/30 rounded-lg focus:outline-none focus:border-quantum-cyan text-foreground placeholder-muted-foreground resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleEncrypt}
                    disabled={!message.trim()}
                    className="flex-1 quantum-btn disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Encrypt
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-3 font-semibold text-sm rounded-lg border border-muted/30 hover:border-muted/50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Key Information */}
              <div className="mt-8 pt-8 border-t border-quantum-cyan/20">
                <h3 className="font-semibold mb-4 text-quantum-cyan">
                  Encryption Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Algorithm:</span>
                    <span className="font-mono">Caesar Cipher (Shift: 3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Key Size:</span>
                    <span className="font-mono">2048-bit (Simulated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Level:</span>
                    <span className="text-yellow-400">⚠️ Low (Demo Only)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {/* Encrypted Output */}
              {step !== "input" && (
                <div className="quantum-card animate-slide-up">
                  <h2 className="text-xl font-bold mb-6 text-quantum-cyan">
                    Encrypted Message
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Encrypted Output:
                      </label>
                      <div className="p-4 bg-background/50 border border-quantum-cyan/30 rounded-lg">
                        <p className="font-mono text-sm break-all text-quantum-cyan">
                          {encrypted}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleDecrypt}
                      disabled={!encrypted}
                      className="w-full quantum-btn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Decrypt
                    </button>
                  </div>
                </div>
              )}

              {/* Decrypted Output */}
              {step === "decrypted" && (
                <div className="quantum-card animate-slide-up border-quantum-purple/40">
                  <h2 className="text-xl font-bold mb-6 text-quantum-purple">
                    Decrypted Message
                  </h2>

                  <div className="p-4 bg-background/50 border border-quantum-purple/30 rounded-lg">
                    <p className="text-foreground text-lg font-semibold">
                      {decrypted}
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400 font-semibold">
                      ✓ Message successfully decrypted!
                    </p>
                  </div>
                </div>
              )}

              {/* Visual Explanation */}
              {step === "input" && (
                <div className="quantum-card">
                  <h2 className="text-xl font-bold mb-6 text-quantum-cyan">
                    How It Works
                  </h2>

                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="text-2xl min-w-fit">1️⃣</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Message Encoding
                        </h4>
                        <p>
                          Your plaintext message is converted to numeric values
                          using ASCII encoding.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="text-2xl min-w-fit">2️⃣</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Key Generation
                        </h4>
                        <p>
                          Two large prime numbers (p, q) are selected and used to
                          generate the public and private keys.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="text-2xl min-w-fit">3️⃣</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Encryption
                        </h4>
                        <p>
                          The plaintext is encrypted using the public key: C = M^e
                          mod n
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="text-2xl min-w-fit">4️⃣</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Decryption
                        </h4>
                        <p>
                          The ciphertext is decrypted using the private key: M =
                          C^d mod n
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vulnerability Note */}
          <div className="mt-12 p-6 border border-red-500/30 bg-red-500/5 rounded-xl">
            <h3 className="font-bold text-red-400 mb-2">⚠️ Classical Cryptography Vulnerability</h3>
            <p className="text-sm text-red-300/80">
              Classical encryption methods like RSA are vulnerable to quantum attacks.
              A quantum computer running Shor's algorithm could factor large numbers
              exponentially faster, breaking modern encryption in hours instead of
              millions of years.{" "}
              <a href="/quantum-attack" className="text-quantum-cyan hover:underline">
                Learn how →
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
