import { MigrationInterface, QueryRunner } from "typeorm";

export class AddlocalCarrierWithRelations1704111507182 implements MigrationInterface {
    name = 'AddlocalCarrierWithRelations1704111507182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "local-carrier" ("id" SERIAL NOT NULL, "company_name" character varying, "street_address" character varying, "city" character varying, "state" character varying, "zip_code" character varying, "dot_number" character varying, "mc_number" character varying, "company_license" character varying, "owner_driver_license" character varying, "owner_name" character varying, "owner_phone_number" character varying, "owner_email" character varying, "owner_office_phone" character varying, "w9_form" character varying, "phone_verified" boolean NOT NULL DEFAULT false, "email_verified" boolean NOT NULL DEFAULT false, "otp" character varying, "trucks_in_operatiion" integer NOT NULL DEFAULT '0', "arbitrationCounty" character varying, "arbitrationState" character varying, "years_in_business" integer DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deliveryEstimationId" integer, CONSTRAINT "UQ_4699e150080ee7240f1fe71c51d" UNIQUE ("owner_phone_number"), CONSTRAINT "UQ_1ce2a8f7ae64bd36964721728e7" UNIQUE ("owner_email"), CONSTRAINT "UQ_ebb70c397e329e76a83a52d5907" UNIQUE ("owner_office_phone"), CONSTRAINT "REL_d20f5175181f433744438fcd3e" UNIQUE ("deliveryEstimationId"), CONSTRAINT "PK_36b24749d96f08872f484e5e730" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company-claim" ADD "localCarrierId" integer`);
        await queryRunner.query(`ALTER TABLE "company-claim" ADD CONSTRAINT "UQ_833f75938c0584c8b58c4a53cd8" UNIQUE ("localCarrierId")`);
        await queryRunner.query(`ALTER TABLE "insurance" ADD "localCarrierId" integer`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "localCarrierId" integer`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "localCarrierId" integer`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "REL_c9b64ccb2b71d9fb0ee92623d4"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "REL_d106cd79fd6b7e6194b41615dc"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "REL_cc3d73fcf313df8a0213084a54"`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce" FOREIGN KEY ("deliveryCarrierId") REFERENCES "delivery-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company-claim" ADD CONSTRAINT "FK_833f75938c0584c8b58c4a53cd8" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD CONSTRAINT "FK_d20f5175181f433744438fcd3eb" FOREIGN KEY ("deliveryEstimationId") REFERENCES "delivery-estimation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "insurance" ADD CONSTRAINT "FK_6789523aa14a0b4809e5c0df7e7" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_99162452c821daf4c722a13cda2" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_527c2084d8333f9051213a91a3f" FOREIGN KEY ("localCarrierId") REFERENCES "local-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_527c2084d8333f9051213a91a3f"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_99162452c821daf4c722a13cda2"`);
        await queryRunner.query(`ALTER TABLE "insurance" DROP CONSTRAINT "FK_6789523aa14a0b4809e5c0df7e7"`);
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP CONSTRAINT "FK_d20f5175181f433744438fcd3eb"`);
        await queryRunner.query(`ALTER TABLE "company-claim" DROP CONSTRAINT "FK_833f75938c0584c8b58c4a53cd8"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49"`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "REL_cc3d73fcf313df8a0213084a54" UNIQUE ("pickupCarrierId")`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "REL_d106cd79fd6b7e6194b41615dc" UNIQUE ("deliveryCarrierId")`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "REL_c9b64ccb2b71d9fb0ee92623d4" UNIQUE ("pickupCarrierId")`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce" FOREIGN KEY ("deliveryCarrierId") REFERENCES "delivery-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "localCarrierId"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "localCarrierId"`);
        await queryRunner.query(`ALTER TABLE "insurance" DROP COLUMN "localCarrierId"`);
        await queryRunner.query(`ALTER TABLE "company-claim" DROP CONSTRAINT "UQ_833f75938c0584c8b58c4a53cd8"`);
        await queryRunner.query(`ALTER TABLE "company-claim" DROP COLUMN "localCarrierId"`);
        await queryRunner.query(`DROP TABLE "local-carrier"`);
    }

}
