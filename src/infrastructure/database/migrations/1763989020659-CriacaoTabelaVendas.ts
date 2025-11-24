import { MigrationInterface, QueryRunner } from "typeorm";

export class CriacaoTabelaVendas1763989020659 implements MigrationInterface {
    name = 'CriacaoTabelaVendas1763989020659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."venda_categoria_enum" AS ENUM('Serviços Consultoria', 'Licenças Software', 'Suporte Técnico', 'Desenvolvimento Customizado', 'Implantação Sistema', 'Treinamento')`);
        await queryRunner.query(`CREATE TYPE "public"."venda_status_enum" AS ENUM('Concluida', 'Pendente', 'Cancelada', 'Processando')`);
        await queryRunner.query(`CREATE TABLE "venda" ("id_venda" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "id_vendedor" uuid, "id_cliente" uuid, "categoria" "public"."venda_categoria_enum" NOT NULL, "valor" numeric(10,2) NOT NULL, "data_hora" TIMESTAMP NOT NULL, "status" "public"."venda_status_enum" NOT NULL DEFAULT 'Pendente', "descricao" text, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b5cb96cfbe10a76e19661e2175" PRIMARY KEY ("id_venda"))`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_c8715b221111b76821fae95f696" FOREIGN KEY ("id_vendedor") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_a8a0ff255844d5da75276d5c729" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_a8a0ff255844d5da75276d5c729"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_c8715b221111b76821fae95f696"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TYPE "public"."venda_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."venda_categoria_enum"`);
    }

}
