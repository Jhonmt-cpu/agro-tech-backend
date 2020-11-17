export default interface IFindVacinesBeforeTodayDTO {
  user_id: string;
  vacines_ids: string[];
  today_date: Date;
  birth_animal_date: Date;
}
