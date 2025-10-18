export async function POST(request: Request) {
  const { email, password } = await request.json();

  return Response.json({ message: 'Login successful', email, password });
}
