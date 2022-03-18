const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">Rafal. A Full Stack Developer.</h1>
          <h2 className="white hero-subtitle">
            Check my portfolio and video tutorials
          </h2>
          <div className="button-container">
            <a href="" className="btn btn-main bg-blue ttu">
              See my work
            </a>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img
                className="hero-image"
                src="https://i.ibb.co/SKkTZ0X/584830f5cef1014c0b5e4aa1.png"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
