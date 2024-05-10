import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStateZipCodeTableWithRelation1704197173646 implements MigrationInterface {
    name = 'AlterStateZipCodeTableWithRelation1704197173646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" RENAME COLUMN "pickup_service_states" TO "service_state"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-zip-code" RENAME COLUMN "service_state" TO "pickup_service_states"`);
    }

}
