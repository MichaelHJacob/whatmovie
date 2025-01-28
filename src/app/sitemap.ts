import { NowPlaying } from '@/components/utils/types';
import { MetadataRoute } from 'next'

async function getTheatres() {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `${process.env.DB_TOKEN_AUTH}`,
    },
    next: { revalidate: 86400 },
  };

  const res = await fetch(
    `${process.env.DB_API_URL}now_playing?language=pt-BR&watch_region=BR&page=1`,
    options
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar dados");
  }

  const data: NowPlaying = await res.json();


  return data.results.map((movie) => ({
    slug: movie.id,
  }));
}
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movies = await getTheatres(); 

  const moviesUrls = movies.map((movie) => ({
    url:`https://whatmovie.com.br/movie/${movie.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [
    {
      url: 'https://whatmovie.com.br',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://whatmovie.com.br/filter',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...moviesUrls,
  ]
}