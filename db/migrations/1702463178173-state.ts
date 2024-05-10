import { MigrationInterface, QueryRunner } from 'typeorm';

export class State1702463178173 implements MigrationInterface {
  name = 'State1702463178173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "state" ("id" SERIAL NOT NULL, "pickup_service_states" character varying NOT NULL, "pickupCarrierId" integer, CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "state" ADD CONSTRAINT "FK_0247b8bdf683ea39db24de45260" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "state" DROP CONSTRAINT "FK_0247b8bdf683ea39db24de45260"`,
    );
    await queryRunner.query(`DROP TABLE "state"`);
  }
}
