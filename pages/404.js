import Seo from '../components/Seo';
import Lottie from 'react-lottie-player';
import NotFoundLottie from '../public/404.json';
import Link from 'next/link';
import { FiDownload, FiArrowDown, FiHome } from "react-icons/fi";

const Custom404 = () => {
  return(
    <>
      <Seo
        title="Page Not Found"
        description="Oops! Wrong content"
        image=""
        slug=""
      />
      <section className='grid items-center justify-center h-screen'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <Lottie className="max-w-[853px]" loop={true} play animationData={NotFoundLottie}/>
          <Link href="/">
            <button className='ryne-button mt-3 flex items-center gap-3'>Return Home <FiHome className='text-xl'/></button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Custom404;