import React, {Fragment} from 'react';
import home from '../css/assets/home.jpg';
import client1 from '../css/assets/client-01.jpg'
import client2 from '../css/assets/client-02.jpg'
import client3 from '../css/assets/client-03.png'
import designer1 from '../css/assets/designer1.png'
import designer2 from '../css/assets/designer2.png'
import designer3 from '../css/assets/designer3.png'
import CountUp from 'react-countup';
// import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const handleClick=()=>{
    window.location.href = `http://localhost:3001/photographers`
  }
  // $(document).ready(function(){
  //   alert('Welcome to Loso with jquery')
  // })
  return (
    <Fragment>
        <header className="header-h">
          <div className="header-overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="header-text">
                  <h1> we don't just take photos, we capture memories.</h1>
                  <p> Built with greate love!</p>
                </div>
                <div className="header-btns">
                  <a onClick={handleClick} style={{cursor: 'pointer'}} className="btn btn-download" > Take A Tour </a>

                </div>
              </div>

            </div>
          </div>
          </div>
        </header>
        <div className="clear-fix">
        </div>
        <section className="seperator">
          <div className="container">
            <div className="row">
              <div className="cole-md-10 col-md-offset-1">
                <div className="section-title">
                  <h2> Summer Rose</h2>
                  <p>Capturing the best moments in your life.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="choose-us-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="about-iphone">

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="choose-us-title">
                    <h2>About Us </h2>
                    <p>Our goal has always been to focus on the true experience of the wedding instead of staging a shot</p>
                  </div>
                  <div className="choose-us-des">
                    <div className="choose-us-item">


                      <p>Phone: (503)123-7832</p>
                      <p>Fax: (503)123-7781</p>
                      <p>Email: info@summerrose.com</p>
                    </div>

                    <div className="choose-us-item">

                      <p>282 Kevin Brook Street</p>
                      <p> Imogeneborough, NY 58517</p>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section  className="testimonial">
          <div className="testimonial-overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#carousel-testmonial" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-testmonial" data-slide-to="1"></li>
                    <li data-target="#carousel-testmonial" data-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="item active text-center">
                      <img src={client1} alt="client1" className="center-block"/>
                      <div className="testimonial-caption">
                        <h2>Eric</h2>
                        <h4><span>Editor, </span>Vogue</h4>
                        <p>"The team was incredible to work with and extremely efficient, which is important given the stress of planning a wedding. Both photographers went above and beyond and captured our special day flawlessly."</p>
                      </div>
                    </div>

                    <div className="item text-center">
                      <img src={client2} alt="client2" className="center-block"/>
                      <div className="testimonial-caption">
                        <h2>Bruce Norris</h2>
                        <h4><span>Marketing Manager, </span>Gift</h4>
                        <p>"They don't just take photos, they capture memories."</p>
                      </div>
                    </div>


                    <div className="item text-center">
                      <img src={client3} alt="client3" className="center-block"/>
                      <div className="testimonial-caption">
                        <h2>Vladimir Kudi</h2>
                        <h4><span>Lead Photographer, </span>Graphic Design</h4>
                        <p>"We did not just find wedding photographers, we found lifelong friends. They see the extraordinary in ordinary moments."</p>
                      </div>
                    </div>


                  </div>
                </div>
              </div>



            </div>
          </div>
          </div>
        </section>
        <section className="dress-designers">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="section-title">
                  <h2>Designers we Love</h2>
                  <p>Saying Yes to the Dress. We pay attention to every details and capture
                  your most cherished moment</p>
                </div>
              </div>
              <div className="col-md-4 dress">
                <img src={designer1} />
              </div>
              <div className="col-md-4 dress">
                <img src={designer2} />
              </div>
              <div className="col-md-4 dress">
                <img src={designer3} />
              </div>
            </div>
          </div>


        </section>

        <section className="counter">
          <div className="counter-overlay">
          <div className="container">
            <div className="row text-center">

              <div className="col-md-3">
                <div className="counter-item">
                  <div><i className="glyphicon glyphicon-user"></i> </div>
                  <h2><span className="counter-num"> <CountUp end={4000} /></span><span>+</span></h2>
                  <p>Users</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="counter-item">
                  <div><i className="glyphicon glyphicon-gift"></i> </div>
                  <h2><span className="counter-num"><CountUp end={50} /> </span><span>+</span></h2>
                  <p>Awards</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="counter-item">
                  <div><i className="glyphicon glyphicon-heart-empty"></i> </div>
                  <h2><span className="counter-num"> <CountUp end={641} /></span><span>+</span></h2>
                  <p>Likes</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="counter-item">
                  <div><i className="glyphicon glyphicon-thumbs-up"></i> </div>
                  <h2><span className="counter-num"><CountUp end={1032} /></span><span>+</span></h2>
                  <p>Recomended</p>
                </div>
              </div>

            </div>
          </div>

          </div>
        </section>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p id="footer-p">Copyrights &copy; Summerose 2016</p>
              </div>
            </div>
          </div>
        </footer>
    </Fragment>
  )
}

export default HomePage
