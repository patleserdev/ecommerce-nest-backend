"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserTable1749205677143 = void 0;
class FixUserTable1749205677143 {
    name = 'FixUserTable1749205677143';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`adress\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`streetAddress\` varchar(255) NOT NULL, \`streetAddress2\` varchar(255) NULL, \`postalCode\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`phoneToDelivery\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`adress_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('livraison', 'facturation') NOT NULL, \`adresseId\` int NULL, \`userId\` int NULL, \`cartId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE \`adress_role\` ADD CONSTRAINT \`FK_1fa8c450c5654137c5658feb382\` FOREIGN KEY (\`adresseId\`) REFERENCES \`adress\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adress_role\` ADD CONSTRAINT \`FK_87ecc344756e0f943f5c753f01b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adress_role\` ADD CONSTRAINT \`FK_d3daad3d08a584ee6e444fa1858\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adress_role\` ADD CONSTRAINT \`FK_89aac1e5b404f5740c3ac816c9c\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`adress_role\` DROP FOREIGN KEY \`FK_89aac1e5b404f5740c3ac816c9c\``);
        await queryRunner.query(`ALTER TABLE \`adress_role\` DROP FOREIGN KEY \`FK_d3daad3d08a584ee6e444fa1858\``);
        await queryRunner.query(`ALTER TABLE \`adress_role\` DROP FOREIGN KEY \`FK_87ecc344756e0f943f5c753f01b\``);
        await queryRunner.query(`ALTER TABLE \`adress_role\` DROP FOREIGN KEY \`FK_1fa8c450c5654137c5658feb382\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`adress_role\``);
        await queryRunner.query(`DROP TABLE \`adress\``);
    }
}
exports.FixUserTable1749205677143 = FixUserTable1749205677143;
//# sourceMappingURL=1749205677143-fix-user-table.js.map