export default function handler(req, res) {
  const data = {
    shapes: ["Rectangle", "Circle"],
    defaultRectangle: {
      width: 300,
      height: 500,
      rebars: {
        count: 8,
        diameter: 16,
      },
    },
    defaultCircle: {
      radius: 250,
      rebars: {
        count: 10,
        diameter: 16,
      },
    },
  };

  res.status(200).json(data);
}