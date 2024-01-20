export async function GET() {
  const res = await fetch(
    `${process.env.DB_API_URL_F}genre/movie/list${process.env.DB_API_BR}&watch_region=BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${process.env.DB_TOKEN_AUTH}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados de gêneros");
  }

  const data = await res.json();
  // console.log(data)
  return Response.json( data );
}

// export async function GetMensagem() {
//   return new Response ('Hello, Next.js')
// }

// export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
//   const data = await res.json()
 
//   return Response.json({ data })
// }