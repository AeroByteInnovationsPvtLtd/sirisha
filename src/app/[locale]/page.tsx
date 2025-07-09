import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { fetchFromKeystone, GET_SERVICES, GET_LOCATIONS } from '@/lib/keystone';

// Mock data for development
const mockServices = [
  {
    id: '1',
    title: 'Oil Change Service',
    titleAr: 'خدمة تغيير الزيت',
    description: 'Professional oil change service with high-quality lubricants to keep your engine running smoothly.',
    descriptionAr: 'خدمة تغيير الزيت المهنية بزيوت تشحيم عالية الجودة للحفاظ على تشغيل محركك بسلاسة.',
    icon: '🛢️',
  },
  {
    id: '2',
    title: 'Brake Service',
    titleAr: 'خدمة الفرامل',
    description: 'Complete brake inspection, repair, and replacement services for your safety.',
    descriptionAr: 'خدمات فحص وإصلاح واستبدال الفرامل الكاملة من أجل سلامتك.',
    icon: '🚗',
  },
  {
    id: '3',
    title: 'Tire Service',
    titleAr: 'خدمة الإطارات',
    description: 'Tire installation, balancing, alignment, and repair services.',
    descriptionAr: 'خدمات تركيب وموازنة ومحاذاة وإصلاح الإطارات.',
    icon: '🛞',
  },
  {
    id: '4',
    title: 'Engine Diagnostics',
    titleAr: 'تشخيص المحرك',
    description: 'Advanced computer diagnostics to identify and resolve engine issues.',
    descriptionAr: 'تشخيص حاسوبي متقدم لتحديد وحل مشاكل المحرك.',
    icon: '🔧',
  },
  {
    id: '5',
    title: 'AC Service',
    titleAr: 'خدمة التكييف',
    description: 'Air conditioning repair, maintenance, and recharge services.',
    descriptionAr: 'خدمات إصلاح وصيانة وإعادة شحن تكييف الهواء.',
    icon: '❄️',
  },
  {
    id: '6',
    title: 'Battery Service',
    titleAr: 'خدمة البطارية',
    description: 'Battery testing, replacement, and maintenance services.',
    descriptionAr: 'خدمات اختبار واستبدال وصيانة البطارية.',
    icon: '🔋',
  },
];

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
];

async function getServices() {
  try {
    const data = await fetchFromKeystone(GET_SERVICES);
    return data.data?.services || mockServices;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return mockServices;
  }
}

async function getLocations() {
  try {
    const data = await fetchFromKeystone(GET_LOCATIONS);
    return data.data?.locations || mockLocations;
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return mockLocations;
  }
}

export default async function HomePage() {
  const [services, locations] = await Promise.all([
    getServices(),
    getLocations(),
  ]);

  return (
    <>
      <HeroSection
        primaryButtonText="Our Services"
        secondaryButtonText="Find Location"
      />
      
      <Suspense fallback={<div>Loading services...</div>}>
        <ServicesGrid services={services} />
      </Suspense>
      
      <Suspense fallback={<div>Loading locations...</div>}>
        <LocationsSection locations={locations} />
      </Suspense>
    </>
  );
}