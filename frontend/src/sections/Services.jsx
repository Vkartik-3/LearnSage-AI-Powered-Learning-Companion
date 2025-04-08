import ServiceCard from "../components/ServiceCard"
import { services } from "../constants"

const Services = () => {
  return (
    <div id="features">
    <div> 
    <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          <br />
          <span className="text-coral-red" style={{ color: "#000000", paddingBottom: 20}}>Features</span> 
        </h2>

    </div>
    <br></br>
    <section className="max-container flex justify-center flex-wrap gap-9" style={{ backgroundColor: '#e1e7eb' }}>
    {services.map((service)=>(
      <ServiceCard  key={service.label} {...service} />
    ))}
    </section>
    </div>
  )
}

export default Services