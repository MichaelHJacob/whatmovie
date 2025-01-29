interface Config {
    apiUrl: string,
    apiUrlM: string,
    imgUrlS01: string,
    imgUrlS02: string,
    imgUrlS03: string,
    imgUrlS: string,
    imgUrlM: string,
    imgUrlL: string,
}

const config: Config = {
    apiUrl: 'https://api.themoviedb.org/3/',
    apiUrlM: 'https://api.themoviedb.org/3/movie/',
    imgUrlS01: 'https://image.tmdb.org/t/p/w92',
    imgUrlS02: 'https://image.tmdb.org/t/p/w185',
    imgUrlS03: 'https://image.tmdb.org/t/p/w154',
    imgUrlS: 'https://image.tmdb.org/t/p/w342',
    imgUrlM: 'https://image.tmdb.org/t/p/w500',
    imgUrlL: 'https://image.tmdb.org/t/p/w780',
};

export default config;