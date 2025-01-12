import Link from "next/link";
import Image from "next/image";
import MainPhotoDesc from "/public/asset/images/MainPhotoDesc.jpg"

export default function HomePage({shapes}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header
        className="text-center bg-white shadow w-full relative"
        data-aos="fade-down">
        <div className="relative w-full h-[500px]">
          <Image
            src={MainPhotoDesc}
            alt="Hero Section Image"
            layout="fill"
            objectFit="cover"
            objectPosition="bottom"
            quality={90}
            priority={true}/>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
          <h1 className="text-4xl font-bold">Rebar Designer Pro</h1>
          <p className="mt-4 text-lg">
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
        <section className="mb-8" data-aos="zoom-in">
          <h2 className="text-2xl font-semibold">Available Shapes</h2>
          <ul className="mt-4 space-y-2">
            {shapes.map((shape, index) => (
              <li key={index} className="text-lg text-gray-700">
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
  );
}