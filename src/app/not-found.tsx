import ErrorPage from "@/components/error/ErrorPage";
import Container from "@/components/layout/Container";
import ListScrollController from "@/components/layout/ListScrollController";
import HTitle from "@/components/ui/HTitle";
import ListMovie from "@/components/ui/ListMovie";
import { getPopular } from "@/lib/api/tmdb/use-cases/getPopular";

export default async function NotFound() {
  const [data] = await getPopular();
  return (
    <main>
      <section>
        <ErrorPage
          as="div"
          model="notFound"
          textH1="Página não encontrada"
          textCode="404"
          textMsg1="Não conseguimos encontrar essa página"
          textMsg2="mas talvez você encontre um filme interessante por aqui!"
        />
        {data?.results && (
          <Container as="aside" className="relative">
            <HTitle>Filmes mais acessados</HTitle>
            <ListScrollController
              id={"popular"}
              length={data.results.length}
              surface
            >
              <ListMovie data={data?.results} id={"popular"} />
            </ListScrollController>
          </Container>
        )}
      </section>
    </main>
  );
}
