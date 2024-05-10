import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoomDetailsTable1711706793751 implements MigrationInterface {
    name = 'AlterRoomDetailsTable1711706793751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-details" ADD "room_cubic_feet" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-details" DROP COLUMN "room_cubic_feet"`);
    }

}
