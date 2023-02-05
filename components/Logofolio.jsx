import Image from 'next/image';
import GalleryBox from './GalleryBox';
import { useState } from 'react';

const Logofolio = ({slug, logoData}) => {

  const [switchBox, setSwitchBox] = useState("close");
  const [currentImage, setCurrentImage] = useState("");
  
  //console.log(logoData)

  if (slug != "50-logo-challenge") return(<></>);

  return(
    <>
      <GalleryBox switchBox={switchBox} setSwitchBox={setSwitchBox} dataarray={logoData} currentImage={currentImage} setCurrentImage={setCurrentImage}/>    
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 desktop:grid-cols-4 w-[90vw] max-w-[960px]'>
          {
          logoData.map((logo, index) => (
            <div key={index} className='m-0.5 relative cursor-pointer' onClick={() => {setSwitchBox('open');setCurrentImage(logo.idno)}}>
              <div className='p-1 absolute h-full w-full flex items-end transition-all bg-gradient-to-t from-black opacity-0 hover:opacity-90 ease-in-out'>
                <p className='text-center text-culturedwhite mb-4 w-full h-auto'>{logo.title}</p>
              </div>
              <Image src={logo.link} alt={logo.title} height={320} width={320}/>
            </div>
          ))
          }
        </div>
      </div>
    </>

  )
}

export default Logofolio;