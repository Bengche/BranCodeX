const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function GET() {
  try {
    const res  = await fetch(`${BACKEND}/api/testimonials`, { cache: "no-store" });
    const data = await res.json();
    return Response.json(Array.isArray(data) ? data : []);
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Accept both SheetDB-style { data:[{...}] } and direct { name, review, … }
    const item = Array.isArray(body?.data) ? body.data[0] : body;
    const res  = await fetch(`${BACKEND}/api/testimonials`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:      item.name,
        review:    item.review,
        rating:    item.rating,
        photo_url: item.photo_url || null,
      }),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
