export default interface IVacineRepository {
  findAnimalVacines(anima_id: string): Promise<string[]>;
}
