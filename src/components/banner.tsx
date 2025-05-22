import Image from "next/image";

export default function Banner() {
  return (
    <div className="bg-yellow-300 p-10 flex justify-around pr-5 text-green-600">
        <div><h2 className="text-5xl font-bold pb-4">commerce Products</h2>
        <p className="text-lg ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, expedita? <br /> Fugiat blanditiis architecto veritatis quas beatae sed tempore culpa dolore?</p></div>
        <div><Image src="/images/makeup.jpg" alt="image" width={300} height={400} />
</div>
                

    </div>
  );
}
