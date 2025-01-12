export const renderSVGRectangle = (svg, {width, height, rebars, diameter}) => {
  const cover = 40;
  const margin = 20;

  const viewBoxWidth = width + margin * 2;
  const viewBoxHeight = height + margin * 2;

  svg
    .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  svg
    .append("rect")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#ddd")
    .attr("stroke", "#000");

  const innerWidth = width - 2 * cover;
  const innerHeight = height - 2 * cover;
  const perimeter = 2 * (innerWidth + innerHeight);
  const spacing = perimeter / rebars;

  let currentLength = 0;

  for (let i = 0; i < rebars; i++) {
    let x, y;

    if (currentLength <= innerWidth) {
      x = margin + cover + currentLength;
      y = margin + cover;
    } else if (currentLength <= innerWidth + innerHeight) {
      x = margin + cover + innerWidth;
      y = margin + cover + (currentLength - innerWidth);
    } else if (currentLength <= 2 * innerWidth + innerHeight) {
      x = margin + cover + (innerWidth - (currentLength - (innerWidth + innerHeight)));
      y = margin + cover + innerHeight;
    } else {
      x = margin + cover;
      y = margin + cover + (innerHeight - (currentLength - (2 * innerWidth + innerHeight)));
    }

    svg
      .append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", diameter / 2)
      .attr("fill", "red");

    currentLength += spacing;
  }
}

export const renderSVGCircle = (svg, {radius, rebars, diameter}) => {
  const cover = 40;
  const margin = 20;

  const effectiveRadius = radius - cover;
  const viewBoxSize = 2 * (radius + margin);

  svg
    .attr("viewBox", `0 0 ${viewBoxSize} ${viewBoxSize}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  svg
    .append("circle")
    .attr("cx", viewBoxSize / 2)
    .attr("cy", viewBoxSize / 2)
    .attr("r", radius)
    .attr("fill", "#ddd")
    .attr("stroke", "#000");

  for (let i = 0; i < rebars; i++) {
    const angle = (i * 2 * Math.PI) / rebars;

    svg
      .append("circle")
      .attr("cx", viewBoxSize / 2 + effectiveRadius * Math.cos(angle))
      .attr("cy", viewBoxSize / 2 + effectiveRadius * Math.sin(angle))
      .attr("r", diameter / 2)
      .attr("fill", "red");
  }
}