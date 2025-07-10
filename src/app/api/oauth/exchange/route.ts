import { CheckAuth } from "@/hooks/check-auth";
import { nylasConfig, nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await CheckAuth();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json(
      {
        message: "Unable to get a code.",
      },
      { status: 400 }
    );
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });

    const { grantId, email } = response;

    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "🟢 Failed to get details from nylas",
      },
      { status: 400 }
    );
  }
  return redirect("/dashboard");
}
