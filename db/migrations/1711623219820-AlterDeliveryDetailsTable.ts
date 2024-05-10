import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryDetailsTable1711623219820 implements MigrationInterface {
    name = 'AlterDeliveryDetailsTable1711623219820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD "shuttle_required" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP COLUMN "shuttle_required"`);
    }

}
