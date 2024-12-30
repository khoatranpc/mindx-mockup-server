export async function GET(request: Request) {
    try {
        return new Response(JSON.stringify({
            message: 'Hello MindX-er',
            data: [1, 2, 3, 4, 5, 6],
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Some errors!',
            data: null,
        }), { status: 500 });
    }
}
