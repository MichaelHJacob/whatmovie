<div align="center">
    <img src="public/logo/LogoWmExtended_Light.png#gh-light-mode-only" width="480px">
    <img src="public/logo/LogoWmExtended_Dark.png#gh-dark-mode-only" width="480px">
</div>

## [🔗 WhatMovie.com.br](https://www.whatmovie.com.br)

Um site desenvolvido para amantes de filmes, com o objetivo de facilitar a descoberta e pesquisa de informações sobre filmes. O WhatMovie utiliza API fornecida pelo [The Movie Database (TMDB)](https://www.themoviedb.org/?language=pt-BR) para fornecer dados atualizados sobre filmes em seus serviços de streaming com uma experiência de navegação intuitiva, moderna e responsiva.

## 🛠️ Tecnologias Utilizadas

<div style="display: inline_block"> 
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/> 
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/> 
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/> 
    <img src="https://img.shields.io/badge/REST_API-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="REST API"/> 
</div>

## ✨ Funcionalidades

- Página inicial com lançamentos recentes nos serviços de streaming.
- Pesquisa por nome de filmes.
- Filtros para explorar filmes por categorias.
- Página de informações detalhadas sobre cada filme, incluindo sinopse, elenco e muito mais.
- Design responsivo e mobile-first para ótima experiência em qualquer dispositivo.
- Renderização no lado do servidor (SSR) para otimizar o desempenho e melhorar o SEO do site.

## 📷 Screenshots

### Página Inicial

<img src="public/images/Captura_de_Tela_Home.png" width="800px">

### Página de Detalhes

<img src="public/images/Captura_de_Tela_Movie.png" width="800px">

### Página de filtro

<img src="public/images/Captura_de_Tela_Filtro.png" width="800px">

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [**Node.js**](https://nodejs.org/pt) - 18.17 ou superior.
- [**TMDB API KEY**](https://developer.themoviedb.org/docs/getting-started) - Este projeto usa REST API fornecida pelo TMDB para fornecer os dados.
- Gerenciador de pacotes como `npm` ou `yarn`.

### Passos

1. Clone este repositório:

```bash
git clone https://github.com/"SeuUsuario"/whatmovie.git
```

2. Navegue até o diretório do projeto:

```bash
cd whatmovie
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

4. Configure a API:

- Crie um arquivo `.env.local` na raiz do projeto.
- Adicione sua chave de API:

```
DB_TOKEN_AUTH='Sua_Chave_API'
```

5. Rode o projeto:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse o site no navegador:

```
http://localhost:3000
```

## 🙌 Feedback

Embora este projeto tenha sido desenvolvido principalmente como um estudo e prática de desenvolvimento web, ficarei feliz em receber qualquer tipo de feedback ou sugestão para melhorá-lo! Você pode entrar em contato comigo diretamente pelo e-mail ou LinkedIn listados abaixo.

## 📧 Contato

Se tiver dúvidas, sugestões ou quiser entrar em contato, me encontre em:

- [LinkedIn](https://www.linkedin.com/in/michaelhjacob/)
- Email: `michael_h.jacob@outlook.com`
