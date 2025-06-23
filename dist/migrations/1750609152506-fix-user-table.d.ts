import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixUserTable1750609152506 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
