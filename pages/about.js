import Seo from '../components/Seo';
import { FiDownload, FiArrowDown, FiMail } from "react-icons/fi";
import { getAbout } from '../lib/notion';

const About = ({about}) => {

  //console.log(about)
  return(
    <>
      <Seo
        title="About"
        description="Ryne Design About"
        image=""
        slug=""
      />
      
      <section className='w-full flex justify-center dark:bg-[url("../public/patternpad-dark-about.svg")] bg-[url("../public/patternpad-light-about.svg")] bg-no-repeat bg-cover'>
        <div className='w-full h-screen absolute overflow-y-hidden bg-gradient-to-t from-culturedwhite dark:from-spacecadet'/>
        <div className='max-w-[1440px] w-full h-screen px-3 relative flex justify-center items-center pb-10'>
          <div className='flex flex-col items-center gap-4'>
            <div id="headerimage" className='animate-blobs bg-[url("../public/profile.jpg")] bg-no-repeat bg-center bg-cover w-[240px] h-[240px] shadow-[inset_0_0_0_9px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_0_0_9px_rgba(0,0,0,0.2)] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px]'></div>
            <div id="headertext" className='flex flex-col items-center'>
              <h1 className='text-5xl gradient-text'>{about.name}</h1>
              <h3 className='my-2'>{about.role}</h3>
              <small className='text-center my-2 italic text-sm desktop:text-lg'>{about.tagline}</small>
              <a target="_blank" rel="noreferrer" href={about.resume}>
                <button className='ryne-button mt-3 flex items-center gap-3'>Download CV <FiDownload className='text-xl'/></button>
              </a>
            </div>
          </div>
          <div className='absolute bottom-6 flex flex-col items-center gap-3 opacity-50'>        
            <FiArrowDown className='text-base animation-ping'/>
            <small>Scroll for more</small>
          </div>
        </div>
      </section>
      <section className='h-[40vh] w-full flex items-center text-center justify-center px-3 my-10'>
        <h1>"I craft <span className='gradient-text'>products and websites </span> focusing on<br/>delivering <span className='gradient-text'>beautiful user experience.</span>"</h1>
      </section>

      
      <section className='w-full flex flex-col items-center'>
        <div className='flex flex-col max-w-[960px] gap-8 px-3 my-16'>
          <h1 className='gradient-text'>About me</h1>
          <p className='leading-loose whitespace-pre-line'>{about.about}</p>
        </div>
      </section>

      <section className='w-full flex flex-col items-center'>
        <div className='flex flex-col max-w-[960px] gap-8 px-3 my-16 text-center'>
          <h3 className='font-light italic leading-relaxed whitespace-pre-line'>Thank you for stopping by. If you would like to discuss more, share feedback, or ask any questions, <span className='gradient-text'>please get in touch.</span></h3>
          <div>
            <a target="_blank" rel="noreferrer" href={`mailto:${about.email}`}>
              <button className='ryne-button mt-3 flex items-center gap-3'>Get in touch <FiMail className='text-xl'/></button>
            </a>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default About;

export const getStaticProps = async () => {
  const dataAbout = await getAbout()

  return {
    props: {
      about: dataAbout[0],
    },
    revalidate: 60
  };
};