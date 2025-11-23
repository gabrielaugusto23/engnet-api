import { MigrationInterface, QueryRunner } from "typeorm";

export class CriacaoTabelaRelatorios1763926845256 implements MigrationInterface {
    name = 'CriacaoTabelaRelatorios1763926845256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."relatorios_categoria_enum" AS ENUM('Vendas', 'Estoque', 'Clientes', 'Financeiro', 'Análise', 'Reembolsos')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_tipo_enum" AS ENUM('Vendas Mensais', 'Vendas Diárias', 'Performance de Vendas', 'Meta vs Realizado')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_periodo_enum" AS ENUM('Diário', 'Semanal', 'Mensal', 'Trimestral', 'Anual', 'Personalizado')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_status_enum" AS ENUM('Disponível', 'Processando', 'Erro', 'Arquivado')`);
        await queryRunner.query(`CREATE TABLE "relatorios" ("id_relatorio" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "categoria" "public"."relatorios_categoria_enum" NOT NULL, "tipo" "public"."relatorios_tipo_enum" NOT NULL, "periodo" "public"."relatorios_periodo_enum" NOT NULL, "dataHora" TIMESTAMP NOT NULL, "status" "public"."relatorios_status_enum" NOT NULL DEFAULT 'Disponível', "descricao" character varying, "arquivoCsv" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c402bd5562de167104e7643d77" PRIMARY KEY ("id_relatorio"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "relatorios"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_periodo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_tipo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_categoria_enum"`);
    }

}
