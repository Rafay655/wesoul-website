import Link from "./route-transition";
import Image from "next/image";
import { isIndexable } from "./indexability";
import { ArrowUpRight, ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";
import {
  products,
  services,
  siteUrl,
  stories,
  articles,
  utilityPages,
  type Product,
} from "./data";

export function metadataFor(
  title: string,
  description: string,
  path = "",
): Metadata {
  const imagePath =
    "/social/" +
    (path.replace(/^\//, "").replaceAll("/", "-") || "home") +
    ".png";
  const index = isIndexable && !utilityPages.includes(path.slice(1));
  return {
    title,
    description,
    robots: { index, follow: true },
    alternates: { canonical: siteUrl + path },
    openGraph: {
      title,
      description,
      url: siteUrl + path,
      siteName: "WESOUL",
      type: "website",
      images: [
        { url: siteUrl + imagePath, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteUrl + imagePath],
    },
  };
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {items.map((item, i) => (
          <span key={item.href}>
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{ name: "Home", href: "/" }, ...items].map(
            (item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: siteUrl + item.href,
            }),
          ),
        }}
      />
    </>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-intro">{description}</p>}
      {children}
    </section>
  );
}
export function Flow({
  steps,
  label = "Workflow",
}: {
  steps: string[];
  label?: string;
}) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((step, i) => (
        <li key={i}>
          <span className="flow-number">{String(i + 1).padStart(2, "0")}</span>
          <span>{step}</span>
          {i < steps.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
export function CTA({
  title = "What should we bring to life next?",
  label = "Start a Conversation",
  topic,
  description = "Bring us the idea, problem, process or system you want to improve.",
}: {
  title?: string;
  label?: string;
  topic?: string;
  description?: string;
}) {
  return (
    <section className="contact section compact-contact">
      <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
      <h2>{title}</h2>
      <div className="contact-bottom">
        <p className="cta-copy">{description}</p>
        <Link
          className="button dark"
          href={
            "/contact" + (topic ? "?topic=" + encodeURIComponent(topic) : "")
          }
        >
          {label}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function ServiceCards() {
  return (
    <div className="service-cards">
      {services.map((s, i) => (
        <Link className="service-card" href={"/" + s.slug} key={s.slug}>
          <div className="card-top">
            <span>
              0{i + 1} / {["BUILD", "AUTOMATE", "EVOLVE", "STRENGTHEN"][i]}
            </span>
            <ArrowUpRight size={24} />
          </div>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <div className="service-tags">
            {s.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
export function WorkCards() {
  return (
    <div className="work-cards">
      {stories.map((s, i) => (
        <article className="work-card" key={s.slug}>
          <span className="eyebrow">
            0{i + 1} / {s.sector}
          </span>
          <h3>
            <Link href={"/work/" + s.slug}>{s.title}</Link>
          </h3>
          <dl>
            <dt>The problem</dt>
            <dd>{s.problem}</dd>
            <dt>What we built</dt>
            <dd>{s.built}</dd>
            <dt>Intended outcome</dt>
            <dd>{s.outcome}</dd>
          </dl>
          <Link className="card-link" href={"/work/" + s.slug}>
            Explore the product story
            <ArrowUpRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="section faq-section">
      <div>
        <p className="eyebrow">A FEW USEFUL ANSWERS</p>
        <h2>
          Good questions.
          <br />
          <span>Clear answers.</span>
        </h2>
      </div>
      <div>
        {items.map((item) => (
          <details className="faq" key={item.q}>
            <summary>
              {item.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link className="brand footer-small-brand" href="/">
            WE<span>SOUL</span>
          </Link>
          <p>
            Software, products and practical AI
            <br />
            built around real business problems.
          </p>
          <a className="profile-link" href="/wesoul-profile.pdf" download>
            <Download size={16} />
            Company profile <span>PDF</span>
          </a>
        </div>
        <div>
          <h2>Company</h2>
          {[
            ["About", "/about"],
            ["Our Work", "/work"],
            ["Insights", "/insights"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Services</h2>
          {services.map((s) => (
            <Link key={s.slug} href={"/" + s.slug}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Products</h2>
          {products.map((p) => (
            <Link key={p.slug} href={"/products/" + p.slug}>
              {p.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Let’s talk</h2>
          <ul
            className="footer-contact-list"
            aria-label="WESOUL contact details"
          >
            <li>
              <a href="mailto:info@wesoul.net">info@wesoul.net</a>
            </li>
            {"\n"}
            <li>
              <a href="tel:+923007727981">0300-7727981</a>
            </li>
            {"\n"}
            <li>
              <Link href="/">www.wesoul.net</Link>
            </li>
          </ul>
          <Link href="/contact">Start a Conversation ↗</Link>
        </div>
      </div>
      <Link className="footer-brand" href="/" aria-label="WESOUL home">
        WE<span>SOUL</span>
        <span className="footer-dot">✳</span>
      </Link>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WESOUL. All rights reserved.</span>
        <div className="utility-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookie Policy</Link>
        </div>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product">
      <Link
        href={"/products/" + p.slug}
        className="product-image"
        aria-label={"Explore " + p.name}
      >
        <Image
          loading="lazy"
          src={"/images/" + p.slug + ".png"}
          width={900}
          height={650}
          sizes="(max-width:760px) 88vw, 43vw"
          alt={p.name + " concept artwork"}
        />
        <span>{p.category}</span>
        <span className="image-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-title">
        <h3>
          <Link href={"/products/" + p.slug}>{p.name}</Link>
        </h3>
        <span>W / {String(products.indexOf(p) + 1).padStart(2, "0")}</span>
      </div>
      <p className="product-headline">{p.headline}</p>
      <p>{p.description}</p>
      <Link className="card-link" href={"/products/" + p.slug}>
        Learn more about {p.name}
        <ArrowUpRight size={17} />
      </Link>
    </article>
  );
}
export function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
export function RelatedContent({
  product,
  service,
}: {
  product?: string;
  service?: string;
}) {
  const p = products.find((p) => p.slug === product);
  const s = services.find((s) => s.slug === (service || p?.service));
  if (!s) return null;
  const insight = articles.find((a) => a.slug === s.article)!;
  const relatedStories = stories.filter((st) =>
    service ? s.related.includes(st.product) : st.product === product,
  );
  return (
    <section className="section related-section">
      <p className="eyebrow">EXPLORE THE CONNECTIONS</p>
      <h2>
        {service
          ? "Related product stories"
          : "The capability behind the product"}
      </h2>
      <div className="related-grid">
        {!service && (
          <>
            <Link href={"/" + s.slug}>
              <span>RELATED SERVICE</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <ArrowUpRight />
            </Link>
            <Link href={"/insights/" + insight.slug}>
              <span>RELATED INSIGHT</span>
              <h3>{insight.title}</h3>
              <ArrowUpRight />
            </Link>
          </>
        )}
        {relatedStories.map((st) => (
          <Link key={st.slug} href={"/work/" + st.slug}>
            <span>PRODUCT STORY</span>
            <h3>{st.title}</h3>
            <p>{st.built}</p>
            <ArrowUpRight />
          </Link>
        ))}
      </div>
    </section>
  );
}
