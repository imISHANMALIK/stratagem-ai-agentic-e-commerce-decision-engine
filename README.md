# Stratagem AI 🧠✨🚀

> **The Agentic BI Decision Engine that thinks while you sleep.** > Optimize inventory, crush ROAS, and simulate the future.

## 👋 Welcome to the Command Center

**Stop guessing. Start dominating.**

Stratagem AI isn't just a dashboard; it's a living, breathing decision engine for e-commerce merchants who want to optimize under uncertainty. It watches your data, predicts your future, and tells you exactly what to do next.

It's like having a data scientist, a supply chain manager, and a marketing guru in your pocket. 🤯

---

## 🌟 Killer Features

### 🕹️ The Command Center (Core Dashboard)
Your mission control for e-commerce domination.

* **KPI Metrics Grid 📊:** Real-time cards for Revenue, Gross Margin, ROAS, and Inventory Health. Includes trends, icons, and beautiful currency formatting.
* **Sales Velocity Chart 📈:** A gorgeous Recharts AreaChart showing historical data vs. AI-projected revenue. It's got gradients, tooltips, and looks expensive.
* **Decision Feed ⚡:** The engine speaks! Expandable cards suggest actions (e.g., *Pause Ads*, *Hike Prices*).
    * *The Cool Part:* **Integrated Reasoning Graphs** (Node-based SVG visualizations) that show the logic chain: `Observation → Constraint → Risk → Action`.
    * Powered by **Framer Motion** for that sweet, sweet animation.

### 🧪 Strategy Hub
Play "God Mode" with your business logic.

* **Live Parameter Controls 🎛️:** Tweak Stockout Risk Tolerance, Growth vs. Margin, and Ad Spend Cap with slick sliders.
* **Real-Time Simulation 🔮:** Move a slider, see the future. The app triggers dynamic re-calculations via the Zustand store.
* **Strategy Simulator:** A visual overlay showing potential deltas (e.g., *+4.2% Revenue*).
* **Commit & Forget:** Lock in your strategy with toast notifications and autonomous correction toggles.

### 📦 Inventory Intelligence
Never run out of stock (unless you want to).

* **Stock Risk Heatmap 🔥:** A ScatterChart plotting Days of Supply vs. Velocity.
    * 🟢 **Healthy**
    * 🟠 **Low**
    * 🔴 **Critical** (Panic mode!)
* **SKU Deep Dive 🕵️‍♂️:** Sortable, searchable data grid. Spot a problem? Click "Analyze in Chat" to deep-link straight to the Analyst.

### 🤖 Analyst Console
Your AI Co-pilot.

* **Conversational AI 💬:** Powered by **Gemini** (via Cloudflare Workers). Ask it anything.
* **Dynamic Context Panel 💡:** The UI shifts based on what you talk about!
    * *Discussing a specific SKU?* The side panel auto-loads that product's stats and velocity charts.
    * *Asking "Why?"* The panel switches to a Causal Reasoning Map.
* **Smart Prompts 🧠:** Don't know what to ask? The "Suggested Questions Marquee" has your back.

---

## 🛠️ The Tech Stack (Under the Hood)

We built this Ferrari with the finest parts available:

* **Frontend:** React ⚛️ + Vite ⚡
* **Styling:** Tailwind CSS 💨 + shadcn/ui 🎨 (Glassmorphism & Glows)
* **Animation:** Framer Motion 🎬 (Staggers, Layout IDs, Transitions)
* **State Management:** Zustand 🐻 (The simulation logic lives here!)
* **Charts:** Recharts 📊
* **Backend:** Cloudflare Workers + Durable Objects 🌩️
* **AI:** Google Gemini Models ♊ via Cloudflare AI Gateway

---

## 🚀 Getting Started

Want to take it for a spin? Buckle up.

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/yourusername/stratagem-ai.git](https://github.com/yourusername/stratagem-ai.git)
    cd stratagem-ai
    ```

2.  **Install the goods:**
    ```bash
    npm install
    ```

3.  **Ignite the engine:**
    ```bash
    npm run dev
    ```

4.  **Open your browser and prepare to be amazed at** `http://localhost:5173`.

---

## 🤝 Contributing

Found a bug? Want to add a feature? Think the glow effects could be glowier?
PRs are welcome! Just make sure your code is as clean as our UI. 😉

<p align="center">
  Made with ❤️ by Ishan Malik, Coffee ☕, and a lot of 🤖 logic.
</p>
