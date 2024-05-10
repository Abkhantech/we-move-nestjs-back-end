import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoomDetailsTable1712228104070 implements MigrationInterface {
    name = 'AlterRoomDetailsTable1712228104070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-details" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-details" DROP COLUMN "title"`);
    }

}
