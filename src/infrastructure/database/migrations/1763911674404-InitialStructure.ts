import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1763911674404 implements MigrationInterface {
    name = 'InitialStructure1763911674404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_despesa" ("id_tipo_despesa" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(50) NOT NULL, "descricao" text, CONSTRAINT "PK_2425beb9c72543d12d4abf00d61" PRIMARY KEY ("id_tipo_despesa"))`);
        await queryRunner.query(`CREATE TABLE "item_reembolso" ("id_item_reembolso" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_despesa" date NOT NULL, "descricao" character varying(255) NOT NULL, "valor" numeric(10,2) NOT NULL, "comprovante" character varying, "FK_REEMBOLSO_id_reembolso" uuid, "FK_TIPO_DESPESA_id_tipo_despesa" uuid, CONSTRAINT "PK_d6efa61e20fa0b1489f120b11f3" PRIMARY KEY ("id_item_reembolso"))`);
        await queryRunner.query(`CREATE TYPE "public"."reembolso_status_enum" AS ENUM('EM_ANALISE', 'APROVADO', 'REJEITADO')`);
        await queryRunner.query(`CREATE TABLE "reembolso" ("id_reembolso" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_solicitacao" TIMESTAMP NOT NULL, "data_aprovacao" TIMESTAMP, "status" "public"."reembolso_status_enum" NOT NULL DEFAULT 'EM_ANALISE', "valor_total" numeric(10,2) NOT NULL, "observacao" text, "FK_USUARIO_id_usuario" uuid, CONSTRAINT "PK_133e8dcd32d15564efab2d824d3" PRIMARY KEY ("id_reembolso"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "senha" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "solicita_aprova" ("id_solicita_aprova" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_aprovacao" TIMESTAMP NOT NULL DEFAULT now(), "FK_USUARIO_id_usuario" uuid, "FK_REEMBOLSO_id_reembolso" uuid, CONSTRAINT "PK_2d4dab6cae9d2c2e1b1e59625a0" PRIMARY KEY ("id_solicita_aprova"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id_cliente" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "tipo" character varying(20) NOT NULL, "documento" character varying(20) NOT NULL, "email" character varying(100) NOT NULL, "telefone" character varying(20) NOT NULL, CONSTRAINT "PK_faf29c7b0d6dddbcc3579dcdeac" PRIMARY KEY ("id_cliente"))`);
        await queryRunner.query(`ALTER TABLE "item_reembolso" ADD CONSTRAINT "FK_cc9f5bec47ed30c484146299131" FOREIGN KEY ("FK_REEMBOLSO_id_reembolso") REFERENCES "reembolso"("id_reembolso") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_reembolso" ADD CONSTRAINT "FK_dfe05d30b315e2a8e31238d8741" FOREIGN KEY ("FK_TIPO_DESPESA_id_tipo_despesa") REFERENCES "tipo_despesa"("id_tipo_despesa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reembolso" ADD CONSTRAINT "FK_220bcdf756a96e4d7bc343f9780" FOREIGN KEY ("FK_USUARIO_id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicita_aprova" ADD CONSTRAINT "FK_c088180cd4cd152b3faec014d4f" FOREIGN KEY ("FK_USUARIO_id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solicita_aprova" ADD CONSTRAINT "FK_3e8040adbdcd4aa6a0b1f8a69b4" FOREIGN KEY ("FK_REEMBOLSO_id_reembolso") REFERENCES "reembolso"("id_reembolso") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solicita_aprova" DROP CONSTRAINT "FK_3e8040adbdcd4aa6a0b1f8a69b4"`);
        await queryRunner.query(`ALTER TABLE "solicita_aprova" DROP CONSTRAINT "FK_c088180cd4cd152b3faec014d4f"`);
        await queryRunner.query(`ALTER TABLE "reembolso" DROP CONSTRAINT "FK_220bcdf756a96e4d7bc343f9780"`);
        await queryRunner.query(`ALTER TABLE "item_reembolso" DROP CONSTRAINT "FK_dfe05d30b315e2a8e31238d8741"`);
        await queryRunner.query(`ALTER TABLE "item_reembolso" DROP CONSTRAINT "FK_cc9f5bec47ed30c484146299131"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "solicita_aprova"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "reembolso"`);
        await queryRunner.query(`DROP TYPE "public"."reembolso_status_enum"`);
        await queryRunner.query(`DROP TABLE "item_reembolso"`);
        await queryRunner.query(`DROP TABLE "tipo_despesa"`);
    }

}
