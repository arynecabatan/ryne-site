const { Client } = require("@notionhq/client")
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.PROJECT_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "IDNo",
        direction: "ascending",
      },
    ],
  });

  const allPosts = posts.results;
  
  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

export const getAllPosters = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.POSTER_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "IDNo",
        direction: "ascending",
      },
    ],
  });

  const allPosts = posts.results;
  return allPosts.map((post) => {
    return getPosterMetaData(post);
  });
};

export const getAllLogo = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.LOGOFOLIO_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "IDNo",
        direction: "ascending",
      },
    ],
  });

  const allLogo = posts.results;
  return allLogo.map((post) => {
    return getLogoMetaData(post);
  });
};

export const getAbout = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.ABOUT_DATABASE_ID,
  });

  const allAbout = posts.results;
  return allAbout.map((post) => {
    return getAboutData(post);
  });
};

const getAboutData = (post) => {

  //console.log(post)
  return {
    id: post.id,
    name: post.properties.Name.title[0].plain_text,
    role: post.properties.Role.rich_text[0].plain_text,
    resume: post.properties.Resume.rich_text[0].plain_text,
    tagline: post.properties.Tagline.rich_text[0].plain_text,
    about: post.properties.About.rich_text[0].plain_text,
    email: post.properties.Email.email
  };
}

const getPosterMetaData = (post) => {

  let file = post.properties.Link;
  switch (post.properties.Link.files[0].type) {
      case 'file':
        file = post.properties.Link.files[0].file.url;
          break;
      case 'external':
        file = post.properties.Link.files[0].external.url
          break;
      default:
        file = 'https://i.imgur.com/K8Ho17u.jpeg'
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    idno: post.properties.IDNo.number,
    link: file,
  };
}

const getLogoMetaData = (logo) => {

  let file = logo.properties.Link;
  switch (logo.properties.Link.files[0].type) {
      case 'file':
        file = logo.properties.Link.files[0].file.url;
          break;
      case 'external':
        file = logo.properties.Link.files[0].external.url
          break;
      default:
        file = 'https://i.imgur.com/K8Ho17u.jpeg'
  }

  return {
    id: logo.id,
    title: logo.properties.Name.title[0].plain_text,
    idno: logo.properties.IDNo.number,
    link: file,
  };
}

const getPageMetaData = (post) => {

  let cover = post.cover;
  switch (cover.type) {
      case 'file':
          cover = post.cover.file
          break;
      case 'external':
          cover = post.cover.external.url;
          break;
      default:
          cover = 'https://i.imgur.com/K8Ho17u.jpeg'
  }
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    tags: post.properties.Tags.multi_select,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    url: post.properties.Url.rich_text[0].plain_text,
    idno: post.properties.IDNo.number,
    top: post.properties.Top.checkbox,
    stack: post.properties.Stack.multi_select,
    cover: cover,
  };
}

const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer('video', async (block) => {
  const { video } = block;
  if (video?.external?.url) {
    return `<iframe src=${video?.external?.url} allowfullscreen="true"></iframe>`;
  } else if (video?.file?.url) {
    return `<video src="${video?.file?.url}" controls></video>`;
  } else {
    return '';
  }
});

n2m.setCustomTransformer('pdf', async (block) => {
  const { pdf } = block;
  if (pdf?.file?.url) {
    return `<a filetype="download-pdf" href="${pdf?.file?.url}"></a>`;
  } else if (pdf?.external?.url) {
    return `<a filetype="download-pdf" href="${pdf?.external?.url}"></a>`;
  }
});

n2m.setCustomTransformer('bookmark', async (block) => {
  const { bookmark } = block;
  return `<a filetype="bookmark" href="${bookmark?.url}"></a>`;
});

n2m.setCustomTransformer('embed', async (block) => {
  const { embed } = block;
  return `<figure><iframe src="${embed?.url}"></iframe></figure>`;
});

n2m.setCustomTransformer('divider', async (block) => {
  const { embed } = block;
  return `<br>`;
});

export const getSingleBlogPostBySlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.PROJECT_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });  

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);


  //console.log(mdblocks)
  return {
      metadata,
      mdString,
  };
}