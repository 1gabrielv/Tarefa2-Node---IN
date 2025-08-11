export class ResourceNotFound_Error extends Error {
  constructor() {
    super('Recurso não encontrado.');
    this.name = 'ResourceNotFound_Error';
  }
}
