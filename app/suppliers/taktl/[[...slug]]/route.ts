const withdrawnPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page withdrawn | Cladvera</title></head>
<body><main><h1>This page has been withdrawn</h1><p>The previously published product information is no longer available.</p><p><a href="/products">Browse the current Cladvera material inquiries</a></p></main></body></html>`;

export function GET() {
  return new Response(withdrawnPage, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
