import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsToCars1642344103388
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_to_cars",

        columns: [
          {
            name: "car_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "specification_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "specifications_to_cars",
      new TableForeignKey({
        name: "FKSpecification",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_to_cars",
      new TableForeignKey({
        name: "FKCar",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_to_cars",
      "FKSpecification"
    );
    await queryRunner.dropForeignKey("specifications_to_cars", "FKCar");
    await queryRunner.dropTable("specifications_to_cars");
  }
}
