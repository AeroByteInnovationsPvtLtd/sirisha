# Petromin-Style Bilingual Website

A modern, bilingual (Arabic/English) automotive services website built with Next.js and Keystone.js CMS, inspired by Petromin.com.

## Features

- 🌐 **Bilingual Support**: Full Arabic and English localization with RTL support
- 🎨 **Modern Design**: Clean, professional automotive industry design
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Performance**: Optimized with Next.js 14 and modern web practices
- 🔧 **CMS Integration**: Keystone.js headless CMS for content management
- 🗄️ **MongoDB**: Flexible NoSQL database for content storage
- 🎯 **SEO Optimized**: Built-in SEO features and meta tag management
- ♿ **Accessible**: WCAG compliant with proper ARIA labels

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization
- **Framer Motion** - Animations
- **Lucide React** - Icon library

### Backend
- **Keystone.js 6** - Headless CMS
- **MongoDB** - Database
- **GraphQL** - API layer

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petromin-bilingual-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   DATABASE_URL=mongodb://localhost:27017/petromin
   SESSION_SECRET=your-session-secret-here
   NEXT_PUBLIC_KEYSTONE_URL=http://localhost:3001
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the development servers**
   
   In one terminal, start Keystone CMS:
   ```bash
   npm run keystone
   ```
   
   In another terminal, start Next.js:
   ```bash
   npm run dev
   ```

6. **Access the applications**
   - Frontend: http://localhost:3000
   - Keystone Admin: http://localhost:3001

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized pages
│   │   ├── page.tsx       # Home page
│   │   ├── services/      # Services pages
│   │   ├── locations/     # Locations pages
│   │   ├── resources/     # Blog/Resources pages
│   │   └── contact/       # Contact page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, Services, etc.)
│   └── ui/                # Reusable UI components
├── keystone/              # Keystone CMS configuration
│   ├── auth.ts           # Authentication setup
│   └── schema.ts         # Content models
├── lib/
│   ├── keystone.ts       # GraphQL queries
│   └── utils.ts          # Utility functions
└── i18n.ts               # Internationalization config

messages/
├── en.json               # English translations
└── ar.json               # Arabic translations
```

## Content Management

### Admin Panel Access
1. Go to http://localhost:3001
2. Create your first admin user
3. Log in to access the admin panel

### Content Types
- **Pages**: Static pages with bilingual content
- **Services**: Automotive services with descriptions and icons
- **Locations**: Service center locations with contact info
- **Blog Posts**: News and resources with categories
- **Site Settings**: Global site configuration

### Adding Content
1. Log into Keystone admin panel
2. Navigate to the content type you want to manage
3. Click "Create [Content Type]"
4. Fill in both English and Arabic content
5. Save and publish

## Localization

### Adding New Languages
1. Add locale to `middleware.ts`
2. Create translation file in `messages/[locale].json`
3. Update `src/i18n.ts` configuration

### Translation Keys
All text content uses translation keys from the message files:
```typescript
const t = useTranslations();
t('common.home') // Returns "Home" or "الرئيسية"
```

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Create new project on Railway or Heroku
2. Connect MongoDB database
3. Set environment variables
4. Deploy Keystone CMS

### Environment Variables for Production
```env
DATABASE_URL=mongodb://your-production-db
SESSION_SECRET=your-secure-session-secret
NEXT_PUBLIC_KEYSTONE_URL=https://your-keystone-domain.com
NEXT_PUBLIC_SITE_URL=https://your-site-domain.com
```

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Features Overview

### 🏠 Home Page
- Hero section with call-to-action
- Services grid with icons and descriptions
- Locations section with map integration
- Latest resources/blog posts

### 🔧 Services Page
- Comprehensive service listings
- Detailed service descriptions
- Filterable and searchable content

### 📍 Locations Page
- Interactive map (ready for Google Maps/Mapbox)
- Service center listings
- Contact information and directions

### 📰 Resources/Blog
- Article listings with categories
- Search and filter functionality
- Individual article pages
- Author and publication date

### 📞 Contact Page
- Contact form with validation
- Multiple contact methods
- Location information
- Business hours

## Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Component-specific styles in individual files

### Content Models
- Edit `src/keystone/schema.ts` to modify content structure
- Add new fields or content types as needed
- Update GraphQL queries in `src/lib/keystone.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

Built with ❤️ using Next.js and Keystone.js