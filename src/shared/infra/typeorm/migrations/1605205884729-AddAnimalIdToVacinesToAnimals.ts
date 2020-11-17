import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAnimalIdToVacinesToAnimals1605205884729
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vacines_to_animals',
      new TableColumn({
        name: 'animal_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vacines_to_animals',
      new TableForeignKey({
        name: 'VacinesToAnimalAnimal',
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'vacines_to_animals',
      'VacinesToAnimalAnimal',
    );

    await queryRunner.dropColumn('vacines_to_animals', 'animal_id');
  }
}
