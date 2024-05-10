import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStateZipCodeTableWithRelation1704191184415 implements MigrationInterface {
    name = 'AddStateZipCodeTableWithRelation1704191184415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state-zip-code" ("id" SERIAL NOT NULL, "pickup_service_states" character varying NOT NULL, "zip_code" character varying NOT NULL, "localCarrierId" integer, CONSTRAINT "UQ_8e8af25a6e41c5eb2fea67eb4e4" UNIQUE ("zip_code"), CONSTRAINT "PK_d0c489368c9f820fe4027b85cbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state-zip-code" ADD CONSTRAINT "FK_cd447571c0f535ede6523265f97" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" DROP CONSTRAINT "FK_cd447571c0f535ede6523265f97"`);
        await queryRunner.query(`DROP TABLE "state-zip-code"`);
    }

}
