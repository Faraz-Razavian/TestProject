function SVGRenderer({svgRef}) {
  return (
    <div
      className="flex justify-center items-center w-full max-w-[800px] md:max-w-[600px] sm:max-w-[400px] h-auto my-10 aspect-square overflow-hidden bg-gray-100 rounded-lg">
      <svg ref={svgRef} className="w-full h-full"/>
    </div>
  );
}

export default SVGRenderer