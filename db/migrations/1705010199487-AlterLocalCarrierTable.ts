import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLocalCarrierTable1705010199487 implements MigrationInterface {
    name = 'AlterLocalCarrierTable1705010199487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" ALTER COLUMN "service_state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" ALTER COLUMN "zip_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" DROP CONSTRAINT "UQ_8e8af25a6e41c5eb2fea67eb4e4"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" ADD CONSTRAINT "UQ_8e8af25a6e41c5eb2fea67eb4e4" UNIQUE ("zip_code")`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" ALTER COLUMN "zip_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" ALTER COLUMN "service_state" SET NOT NULL`);
    }

}
