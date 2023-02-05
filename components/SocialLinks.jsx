import React from 'react'
import { SEO } from "./Variables";


const SocialLinks = () => {
  return(
    <div className='flex gap-x-3 justify-center'>
      {SEO.socialLinks.map((a)=>(
        <a className="text-culturedwhite hover:text-spacecadet transition" target="_blank" rel="noreferrer" href={a.link} key={a.id}>
          <h2><a.icon/></h2>
        </a>
      ))}
    </div>
  );

}

export default SocialLinks;