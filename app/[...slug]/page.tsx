import { SoftwareVisual, AgentVisual, ModernizationVisual, TeamVisual, EvolutionVisual, InsightCover } from "../service-visuals";
import { PolicyPage } from "../policies";
import Link from "../route-transition";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import {
  allRoutes,
  articles,
  products,
  servicePages,
  services,
  siteUrl,
  stories,
} from "../data";
import {
  Breadcrumbs,
  CTA,
  FAQ,
  Flow,
  JsonLd,
  metadataFor,
  PageHero,
  ServiceCards,
  WorkCards,
} from "../components";
import { ContactForm } from "../contact-form";
import { ProductGrid, RelatedContent } from "../components";

type Params = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return allRoutes.map((path) => ({ slug: path.split("/") }));
}
const hubMetadata: Record<string, [string, string]> = {
  products: [
    "WESOUL Products | Software Built Around Real Work",
    "Explore WESOUL products for personal finance, biomedical service operations, retail, conversational execution, procurement and e-commerce verification.",
  ],
  work: [
    "Product Stories & Selected Work | WESOUL",
    "See how WESOUL approaches real operational problems through software products, mobile applications, connected systems and practical digital solutions.",
  ],
  insights: [
    "Insights on Software, Products & AI | WESOUL",
    "Practical insights from WESOUL on AI agents, software product engineering, modernization, digitization, integrations and building technology around real business problems.",
  ],
  contact: [
    "Contact WESOUL | Start a Conversation",
    "Talk to WESOUL about a software product, web or mobile application, AI use case, integration, modernization requirement or engineering support need.",
  ],
  privacy: [
    "Privacy Policy | WESOUL",
    "How the current WESOUL website handles console-only form submissions, direct email enquiries and tracking.",
  ],
  terms: [
    "Website Terms | WESOUL",
    "Information about using the WESOUL website, product descriptions and project enquiries.",
  ],
  cookies: [
    "Cookie Policy | WESOUL",
    "Information about cookies and tracking in the WESOUL website implementation.",
  ],
};
function routeInfo(path: string): [string, string] {
  const standard = servicePages[path as keyof typeof servicePages];
  if (standard) return [standard.title, standard.description];
  if (hubMetadata[path]) return hubMetadata[path];
  const [kind, slug] = path.split("/");
  const product =
    kind === "products" ? products.find((p) => p.slug === slug) : undefined;
  if (product)
    return [
      product.name + " | " + product.headline + " | WESOUL",
      product.description,
    ];
  const article =
    kind === "insights" ? articles.find((a) => a.slug === slug) : undefined;
  if (article)
    return [article.title + " | WESOUL Insights", article.description];
  const story =
    kind === "work" ? stories.find((s) => s.slug === slug) : undefined;
  if (story)
    return [story.title + " | WESOUL Work", story.problem + " " + story.built];
  return ["Page not found | WESOUL", "The requested page could not be found."];
}
export async function generateMetadata({ params }: Params) {
  const path = (await params).slug.join("/");
  const [title, description] = routeInfo(path);
  return metadataFor(title, description, "/" + path);
}
export default async function ContentPage({ params }: Params) {
  const path = (await params).slug.join("/");
  if (!allRoutes.includes(path)) notFound();
  const [kind, slug] = path.split("/");
  const product =
    kind === "products" && slug
      ? products.find((p) => p.slug === slug)
      : undefined;
  const article =
    kind === "insights" && slug
      ? articles.find((a) => a.slug === slug)
      : undefined;
  const story =
    kind === "work" && slug ? stories.find((s) => s.slug === slug) : undefined;
  let content: React.ReactNode;
  if (product) content = <ProductPage product={product} />;
  else if (article) content = <ArticlePage article={article} />;
  else if (story) content = <StoryPage story={story} />;
  else if (path === "products")
    content = (
      <>
        <Breadcrumbs items={[{ name: "Products", href: "/products" }]} />
        <PageHero
          eyebrow="WESOUL PRODUCTS / BUILT AROUND REAL WORK"
          title="A portfolio built around real work."
          description="WESOUL’s products solve operational problems across personal finance, biomedical services, retail, conversational execution, procurement and e-commerce verification."
        />
        <section className="section hub-grid">
          <h2 className="sr-only">WESOUL product portfolio</h2><ProductGrid />
        </section>
        <section className="section editorial-band">
          <p className="eyebrow">ONE CONSISTENT PRODUCT DISCIPLINE</p>
          <h2>
            Different industries.
            <br />
            <span>The same care for the work.</span>
          </h2>
          <p className="section-lead">
            Different industries. Different users. One consistent approach:
            understand the work, reduce friction and build software that earns
            its place in the operation.
          </p>
        </section>
        <CTA />
      </>
    );
  else if (path === "work")
    content = (
      <>
        <Breadcrumbs items={[{ name: "Our Work", href: "/work" }]} />
        <PageHero
          eyebrow="OUR WORK / PROBLEMS INTO PRODUCTS"
          title="Product stories & selected work."
          description="Our work is best understood through the problems it solves, not through screenshots alone."
        />
        <section className="section hub-grid">
          <div className="evidence-note">
            <span className="eyebrow">PRODUCT WALKTHROUGHS</span>
            <p>
              Explore the problems, approach and intended value behind three
              WESOUL products. These are product stories; client-specific
              outcomes and measured results are not claimed.
            </p>
          </div>
          <h2 className="sr-only">Explore our product stories</h2><WorkCards />
        </section>
        <CTA />
      </>
    );
  else if (path === "insights") content = <InsightsPage />;
  else if (path === "contact")
    content = (
      <>
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <PageHero
          eyebrow="LET’S START A CONVERSATION"
          title="What should we bring to life next?"
          description="You do not need a complete specification. Bring us the idea, the problem, the workflow or the system you want to improve."
        />
        <section className="section contact-layout">
          <div className="contact-info">
            <span className="contact-asterisk" aria-hidden="true">
              ✳
            </span>
            <h2>
              Good things start
              <br />
              <span>with a conversation.</span>
            </h2>
            <a href="mailto:info@wesoul.net" className="contact-email">
              <Mail size={20} />
              info@wesoul.net
            </a>
            <a href="tel:+923007727981"><Phone size={20} aria-hidden="true"/>0300-7727981</a>
            <Link href="/">www.wesoul.net ↗</Link>
            <p>
              Prefer email? Write to us directly.
              <br />
              Or call us to discuss what you have in mind.
            </p>
          </div>
          <ContactForm />
        </section>
      </>
    );
  else if (["privacy", "terms", "cookies"].includes(path))
    content = <PolicyPage type={path} />;
  else content = <StandardPage path={path} />;
  const [title, description] = routeInfo(path);
  return (
    <>
      {content}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: siteUrl + "/" + path,
          isPartOf: { "@id": siteUrl + "/#website" },
          about: { "@id": siteUrl + "/#organization" },
        }}
      />
    </>
  );
}

