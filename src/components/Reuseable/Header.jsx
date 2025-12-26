import design3 from "../../assets/SVG/design103.svg";

function Header({heading}) {
  return (
    <div className="flex flex-col mb-4 justify-center items-center">
       <img src={design3} alt="Shopping" className="w-full h-20" />
       <h2 className="text-3xl text-center  font-bold w-full h-full">{heading}</h2>
        <img src={design3} alt="Shopping" className="w-full h-20" />

      </div>
  )
}

export default Header