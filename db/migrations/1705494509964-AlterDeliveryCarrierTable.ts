import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryCarrierTable1705494509964 implements MigrationInterface {
    name = 'AlterDeliveryCarrierTable1705494509964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-carrier" ADD "canonical_id" character varying`);
        await queryRunner.query(`ALTER TABLE "delivery-carrier" ADD CONSTRAINT "UQ_9e70ea4e4468c81c12a1ae39bda" UNIQUE ("canonical_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-carrier" DROP CONSTRAINT "UQ_9e70ea4e4468c81c12a1ae39bda"`);
        await queryRunner.query(`ALTER TABLE "delivery-carrier" DROP COLUMN "canonical_id"`);
    }

}
