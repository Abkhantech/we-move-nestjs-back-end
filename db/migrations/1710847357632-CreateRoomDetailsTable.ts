import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoomDetailsTable1710847357632 implements MigrationInterface {
    name = 'CreateRoomDetailsTable1710847357632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moving-item" DROP CONSTRAINT "FK_55e47fd251528424f8989a09631"`);
        await queryRunner.query(`ALTER TABLE "moving-item" RENAME COLUMN "moveRequestId" TO "roomDetailsId"`);
        await queryRunner.query(`CREATE TABLE "room-details" ("id" SERIAL NOT NULL, "video_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "moveRequestId" integer, CONSTRAINT "PK_99027837ef7fbcb9eb6ece6d389" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD CONSTRAINT "FK_f8d84541d3e6e0d2250d9205975" FOREIGN KEY ("roomDetailsId") REFERENCES "room-details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-details" ADD CONSTRAINT "FK_b5687448140907df94ded569c07" FOREIGN KEY ("moveRequestId") REFERENCES "move-request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-details" DROP CONSTRAINT "FK_b5687448140907df94ded569c07"`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP CONSTRAINT "FK_f8d84541d3e6e0d2250d9205975"`);
        await queryRunner.query(`DROP TABLE "room-details"`);
        await queryRunner.query(`ALTER TABLE "moving-item" RENAME COLUMN "roomDetailsId" TO "moveRequestId"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD CONSTRAINT "FK_55e47fd251528424f8989a09631" FOREIGN KEY ("moveRequestId") REFERENCES "move-request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
