import { Masthead } from "@/components/layout/masthead";
import { Colophon } from "@/components/layout/colophon";

/**
 * Public site shell.
 * Every public page is framed by the Gazette masthead and colophon.
 */
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Masthead />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Colophon />
    </>
  );
}
