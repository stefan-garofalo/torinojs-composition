import type { CSSProperties } from "react";
import {
  notificationFixtures,
  notificationRenderers,
  notificationThemeVars,
} from "../notifications";

type StyleWithVars = CSSProperties & Record<string, string | number>;

export function NotificationStyleguide() {
  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>Temporary styleguide</p>
          <h1 style={titleStyle}>Notification variants</h1>
        </div>
        <p style={summaryStyle}>
          Real React components rendered from typed fixtures and fake actions.
        </p>
      </header>

      <section style={listStyle}>
        {notificationFixtures.map((notification) => {
          const Renderer = notificationRenderers[notification.type];

          return (
            <article key={notification.id}>
              <Renderer notification={notification} />
            </article>
          );
        })}
      </section>
    </main>
  );
}

const pageStyle: StyleWithVars = {
  ...notificationThemeVars,
  background: "var(--background)",
  boxSizing: "border-box",
  color: "var(--foreground)",
  fontFamily: "var(--font-sans)",
  minHeight: "100vh",
  padding: "36px",
};

const headerStyle: CSSProperties = {
  alignItems: "start",
  borderBottom: "1px solid var(--border)",
  display: "grid",
  gap: 8,
  margin: "0 auto 18px",
  maxWidth: 620,
  paddingBottom: 18,
};

const eyebrowStyle: CSSProperties = {
  color: "var(--muted-foreground)",
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: 0,
  margin: "0 0 10px",
};

const titleStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: 1.1,
  margin: 0,
};

const summaryStyle: CSSProperties = {
  color: "var(--muted-foreground)",
  fontSize: 16,
  lineHeight: 1.35,
  margin: 0,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  margin: "0 auto",
  maxWidth: 620,
};
