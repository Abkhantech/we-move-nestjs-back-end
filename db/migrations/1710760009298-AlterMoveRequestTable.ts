import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMoveRequestTable1710760009298 implements MigrationInterface {
    name = 'AlterMoveRequestTable1710760009298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "total_cubic_feet"`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "total_cubic_feet" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "move_payment"`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "move_payment" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "move_payment"`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "move_payment" integer`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "total_cubic_feet"`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "total_cubic_feet" integer`);
    }

}
