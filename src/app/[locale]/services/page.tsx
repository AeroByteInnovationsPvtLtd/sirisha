import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { Container } from '@/components/ui/Container';
import { fetchFromKeystone, GET_SERVICES } from '@/lib/keystone';

// Mock data for development
const mockServices = [
  {
    id: '1',
    title: 'Oil Change Service',
    titleAr: 'خدمة تغيير الزيت',
    description: 'Professional oil change service with high-quality lubricants to keep your engine running smoothly. We use only premium oils and filters.',
    descriptionAr: 'خدمة تغيير الزيت المهنية بزيوت تشحيم عالية الجودة للحفاظ على تشغيل محركك بسلاسة. نستخدم فقط الزيوت والفلاتر المتميزة.',
    icon: '🛢️',
  },
  {
    id: '2',
    title: 'Brake Service',
    titleAr: 'خدمة الفرامل',
    description: 'Complete brake inspection, repair, and replacement services for your safety. Our certified technicians ensure optimal braking performance.',
    descriptionAr: 'خدمات فحص وإصلاح واستبدال الفرامل الكاملة من أجل سلامتك. يضمن فنيونا المعتمدون الأداء الأمثل للفرامل.',
    icon: '🚗',
  },
  {
    id: '3',
    title: 'Tire Service',
    titleAr: 'خدمة الإطارات',
    description: 'Tire installation, balancing, alignment, and repair services. We work with all major tire brands and provide warranty coverage.',
    descriptionAr: 'خدمات تركيب وموازنة ومحاذاة وإصلاح الإطارات. نعمل مع جميع العلامات التجارية الرئيسية للإطارات ونقدم تغطية الضمان.',
    icon: '🛞',
  },
  {
    id: '4',
    title: 'Engine Diagnostics',
    titleAr: 'تشخيص المحرك',
    description: 'Advanced computer diagnostics to identify and resolve engine issues. State-of-the-art equipment for accurate problem detection.',
    descriptionAr: 'تشخيص حاسوبي متقدم لتحديد وحل مشاكل المحرك. معدات حديثة للكشف الدقيق عن المشاكل.',
    icon: '🔧',
  },
  {
    id: '5',
    title: 'AC Service',
    titleAr: 'خدمة التكييف',
    description: 'Air conditioning repair, maintenance, and recharge services. Keep your vehicle comfortable in all weather conditions.',
    descriptionAr: 'خدمات إصلاح وصيانة وإعادة شحن تكييف الهواء. حافظ على راحة مركبتك في جميع الظروف الجوية.',
    icon: '❄️',
  },
  {
    id: '6',
    title: 'Battery Service',
    titleAr: 'خدمة البطارية',
    description: 'Battery testing, replacement, and maintenance services. Reliable power solutions for your vehicle with extended warranty.',
    descriptionAr: 'خدمات اختبار واستبدال وصيانة البطارية. حلول طاقة موثوقة لمركبتك مع ضمان ممتد.',
    icon: '🔋',
  },
  {
    id: '7',
    title: 'Transmission Service',
    titleAr: 'خدمة ناقل الحركة',
    description: 'Complete transmission inspection, fluid change, and repair services. Expert care for manual and automatic transmissions.',
    descriptionAr: 'خدمات فحص وتغيير السوائل وإصلاح ناقل الحركة الكاملة. رعاية خبيرة لناقلات الحركة اليدوية والأوتوماتيكية.',
    icon: '⚙️',
  },
  {
    id: '8',
    title: 'Suspension Service',
    titleAr: 'خدمة التعليق',
    description: 'Suspension system inspection, repair, and replacement. Ensure smooth ride quality and vehicle stability.',
    descriptionAr: 'فحص وإصلاح واستبدال نظام التعليق. ضمان جودة القيادة السلسة واستقرار المركبة.',
    icon: '🔩',
  },
  {
    id: '9',
    title: 'Exhaust Service',
    titleAr: 'خدمة العادم',
    description: 'Exhaust system repair and replacement services. Maintain optimal engine performance and reduce emissions.',
    descriptionAr: 'خدمات إصلاح واستبدال نظام العادم. الحفاظ على الأداء الأمثل للمحرك وتقليل الانبعاثات.',
    icon: '💨',
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

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-8">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional automotive services you can trust. Our experienced technicians use the latest equipment and genuine parts to keep your vehicle running at its best.
          </p>
        </div>
      </Container>

      <Suspense fallback={<div>Loading services...</div>}>
        <ServicesGrid services={services} />
      </Suspense>
    </div>
  );
}