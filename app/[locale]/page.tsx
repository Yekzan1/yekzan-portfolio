import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Recommendations } from "@/components/sections/recommendations";
import { AssistantSection } from "@/components/sections/assistant-section";
import { Contact } from "@/components/sections/contact";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Skills dict={dict} />
      <Experience dict={dict} locale={locale} />
      <Recommendations dict={dict} />
      <AssistantSection dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
