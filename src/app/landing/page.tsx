export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Nivaran
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          Societal Challenge Platform
        </div>

        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Problems deserve
          <br />
          <span className="text-blue-600">solutions.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Nivaran connects real-world societal challenges with
          students, innovators and organizations to build
          meaningful solutions.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/challenges"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore Challenges
          </a>

          <a
            href="/challenges/new"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
          >
            Post a Challenge
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-7">
            <div className="mb-5 text-3xl">🌍</div>

            <h2 className="text-xl font-bold">
              Discover Problems
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Discover real societal challenges posted by
              communities and organizations.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-7">
            <div className="mb-5 text-3xl">🤝</div>

            <h2 className="text-xl font-bold">
              Collaborate
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Join challenges and collaborate with students,
              innovators and other problem solvers.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-7">
            <div className="mb-5 text-3xl">💡</div>

            <h2 className="text-xl font-bold">
              Create Solutions
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Turn your ideas into practical solutions that
              can make a real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2026 Nivaran — Turning problems into solutions.
      </footer>
    </main>
  );
}