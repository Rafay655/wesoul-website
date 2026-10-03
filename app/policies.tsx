import { Breadcrumbs, PageHero } from "./components";
export function PolicyPage({ type }: { type: string }) {
  const title =
    type === "privacy"
      ? "Privacy policy"
      : type === "terms"
        ? "Website terms"
        : "Cookie policy";
  const blocks =
    type === "privacy"
      ? [
          {
            title: "The enquiry form is a local preview",
            body: "The current form logs the fields you enter to your browser’s developer console and displays an on-screen notification. It does not send those fields to WESOUL or store them in a website database. Avoid entering sensitive information into the preview form.",
          },
          {
            title: "Direct email enquiries",
            body: "Email links open your email application. If you choose to send an email to info@wesoul.net, your email provider handles that transmission and WESOUL receives the information you include. Contact WESOUL at that address for questions about information you have shared.",
          },
          {
            title: "Website technology",
            body: "This implementation does not add analytics, advertising trackers or persistent form storage. When deployed, the hosting provider may process request and security logs; its configuration should be reviewed alongside this notice before launch.",
          },
        ]
      : type === "terms"
        ? [
            {
              title: "Information on this website",
              body: "This website introduces WESOUL’s services and products. Product descriptions communicate their stated scope; availability, supported integrations, pricing and suitability should be confirmed directly with WESOUL.",
            },
            {
              title: "Project and product enquiries",
              body: "Sending an enquiry does not establish a service agreement. Any project scope, commercial terms, delivery commitments or product access should be agreed separately with WESOUL.",
            },
            {
              title: "Illustrations and product stories",
              body: "Product artwork is illustrative. The product walkthroughs describe problems, approaches and intended value. They are not verified client case studies and do not claim measured client results.",
            },
          ]
        : [
            {
              title: "Cookies in this implementation",
              body: "The website code does not set analytics, advertising or preference cookies. Navigation and the preview enquiry form work without persistent cookie storage.",
            },
            {
              title: "If the website changes",
              body: "Adding analytics, embedded services, authentication or a live form may change the website’s data and cookie behavior. This notice and any required consent controls should be reviewed before those features are enabled.",
            },
          ];
  return (
    <>
      <Breadcrumbs items={[{ name: title, href: "/" + type }]} />
      <PageHero
        eyebrow="WESOUL / WEBSITE INFORMATION"
        title={title}
        description="About the current website implementation. Updated October 3, 2026."
      />
      <div className="policy-body">
        {blocks.map((b) => (
          <section key={b.title}>
            <h2>{b.title}</h2>
            <p>{b.body}</p>
          </section>
        ))}
        <p>
          Questions?{" "}
          <a href="mailto:info@wesoul.net">Contact info@wesoul.net</a>.
        </p>
      </div>
    </>
  );
}
