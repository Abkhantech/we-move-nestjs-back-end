import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableStateZipCode1704272967714 implements MigrationInterface {
    name = 'AlterTableStateZipCode1704272967714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" ADD "point_of_contact_name" character varying`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" ADD "point_of_contact_phone_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" DROP COLUMN "point_of_contact_phone_number"`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" DROP COLUMN "point_of_contact_name"`);
    }

}
