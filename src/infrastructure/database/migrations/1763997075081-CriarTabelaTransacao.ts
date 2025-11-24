import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTransacao1763997075081 implements MigrationInterface {
    name = 'CriarTabelaTransacao1763997075081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transacao_tipo_enum" AS ENUM('Boleto', 'Transferencia', 'Cartao Credito', 'Cheque', 'PIX', 'Dinheiro')`);
        await queryRunner.query(`CREATE TYPE "public"."transacao_status_enum" AS ENUM('Concluida', 'Pendente', 'Cancelada', 'Processando', 'Falha')`);
        await queryRunner.query(`CREATE TABLE "transacao" ("id_transacao" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "id_venda" uuid, "id_usuario_executor" uuid, "tipo" "public"."transacao_tipo_enum" NOT NULL, "valor" numeric(10,2) NOT NULL, "data_hora" TIMESTAMP NOT NULL, "status" "public"."transacao_status_enum" NOT NULL DEFAULT 'Pendente', "descricao" text, "documento_pdf" character varying(255), "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2048d59eea7774913bff69fb7f0" PRIMARY KEY ("id_transacao"))`);
        await queryRunner.query(`ALTER TABLE "transacao" ADD CONSTRAINT "FK_96493df12a04508f0b56cd9b82e" FOREIGN KEY ("id_venda") REFERENCES "venda"("id_venda") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transacao" ADD CONSTRAINT "FK_965bd02f76873ae12b68798e8ce" FOREIGN KEY ("id_usuario_executor") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacao" DROP CONSTRAINT "FK_965bd02f76873ae12b68798e8ce"`);
        await queryRunner.query(`ALTER TABLE "transacao" DROP CONSTRAINT "FK_96493df12a04508f0b56cd9b82e"`);
        await queryRunner.query(`DROP TABLE "transacao"`);
        await queryRunner.query(`DROP TYPE "public"."transacao_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transacao_tipo_enum"`);
    }

}
