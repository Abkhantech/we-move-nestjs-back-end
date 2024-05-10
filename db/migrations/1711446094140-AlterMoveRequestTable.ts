import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMoveRequestTable1711446094140 implements MigrationInterface {
    name = 'AlterMoveRequestTable1711446094140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" ADD "move_distance" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "initial_deposit" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "initial_deposit"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "move_distance"`);
    }

}
