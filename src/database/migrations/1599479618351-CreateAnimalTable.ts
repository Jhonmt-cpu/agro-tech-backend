import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnimalTable1599479618351
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'peso',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nascimento',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'raca',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sexo',
            type: 'varchar',
          },
          {
            name: 'doencas',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'remedios',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'origen_animal',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'anotacoes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animals');
  }
}
