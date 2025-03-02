import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`;

  const body = await req.json();

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
