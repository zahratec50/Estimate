export interface Request {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "completed";
  createdAt: string;
}

export async function getRequests(page = 1, limit = 5, search = ""): Promise<{
  data: Request[];
  total: number;
}> {
  const res = await fetch(
    `/api/requests?page=${page}&limit=${limit}&search=${search}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}
