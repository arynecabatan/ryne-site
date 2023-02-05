import Seo from '../components/Seo';
import { getAllPublished, getAllPosters } from '../lib/notion';
import ProjectList from '../components/ProjectList';
import { useState } from 'react';

export default function Home({posts, poster}) {
  
  const [category, setCategory] = useState("Design");

  if(!posts) return <h1>No posts</h1>

  return (
    <>
      <Seo
        title="Portfolio"
        description="Ryne Design Portfolio"
        image=""
        slug=""
      />
      <div id="hero" className='h-80 sm:h-96 flex flex-col text-center justify-center gap-3 w-full relative'>
        <div className='w-full h-full object-cover transition-all dark:bg-[url("../public/patternpad-light.svg")] bg-[url("../public/patternpad-dark.svg")] opacity-20 bg-no-repeat bg-cover'/>
        <div className='w-full h-auto absolute'>
          <h1 className='gradient-text text-5xl'>My Portfolio</h1>
          <p>Check out my projects from design to development</p>
        </div>
      </div>

      <div className='w-full justify-center items-center flex gap-2 py-4 mb-8'>
        <button className={`py-2 px-3 md:px-5 text-base ${category === 'Design' ? `ryne-button rounded-full` : ''}`} onClick={() => setCategory("Design")}>Design</button>
        <button className={`py-2 px-3 md:px-5 text-base ${category === 'Develop' ? `ryne-button rounded-full` : ''}`} onClick={() => setCategory("Develop")}>Develop</button>
        <button className={`py-2 px-3 md:px-5 text-base ${category === 'Posters' ? `ryne-button rounded-full` : ''}`} onClick={() => setCategory("Posters")}>Posters</button>
      </div>

      <ProjectList posts={posts} poster={poster} category={category}/>
    </>
  )
}

export const getStaticProps = async () => {
  const dataPortfolio = await getAllPublished()
  const dataPoster = await getAllPosters()

  return {
    props: {
      posts: dataPortfolio,
      poster: dataPoster
    },
    revalidate: 60
  };
};