import dynamic from "next/dynamic";

const InputField = dynamic(() => (import('/src/components/InputField')), {ssr: false})


export {
  InputField,
}