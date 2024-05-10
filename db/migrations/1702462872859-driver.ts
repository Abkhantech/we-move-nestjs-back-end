import { MigrationInterface, QueryRunner } from 'typeorm';

export class Driver1702462872859 implements MigrationInterface {
  name = 'Driver1702462872859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "driver" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deliveryCarrierId" integer, "pickupCarrierId" integer, CONSTRAINT "UQ_5c2b8a47a2bf6b0cdb81635bdb0" UNIQUE ("phone_number"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "driver" DROP CONSTRAINT "FK_ec335cb999cc292c70aaf370a06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "driver" DROP CONSTRAINT "FK_2945f51fabce35a9ec6161789d8"`,
    );
    await queryRunner.query(`DROP TABLE "driver"`);
  }
}
