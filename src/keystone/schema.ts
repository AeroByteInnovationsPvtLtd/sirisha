import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  json,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Page: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      titleAr: text(),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
        ],
        links: true,
        dividers: true,
      }),
      contentAr: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
        ],
        links: true,
        dividers: true,
      }),
      metaDescription: text(),
      metaDescriptionAr: text(),
      heroImage: image({ storage: 'local_images' }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      updatedAt: timestamp({
        defaultValue: { kind: 'now' },
        db: { updatedAt: true },
      }),
    },
  }),

  Service: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      titleAr: text(),
      description: text({ ui: { displayMode: 'textarea' } }),
      descriptionAr: text({ ui: { displayMode: 'textarea' } }),
      icon: text(),
      image: image({ storage: 'local_images' }),
      order: text(),
      status: select({
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        defaultValue: 'active',
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Location: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      nameAr: text(),
      address: text({ validation: { isRequired: true } }),
      addressAr: text(),
      city: text({ validation: { isRequired: true } }),
      cityAr: text(),
      phone: text(),
      email: text(),
      latitude: text(),
      longitude: text(),
      workingHours: text(),
      workingHoursAr: text(),
      services: relationship({ ref: 'Service', many: true }),
      status: select({
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        defaultValue: 'active',
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  BlogPost: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      titleAr: text(),
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      excerpt: text({ ui: { displayMode: 'textarea' } }),
      excerptAr: text({ ui: { displayMode: 'textarea' } }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
        ],
        links: true,
        dividers: true,
      }),
      contentAr: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
        ],
        links: true,
        dividers: true,
      }),
      featuredImage: image({ storage: 'local_images' }),
      category: relationship({ ref: 'BlogCategory' }),
      tags: relationship({ ref: 'BlogTag', many: true }),
      author: relationship({ ref: 'User' }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
      }),
      publishedAt: timestamp(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      updatedAt: timestamp({
        defaultValue: { kind: 'now' },
        db: { updatedAt: true },
      }),
    },
  }),

  BlogCategory: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      nameAr: text(),
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      description: text(),
      descriptionAr: text(),
      posts: relationship({ ref: 'BlogPost.category', many: true }),
    },
  }),

  BlogTag: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      nameAr: text(),
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'BlogPost.tags', many: true }),
    },
  }),

  SiteSettings: list({
    access: allowAll,
    fields: {
      siteName: text({ validation: { isRequired: true } }),
      siteNameAr: text(),
      siteDescription: text(),
      siteDescriptionAr: text(),
      logo: image({ storage: 'local_images' }),
      favicon: image({ storage: 'local_images' }),
      contactEmail: text(),
      contactPhone: text(),
      socialMedia: json(),
      headerMenu: json(),
      footerMenu: json(),
      updatedAt: timestamp({
        defaultValue: { kind: 'now' },
        db: { updatedAt: true },
      }),
    },
  }),
};