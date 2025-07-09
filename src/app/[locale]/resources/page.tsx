import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { fetchFromKeystone, GET_BLOG_POSTS } from '@/lib/keystone';
import { formatDate, getLocalizedContent } from '@/lib/utils';

// Mock data for development
const mockPosts = [
  {
    id: '1',
    title: '5 Essential Car Maintenance Tips for Summer',
    titleAr: '5 نصائح أساسية لصيانة السيارة في الصيف',
    slug: 'summer-car-maintenance-tips',
    excerpt: 'Keep your car running smoothly during hot weather with these essential maintenance tips.',
    excerptAr: 'حافظ على تشغيل سيارتك بسلاسة خلال الطقس الحار مع هذه النصائح الأساسية للصيانة.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Maintenance',
      nameAr: 'الصيانة',
      slug: 'maintenance',
    },
    author: {
      name: 'Ahmed Al-Rashid',
    },
    publishedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Understanding Your Car\'s Warning Lights',
    titleAr: 'فهم أضواء التحذير في سيارتك',
    slug: 'car-warning-lights-guide',
    excerpt: 'Learn what different dashboard warning lights mean and when to take action.',
    excerptAr: 'تعلم ما تعنيه أضواء التحذير المختلفة في لوحة القيادة ومتى تتخذ إجراءً.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Safety',
      nameAr: 'السلامة',
      slug: 'safety',
    },
    author: {
      name: 'Sarah Johnson',
    },
    publishedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'How to Choose the Right Motor Oil',
    titleAr: 'كيفية اختيار زيت المحرك المناسب',
    slug: 'choosing-right-motor-oil',
    excerpt: 'A comprehensive guide to selecting the best motor oil for your vehicle.',
    excerptAr: 'دليل شامل لاختيار أفضل زيت محرك لمركبتك.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Maintenance',
      nameAr: 'الصيانة',
      slug: 'maintenance',
    },
    author: {
      name: 'Mohammed Hassan',
    },
    publishedAt: '2024-01-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Electric Vehicle Maintenance: What You Need to Know',
    titleAr: 'صيانة المركبات الكهربائية: ما تحتاج لمعرفته',
    slug: 'electric-vehicle-maintenance',
    excerpt: 'Essential maintenance tips for electric vehicle owners.',
    excerptAr: 'نصائح صيانة أساسية لأصحاب المركبات الكهربائية.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Electric Vehicles',
      nameAr: 'المركبات الكهربائية',
      slug: 'electric-vehicles',
    },
    author: {
      name: 'Lisa Chen',
    },
    publishedAt: '2024-01-01T16:45:00Z',
  },
  {
    id: '5',
    title: 'Winter Driving Safety Tips',
    titleAr: 'نصائح السلامة للقيادة في الشتاء',
    slug: 'winter-driving-safety',
    excerpt: 'Stay safe on the road during winter months with these driving tips.',
    excerptAr: 'ابق آمناً على الطريق خلال أشهر الشتاء مع هذه النصائح للقيادة.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Safety',
      nameAr: 'السلامة',
      slug: 'safety',
    },
    author: {
      name: 'Omar Al-Mahmoud',
    },
    publishedAt: '2023-12-28T11:20:00Z',
  },
  {
    id: '6',
    title: 'The Future of Automotive Technology',
    titleAr: 'مستقبل تكنولوجيا السيارات',
    slug: 'future-automotive-technology',
    excerpt: 'Explore the latest innovations shaping the future of the automotive industry.',
    excerptAr: 'استكشف أحدث الابتكارات التي تشكل مستقبل صناعة السيارات.',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      width: 800,
      height: 600,
    },
    category: {
      name: 'Technology',
      nameAr: 'التكنولوجيا',
      slug: 'technology',
    },
    author: {
      name: 'David Park',
    },
    publishedAt: '2023-12-25T13:10:00Z',
  },
];

async function getBlogPosts() {
  try {
    const data = await fetchFromKeystone(GET_BLOG_POSTS, { take: 12, skip: 0 });
    return data.data?.blogPosts || mockPosts;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return mockPosts;
  }
}

export default async function ResourcesPage() {
  const posts = await getBlogPosts();
  const locale = useLocale();

  return (
    <div className="py-8">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resources & News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest automotive insights, maintenance tips, and industry news from our experts.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={posts[0].featuredImage?.url || '/placeholder-image.jpg'}
                      alt={getLocalizedContent(posts[0].title, posts[0].titleAr, locale)}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {getLocalizedContent(posts[0].category?.name, posts[0].category?.nameAr, locale)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(posts[0].publishedAt, locale)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {getLocalizedContent(posts[0].title, posts[0].titleAr, locale)}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {getLocalizedContent(posts[0].excerpt, posts[0].excerptAr, locale)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {posts[0].author?.name}
                    </span>
                    <Button>
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={post.featuredImage?.url || '/placeholder-image.jpg'}
                  alt={getLocalizedContent(post.title, post.titleAr, locale)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {getLocalizedContent(post.category?.name, post.category?.nameAr, locale)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {formatDate(post.publishedAt, locale)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {getLocalizedContent(post.title, post.titleAr, locale)}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {getLocalizedContent(post.excerpt, post.excerptAr, locale)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    By {post.author?.name}
                  </span>
                  <Link
                    href={`/${locale}/resources/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </Container>
    </div>
  );
}