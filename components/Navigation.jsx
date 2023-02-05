import Image from 'next/image'
import { useState, useEffect } from 'react';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {

  const router = useRouter();
  const currentRoute = router.pathname;

  const [scrollBG, setScrollBG] = useState(true);
  const [mNavOpen, setmNavOpen] = useState(false);

  const scrollUpdateHandler = () => {
    if (window.scrollY > 50){
      setScrollBG(false) //colored
    } else {
      setScrollBG(true); //transparent
    }
  }

  const navMenuHandler = () => {
    if (mNavOpen) {
      setmNavOpen(false);
    } else {
      setmNavOpen(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollUpdateHandler)
    return () => {
      window.removeEventListener('scroll', scrollUpdateHandler)
    }
  }, [])

  return(
    <>
      <nav className={`z-50 h-20 px-3 flex justify-center items-center fixed w-full border-b-1 shadow-sm ${scrollBG === true ? `backdrop-blur-none border-gray-900` : `backdrop-blur-sm bg-culturedwhite/50 dark:bg-spacecadet/30 border-gray-100`}`}>
        <div className='flex flex-row max-w-[1440px] w-full justify-between'>
          <div className=''>
            <Link href="/"><Image src="/logo-minified.svg" alt='logo' width={48} height={48}/></Link>
            
          </div>
          <div className='flex flex-row justify-center content-center items-center gap-3'>
            <ul className='flex-row justify-center content-center items-center hidden mobile:flex'>
              <li className='mr-10'>
                <Link href="/" className={`${currentRoute === '/' || currentRoute === '/posts/[slug]' ? 'text-sizzlingred dark:text-tartorange font-bold' : 'text-spacecadet dark:text-culturedwhite font-normal'}`}>Portfolio</Link></li>
              <li className='mr-10'>
                <Link href="/about" className={`${currentRoute === '/about' ? 'text-sizzlingred dark:text-tartorange font-bold' : 'text-spacecadet dark:text-culturedwhite font-normal'}`}>About</Link>
              </li>
            </ul>
            <ThemeSwitch/>
            <div onClick={navMenuHandler} className='flex flex-col gap-1 ml-4 justify-center content-center items-center mobile:hidden'>
              <div className={`${mNavOpen ? `translate-x-0 translate-y-[8px] -rotate-45` : `translate-x-0 translate-y-0`} w-6 h-1 bg-spacecadet dark:bg-culturedwhite ease-linear duration-300`}/>
              <div className={`${mNavOpen ? `opacity-0` : `opacity-100`} w-6 h-1 bg-spacecadet dark:bg-culturedwhite ease-linear duration-300`}/>
              <div className={`${mNavOpen ? `translate-x-0 translate-y-[-8px] -rotate-[-45deg]` : `translate-x-0 translate-y-0`} w-6 h-1 bg-spacecadet dark:bg-culturedwhite ease-linear duration-300`}/>
            </div>
          </div>
        </div>
      </nav>
      <div className={`z-40 mobile:hidden bg-culturedwhite/80 dark:bg-spacecadet/80 ${mNavOpen ? `flex`: `hidden`} min-h-screen fixed min-w-full backdrop-blur-sm transition`}>
          <ul className='min-w-full flex flex-col justify-center text-center px-4 gap-5'>
            <li onClick={navMenuHandler} className=''>
              <Link href="/" className={`text-xl ${currentRoute === '/' || currentRoute === '/posts/[slug]' ? 'text-sizzlingred dark:text-tartorange font-bold' : 'text-spacecadet dark:text-culturedwhite font-normal'}`}>Portfolio</Link>
            </li>
            <li onClick={navMenuHandler} className=''>
              <Link href="/about" className={`text-xl ${currentRoute === '/about' ? 'text-sizzlingred dark:text-tartorange font-bold' : 'text-spacecadet dark:text-culturedwhite font-normal'}`}>About</Link>
            </li>
          </ul>
        </div>
    </>
  );
}

export default Navigation;