import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryCarrierTable1705419056305 implements MigrationInterface {
    name = 'AlterDeliveryCarrierTable1705419056305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-carrier" ADD "activation_status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-carrier" DROP COLUMN "activation_status"`);
    }

}
