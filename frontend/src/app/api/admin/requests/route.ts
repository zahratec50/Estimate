import { NextResponse } from "next/server";

const MOCK_REQUESTS = Array.from({ length: 28 }).map((_, i) => ({
  id: String(i + 1),
  name: `Project ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: ["pending", "approved", "completed"][i % 3],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "5", 10);
  const search = url.searchParams.get("search")?.toLowerCase() || "";

  let filtered = MOCK_REQUESTS;
  if (search) {
    filtered = filtered.filter((r) => r.name.toLowerCase().includes(search));
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
  });
}
