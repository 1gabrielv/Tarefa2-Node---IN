export class Already_Liked_Error extends Error {
  constructor() {
    super('Já foi curtido por este usuário.');
    this.name = 'Already_Liked_Error';
  }
}
