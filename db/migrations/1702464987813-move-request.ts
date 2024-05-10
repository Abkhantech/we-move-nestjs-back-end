import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveRequest1702464987813 implements MigrationInterface {
    name = 'MoveRequest1702464987813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "combo-home-storage" ("id" SERIAL NOT NULL, "home_address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "storageId" integer, CONSTRAINT "REL_608d4c5a7559e2e9bca2e7ef3d" UNIQUE ("storageId"), CONSTRAINT "PK_24c3cee4e127a935464769971e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "storage" ("id" SERIAL NOT NULL, "storage_size" integer, "storage_filled" integer, "zip_code" character varying NOT NULL DEFAULT false, "address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "combo-apartment-storage" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "apartmentId" integer, "storageId" integer, CONSTRAINT "REL_e8866549c6a5968206f059bb04" UNIQUE ("apartmentId"), CONSTRAINT "REL_f336c7c9223374d42842f39f08" UNIQUE ("storageId"), CONSTRAINT "PK_158557eabc69bb26394d52f4b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apartment" ("id" SERIAL NOT NULL, "floor_no" integer, "is_elevator_available" boolean NOT NULL DEFAULT false, "is_elevator_accessible" boolean NOT NULL DEFAULT false, "elevator_type" character varying, "apt_address" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery-address" ("id" SERIAL NOT NULL, "complete_address" character varying NOT NULL, "stiars_present" boolean NOT NULL, "is_elevator_accessible" boolean NOT NULL, "no_of_flights" integer NOT NULL, "floor_no" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deliveryDetailsId" integer, CONSTRAINT "PK_a41aabd038940c9b41ed2672bdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "packaging" ("id" SERIAL NOT NULL, "packaging_type" character varying NOT NULL, "packaging_payment" integer NOT NULL, "dish_boxes" integer NOT NULL DEFAULT '0', "wardrobe_boxes" integer NOT NULL DEFAULT '0', "med_boxes" integer NOT NULL DEFAULT '0', "large_boxes" integer NOT NULL DEFAULT '0', "book_boxes" integer NOT NULL DEFAULT '0', "picture_boxes" integer NOT NULL DEFAULT '0', "tv_boxes" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_c555edac95babf9a092ff829eba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery-details" ("id" SERIAL NOT NULL, "determined_delivery_address" boolean NOT NULL DEFAULT false, "additional_stops" boolean NOT NULL DEFAULT false, "packagaing_required" boolean NOT NULL DEFAULT false, "open_location" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "packagingId" integer, CONSTRAINT "REL_b391540e3b47c9cfffe69ba507" UNIQUE ("packagingId"), CONSTRAINT "PK_93bb8c304a8409aa04c619e4773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "moving-item" ("id" SERIAL NOT NULL, "item_name" character varying NOT NULL, "item_width" integer NOT NULL, "item_length" integer NOT NULL, "item_height" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "moveRequestId" integer, CONSTRAINT "PK_966b54c4195672c1fc76e3dc343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."load-request_delivery_status_enum" AS ENUM('Not Started', 'In Progress', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "load-request" ("id" SERIAL NOT NULL, "delivery_status" "public"."load-request_delivery_status_enum" NOT NULL DEFAULT 'Not Started', "loading_state" character varying NOT NULL, "loading_zip_code" character varying NOT NULL, "delivery_state" character varying NOT NULL, "delivery_zip_code" character varying NOT NULL, "cubic_feet" integer NOT NULL, "balance_at_delivery" integer NOT NULL, "price_per_cubic_feet" integer NOT NULL, "first_available_date_of_delivery" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "pickupCarrierId" integer, "deliveryCarrierId" integer, "moveRequestId" integer, CONSTRAINT "REL_c9b64ccb2b71d9fb0ee92623d4" UNIQUE ("pickupCarrierId"), CONSTRAINT "REL_d106cd79fd6b7e6194b41615dc" UNIQUE ("deliveryCarrierId"), CONSTRAINT "REL_51340675b94562704c7c05515d" UNIQUE ("moveRequestId"), CONSTRAINT "PK_ef54c16d10176ad2cb91aa74dff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."move-request_move_status_enum" AS ENUM('Not Started', 'In Progress', 'Completed')`);
        await queryRunner.query(`CREATE TYPE "public"."move-request_pickup_status_enum" AS ENUM('Not Started', 'In Progress', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "move-request" ("id" SERIAL NOT NULL, "move_type" character varying, "move_status" "public"."move-request_move_status_enum" NOT NULL DEFAULT 'Not Started', "pickup_status" "public"."move-request_pickup_status_enum" NOT NULL DEFAULT 'Not Started', "location_type" character varying, "home_address" character varying, "pickup_date_from" TIMESTAMP NOT NULL, "pickup_date_to" TIMESTAMP NOT NULL, "item_count" integer, "total_cubic_feet" integer, "price_per_cubic_feet" integer, "move_payment" integer, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "apartmentId" integer, "comboApartmentStorageId" integer, "userId" integer, "comboHomeStorageId" integer, "storageId" integer, "deliveryDetailsId" integer, "pickupCarrierId" integer, "loadRequestId" integer, CONSTRAINT "REL_4e60f4e970629930980fc2d087" UNIQUE ("apartmentId"), CONSTRAINT "REL_6865e8eeb2572e37a2858c878d" UNIQUE ("comboApartmentStorageId"), CONSTRAINT "REL_10aad0b5436b356c37d55ea7a0" UNIQUE ("comboHomeStorageId"), CONSTRAINT "REL_217de80bc2e74d1006b1ea553d" UNIQUE ("storageId"), CONSTRAINT "REL_f65197480f0d7eefb92a5b8a1c" UNIQUE ("deliveryDetailsId"), CONSTRAINT "REL_cc3d73fcf313df8a0213084a54" UNIQUE ("pickupCarrierId"), CONSTRAINT "REL_f2eb13d6ef447563b3bca32723" UNIQUE ("loadRequestId"), CONSTRAINT "PK_fd360cfbe69e0ee5eac86255c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "combo-home-storage" ADD CONSTRAINT "FK_608d4c5a7559e2e9bca2e7ef3d7" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "combo-apartment-storage" ADD CONSTRAINT "FK_e8866549c6a5968206f059bb043" FOREIGN KEY ("apartmentId") REFERENCES "apartment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "combo-apartment-storage" ADD CONSTRAINT "FK_f336c7c9223374d42842f39f08a" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ADD CONSTRAINT "FK_99db202791d0628ede2c56d1fc7" FOREIGN KEY ("deliveryDetailsId") REFERENCES "delivery-details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD CONSTRAINT "FK_b391540e3b47c9cfffe69ba507b" FOREIGN KEY ("packagingId") REFERENCES "packaging"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD CONSTRAINT "FK_55e47fd251528424f8989a09631" FOREIGN KEY ("moveRequestId") REFERENCES "move-request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce" FOREIGN KEY ("deliveryCarrierId") REFERENCES "delivery-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "load-request" ADD CONSTRAINT "FK_51340675b94562704c7c05515d9" FOREIGN KEY ("moveRequestId") REFERENCES "move-request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_4e60f4e970629930980fc2d0872" FOREIGN KEY ("apartmentId") REFERENCES "apartment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_6865e8eeb2572e37a2858c878dd" FOREIGN KEY ("comboApartmentStorageId") REFERENCES "combo-apartment-storage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_8fe5960521b0b8aa3b4015ffcbe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_10aad0b5436b356c37d55ea7a05" FOREIGN KEY ("comboHomeStorageId") REFERENCES "combo-home-storage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_217de80bc2e74d1006b1ea553df" FOREIGN KEY ("storageId") REFERENCES "storage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_f65197480f0d7eefb92a5b8a1ce" FOREIGN KEY ("deliveryDetailsId") REFERENCES "delivery-details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "FK_f2eb13d6ef447563b3bca327233" FOREIGN KEY ("loadRequestId") REFERENCES "load-request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_2945f51fabce35a9ec6161789d8" FOREIGN KEY ("deliveryCarrierId") REFERENCES "delivery-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "driver" ADD CONSTRAINT "FK_ec335cb999cc292c70aaf370a06" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_ec335cb999cc292c70aaf370a06"`);
        await queryRunner.query(`ALTER TABLE "driver" DROP CONSTRAINT "FK_2945f51fabce35a9ec6161789d8"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_f2eb13d6ef447563b3bca327233"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_cc3d73fcf313df8a0213084a54c"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_f65197480f0d7eefb92a5b8a1ce"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_217de80bc2e74d1006b1ea553df"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_10aad0b5436b356c37d55ea7a05"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_8fe5960521b0b8aa3b4015ffcbe"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_6865e8eeb2572e37a2858c878dd"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "FK_4e60f4e970629930980fc2d0872"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_51340675b94562704c7c05515d9"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_d106cd79fd6b7e6194b41615dce"`);
        await queryRunner.query(`ALTER TABLE "load-request" DROP CONSTRAINT "FK_c9b64ccb2b71d9fb0ee92623d49"`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP CONSTRAINT "FK_55e47fd251528424f8989a09631"`);
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP CONSTRAINT "FK_b391540e3b47c9cfffe69ba507b"`);
        await queryRunner.query(`ALTER TABLE "delivery-address" DROP CONSTRAINT "FK_99db202791d0628ede2c56d1fc7"`);
        await queryRunner.query(`ALTER TABLE "combo-apartment-storage" DROP CONSTRAINT "FK_f336c7c9223374d42842f39f08a"`);
        await queryRunner.query(`ALTER TABLE "combo-apartment-storage" DROP CONSTRAINT "FK_e8866549c6a5968206f059bb043"`);
        await queryRunner.query(`ALTER TABLE "combo-home-storage" DROP CONSTRAINT "FK_608d4c5a7559e2e9bca2e7ef3d7"`);
        await queryRunner.query(`DROP TABLE "move-request"`);
        await queryRunner.query(`DROP TYPE "public"."move-request_pickup_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."move-request_move_status_enum"`);
        await queryRunner.query(`DROP TABLE "load-request"`);
        await queryRunner.query(`DROP TYPE "public"."load-request_delivery_status_enum"`);
        await queryRunner.query(`DROP TABLE "moving-item"`);
        await queryRunner.query(`DROP TABLE "delivery-details"`);
        await queryRunner.query(`DROP TABLE "packaging"`);
        await queryRunner.query(`DROP TABLE "delivery-address"`);
        await queryRunner.query(`DROP TABLE "apartment"`);
        await queryRunner.query(`DROP TABLE "combo-apartment-storage"`);
        await queryRunner.query(`DROP TABLE "storage"`);
        await queryRunner.query(`DROP TABLE "combo-home-storage"`);
    }

}
