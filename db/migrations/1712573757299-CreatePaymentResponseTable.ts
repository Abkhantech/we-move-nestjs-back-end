import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentResponseTable1712573757299 implements MigrationInterface {
    name = 'CreatePaymentResponseTable1712573757299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment-response" ("id" SERIAL NOT NULL, "object_id" character varying NOT NULL, "amount_in_cents" integer NOT NULL, "checkout_time" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "moveRequestId" integer, CONSTRAINT "UQ_4b33e7935716afe9d7a1ae7dbad" UNIQUE ("object_id"), CONSTRAINT "UQ_3931d6e4b34821aa6c317c60850" UNIQUE ("amount_in_cents"), CONSTRAINT "REL_8d4265bc038d43eaa63faa0438" UNIQUE ("moveRequestId"), CONSTRAINT "PK_79702b1368095a30e3f83241ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment-response" ADD CONSTRAINT "FK_8d4265bc038d43eaa63faa04388" FOREIGN KEY ("moveRequestId") REFERENCES "move-request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment-response" DROP CONSTRAINT "FK_8d4265bc038d43eaa63faa04388"`);
        await queryRunner.query(`DROP TABLE "payment-response"`);
    }

}
