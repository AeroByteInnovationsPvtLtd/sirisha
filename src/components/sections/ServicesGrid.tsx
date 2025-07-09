import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { getLocalizedContent } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  icon?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
}

interface ServicesGridProps {
  services: Service[];
  title?: string;
  subtitle?: string;
}

export function ServicesGrid({ services, title, subtitle }: ServicesGridProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title || t('home.servicesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle || t('home.servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              {/* Service Image */}
              {service.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image.url}
                    alt={getLocalizedContent(service.title, service.titleAr, locale)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Icon */}
                {service.icon && !service.image && (
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {getLocalizedContent(service.title, service.titleAr, locale)}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedContent(service.description, service.descriptionAr, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}