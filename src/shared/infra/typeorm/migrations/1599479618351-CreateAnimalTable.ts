import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
            name: 'nome_ou_brinco',
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
            name: 'cidade',
            type: 'varchar',
          },
          {
            name: 'estado',
            type: 'varchar',
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
      }),
    );

    await queryRunner.createForeignKey(
      'doencas',
      new TableForeignKey({
        name: 'AnimalComDoenca',
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('doencas', 'AnimalComDoenca');
    await queryRunner.dropTable('doencas');
    await queryRunner.dropTable('animals');
  }
}
