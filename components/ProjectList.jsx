import Image from 'next/image';
import Link from 'next/link';
import GalleryBox from './GalleryBox';
import StackIcon from './StackIcon';
import { useState } from 'react';

export default function ProjectList ({posts, poster, category}) {

  
  const [switchBox, setSwitchBox] = useState("close");
  const [currentImage, setCurrentImage] = useState("");

  if(!posts) return <h1>No posts</h1>

  if (category === "Posters"){
    return (
      <>
      <GalleryBox switchBox={switchBox} setSwitchBox={setSwitchBox} dataarray={poster} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
      <div className='flex flex-wrap after:content-[""] after:grow-[999999999] w-[90vw] max-w-[1440px] min-w-auto px-2 md:px-3 desktop:px-4'>
        {
        poster.map((posterName, index) => (
          <div className='flex-grow h-[300px] mx-1 my-1 relative cursor-pointer' key={index}>
            <div onClick={() => {setSwitchBox('open');setCurrentImage(posterName.idno)}} className='absolute h-[300px] w-full flex items-end transition-all bg-gradient-to-t from-black opacity-0 hover:opacity-90 ease-in-out'>
              <p className='text-center text-culturedwhite mb-4 w-full h-auto'>{posterName.title}</p>
            </div>
            <div className=''>
            <Image src={posterName.cover} alt={posterName.title} width={posterName.width} height={posterName.height} className="object-cover align-bottom w-full h-[300px]"/>
              {/**
               * <img src={posterName.cover} alt={posterName.title} className="object-cover align-bottom min-w-full max-w-full h-[300px]"/>
               */
              }
            </div>
          </div>
        ))
        }
      </div>
      </>

    )
  } else {
    return(
      <div className='px-4 flex flex-col gap-10 pb-24 items-center'>
        <section className='max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mobile:grid-cols-2 gap-8 '>
          {posts.filter(post => {
            return post.tags.some(e => e.name == category) && (post.top === true)
          })
          .slice(0,3)
          .map((post, index) => (
            <Link className="text-spacecadet dark:text-culturedwhite" key={index} rel="noopener noreferrer" href={`/posts/${post.slug}`}>
              <Image src={post.cover} alt={post.title} className="rounded-2xl shadow-sm hover:bg-black" width={3000} height={2000}/>
              <div className='my-2 flex flex-col gap-0'>
                <h4>{post.title}</h4>
                <small className='text-gray-500 dark:text-gray-400 font-light'>{post.description}</small>
                <span className="mt-2 flex gap-2 text-spacecadet/40 dark:text-culturedwhite/40 text-xl">
                  {post.stack.map(stack => (
                    <StackIcon key={stack.id} iconName={stack.name}/>
                  ))}
                </span>
              </div>
            </Link>
          ))}
        </section>

        <div className={`${posts.filter(post => {return post.tags.some(e => e.name == category)}).length >= 3 ? `flex flex-col gap-10` : `hidden`}`}>

          <div className='mt-4 lg:mt-8 text-center'>
            {/**
             * <h3>Other Projects</h3>
             */}
          </div>
          <section className='max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mobile:grid-cols-2 gap-8'>
          {posts.filter(post => {
              return post.tags.some(e => e.name == category) && (post.top === false)
            })
            .slice(0,4)
            .map((post, index) => (
              <Link className="text-spacecadet dark:text-culturedwhite" key={index} href={`/posts/${post.slug}`}>
                <Image src={post.cover} alt={post.title} className="rounded-2xl shadow-sm" width={3000} height={2000}/>
                <div className='my-2 flex flex-col gap-0'>
                  <h4>{post.title}</h4>
                  <small className='text-gray-500 dark:text-gray-400 font-light'>{post.description}</small>
                </div>
              </Link>
            ))}
          </section>
        </div>
        {
        //<button className='ryne-button w-max'>See All Projects</button>
        }
      </div>
    );
  }  
}

{
  /**
   *             <Link className="text-spacecadet dark:text-culturedwhite" key={index} target={post.tags.some(e => e.name === "Develop") ? `_blank` : `_self`}
              rel="noopener noreferrer" href={post.tags.some(e => e.name === "Develop") ? `${post.slug}` : `/posts/${post.slug}`}>
   */
}