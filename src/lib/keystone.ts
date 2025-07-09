const KEYSTONE_URL = process.env.NEXT_PUBLIC_KEYSTONE_URL || 'http://localhost:3001';

export async function fetchFromKeystone(query: string, variables?: any) {
  try {
    const response = await fetch(`${KEYSTONE_URL}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Keystone fetch error:', error);
    throw error;
  }
}

// GraphQL queries
export const GET_PAGES = `
  query GetPages {
    pages {
      id
      title
      titleAr
      slug
      content {
        document
      }
      contentAr {
        document
      }
      metaDescription
      metaDescriptionAr
      heroImage {
        url
        width
        height
      }
      status
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: String!) {
    pages(where: { slug: { equals: $slug } }) {
      id
      title
      titleAr
      slug
      content {
        document
      }
      contentAr {
        document
      }
      metaDescription
      metaDescriptionAr
      heroImage {
        url
        width
        height
      }
      status
    }
  }
`;

export const GET_SERVICES = `
  query GetServices {
    services(where: { status: { equals: "active" } }) {
      id
      title
      titleAr
      description
      descriptionAr
      icon
      image {
        url
        width
        height
      }
      order
    }
  }
`;

export const GET_LOCATIONS = `
  query GetLocations {
    locations(where: { status: { equals: "active" } }) {
      id
      name
      nameAr
      address
      addressAr
      city
      cityAr
      phone
      email
      latitude
      longitude
      workingHours
      workingHoursAr
      services {
        id
        title
        titleAr
      }
    }
  }
`;

export const GET_BLOG_POSTS = `
  query GetBlogPosts($take: Int, $skip: Int) {
    blogPosts(
      where: { status: { equals: "published" } }
      orderBy: { publishedAt: desc }
      take: $take
      skip: $skip
    ) {
      id
      title
      titleAr
      slug
      excerpt
      excerptAr
      featuredImage {
        url
        width
        height
      }
      category {
        name
        nameAr
        slug
      }
      author {
        name
      }
      publishedAt
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: String!) {
    blogPosts(where: { slug: { equals: $slug } }) {
      id
      title
      titleAr
      slug
      excerpt
      excerptAr
      content {
        document
      }
      contentAr {
        document
      }
      featuredImage {
        url
        width
        height
      }
      category {
        name
        nameAr
        slug
      }
      tags {
        name
        nameAr
        slug
      }
      author {
        name
      }
      publishedAt
    }
  }
`;

export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    siteSettings {
      id
      siteName
      siteNameAr
      siteDescription
      siteDescriptionAr
      logo {
        url
        width
        height
      }
      contactEmail
      contactPhone
      socialMedia
      headerMenu
      footerMenu
    }
  }
`;