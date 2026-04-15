const SHEETDB_URL = "https://sheetdb.io/api/v1/2wmi54lm74tyn";

export async function GET() {
  try {
    const res = await fetch(SHEETDB_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    list.reverse(); // most recent first
    return Response.json(list);
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
