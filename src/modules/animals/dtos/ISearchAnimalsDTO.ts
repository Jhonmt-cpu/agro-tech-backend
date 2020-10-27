interface IConditions {
  [key: string]: string | Date | number | undefined;
}

export default interface ISearchAnimalsDTO {
  user_id: string;
  conditions: IConditions[];
}
