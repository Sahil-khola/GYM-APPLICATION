import { Check } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Price = () => {
  const pricing = [
    {
      imgUrl:"pricing.jpg",
      title: "QUATTERLY",
      price: 18000,
      length:3
    },
    {
      imgUrl:"pricing.jpg",
      title: "HALF_YEARLY",
      price: 34000,
      length:6
    },
    {
      imgUrl:"pricing.jpg",
      title: "YEARLY",
      price: 60000,
      length:12
    },
  ]
  return (
    <section className='pricing'>
      <h1>KHOLA EDGE FITNESS PLAN</h1>
    <div className="wrapper">
      {
        pricing.map((element,index)=>{
          return(
            <div className="card" key={index}>
            <img src={element.imgUrl} alt={element.title} />
            <div className="title">
              <h1>{element.title}</h1>
              <h1>PACKAGE</h1>
              <h3>₹ {element.price}</h3>
              <p>for {element.length} months</p>

            </div>
            <div className="description">
              <p>
                <Check/> Equiment
              </p>
              <p>
                <Check/> All day free training
              </p>
              <p>
                <Check/> Free RestRoom
              </p>
              <p>
                <Check/> 24/7 Skilled Support
              </p>
              <p>
                <Check/> 20 Days Freezing Option 
              </p>
              <Link to="/">Join Now</Link>
            </div>
            </div>
          )
        })
      }
    </div>
    </section>
  )
}

export default Price
