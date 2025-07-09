import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { name: t('common.home'), href: `/${locale}` },
    { name: t('common.services'), href: `/${locale}/services` },
    { name: t('common.locations'), href: `/${locale}/locations` },
    { name: t('common.resources'), href: `/${locale}/resources` },
    { name: t('common.contact'), href: `/${locale}/contact` },
  ];

  const services = [
    'Oil Change',
    'Brake Service',
    'Tire Service',
    'Engine Repair',
    'AC Service',
    'Battery Service',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold">Petromin</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('footer.ourServices')}</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-300 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('footer.contactInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-blue-400" />
                  <span className="text-gray-300 text-sm">+966 11 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-gray-300 text-sm">info@petromin.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-blue-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    123 King Fahd Road<br />
                    Riyadh, Saudi Arabia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Petromin. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}