import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterInsuranceTable1705603448042 implements MigrationInterface {
    name = 'AlterInsuranceTable1705603448042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "insurance" DROP CONSTRAINT "UQ_68da5d03d92a19442ec6fc0b154"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insurance" ADD CONSTRAINT "UQ_68da5d03d92a19442ec6fc0b154" UNIQUE ("phone_number")`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "phone_number" SET NOT NULL`);
    }

}
