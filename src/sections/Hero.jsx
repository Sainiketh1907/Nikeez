import React from "react";
import NikeBackground from "../assets/images/NikeBackground.mp4";
import { Button } from "../components";

import { arrowRight } from "../assets/icons";

const Hero = () => {
  
  
  return (
    <section
      id='home'
      className='w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container'
    >
      <div className='relative z-2 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28'>
        <strong className='text-xl font-mono text-purple-800'>
          New collections
        </strong>

        <h1 className='mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          
          <br />
          <span className='font-sans text-purple-700 inline-block mt-10'>Nike</span> Shoes
        </h1>
        <p className='font-mono text-slate-gray text-lg leading-8 mt-8 mb-12 sm:max-w-sm'>
          Discover stylish Nike arrivals, quality comfort, and innovation for
          your active life.
        </p>

        <a href="https://nike.com" target="blank"><Button  label='Explore' iconURL={arrowRight} /></a>

      </div>

      <div className='flex absolute opacity-90 -z-10 justify-center items-center w-full aspect-video max-h-[800px] mt-20 mb-5 rounded-lg overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-full object-cover'
        >
          <source src={NikeBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Hero;