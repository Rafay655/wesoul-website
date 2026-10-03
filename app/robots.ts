import type { MetadataRoute } from 'next';
import { siteUrl } from './site-config';
import { isIndexable } from './indexability';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return isIndexable?{rules:{userAgent:'*',allow:'/'},sitemap:siteUrl+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}};}
