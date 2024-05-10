import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPickupCarrierTable1704897321252 implements MigrationInterface {
    name = 'AlterPickupCarrierTable1704897321252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD "canonical_id" character varying`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD CONSTRAINT "UQ_77bed12c1c0a2c64edba51d2ee9" UNIQUE ("canonical_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP CONSTRAINT "UQ_77bed12c1c0a2c64edba51d2ee9"`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP COLUMN "canonical_id"`);
    }

}
