import { useState } from "react";

const COMMON_PASSWORDS = ["123456", "password", "admin", "qwerty"];

type Strength = "Very Weak" | "Weak" | "Medium" | "Strong";

function checkPasswordStrength(password: string): { strength: Strength; suggestions: string[] } {
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    return { strength: "Very Weak", suggestions: ["Avoid common passwords"] };
  }

  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push("Use at least 8 characters");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add uppercase letters");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add lowercase letters");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add numbers");
  }

  if (/[!@#$%^&*()\,.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    suggestions.push("Add special characters");
  }

  let strength: Strength;
  if (score <= 2) strength = "Weak";
  else if (score <= 4) strength = "Medium";
  else strength = "Strong";

  return { strength, suggestions };
}

const strengthConfig: Record<Strength, { color: string; bar: number; badge: string }> = {
  "Very Weak": { color: "#ef4444", bar: 1, badge: "bg-red-600" },
  Weak:        { color: "#f97316", bar: 2, badge: "bg-orange-500" },
  Medium:      { color: "#eab308", bar: 3, badge: "bg-yellow-500" },
  Strong:      { color: "#22c55e", bar: 4, badge: "bg-green-500" },
};

export default function App() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const hasInput = password.length > 0;
  const result = hasInput ? checkPasswordStrength(password) : null;
  const cfg = result ? strengthConfig[result.strength] : null;

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg">
        {/* Terminal window chrome */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-[#30363d]">
          {/* Title bar */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-[#30363d]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[#8b949e] text-xs tracking-wide">password_checker.py</span>
          </div>

          {/* Terminal body */}
          <div className="bg-[#0d1117] p-6 space-y-5">
            {/* Prompt line */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#58a6ff]">$</span>
              <span className="text-[#8b949e]">python password_checker.py</span>
            </div>

            {/* Input area */}
            <div className="space-y-1">
              <div className="text-[#e6edf3] text-sm">Enter Password:</div>
              <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 focus-within:border-[#58a6ff] transition-colors">
                <span className="text-[#58a6ff] select-none">›</span>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="type your password..."
                  className="flex-1 bg-transparent text-[#e6edf3] outline-none text-sm placeholder-[#484f58] caret-[#58a6ff]"
                  autoFocus
                />
                <button
                  onClick={() => setShow((s) => !s)}
                  className="text-[#8b949e] hover:text-[#e6edf3] text-xs transition-colors select-none"
                >
                  {show ? "hide" : "show"}
                </button>
              </div>
            </div>

            {/* Output */}
            {hasInput && result && cfg && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="border-t border-[#30363d] pt-4 space-y-3">
                  {/* Strength line */}
                  <div className="flex items-center gap-3">
                    <span className="text-[#8b949e] text-sm">Password Strength:</span>
                    <span
                      className="text-sm font-bold px-2 py-0.5 rounded"
                      style={{ color: cfg.color, background: `${cfg.color}22` }}
                    >
                      {result.strength}
                    </span>
                  </div>

                  {/* Strength bar */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= cfg.bar ? cfg.color : "#30363d",
                        }}
                      />
                    ))}
                  </div>

                  {/* Suggestions */}
                  {result.suggestions.length > 0 ? (
                    <div className="space-y-1.5">
                      <div className="text-[#8b949e] text-sm">Suggestions:</div>
                      {result.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-[#f97316] mt-0.5">-</span>
                          <span className="text-[#e6edf3]">{s}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                      <span>✓</span>
                      <span>Great password! No suggestions.</span>
                    </div>
                  )}
                </div>

                {/* Cursor blink */}
                <div className="flex items-center gap-1 text-sm text-[#8b949e]">
                  <span className="text-[#58a6ff]">$</span>
                  <span className="w-2 h-4 bg-[#58a6ff] animate-pulse inline-block" />
                </div>
              </div>
            )}

            {!hasInput && (
              <div className="flex items-center gap-1 text-sm text-[#8b949e]">
                <span className="text-[#58a6ff]">$</span>
                <span className="w-2 h-4 bg-[#8b949e] animate-pulse inline-block opacity-60" />
              </div>
            )}
          </div>
        </div>

        {/* Try examples */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {["password", "Hello1!", "P@ssw0rd!X", "admin", "Tr0ub4dor&3"].map((ex) => (
            <button
              key={ex}
              onClick={() => setPassword(ex)}
              className="text-xs text-[#8b949e] hover:text-[#58a6ff] border border-[#30363d] hover:border-[#58a6ff] rounded px-2 py-1 transition-colors bg-[#161b22]"
            >
              try: {ex}
            </button>
          ))}
        </div>
        <p className="text-center text-[#484f58] text-xs mt-3">
          Click any example above or type your own password
        </p>
      </div>
    </div>
  );
}
