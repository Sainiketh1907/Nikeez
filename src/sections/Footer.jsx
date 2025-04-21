import { copyrightSign } from "../assets/icons";
import { footerLogo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    // Apply background and base padding to the outermost element
    <footer className='bg-black padding-x padding-t pb-8'>
      {/* Use max-container for content alignment */}
      <div className='max-container'>
        <div className='flex justify-between items-start gap-10 md:gap-20 flex-wrap max-lg:flex-col'>
          {/* Logo and Social Section */}
          <div className='flex flex-col items-start'>
            <a href='/'>
              <img
                src={footerLogo}
                alt='logo'
                width={150}
                height={46}
                className='m-0'
              />
            </a>
            <p className='mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm'>
              Get shoes ready for the new term at your nearest Nike store. Find
              Your perfect Size In Store. Get Rewards
            </p>
            <div className='flex items-center gap-5 mt-8'>
              {socialMedia.map((icon) => (
                <div
                  className='flex justify-center items-center w-12 h-12 bg-white rounded-full hover:opacity-80 transition-opacity' // Added hover effect
                  key={icon.alt}
                >
                  <a href={icon.link} target="_blank" rel="noopener noreferrer"> {/* Added rel attribute */}
                    <img src={icon.src} alt={icon.alt} width={24} height={24} /> {/* Explicit size */}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className='flex flex-1 justify-between lg:gap-10 gap-12 sm:gap-20 flex-wrap'> {/* Adjusted gaps */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6 text-white'>
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className='mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-300' // Lighter hover
                      key={link.name}
                    >
                      <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a> {/* Added rel attribute */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className='flex justify-between text-white-400 mt-16 sm:mt-24 max-sm:flex-col max-sm:items-center max-sm:gap-4'> {/* Adjusted margin and gap */}
          <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
            <img
              src={copyrightSign}
              alt='copyright sign'
              width={20}
              height={20}
              className='rounded-full m-0'
            />
            <p>Copyright. All rights reserved.</p>
          </div>
          <p className='font-montserrat cursor-pointer hover:text-slate-300'> {/* Added hover */}
            Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;