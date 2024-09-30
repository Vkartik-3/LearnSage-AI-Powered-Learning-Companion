import { useState } from "react";
// import { next } from "../assets/icons/next.png";
import { bigShoe1 } from "../assets/images";
import Button from "../components/Button";
import ShoeCard from "../components/ShoeCard";
import { shoes, statistics } from "../constants";
import { Link } from 'react-router-dom';
import blackboard from "../assets/blackboard.jpg";

const Hero = () => {
  const [bigShoeImage, setBigShoeImage] = useState(bigShoe1)
  return (
    <section
      id="home"
      className="w-full p-2 flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
      
      // style={{backgroundImage: `linear-gradient(#2a2a2a, #1c1c1c)`}}
    >
      <div className="relative xl:w-3/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28" >
       
        {/* <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
        <span style={{  color: "white" }} className="xl:whitespace-nowrap relative z-10 pr-10"><span style={{color:"#ff6542"}}>Academ</span>IQ</span>
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 "  style={{color:"lightgray"}}>
        Welcome to a new era of personalized learning with AI Tutor, where knowledge meets adaptability for a brighter academic future.
        </p> */}
        {/* <Button href="/register" label="Register" icon={arrowRight} /> */}
        {/* <Link to="/register" className="btn btn-custom btn-lg" style={{ padding: '10px 20px', background: '#ff6452', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', transition: 'background 0.3s ease', marginTop: '500px' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>Register<img src="src/assets/icons/next.png" alt="Next Icon" style={{ marginLeft: '0px',width: '20px', height: '20px', marginLeft: 7}} /></span>
      </Link> */}
      <Link
  to="/register"
  className="btn btn-custom btn-lg"
  style={{
    padding: '20px 35px', // Increase padding for larger size
    background: '#ff6452',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    position: 'absolute', // Position absolute for centering
    left: '50%', // Move to the center horizontally
    top: '50%', // Move to the center vertically
    transform: 'translate(-50%, -50%)', // Centering trick
    marginTop: '320px',
    fontSize: '30px'
  }}
>
  <span style={{ display: 'flex', alignItems: 'center' }}>
    Register
    <img
      src="src/assets/icons/next.png"
      alt="Next Icon"
      style={{ marginLeft: '15px', width: '30px', height: '30px' }}
    />
  </span>
</Link>
        {/* <div className="flex justify-start items-start flex-wrap w-full mt-5 gap-16">
          {statistics.map((stat)=>(
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
      {/* <div > */}
        {/* <img src={bigShoeImage} alt="shoe collection" height={500} width={610} className="object-contain relative z-10" /> */}
        {/* <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm: left-[10%] max-sm:px-6">
          {shoes.map((shoe)=>(
            <div key={shoe}>
              <ShoeCard imgURL={shoe}
              changeBigShoeImg={(shoe)=>{setBigShoeImage(shoe)}}
              bigShoeImg={bigShoeImage}
              />
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
