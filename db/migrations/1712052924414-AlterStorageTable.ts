import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStorageTable1712052924414 implements MigrationInterface {
    name = 'AlterStorageTable1712052924414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storage" ADD "floor_no" integer`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "is_elevator_available" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "storage" ADD "are_stairs_present" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "are_stairs_present"`);
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "is_elevator_available"`);
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "floor_no"`);
    }

}
