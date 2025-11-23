import { MigrationInterface, QueryRunner } from "typeorm";

export class AjusteTiposRelatorio1763927937275 implements MigrationInterface {
    name = 'AjusteTiposRelatorio1763927937275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relatorios" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "relatorios" ADD "descricao" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relatorios" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "relatorios" ADD "descricao" character varying`);
    }

}
