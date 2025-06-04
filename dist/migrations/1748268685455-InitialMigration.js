"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1748268685455 = void 0;
class InitialMigration1748268685455 {
    name = 'InitialMigration1748268685455';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`brandId\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f468ae5696f07da025138e38f\` ON \`brand\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
    }
}
exports.InitialMigration1748268685455 = InitialMigration1748268685455;
//# sourceMappingURL=1748268685455-InitialMigration.js.map