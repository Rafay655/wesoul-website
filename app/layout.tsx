import type { Metadata } from 'next';
import { Header } from './interactive';
import { Footer, JsonLd } from './components';
import { siteUrl } from './data';
import './globals.css';
import { RouteTransitionProvider } from './route-transition';
export const metadata:Metadata={metadataBase:new URL(siteUrl),icons:{icon:'/images/mark.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><RouteTransitionProvider><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><JsonLd data={{'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':siteUrl+'/#organization',name:'WESOUL',url:siteUrl,logo:siteUrl+'/images/mark.png',email:'info@wesoul.net',description:'A software and product engineering company building software products, web and mobile applications, AI systems, agents and integrations.'},{'@type':'WebSite','@id':siteUrl+'/#website',url:siteUrl,name:'WESOUL',publisher:{'@id':siteUrl+'/#organization'}}]}}/></RouteTransitionProvider></body></html>;}
