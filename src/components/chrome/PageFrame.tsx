import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { Environment } from "./Environment";
import { Footer } from "./Footer";
import { LocationBar } from "./LocationBar";
import { TopBar } from "./TopBar";
import { routeName, type RouteKey } from "./routes";

/** The menu lists the résumé PDFs present in public/resume/. */
const availableResumes = contact.resumes.filter((r) => fs.existsSync(path.join(process.cwd(), "public", r.file)));

/**
 * Everything around a page's content: the photo, the logo + route label, the location bar
 * (phones: compact top bar), <main>, the footer, and the page's detail sheets (outside <main>,
 * so the background can be made inert while a sheet is open).
 */
export function PageFrame({ route, children, sheets }: { route: RouteKey; children: ReactNode; sheets?: ReactNode }) {
  return (
    <>
      <Environment route={route} />
      <div className="container">
        <div className="page-label" data-inert-scope>
          <a href="/" aria-label="Fahad Ali — home" className="grid h-11 w-11 place-items-center">
            <img src="/brand/logo-mark.svg" width={36} height={36} alt="" />
          </a>
          <span aria-hidden="true">{route === "home" ? "Fahad Ali" : routeName[route]}</span>
        </div>
        <TopBar route={route} />
        <LocationBar route={route} resumes={availableResumes.map(({ label, file, downloadName }) => ({ label, file, downloadName }))} />
        <div className="print-only print-head" aria-hidden="true">
          <p style={{ fontSize: "20pt", fontWeight: 600 }}>{site.name}</p>
          <p>
            {site.location} · {contact.email} · {contact.phone} · {contact.linkedinLabel}
          </p>
          <p>{site.domain.replace("https://", "")}</p>
        </div>
        <main id="main" tabIndex={-1} data-inert-scope className="outline-none">
          {children}
        </main>
        <Footer />
      </div>
      {sheets && <div className="sheet-layer">{sheets}</div>}
    </>
  );
}
