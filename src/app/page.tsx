import { montserrat } from "./ui/fonts";

export default function Home() {
  return (
    <main>
      <div className="w-52 mx-auto mt-4">
        <h1 className={`${montserrat.className} text-3xl font-bold`}>Homepage</h1>
      </div>
      <div className="w-52 mx-auto mt-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          aliquam accusantium quam dicta enim quibusdam magnam non earum minima
          neque perferendis maiores, voluptas quae? Pariatur eaque voluptatem
          in. Rem, sunt?
        </p>
      </div>
    </main>
  );
}
