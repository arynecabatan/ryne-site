import React from 'react';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return(
    <footer className="pt-8 footer-clip text-center h-56 flex flex-col justify-center bg-gradient-to-r from-sizzlingred to-tartorange text-culturedwhite gap-3 shadow-inner">
      <SocialLinks/>
      <small>Design & Develop by Ryne Design, 2023</small>
    </footer>
  )
}

export default Footer;