function ShapeSelector({shape, setShape}) {
  return (
    <div className="flex mb-4 bg-gray-300 shadow-lg p-4 rounded text-black">
      <label>
        Shape:
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="ml-2 p-1 border rounded text-black">
          <option value="Rectangle">Rectangle</option>
          <option value="Circle">Circle</option>
        </select>
      </label>
    </div>
  );
}

export default ShapeSelector