import prismadb from "@/lib/prismadb";
import { FC } from "react";
import { CompanionForm } from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface CompanionPageProps {
  params: {
    companionId: string;
  };
}

const CompanionPage: FC<CompanionPageProps> = async ({ params }) => {
  // TODO check subscr.

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionPage;
