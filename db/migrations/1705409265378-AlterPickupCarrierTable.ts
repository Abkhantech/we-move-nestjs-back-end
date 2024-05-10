import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPickupCarrierTable1705409265378 implements MigrationInterface {
    name = 'AlterPickupCarrierTable1705409265378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD "activation_status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP COLUMN "activation_status"`);
    }

}
