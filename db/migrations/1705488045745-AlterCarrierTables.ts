import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCarrierTables1705488045745 implements MigrationInterface {
    name = 'AlterCarrierTables1705488045745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD "carrier_type" character varying DEFAULT 'local-carrier'`);
        await queryRunner.query(`ALTER TABLE "delivery-carrier" ADD "carrier_type" character varying DEFAULT 'delivery-carrier'`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD "carrier_type" character varying DEFAULT 'pickup-carrier'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP COLUMN "carrier_type"`);
        await queryRunner.query(`ALTER TABLE "delivery-carrier" DROP COLUMN "carrier_type"`);
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP COLUMN "carrier_type"`);
    }

}
