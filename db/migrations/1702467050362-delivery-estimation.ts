import { MigrationInterface, QueryRunner } from "typeorm";

export class DeliveryEstimation1702467050362 implements MigrationInterface {
    name = 'DeliveryEstimation1702467050362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery-estimation" ("id" SERIAL NOT NULL, "estimation_0_to_500_miles" character varying NOT NULL, "estimation_501_to_1000_miles" character varying NOT NULL, "estimation_1001_to_1500_miles" character varying NOT NULL, "estimation_1501_to_4000_miles" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b7572ae2301d9a0bd97fcbde472" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD "deliveryEstimationId" integer`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD CONSTRAINT "UQ_df1c23089c5ceed441c82a2e748" UNIQUE ("deliveryEstimationId")`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD CONSTRAINT "FK_df1c23089c5ceed441c82a2e748" FOREIGN KEY ("deliveryEstimationId") REFERENCES "delivery-estimation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP CONSTRAINT "FK_df1c23089c5ceed441c82a2e748"`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP CONSTRAINT "UQ_df1c23089c5ceed441c82a2e748"`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP COLUMN "deliveryEstimationId"`);
        await queryRunner.query(`DROP TABLE "delivery-estimation"`);
    }

}
