import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { Container } from '@/components/ui/Container';
import { fetchFromKeystone, GET_LOCATIONS } from '@/lib/keystone';

// Mock data for development
const mockLocations = [
  {
    id: '1',
    name: 'Riyadh Main Center',
    nameAr: 'مركز الرياض الرئيسي',
    address: '123 King Fahd Road',
    addressAr: '123 طريق الملك فهد',
    city: 'Riyadh',
    cityAr: 'الرياض',
    phone: '+966 11 123 4567',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
  {
    id: '2',
    name: 'Jeddah Branch',
    nameAr: 'فرع جدة',
    address: '456 Prince Sultan Street',
    addressAr: '456 شارع الأمير سلطان',
    city: 'Jeddah',
    cityAr: 'جدة',
    phone: '+966 12 234 5678',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
  {
    id: '3',
    name: 'Dammam Service Center',
    nameAr: 'مركز خدمة الدمام',
    address: '789 Corniche Road',
    addressAr: '789 طريق الكورنيش',
    city: 'Dammam',
    cityAr: 'الدمام',
    phone: '+966 13 345 6789',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
  {
    id: '4',
    name: 'Mecca Service Point',
    nameAr: 'نقطة خدمة مكة',
    address: '321 Al Haram Street',
    addressAr: '321 شارع الحرم',
    city: 'Mecca',
    cityAr: 'مكة',
    phone: '+966 12 456 7890',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
  {
    id: '5',
    name: 'Medina Center',
    nameAr: 'مركز المدينة',
    address: '654 Prophet Street',
    addressAr: '654 شارع النبي',
    city: 'Medina',
    cityAr: 'المدينة',
    phone: '+966 14 567 8901',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
  {
    id: '6',
    name: 'Khobar Branch',
    nameAr: 'فرع الخبر',
    address: '987 King Abdul Aziz Road',
    addressAr: '987 طريق الملك عبد العزيز',
    city: 'Khobar',
    cityAr: 'الخبر',
    phone: '+966 13 678 9012',
    workingHours: 'Sun-Thu: 8AM-6PM, Fri: 2PM-6PM',
    workingHoursAr: 'الأحد-الخميس: 8ص-6م، الجمعة: 2م-6م',
  },
];

async function getLocations() {
  try {
    const data = await fetchFromKeystone(GET_LOCATIONS);
    return data.data?.locations || mockLocations;
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return mockLocations;
  }
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="py-8">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Service Locations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find our service centers across the region. We have strategically located branches to serve you better with convenient access and professional service.
          </p>
        </div>
      </Container>

      <Suspense fallback={<div>Loading locations...</div>}>
        <LocationsSection locations={locations} />
      </Suspense>

      {/* All Locations Grid */}
      <Container className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {location.name}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{location.address}, {location.city}</p>
                {location.phone && <p>📞 {location.phone}</p>}
                {location.workingHours && <p>🕒 {location.workingHours}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}