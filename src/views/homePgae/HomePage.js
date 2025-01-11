import Link from "next/link";

export default function HomePage({shapes}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header
        className="text-center py-8 bg-white shadow w-full"
        data-aos="fade-down">
        <h1 className="text-4xl font-bold">Rebar Designer Pro</h1>
        <p className="mt-4 text-lg text-gray-600">
          The ultimate tool for structural engineers to design reinforced columns efficiently.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() =>
              alert(
                "Download feature is not available yet. Please check back later!"
              )
            }
            className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            data-aos="fade-up">
            Download Now
          </button>
          <button
            onClick={() => alert("Learn more about Rebar Designer Pro!")}
            className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
            data-aos="fade-up">
            Learn More
          </button>
        </div>
      </header>
      <main
        className="text-center mt-8 w-full max-w-4xl px-4"
        data-aos="fade-in">
        <section className="mb-8" data-aos="zoom-in">
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <ul className="mt-4 space-y-2 text-lg text-gray-700">
            <li>- Design single column cross-sections</li>
            <li>- Visualize rebar distributions dynamically</li>
            <li>- Easy-to-use interface for structural engineers</li>
          </ul>
        </section>
        <section className="mb-8" data-aos="fade-right">
          <h2 className="text-2xl font-semibold">Available Shapes</h2>
          <ul className="mt-4 space-y-2">
            {shapes.map((shape, index) => (
              <li
                key={index}
                className="text-lg text-gray-700">
                {shape}
              </li>
            ))}
          </ul>
        </section>
        <Link href="/visualization">
          <div
            className="mb-8 px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 cursor-pointer inline-block">
            Go to 2D Visualization Tool
          </div>
        </Link>
      </main>
    </div>
  )
}