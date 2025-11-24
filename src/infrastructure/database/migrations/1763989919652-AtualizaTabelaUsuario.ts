import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizaTabelaUsuario1763989919652 implements MigrationInterface {
    name = 'AtualizaTabelaUsuario1763989919652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "documento"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "codigo_sequencial" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "total_compras" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."client_status_enum" AS ENUM('VIP', 'Ativo', 'Inativo', 'Novo')`);
        await queryRunner.query(`ALTER TABLE "client" ADD "status" "public"."client_status_enum" NOT NULL DEFAULT 'Novo'`);
        await queryRunner.query(`ALTER TABLE "client" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "client" ADD "atualizado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "nome" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "atualizado_em"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "total_compras"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "codigo_sequencial"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "documento" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD "tipo" character varying(20) NOT NULL`);
    }

}
