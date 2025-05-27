import { FilterSchemaErrors } from "@/lib/validation/filterSchema";

export class FilterValidationError extends Error {
  constructor(public validation: FilterSchemaErrors) {
    super("Erro de validação");
    this.name = "FilterValidationError";
  }
}
