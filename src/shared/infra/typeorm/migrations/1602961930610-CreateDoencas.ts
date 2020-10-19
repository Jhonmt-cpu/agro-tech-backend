import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoencas1602961930610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doencas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'animal_id',
            type: 'uuid',
          },
          {
            name: 'nome_doenca',
            type: 'varchar',
          },
          {
            name: 'data',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'remedios',
            type: 'text',
          },
          {
            name: 'periodo_carencia',
            type: 'int',
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
        foreignKeys: [
          {
            name: 'AnimalComDoenca',
            columnNames: ['animal_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'animals',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doencas');
  }
}
