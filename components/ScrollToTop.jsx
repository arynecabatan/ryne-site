import { RiArrowUpLine} from "react-icons/ri";
import React, { useEffect, useState } from "react"

const ScrollToTop = () =>{

  const [scrollOnTop, setScrollOnTop] = useState(true);

  const scrollUpdateHandler = () => {
    if (window.scrollY > 220*2){
      setScrollOnTop(false)
    } else {
      setScrollOnTop(true);
    }
  }

  const scrollToHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollUpdateHandler)
    return () => {
      window.removeEventListener('scroll', scrollUpdateHandler)
    }
  }, [])

  return(
    <div className="relative bg-blue-900">
      <div onClick={scrollToHandler} className={`bg-spacecadet dark:bg-culturedwhite z-50 fixed bottom-4 right-4 md:bottom-10 md:right-10 p-4 rounded-xl shadow-lg transition-all hover:animate-bounce ${scrollOnTop === true ? 'opacity-0' : 'opacity-100'}`}>
        <RiArrowUpLine className="text-xl text-culturedwhite dark:text-spacecadet"/>
      </div>
    </div>
  )
}

export default ScrollToTop;