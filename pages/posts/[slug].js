import ReactMarkdown from 'react-markdown'
import Seo from '../../components/Seo';
import { getAllPublished, getSingleBlogPostBySlug, getAllLogo } from "../../lib/notion";
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiDownload, FiExternalLink, FiEye } from "react-icons/fi";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import StackIcon from '../../components/StackIcon';
import Logofolio from '../../components/Logofolio';

const Post = ({ post, logo }) => {

  const date = new Date(post.metadata.date).toLocaleString('en-US', { month: 'long', day:'2-digit', year:'numeric'});

  const { theme, setTheme } = useTheme([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
      <>
      <Seo
        title={post.metadata.title}
        description={post.metadata.description}
        image={post.metadata.cover}
        slug={post.metadata.slug}
      />
      <section className='p-4 max-w-[960px] w-full mt-24 flex flex-col'>
        <div id="cover" className='flex gap-3 flex-col md:flex-row md:gap-6 items-center'>
          <Image priority src={post.metadata.cover} alt={"Ryne Design Image"} width="600" height="400" className='rounded-lg md:w-1/2'/>
          <div className='text-center md:text-left w-full flex flex-col justify-center gap-2'>
            <h1 className='text-5xl text-sizzlingred dark:text-tartorange'>{post.metadata.title}</h1>
            <h3 className='font-normal'>{post.metadata.description}</h3>
            <p className='opacity-50'>{date}</p>

            <span className="flex gap-2 text-spacecadet/40 dark:text-culturedwhite/40 text-xl justify-center md:justify-start">
              {post.metadata.stack.map(stack => (
                <StackIcon key={stack.id} iconName={stack.name}/>
              ))}
            </span>
            <div className='flex justify-center md:justify-start'>
              <button className={`ryne-button w-fit my-2 ${post.metadata.tags.some(e => e.name === "Develop") ? `block` : `hidden`}`}>
                <a className="text-culturedwhite flex items-center gap-2" href={post.metadata.url} rel="noopener noreferrer" target="_blank"><FiEye/> Live preview</a>
              </button>
            </div>

          </div>
        </div>


        <ReactMarkdown
          className='my-10'
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: function ({ children, ...props }) {
              return (
                <h2 className=''>
                  {children}
                </h2>
              )
            },
            h3: function ({ children, ...props }) {
              return (
                <h3 className='gradient-text my-3'>
                  {children}
                </h3>
              )
            },
            p: function ({ children, ...props }) {
              //console.log(props)
              return (
                <div className='my-5 text-base font-normal whitespace-pre-wrap'>{children}</div>
              )
            },
            img: function ({ ...props }) {
              return (
                <Image className='rounded-xl' src={props.src} alt={"Ryne Design Image"} width="960" height="300"/>
              )
            },
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div" style={theme === 'light' ? materialLight : materialDark} className="mx-4 rounded-xl">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {String(children).replace(/\n$/, '')}
                </code>
              )
            },
            a:function ({...props}) {
              if (props.filetype === "download-pdf"){
                return (
                  <div className='bg-spacecadet/10 rounded-lg flex w-64 my-3 items-center'>
                    <small className='flex-1 truncate px-4' href={props.href}>{String(props.href).match(/(?<=\/)[^\/\?#]+(?=[^\/]*$)/)}</small>
                    
                    <div className='p-4 rounded-r-lg bg-gradient-to-r from-sizzlingred to-tartorange animate-text'>
                    <a href={props.href}>
                      <FiDownload className='text-culturedwhite'/>
                    </a>
                    
                    </div>
                  </div>
                  )
              } else if (props.filetype === "bookmark"){
                
                let domainName = String(props.href).match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/)[1];

                return(
                  <div className='flex flex-col justify-center w-auto'>
                    <div className='bg-spacecadet/10 dark:bg-culturedwhite/10 rounded-lg flex w-auto my-3 items-center'>
                      <a href={props.href} target="_blank" className='flex-1 truncate px-4 text-slate-500 font-light italic text'>
                        <small>{props.href}</small>
                      </a>
                      
                      <div className='p-4 rounded-r-lg bg-gradient-to-r from-sizzlingred to-tartorange animate-text'>
                        <a href={props.href} target="_blank">
                            <FiExternalLink className='text-culturedwhite'/>
                        </a>
                      </div>
                    </div>
                    <small className='italic opacity-50 text-center'>
                      {domainName === 'xd.adobe.com' ? "Hi! Adobe has some issue with embedding their XD prototype." : ''}
                    </small>
                  </div>

                )
              } else {
                return (
                  ''
                )
              }
            }
          }}
        >{post.mdString}</ReactMarkdown>
        <Logofolio slug={post.metadata.slug} logoData={logo}/>
        <div>
          <div className='h-[1px] w-full bg-spacecadet/5 dark:bg-culturedwhite/5'/>
          <span className="space-x-4 opacity-50 flex justify-center m-10">
            <small>Tags: </small>
            {post.metadata.tags.map(tag => (
              <small key={tag.id}>{tag.name}</small>
              ))}
          </span>
        </div>

      </section>
      </>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getSingleBlogPostBySlug(params.slug)
  
  const dataLogo = await getAllLogo()

  return {
    props: {
      post,
      logo: dataLogo
    },
    revalidate: 60
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPublished()
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;