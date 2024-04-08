import React from 'react'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="h-dvh grid grid-cols-2 items-center px-16">
      <div>
        <h1 className="font-black text-6xl italic mb-4">
          TECH.
          <br />
          AMPLIFIED
        </h1>
        <p className=" mb-8">
          Explore our curated collection of tech accessories designed for
          seamless functionality and lasting value.
        </p>
        <NavLink to="/products" className="text-neutral-900 ">
          <button className="border px-4 py-2 rounded bg-neutral-200">
            Find your accesories
          </button>
        </NavLink>
      </div>
      <div>h</div>
    </section>
  )
}

export default Hero
