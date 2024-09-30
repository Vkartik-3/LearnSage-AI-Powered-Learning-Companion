import { arrowRight } from "../assets/icons";
import { offer } from "../assets/images";
import Button from "../components/Button";

const SpecialOffer = () => {
  return (
    <div id="about-us">
    <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container ">
      <div className="flex-1">
        <img src="src\assets\aboutus.jpeg" alt="offer" width={773} height={687} className="object-contain w-full" />
      </div>
      <div className="flex flex-1 flex-col "  style={{ tmarginRight: 'auto' }}>
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          <br />
          <span className="text-coral-red " style={{color: "#ff6542"}}>About</span> <span style={{color: "white"}}>Us</span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text" style={{color: "lightgray"}}>
        Welcome to AcademIQ, your personalized companion on the journey of academic excellence and knowledge enrichment.
        </p>
        <p className="mt-6 lg:max-w-lg info-text" style={{color: "lightgray"}}>
        At AcademIQ, we understand that every learner is unique, with varying speeds and capabilities to grasp different subjects. Our cutting-edge artificial intelligence algorithms are designed to adapt and cater to your individual learning style, ensuring a tailored educational experience. We prioritize not just academic achievement but overall comprehension, fostering a learning environment that aligns with your pace and capacity for understanding.
        </p>
        {/* <div className="mt-11 flex flex-wrap gap-4">
          <Button label="Shop now" icon={arrowRight}/>
          <Button label="Learn more" backgroundColor="bg-white" borderColor="border-slate-gray" textColor="text-slate-gray"/>
        </div> */}
      </div>
    </section>

    </div>
    // <section>
    // <div id="about">
    //   <div className="container">
    //     <div className="row">
    //       {/* <div className="col-xs-12 col-md-6">
    //         {" "}
    //         {/* <img src="img/about.jpg" className="img-responsive" alt="" />{" "} */}
    //       {/* </div>  */}
    //       <div className="col-xs-12 col-md-6">
    //         <div className="about-text">
    //           <h2>About Us</h2>
    //           {/* <p>{props.data ? props.data.paragraph : "loading..."}</p> */}
    //           <p>Welcome to AcademIQ, your personalized companion on the journey of academic excellence and knowledge enrichment. At AcademIQ, we understand that every learner is unique, with varying speeds and capabilities to grasp different subjects. Our cutting-edge artificial intelligence algorithms are designed to adapt and cater to your individual learning style, ensuring a tailored educational experience. We prioritize not just academic achievement but overall comprehension, fostering a learning environment that aligns with your pace and capacity for understanding.</p>
              
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </section>
 
  );
};

export default SpecialOffer;
