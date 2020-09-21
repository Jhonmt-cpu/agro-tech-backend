export default interface ICreateAnimalDTO {
  nome_ou_brinco: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo: string;
  cidade: string;
  estado: string;
  anotacoes?: string;
}
