"use server";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const createClinic = async (name: string) => {
  // Verificar se o usuário está logado (proteger a rota)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  // redirect("/dashboard"); // professor fez dessa forma, mas gerava um erro e tinha que tratar com "gambiarra" pra resolver => if (isRedirectError(error)) return;
  return clinic;
};
