export default interface ICreateAnimalDTO {
  nome_ou_brinco: string;
  user_id: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo: string;
  cidade: string;
  estado: string;
  anotacoes?: string;
}
