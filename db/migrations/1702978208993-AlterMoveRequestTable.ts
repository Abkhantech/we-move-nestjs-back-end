import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMoveRequestTable1702978208993 implements MigrationInterface {
    name = 'AlterMoveRequestTable1702978208993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" ALTER COLUMN "pickup_date_from" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "move-request" ALTER COLUMN "pickup_date_to" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" ALTER COLUMN "pickup_date_to" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "move-request" ALTER COLUMN "pickup_date_from" SET NOT NULL`);
    }

}
