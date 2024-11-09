// Testimonials.js
import React, { useState } from 'react';
import './Testimonials.css';
import img1 from "./assets/profile-img1.jpg"

const testimonials = [
    {
        img: img1,
        text: "DocBook is uniquely designed to serve as a platform to host  documentations for your open source projects , to enable easier contributions and access by people interested in the software .With a link to the respository itself, This combination really differentiates the tool and has been super helpful to our team.",
        author: "Tochi"
    },
    {
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate minima delectus ipsa repudiandae adipisci nihil cupiditate impedit error. Cum.",
        author: "Collins"
    },
    {
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi doloribus id aperiam ipsa tempore fugiat quod veniam exercitationem eum inventore incidunt iusto, nemo facere iure sint quam optio. Optio, totam.",
        author: "Osaro"
    },
    {
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt iure perspiciatis ab blanditiis at accusamus illo in repudiandae dolore, doloremque suscipit eaque nihil hic perferendis placeat sed exercitationem vitae iusto expedita laudantium labore error tempora? Obcaecati quia deserunt excepturi magni.",
        author: "David"
    },
]

const Testimony = () => {
    const [currentindex,setCurrentIndex] = useState(0)
    const prev = () => {
        currentindex <= 0 ? setCurrentIndex(testimonials.length - 1) : setCurrentIndex(currentindex - 1)
        
    }

    const next = () => {
        currentindex >= testimonials.length - 1 ? setCurrentIndex(0) : setCurrentIndex(currentindex + 1)
    }
  return (
    <section className="testimonials-section">
      <div className="main-testimonial">
        <div className="testimonial-content">
          <img src={testimonials[currentindex].img} alt={testimonials[currentindex].author} className="testimonial-image" />
          <p>
            <div>
                <h1>{testimonials[currentindex].text}</h1>
            </div>
          </p>
          <h4 className="testimonial-author">{testimonials[currentindex].author}</h4>
        </div>
        <div className="testimonial-nav">
          <button onClick={prev}>&larr;</button>
          <button onClick={next}>&rarr;</button>
        </div>
      </div>

      <div className="grid-testimonials">
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Chidera" className="grid-image" />
          <p>
            We use DocBook at our startup to write useful and easy-to-digest documentation. It is
            the only platform that provides so much flexibility for this.
          </p>
          <span>Chidera</span>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Ajayi" className="grid-image" />
          <p>
            I build software tools and use DocBook for documentation. It's amazing, I recommend it to all of my colleagues
            doing similar work.
          </p>
          <span>Ajayi</span>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Ade" className="grid-image" />
          <p>
            I enjoy the product. DocBook became the one-place tool for writing all of my
            documentation needs.
          </p>
          <span>Ade</span>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Zainab" className="grid-image" />
          <p>
            Now DocBook supports AI-based summaries and search from your documentation. One of the best documentation tools
            for developers & open-source enthusiasts.
          </p>
          <span>Zainab</span>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Chinedu" className="grid-image" />
          <p>
            My portfolio is on DocBook! Love how versatile and flexible this app is. highly recommended.
          </p>
          <span>Chinedu</span>
        </div>
        <div className="grid-item">
          <img src="https://via.placeholder.com/60" alt="Yanni" className="grid-image" />
          <p>
            We switched to DocBook (git-powered documentation hosting) a while back and so far we’re really, really happy
            with it.
          </p>
          <span>Yanni</span>
        </div>
      </div>

      <div className="cta-section">
        <h2>Get started for free</h2>
        <p>Play around with DocBook and set up your docs for free. Add your team and pay when you’re ready.</p>
        <div className="cta-buttons">
          <button className="github-btn">Sign up with GitHub</button>
          <button className="start-btn">Start for free &rarr;</button>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
