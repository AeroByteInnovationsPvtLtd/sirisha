import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getLocalizedContent } from '@/lib/utils';

interface Location {
  id: string;
  name: string;
  nameAr?: string;
  address: string;
  addressAr?: string;
  city: string;
  cityAr?: string;
  phone?: string;
  workingHours?: string;
  workingHoursAr?: string;
  latitude?: string;
  longitude?: string;
}

interface LocationsSectionProps {
  locations: Location[];
  title?: string;
  subtitle?: string;
}

export function LocationsSection({ locations, title, subtitle }: LocationsSectionProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title || t('home.locationsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle || t('home.locationsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">Map integration will be added here</p>
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-6">
            {locations.slice(0, 4).map((location) => (
              <div
                key={location.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getLocalizedContent(location.name, location.nameAr, locale)}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="mt-0.5 text-blue-600" />
                    <span>
                      {getLocalizedContent(location.address, location.addressAr, locale)}, {' '}
                      {getLocalizedContent(location.city, location.cityAr, locale)}
                    </span>
                  </div>
                  
                  {location.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-blue-600" />
                      <span>{location.phone}</span>
                    </div>
                  )}
                  
                  {location.workingHours && (
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-blue-600" />
                      <span>
                        {getLocalizedContent(location.workingHours, location.workingHoursAr, locale)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3 mt-4">
                  <Button size="sm" variant="outline">
                    {t('locations.getDirections')}
                  </Button>
                  {location.phone && (
                    <Button size="sm">
                      {t('locations.callNow')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}