import { Thing, WithContext } from "schema-dts";
import type { Graph } from "schema-dts";

type StructuredDataProps<T extends Thing> = {
  data: WithContext<T> | Graph;
};

export default function StructuredData<T extends Thing>({
  data,
}: Readonly<StructuredDataProps<T>>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
