import { config } from '@keystone-6/core';
import { lists } from './src/keystone/schema';
import { withAuth, session } from './src/keystone/auth';

export default withAuth(
  config({
    db: {
      provider: 'mongodb',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/petromin',
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      cors: { origin: ['http://localhost:3000'], credentials: true },
    },
  })
);