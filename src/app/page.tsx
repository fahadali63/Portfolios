import { certifications, projects, roles } from "@/content";
import { PageFrame } from "@/components/chrome/PageFrame";
import { Connect } from "@/components/sections/Connect";
import { Cover } from "@/components/sections/Cover";
import { ExperienceWindow } from "@/components/sections/ExperienceWindow";
import { Expertise } from "@/components/sections/Expertise";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FocusWindow } from "@/components/sections/FocusWindow";
import { Highlights } from "@/components/sections/Highlights";
import { IdentityCard } from "@/components/sections/IdentityCard";
import { Recognition } from "@/components/sections/Recognition";
import { WorkedWith } from "@/components/sections/WorkedWith";
import { CertificateSheet } from "@/components/sheets/CertificateSheet";
import { ProjectSheet } from "@/components/sheets/ProjectSheet";
import { RoleSheet } from "@/components/sheets/RoleSheet";

/**
 * Home leads with what Fahad is doing now. The lens switch (cover and Experience window) shows one
 * career at a time across the whole page; the default is the current role's track.
 */
export default function HomePage() {
  return (
    <PageFrame
      route="home"
      sheets={
        <>
          {roles.map((r) => (
            <RoleSheet key={r.slug} r={r} />
          ))}
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <ProjectSheet key={p.slug} p={p} />
            ))}
          {certifications.map((c) => (
            <CertificateSheet key={c.slug} c={c} />
          ))}
        </>
      }
    >
      <Cover />
      <div className="dash">
        <div className="stack">
          <IdentityCard index={0} lens />
          <ExperienceWindow index={1} />
        </div>
        <FocusWindow index={1} />
        <div className="stack dash-right">
          <WorkedWith index={2} />
          <Highlights index={2} />
        </div>
      </div>
      <Expertise />
      <FeaturedWork />
      <Recognition />
      <Connect lens />
    </PageFrame>
  );
}