type BriefSection = { label: string; lines: string[]; heading?: string };
function ApprovedSection({
  section,
  index,
}: {
  section: BriefSection;
  index: number;
}) {
  const lines = section.lines.filter((l) => !l.startsWith("CTA:"));
  const heading = section.heading;
  const capabilities = section.label === "What We Build" ? lines.filter((line) => line.includes(" — ")) : [];
  const cta = section.lines.find((l) => l.startsWith("CTA:"))?.slice(5);
  const steps = lines.find((l) => l.includes("→"));
  const short = lines.filter((l) => l.length < 90 && !l.includes("→") && !capabilities.includes(l));
  const long = lines.filter((l) => l.length >= 90 && !l.includes("→") && !capabilities.includes(l));
  const comparison = section.label.includes("Chatbot vs");
  const architecture =
    section.label === "Architecture View" ||
    section.label === "AI + Existing Systems";
  return (
    <section
      className={
        "section approved-section " + (index % 2 === 0 ? "tinted-section" : "")
      }
    >
      <div className="approved-heading">
        <p className="eyebrow">
          {String(index).padStart(2, "0")} / {section.label}
        </p>
        <h2>{heading || section.label}</h2>
      </div>
      <div className="approved-body">
        {comparison ? (
          <div className="comparison-table">
            <table>
              <caption className="sr-only">
                Chatbot, copilot, agent and agentic workflow compared
              </caption>
              <thead>
                <tr>
                  <th scope="col">Approach</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((line) => {
                  const [name, ...body] = line.split(" — ");
                  return (
                    <tr key={name}>
                      <th scope="row">{name}</th>
                      <td>{body.join(" — ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : architecture ? (
          <div className="architecture-diagram" aria-label={section.label}>
            {(section.label === "AI + Existing Systems"
              ? [
                  "ERP / CRM / HRMS / DMS / Internal APIs / Databases",
                  "WESOUL AI Layer",
                  "Employees / Customers / Managers",
                ]
              : lines.filter((l) => l !== "↓")
            ).map((l, i) => (
              <div key={l} className={i === 1 ? "architecture-core" : ""}>
                <span>
                  {i === 0
                    ? "01 / CONNECT"
                    : i === 1
                      ? "02 / CONTROL"
                      : "03 / ENABLE"}
                </span>
                <p>{l}</p>
                {i < 2 && (
                  <span className="architecture-arrow" aria-hidden="true">
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {capabilities.length > 0 && <div className="capability-list">{capabilities.map((line) => { const [name, ...body] = line.split(" — "); return <div key={name}><h3>{name}</h3><p>{body.join(" — ")}</p></div>; })}</div>}
            {long.map((l) => (
              <p className="body-copy" key={l}>
                {l}
              </p>
            ))}
            {steps && (
              <Flow
                steps={steps.split("→").map((s) => s.trim())}
                label={section.label}
              />
            )}
            <div
              className={short.length > 1 ? "capability-list" : "plain-copy"}
            >
              {short.map((l) => {
                const [name, ...rest] = l.split(" — ");
                return rest.length ? (
                  <div key={l}>
                    <h3>{name}</h3>
                    <p>{rest.join(" — ")}</p>
                  </div>
                ) : (
                  <p key={l}>{l}</p>
                );
              })}
            </div>
          </>
        )}
        {cta && (
          <Link
            className="text-link"
            href={cta.includes("Products") ? "/products" : "/contact"}
          >
            {cta} ↗
          </Link>
        )}
      </div>
    </section>
  );
}
function StandardPage({ path }: { path: string }) {
  const page = servicePages[path as keyof typeof servicePages];
  if (!page) notFound();
  const service = services.find((s) => s.slug === path);
  const hero = page.sections[0];
  const heading = ("heading" in hero ? hero.heading : undefined) || hero.label;
  const body = hero.lines;
  const name =
    path === "about"
      ? "About WESOUL"
      : path === "services"
        ? "Services"
        : service!.name;
  const last = page.sections.at(-1)!;
  const closingCTA =
    last.lines.find((l) => l.startsWith("CTA:"))?.slice(5) ||
    "Start a Conversation";
  const closeHeading = "heading" in last ? last.heading : undefined;
  return (
    <>
      <Breadcrumbs items={[{ name, href: "/" + path }]} />
      <PageHero
        eyebrow={
          path === "about"
            ? "OUR STORY / THE IDEA STAYED"
            : path === "services"
              ? "WESOUL SERVICES / BUSINESS FIRST"
              : `WESOUL SERVICES / ${service?.short}`
        }
        title={heading}
        description={body.join(" ")}
      >
        <Link
          href={"/contact?topic=" + encodeURIComponent(name)}
          className="button orange"
        >
          {path === "ai-engineering"
            ? "Discuss an AI Use Case"
            : service
              ? "Discuss Your Project"
              : "Start a Conversation"}
          <ArrowUpRight size={17} />
        </Link>
      </PageHero>
      {path === "software-product-engineering" && <SoftwareVisual />}
      {path === "engineering-augmentation" && <TeamVisual />}
      {path === "services" ? (
        <section className="section hub-grid service-hub">
          <h2 className="sr-only">Our core services</h2><ServiceCards />
          {services.map((s, i) => (
            <div className="service-overview" key={s.slug}>
              <span>0{i + 1}</span>
              <div>
                <h2>
                  <Link href={"/" + s.slug}>{s.name}</Link>
                </h2>
                <p>{page.sections[i + 1].lines[0]}</p>
                <div className="tags">
                  {page.sections[i + 1].lines
                    .slice(1)
                    .filter((l) => !l.startsWith("CTA:"))
                    .map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                </div>
              </div>
              <Link href={"/" + s.slug} aria-label={"Explore " + s.name}>
                <ArrowUpRight />
              </Link>
            </div>
          ))}
        </section>
      ) : (
        page.sections
          .slice(1, -1)
          .map((section, i) => path === "about" && section.label === "Evolution" ? <EvolutionVisual key={section.label}/> : path === "ai-engineering" && section.label === "AI + Existing Systems" ? <AgentVisual key={section.label}/> : path === "software-modernization" && section.label === "Architecture View" ? <ModernizationVisual key={section.label}/> : (
            <ApprovedSection
              key={section.label}
              section={section}
              index={i + 1}
            />
          ))
      )}
      {service && (
        <>
          <section className="section related-section">
            <p className="eyebrow">CAPABILITY IN CONTEXT</p>
            <h2>
              Explore the thinking.
              <br />
              <span>See the product discipline.</span>
            </h2>
            <div className="related-grid">
              <Link href={"/insights/" + service.article}>
                <span>INSIGHT</span>
                <h3>
                  {articles.find((a) => a.slug === service.article)!.title}
                </h3>
                <ArrowUpRight />
              </Link>
              {service.related.slice(0, 2).map((slug) => {
                const p = products.find((p) => p.slug === slug)!;
                return (
                  <Link href={"/products/" + slug} key={slug}>
                    <span>WESOUL PRODUCT</span>
                    <h3>{p.name}</h3>
                    <p>{p.headline}</p>
                    <ArrowUpRight />
                  </Link>
                );
              })}
            </div>
            <Link className="text-link" href="/work">
              Explore related product stories ↗
            </Link>
          </section>
          <RelatedContent service={service.slug} />
          <FAQ
            items={
              path === "ai-engineering"
                ? [
                    {
                      q: "When should a business use an AI agent instead of conventional automation?",
                      a: "Use conventional automation when inputs and rules are predictable. Consider an AI agent when the work requires interpreting variable requests, finding context or choosing among permitted actions. Start with a bounded workflow, define approval points and evaluate reliability before expanding its responsibilities.",
                    },
                  ]
                : path === "software-modernization"
                  ? [
                      {
                        q: "Can WESOUL modernize an existing application?",
                        a: "Yes. WESOUL works on architecture, APIs, integration and application modernization to evolve existing systems without unnecessarily replacing what already works.",
                      },
                    ]
                  : path === "engineering-augmentation"
                    ? [
                        {
                          q: "Does augmentation replace our existing team?",
                          a: "No. WESOUL engineers work alongside existing client teams when additional capability or specialist expertise is needed. Your team keeps ownership of the product.",
                        },
                      ]
                    : [
                        {
                          q: "When should a business build custom software?",
                          a: "Custom software makes sense when the workflow, product opportunity or operating model cannot be supported effectively by standard software without excessive compromise.",
                        },
                      ]
            }
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Service",
              name: service.name,
              description: service.description,
              url: siteUrl + "/" + path,
              provider: { "@id": siteUrl + "/#organization" },
              serviceType: service.name,
            }}
          />
        </>
      )}
      <CTA
        title={
          closeHeading
        }
        label={closingCTA}
        topic={name}
        description={
          path === "services"
            ? "Good. Start with the problem. We can work out the technology from there."
            : undefined
        }
      />
    </>
  );
}
function ProductPage({ product: p }: { product: (typeof products)[number] }) {
  const service = services.find((s) => s.slug === p.service)!;
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Products", href: "/products" },
          { name: p.name, href: "/products/" + p.slug },
        ]}
      />
      <section className="product-hero">
        <div>
          <p className="eyebrow">WESOUL PRODUCT / {p.category}</p>
          <p className="product-name-label">{p.name}</p>
          <h1>{p.headline}</h1>
          <p className="page-intro">{p.description}</p>
          <Link
            className="button orange"
            href={"/contact?topic=" + encodeURIComponent(p.name)}
          >
            {p.slug === "orbitledger"
              ? "Ask About OrbitLedger"
              : p.slug === "sayitdone"
                ? "Explore Sayitdone"
                : "Request a Demo"}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <figure>
          <Image
            src={"/images/" + p.slug + ".webp"}
            width={1000}
            height={1000}
            fetchPriority="high" sizes="(max-width: 760px) 88vw, 44vw"
            alt={
              p.name + " concept illustration from the WESOUL company profile"
            }
          />
          <figcaption>Product concept artwork · WESOUL</figcaption>
          <p className="asset-pending">Real product UI screenshots are pending approval. This artwork is illustrative.</p>
        </figure>
      </section>
      <section className="section product-problem">
        <div>
          <p className="eyebrow">01 / THE PROBLEM</p>
          <h2>
            Start with
            <br />
            <span>the actual work.</span>
          </h2>
        </div>
        <div>
          <p className="section-lead">{p.problem}</p>
          <h3>Who {p.name} is for</h3>
          <ul className="clean-list">
            {p.audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section tinted-section">
        <p className="eyebrow">02 / PRODUCT APPROACH</p>
        <h2>
          A clearer way
          <br />
          <span>to move forward.</span>
        </h2>
        <p className="section-lead">{p.approach}</p>
        <div className="product-capabilities">
          {p.features.map((f, i) => (
            <div key={f}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{f}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">
          03 /{" "}
          {p.slug === "packverity" ? "EVALUATION FRAMEWORK" : "THE WORKFLOW"}
        </p>
        <h2>
          {p.slug === "packverity"
            ? "Define the verification you need."
            : "See how the work connects."}
        </h2>
        <Flow steps={p.workflow} label={p.name + " workflow"} />
      </section>
      <FAQ items={p.faq} />
      <RelatedContent product={p.slug} />
      <section className="product-capability-link">
        <span>BUILT BY WESOUL</span>
        <p>Explore the engineering behind our product approach.</p>
        <Link href={"/" + service.slug}>
          {service.name}
          <ArrowUpRight size={17} />
        </Link>
      </section>
      <CTA
        title={"Let’s explore " + p.name + "."}
        label={
          p.slug === "orbitledger" ? "Discuss OrbitLedger" : "Request a Demo"
        }
        topic={p.name}
        description="Tell us about your workflow and what you need the product to do."
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: p.name,
          description: p.description,
          url: siteUrl + "/products/" + p.slug,
          applicationCategory:
            p.slug === "orbitledger"
              ? "FinanceApplication"
              : "BusinessApplication",
          creator: { "@id": siteUrl + "/#organization" },
        }}
      />
    </>
  );
}
function InsightsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Insights", href: "/insights" }]} />
      <PageHero
        eyebrow="WESOUL INSIGHTS / IDEAS WITH PURPOSE"
        title="Practical thinking for what comes next."
        description="Clear explanations and practical perspectives on software, products, AI and business digitization."
      />
      <section className="section hub-grid">
        <div className="insight-topics" aria-label="Editorial topics">
          {[
            "AI & Agents",
            "Product Engineering",
            "Software Modernization",
            "Business Digitization",
            "Mobile & Web Engineering",
            "Product Thinking",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="insight-grid">
          {articles.map((a, i) => (
            <article className="insight-card" key={a.slug}>
              <Link
                className="insight-cover-link"
                href={"/insights/" + a.slug}
                aria-label={"Read " + a.title}
              >
                <InsightCover title={a.title} category={a.category} index={i}/>
              </Link>
              <p className="eyebrow">{a.category}</p>
              <h2>
                <Link href={"/insights/" + a.slug}>{a.title}</Link>
              </h2>
              <p>{a.description}</p>
              <Link className="card-link" href={"/insights/" + a.slug}>
                Read the insight
                <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA label="Talk to WESOUL About This" />
    </>
  );
}
function ArticlePage({ article: a }: { article: (typeof articles)[number] }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Insights", href: "/insights" },
          { name: a.title, href: "/insights/" + a.slug },
        ]}
      />
      <article>
        <PageHero
          eyebrow={a.category}
          title={a.title}
          description={a.description}
        >
          <p className="article-byline">
            By WESOUL · <time dateTime="2026-10-02">October 2, 2026</time>
          </p>
        </PageHero>
        <div className="article-editorial-cover"><InsightCover title={a.title} category={a.category} index={articles.indexOf(a)}/></div>
        <div className="article-layout">
          <aside className="article-toc">
            <p>IN THIS INSIGHT</p>
            {a.sections.map((s, i) => (
              <a key={s.title} href={"#section-" + i}>
                {s.title}
              </a>
            ))}
          </aside>
          <div className="article-body">
            <div className="answer-block">
              <span className="eyebrow">THE DIRECT ANSWER</span>
              <p>{a.answer}</p>
            </div>
            {a.sections.map((s, i) => (
              <section key={s.title} id={"section-" + i}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            <section className="article-related">
              <h2>Put the thinking into practice</h2>
              <p>
                Explore{" "}
                <Link href={"/" + a.service}>
                  {services.find((s) => s.slug === a.service)!.name}
                </Link>{" "}
                and the product approach behind{" "}
                <Link href={"/products/" + a.product}>
                  {products.find((p) => p.slug === a.product)!.name}
                </Link>
                .
              </p>
              <p className="author-note">
                WESOUL is a software and product engineering company. These
                perspectives follow our business-first approach to software,
                connected systems and practical AI.{" "}
                <Link href="/about">About WESOUL</Link>.
              </p>
            </section>
          </div>
        </div>
      </article>
      <FAQ items={a.faq} />
      <CTA label="Talk to WESOUL About This" topic={a.title} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: "2026-10-02",
          dateModified: "2026-10-02",
          author: {
            "@type": "Organization",
            name: "WESOUL",
            url: siteUrl + "/about",
          },
          publisher: { "@id": siteUrl + "/#organization" },
          mainEntityOfPage: siteUrl + "/insights/" + a.slug,
          image: siteUrl + "/social/insights-" + a.slug + ".png",
        }}
      />
    </>
  );
}
function StoryPage({ story: s }: { story: (typeof stories)[number] }) {
  const p = products.find((p) => p.slug === s.product)!;
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Our Work", href: "/work" },
          { name: p.name, href: "/work/" + s.slug },
        ]}
      />
      <PageHero
        eyebrow={s.sector + " / PRODUCT WALKTHROUGH"}
        title={s.title}
        description={s.built}
      />
      <div className="story-image">
        <Image
          src={"/images/" + p.slug + ".webp"}
          width={1200}
          height={650}
          sizes="90vw" alt={p.name + " product concept artwork"}
        />
        <span>Concept artwork · {p.name}</span>
      </div>
      <section className="section story-content">
        <div className="story-facts">
          <span>PRODUCT</span>
          <h2>{p.name}</h2>
          <span>CAPABILITY</span>
          <p>{s.capability}</p>
          <span>EVIDENCE TYPE</span>
          <p>Product walkthrough</p>
        </div>
        <div>
          {[
            { title: "The problem", body: s.problem },
            { title: "WESOUL’s approach", body: s.approach },
            { title: "What we built", body: s.built },
            { title: "Intended operational value", body: s.outcome },
          ].map((block) => (
            <section key={block.title}>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </section>
          ))}
          <Link className="button dark" href={"/products/" + p.slug}>
            Explore {p.name}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section tinted-section">
        <p className="eyebrow">THE PRODUCT WORKFLOW</p>
        <Flow steps={p.workflow} />
        <Link className="text-link" href={"/" + p.service}>
          Explore the relevant WESOUL capability ↗
        </Link>
      </section>
      <CTA topic={p.name} />
    </>
  );
}
