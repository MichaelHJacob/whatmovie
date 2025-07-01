import { FilterSchemaErrors } from "@/lib/validation/filterSchema";

export class FilterValidationError extends Error {
  constructor(public validation: FilterSchemaErrors) {
    super("Erro de validação");
    this.name = "FilterValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ExternalAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExternalAPIError";
  }
}
