import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddVacineIdToVacinesToAnimals1605206750784
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vacines_to_animals',
      new TableColumn({
        name: 'vacine_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vacines_to_animals',
      new TableForeignKey({
        name: 'VacinesToAnimalsVacine',
        columnNames: ['vacine_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vacines',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'vacines_to_animals',
      'VacinesToAnimalsVacine',
    );

    await queryRunner.dropColumn('vacines_to_animals', 'vacine_id');
  }
}
