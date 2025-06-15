export async function GET() {
  return Response.json(
    {
      message: 'Service is healthy',
    },
    {
      status: 200,
    },
  );
}
