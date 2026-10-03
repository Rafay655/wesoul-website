import type { MetadataRoute } from 'next';
import { allRoutes, siteUrl, utilityPages } from './data';
import { isIndexable } from './indexability';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return isIndexable?['',...allRoutes.filter(path=>!utilityPages.includes(path))].map(path=>({url:siteUrl+(path?'/'+path:'/'),changeFrequency:path.startsWith('insights/')?'monthly':'weekly',priority:path?0.7:1})):[];}
