import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyClaim1702467133975 implements MigrationInterface {
    name = 'CompanyClaim1702467133975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company-claim" ("id" SERIAL NOT NULL, "chat_support_url" character varying NOT NULL, "post_claim_customer_support_representative" character varying NOT NULL, "phone_support" character varying NOT NULL, "website" character varying NOT NULL, "pickupCarrierId" integer, CONSTRAINT "REL_85419cd3d035e77a0095f679f6" UNIQUE ("pickupCarrierId"), CONSTRAINT "PK_f15c05867e1cc046a24b800718f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company-claim" ADD CONSTRAINT "FK_85419cd3d035e77a0095f679f66" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company-claim" DROP CONSTRAINT "FK_85419cd3d035e77a0095f679f66"`);
        await queryRunner.query(`DROP TABLE "company-claim"`);
    }

}
