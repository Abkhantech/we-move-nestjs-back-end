import { MigrationInterface, QueryRunner } from "typeorm";

export class ManageStateZipCodeTable1705156618085 implements MigrationInterface {
    name = 'ManageStateZipCodeTable1705156618085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "zip-code" ("id" SERIAL NOT NULL, "zip_code" character varying, "stateId" integer, CONSTRAINT "PK_7f53fc7d3ef903c4825515f76e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "pickup_service_states"`);
        await queryRunner.query(`ALTER TABLE "state" ADD "pickup_service_state" character varying`);
        await queryRunner.query(`ALTER TABLE "state" ADD "point_of_contact_name" character varying`);
        await queryRunner.query(`ALTER TABLE "state" ADD "point_of_contact_phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "state" ADD "localCarrierId" integer`);
        await queryRunner.query(`ALTER TABLE "zip-code" ADD CONSTRAINT "FK_770fdf9db8b5ab0c4110ce52ecd" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "state" ADD CONSTRAINT "FK_50cac6952a38082e72f9139c466" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_50cac6952a38082e72f9139c466"`);
        await queryRunner.query(`ALTER TABLE "zip-code" DROP CONSTRAINT "FK_770fdf9db8b5ab0c4110ce52ecd"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "localCarrierId"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "point_of_contact_phone_number"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "point_of_contact_name"`);
        await queryRunner.query(`ALTER TABLE "state" DROP COLUMN "pickup_service_state"`);
        await queryRunner.query(`ALTER TABLE "state" ADD "pickup_service_states" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "zip-code"`);
    }

}
