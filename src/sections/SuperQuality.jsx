import Shoe3d from "../assets/images/nike3dd.png";
import { Button } from "../components";

const SuperQuality = () => {
  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold'>
          We Provide You
          <span className='text-purple-700'> High </span>
          <span className='text-purple-700'>Quality </span> Shoes
        </h2>
        <p className='mt-4 lg:max-w-lg info-text'>
            Our shoes are crafted with the finest materials, ensuring durability and comfort for every step you take.
        </p>
        <p className='mt-6 lg:max-w-lg info-text'>
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className='mt-11'>
            <a href="https://about.nike.com/en/company" target="blank"><Button label='View details' /></a>
          
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <img
          src={Shoe3d}
          alt='product detail'
          width={570}
          height={522}
          className='object-contain'
        />
      </div>
    </section>
  );
};

export default SuperQuality;