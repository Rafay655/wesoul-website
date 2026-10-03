// Public identity only. Never put service credentials in this module.
const configured = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wesoul.net';
const url = new URL(configured);
if (url.protocol !== 'https:' || !['www.wesoul.net', 'wesoul.net'].includes(url.hostname) || url.pathname !== '/' || url.search || url.hash || url.port || url.username || url.password) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be https://www.wesoul.net or https://wesoul.net');
}
export const siteUrl = url.origin;
