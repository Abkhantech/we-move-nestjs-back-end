import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLocalCarrierTable1705395581353 implements MigrationInterface {
    name = 'AlterLocalCarrierTable1705395581353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD "activation_status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP COLUMN "activation_status"`);
    }

}
