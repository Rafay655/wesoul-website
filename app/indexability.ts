// Opt in only on the approved production build, never on a preview deployment.
export const isIndexable = process.env.SITE_ENV === 'production' && process.env.NODE_ENV === 'production' && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production');
