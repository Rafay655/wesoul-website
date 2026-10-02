import type { MetadataRoute } from 'next';
import { allRoutes, siteUrl } from './data';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['',...allRoutes].map(path=>({url:siteUrl+(path?'/'+path:'/'),changeFrequency:path.startsWith('insights/')?'monthly':'weekly',priority:path?0.7:1}));}
