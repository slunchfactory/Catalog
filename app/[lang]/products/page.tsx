import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function ProductsPage({ params }: PageProps) {
  const { lang } = await params;
  redirect(`/${lang}/products/kimchi`);
}
