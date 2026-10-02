/** Hash-only, same-route and off-site visits do not need a page transition. */
export function routeTarget(href: string, currentHref: string): URL | null {
  const current = new URL(currentHref);
  const target = new URL(href, current);
  if (target.origin !== current.origin || !['http:', 'https:'].includes(target.protocol)) return null;
  const normalize = (pathname: string) => pathname.replace(/\/$/, '') || '/';
  if (normalize(target.pathname) === normalize(current.pathname) && target.search === current.search) return null;
  return target;
}

export function routeLabel(pathname: string): string {
  const names: Record<string, string> = {
    '/': 'Home', '/about': 'Our story', '/services': 'Our expertise',
    '/ai-engineering': 'AI & agents', '/software-product-engineering': 'Product engineering',
    '/software-modernization': 'Architecture & modernization', '/engineering-augmentation': 'Engineering augmentation',
    '/products': 'Our products', '/work': 'Our work', '/insights': 'Ideas & insights',
    '/contact': 'Start a conversation', '/privacy': 'Privacy', '/terms': 'Website terms', '/cookies': 'Cookie policy',
  };
  const path = pathname.replace(/\/$/, '') || '/';
  if (names[path]) return names[path];
  const products: Record<string, string> = { orbitledger: 'OrbitLedger', calliper: 'Calliper', spanpos: 'SpanPOS', sayitdone: 'Sayitdone', reqzly: 'Reqzly', packverity: 'PackVerity' };
  if (path.startsWith('/products/')) return products[path.split('/').at(-1)!] || 'Our products';
  if (path.startsWith('/insights/')) return 'A little perspective';
  if (path.startsWith('/work/')) return 'Behind the product';
  return 'What comes next';
}
