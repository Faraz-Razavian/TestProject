import HomePage from "@/views/homePgae/HomePage";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/columns");
  const data = await res.json();

  return {
    props: {
      shapes: data.shapes,
    },
  };
}

export default function Index({shapes}) {
  return <HomePage shapes={shapes}/>
}
