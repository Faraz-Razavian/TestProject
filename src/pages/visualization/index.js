import VisualizationPage from "@/views/visualizationPage/VisualizationPage";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/columns");
  const data = await res.json();

  return {
    props: {
      defaultRectangle: data.defaultRectangle,
      defaultCircle: data.defaultCircle,
    },
  };
}

export default function Visualization({defaultRectangle, defaultCircle}) {
  return (
    <VisualizationPage
      defaultRectangle={defaultRectangle}
      defaultCircle={defaultCircle}/>
  );
}
