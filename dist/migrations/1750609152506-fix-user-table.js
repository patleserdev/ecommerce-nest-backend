"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserTable1750609152506 = void 0;
class FixUserTable1750609152506 {
    name = 'FixUserTable1750609152506';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`media_link\` (\`id\` varchar(36) NOT NULL, \`mediaId\` varchar(255) NOT NULL, \`linkedType\` varchar(255) NOT NULL, \`linkedId\` varchar(255) NOT NULL, \`role\` varchar(255) NULL, \`position\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`media\` (\`id\` varchar(36) NOT NULL, \`fileName\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`pictureId\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`extension\` varchar(255) NULL, \`size\` int NULL, \`width\` int NULL, \`height\` int NULL, \`altText\` varchar(255) NULL, \`title\` varchar(255) NULL, \`description\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`media_link\` ADD CONSTRAINT \`FK_94abc714f50118bcf8c0c2a223c\` FOREIGN KEY (\`mediaId\`) REFERENCES \`media\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`media_link\` DROP FOREIGN KEY \`FK_94abc714f50118bcf8c0c2a223c\``);
        await queryRunner.query(`DROP TABLE \`media\``);
        await queryRunner.query(`DROP TABLE \`media_link\``);
    }
}
exports.FixUserTable1750609152506 = FixUserTable1750609152506;
//# sourceMappingURL=1750609152506-fix-user-table.js.map