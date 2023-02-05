import Head from 'next/head'
import React from 'react'
import {SEO} from './Variables'

const Seo = ({ title, description, slug, image}) => {

  return(
    <>
      <Head>
        <title>{`Ryne Design | ${title}`}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SEO.siteUrl} />
        <meta name="description" content={description} />
        
        {/*Facebook*/}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${SEO.siteUrl}${slug}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={SEO.siteUrl} />
        {/*
          <meta property="og:video" content="your-video-url.mp4" />
          <meta property="og:locale" content="en_US" />
        */}

        {/*Twitter*/}
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content={`${SEO.siteUrl}${slug}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content={SEO.twitter} />

        <link rel="icon" href='/logo-minified.svg'></link>
      </Head>
    </>
  )
}

export default Seo;