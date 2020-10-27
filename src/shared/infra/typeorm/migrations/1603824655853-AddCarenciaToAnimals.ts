import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCarenciaToAnimals1603824655853
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'animals',
      new TableColumn({
        name: 'carencia',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('animals', 'carencia');
  }
}
