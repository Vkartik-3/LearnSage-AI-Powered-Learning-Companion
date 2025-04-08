import { useState } from "react";
import emailjs from "emailjs-com";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Subscribe = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    console.log(name, email, message);

    emailjs
      .sendForm(
        "service_faim9ua",
        "template_xbdovi6",
        e.target,
        "p18i4o4CIlRIw5Ozy"
      )
      .then(
        (result) => {
          console.log(result.text);
          clearState(); // Clear form fields
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id="contact-us">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="section-title">
              <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg pb-10">
                Contact Us
              </h2>
            </div>
          </div>
          <div className="col-md-6">
            <form name="sentMessage" noValidate onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      required // Add required attribute
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', boxSizing: 'border-box' }}
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required // Add required attribute
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', boxSizing: 'border-box' }}
                      onChange={handleChange}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required // Add required attribute
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', boxSizing: 'border-box', resize: 'vertical' }}
                      onChange={handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
              </div>
              <div id="success"></div>
              <div className="text-center">
                <button type="submit" className="btn btn-custom btn-lg" style={{ padding: '10px 20px', background: '#ff6452', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', transition: 'background 0.3s ease' }}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Subscribe;
