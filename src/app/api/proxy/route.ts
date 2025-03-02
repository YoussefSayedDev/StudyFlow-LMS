import { NextRequest, NextResponse } from "next/server";

// Get the API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://studyflow.runasp.net";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    // Extract the path from the request URL
    const path = url.pathname.replace("/api/proxy", "");

    // Determine the endpoint based on the path or use default
    const endpoint = path || "/auth/sign-in";
    const backendUrl = `${apiUrl}${endpoint}`;

    const body = await req.json();

    console.log(`Proxying request to: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 },
    );
  }
}

// Add support for other HTTP methods as needed
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/api/proxy", "");
    const queryParams = url.search;

    const backendUrl = `${apiUrl}${path}${queryParams}`;

    console.log(`Proxying GET request to: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 },
    );
  }
}
