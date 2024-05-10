import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAllCarrierTables1706464167739 implements MigrationInterface {
    name = 'AlterAllCarrierTables1706464167739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-carrier" ADD "doing_business_as_name" character varying`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ADD "doing_business_as_name" character varying`);
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD "doing_business_as_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP COLUMN "doing_business_as_name"`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" DROP COLUMN "doing_business_as_name"`);
        await queryRunner.query(`ALTER TABLE "delivery-carrier" DROP COLUMN "doing_business_as_name"`);
    }

}
