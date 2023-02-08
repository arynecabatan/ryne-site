import { FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect, useCallback } from 'react';

const GalleryBox = ({switchBox, setSwitchBox, dataarray, currentImage, setCurrentImage}) => {  


  const extractData = dataarray.find(data => data.idno === currentImage)

  const showNext = () => {
    if (currentImage >= dataarray.length){
      setCurrentImage(1);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  const showPrev = () => {
    if (currentImage <= 1){
      setCurrentImage(dataarray.length);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  const handleKeyPress = useCallback((event) => {
    //console.log(`Key pressed: ${event.key}`);
    switch (event.key) {
      case 'ArrowRight':
        //console.log("Next")
        break;
      case 'ArrowLeft':
        //console.log("Previous")
        break;
      case 'Escape':
        setSwitchBox('close')
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  if (switchBox === 'open'){
    return(
      <>
        <div className={`transition-all bg-spacecadet/95 w-screen min-w-[280px] h-screen fixed z-50 top-0 block left-0`}>
          <button onClick={() => setSwitchBox('close')} className={`bg-black/10 h-10 w-10 absolute top-4 right-4 grid items-center justify-center rounded-lg shadow-sm z-50`}>
            <FiX className="text-sizzlingred w-6 h-6"/>
          </button>
          <button onClick={showNext} className={`bg-black/10 h-10 w-10 absolute top-1/2 right-4 grid items-center justify-center rounded-lg shadow-sm z-50`}>
            <FiArrowRight className="text-sizzlingred w-6 h-6"/>
          </button>
          <button onClick={showPrev} className={`bg-black/10 h-10 w-10 absolute top-1/2 left-4 grid items-center justify-center rounded-lg shadow-sm z-50`}>
            <FiArrowLeft className="text-sizzlingred w-6 h-6"/>
          </button>
          <div className="h-full grid items-center justify-center ">
            <img src={extractData.cover} alt={extractData.name} className="object-contain h-screen p-0 sm:p-10 md:p-16 desktop:p-20 shadow-sm"/>
          </div>
      </div>
      </>
    )
  }



}

export default GalleryBox;