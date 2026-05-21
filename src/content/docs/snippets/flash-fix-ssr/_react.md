**Next.js (App Router)** — read the cookie in your root layout server component and pass it to `<html>`:

```tsx
// /app/layout.tsx
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const theme = (await cookies()).get("theme")?.value ?? "light";
  return (
    <html data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
```

For a plain React SPA (Vite) without a server, skip to the inline-script approach below.
