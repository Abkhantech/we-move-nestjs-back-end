import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPackagingTable1707296672301 implements MigrationInterface {
    name = 'AlterPackagingTable1707296672301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging" ADD "custom_packaging_preference" character varying`);
        await queryRunner.query(`ALTER TABLE "packaging" ALTER COLUMN "packaging_payment" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging" ALTER COLUMN "packaging_payment" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "custom_packaging_preference"`);
    }

}
