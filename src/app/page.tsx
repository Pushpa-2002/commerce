import Banner from "@/components/banner";
import Card from "@/components/card";



export default function Home(){
  return (
    <>
    <div className="Banner"><Banner /></div>
    

    <div className="Featured  bg-white">
      <div><h2 className="Title text-6xl text-red-600 p-4">Featured Products</h2></div>
      <div className="gap-4 gap-y-20 grid grid-cols-3 p-20  "><Card /> <Card /> <Card /><Card /><Card />
      <Card /></div> 
    </div>
    
    </>
  )
}