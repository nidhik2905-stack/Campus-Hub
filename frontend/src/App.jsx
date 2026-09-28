function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Status: Frontend Foundation Ready
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Campus Information Assistant
          </h1>
          <p className="mt-2 text-xl font-medium text-indigo-600">
            AI-Powered Smart College Information System
          </p>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Phase 0 Foundation established. Core architecture with React, Vite, Tailwind CSS, and React Router ready.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Frontend</h2>
            <p className="mt-2 text-sm text-slate-600">
              React + Vite + Tailwind foundation ready for future role-based pages.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Backend</h2>
            <p className="mt-2 text-sm text-slate-600">
              Spring Boot foundation for REST APIs and service-oriented architecture.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Data Layer</h2>
            <p className="mt-2 text-sm text-slate-600">
              MySQL configuration placeholders prepared for the next schema phase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
