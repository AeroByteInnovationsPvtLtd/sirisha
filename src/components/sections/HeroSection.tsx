import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  primaryButtonText,
  primaryButtonHref = '#',
  secondaryButtonText,
  secondaryButtonHref = '#',
}: HeroSectionProps) {
  const t = useTranslations();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title || t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            {subtitle || t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {primaryButtonText && (
              <Button size="lg" className="text-lg px-8 py-3">
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && (
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-gray-900">
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}