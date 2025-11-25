import { MigrationInterface, QueryRunner } from "typeorm";

export class EstruturaFinalCompleta1764034996117 implements MigrationInterface {
    name = 'EstruturaFinalCompleta1764034996117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reembolso_categoria_enum" AS ENUM('Combustível', 'Alimentação', 'Transporte', 'Hospedagem', 'Material de Escritório', 'Outros')`);
        await queryRunner.query(`CREATE TYPE "public"."reembolso_status_enum" AS ENUM('Pendente', 'Aprovado', 'Rejeitado', 'Rascunho')`);
        await queryRunner.query(`CREATE TABLE "reembolso" ("id_reembolso" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "id_usuario" uuid, "categoria" "public"."reembolso_categoria_enum" NOT NULL, "descricao" text NOT NULL, "justificativa_comercial" text, "valor" numeric(10,2) NOT NULL, "data_despesa" date NOT NULL, "status" "public"."reembolso_status_enum" NOT NULL DEFAULT 'Rascunho', "comprovante_url" character varying(255), "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133e8dcd32d15564efab2d824d3" PRIMARY KEY ("id_reembolso"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuario_departamento_enum" AS ENUM('Vendas', 'Suporte', 'Desenvolvimento', 'Design', 'Marketing', 'Financeiro', 'Recursos Humanos', 'Operações', 'Comercial')`);
        await queryRunner.query(`CREATE TYPE "public"."usuario_cargo_enum" AS ENUM('Gerente', 'Coordenador', 'Analista', 'Especialista', 'Assistente', 'Estagiário', 'Diretor')`);
        await queryRunner.query(`CREATE TYPE "public"."usuario_role_enum" AS ENUM('ADMIN', 'MEMBER')`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "senha" character varying(255) NOT NULL, "telefone" character varying(20) NOT NULL, "departamento" "public"."usuario_departamento_enum" NOT NULL DEFAULT 'Operações', "cargo" "public"."usuario_cargo_enum" NOT NULL DEFAULT 'Assistente', "descricao" text, "role" "public"."usuario_role_enum" NOT NULL DEFAULT 'MEMBER', "ativo" boolean NOT NULL DEFAULT true, "avatar_url" character varying(255), "data_criacao" TIMESTAMP NOT NULL DEFAULT now(), "data_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE TYPE "public"."client_estado_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TYPE "public"."client_status_enum" AS ENUM('VIP', 'Ativo', 'Inativo', 'Novo')`);
        await queryRunner.query(`CREATE TABLE "client" ("id_cliente" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "nome_empresa" character varying(255) NOT NULL, "nome_contato" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "telefone" character varying(20) NOT NULL, "cnpj" character varying(20), "endereco" text, "cidade" character varying(100), "estado" "public"."client_estado_enum", "cep" character varying(10), "descricao" text, "total_compras" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."client_status_enum" NOT NULL DEFAULT 'Novo', "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_faf29c7b0d6dddbcc3579dcdeac" PRIMARY KEY ("id_cliente"))`);
        await queryRunner.query(`CREATE TYPE "public"."venda_categoria_enum" AS ENUM('Serviços Consultoria', 'Licenças Software', 'Suporte Técnico', 'Desenvolvimento Customizado', 'Implantação Sistema', 'Treinamento')`);
        await queryRunner.query(`CREATE TYPE "public"."venda_status_enum" AS ENUM('Concluida', 'Pendente', 'Cancelada', 'Processando')`);
        await queryRunner.query(`CREATE TABLE "venda" ("id_venda" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "id_vendedor" uuid, "id_cliente" uuid, "categoria" "public"."venda_categoria_enum" NOT NULL, "valor" numeric(10,2) NOT NULL, "data_hora" TIMESTAMP NOT NULL, "status" "public"."venda_status_enum" NOT NULL DEFAULT 'Pendente', "descricao" text, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b5cb96cfbe10a76e19661e2175" PRIMARY KEY ("id_venda"))`);
        await queryRunner.query(`CREATE TYPE "public"."transacao_tipo_enum" AS ENUM('Boleto', 'Transferencia', 'Cartao Credito', 'Cheque', 'PIX', 'Dinheiro')`);
        await queryRunner.query(`CREATE TYPE "public"."transacao_status_enum" AS ENUM('Concluida', 'Pendente', 'Cancelada', 'Processando', 'Falha')`);
        await queryRunner.query(`CREATE TABLE "transacao" ("id_transacao" uuid NOT NULL DEFAULT uuid_generate_v4(), "codigo_sequencial" SERIAL NOT NULL, "id_venda" uuid, "id_usuario_executor" uuid, "tipo" "public"."transacao_tipo_enum" NOT NULL, "valor" numeric(10,2) NOT NULL, "data_hora" TIMESTAMP NOT NULL, "status" "public"."transacao_status_enum" NOT NULL DEFAULT 'Pendente', "descricao" text, "documento_pdf" character varying(255), "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2048d59eea7774913bff69fb7f0" PRIMARY KEY ("id_transacao"))`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_categoria_enum" AS ENUM('Vendas', 'Estoque', 'Clientes', 'Financeiro', 'Análise', 'Reembolsos')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_tipo_enum" AS ENUM('Vendas Mensais', 'Vendas Diárias', 'Performance de Vendas', 'Meta vs Realizado')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_periodo_enum" AS ENUM('Diário', 'Semanal', 'Mensal', 'Trimestral', 'Anual', 'Personalizado')`);
        await queryRunner.query(`CREATE TYPE "public"."relatorios_status_enum" AS ENUM('Disponível', 'Processando', 'Erro', 'Arquivado')`);
        await queryRunner.query(`CREATE TABLE "relatorios" ("id_relatorio" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "categoria" "public"."relatorios_categoria_enum" NOT NULL, "tipo" "public"."relatorios_tipo_enum" NOT NULL, "periodo" "public"."relatorios_periodo_enum" NOT NULL, "dataHora" TIMESTAMP NOT NULL, "status" "public"."relatorios_status_enum" NOT NULL DEFAULT 'Disponível', "descricao" text, "arquivoCsv" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c402bd5562de167104e7643d77" PRIMARY KEY ("id_relatorio"))`);
        await queryRunner.query(`ALTER TABLE "reembolso" ADD CONSTRAINT "FK_339f4c7be7bda1d92bb34e32517" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_c8715b221111b76821fae95f696" FOREIGN KEY ("id_vendedor") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_a8a0ff255844d5da75276d5c729" FOREIGN KEY ("id_cliente") REFERENCES "client"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transacao" ADD CONSTRAINT "FK_96493df12a04508f0b56cd9b82e" FOREIGN KEY ("id_venda") REFERENCES "venda"("id_venda") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transacao" ADD CONSTRAINT "FK_965bd02f76873ae12b68798e8ce" FOREIGN KEY ("id_usuario_executor") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transacao" DROP CONSTRAINT "FK_965bd02f76873ae12b68798e8ce"`);
        await queryRunner.query(`ALTER TABLE "transacao" DROP CONSTRAINT "FK_96493df12a04508f0b56cd9b82e"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_a8a0ff255844d5da75276d5c729"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_c8715b221111b76821fae95f696"`);
        await queryRunner.query(`ALTER TABLE "reembolso" DROP CONSTRAINT "FK_339f4c7be7bda1d92bb34e32517"`);
        await queryRunner.query(`DROP TABLE "relatorios"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_periodo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_tipo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relatorios_categoria_enum"`);
        await queryRunner.query(`DROP TABLE "transacao"`);
        await queryRunner.query(`DROP TYPE "public"."transacao_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transacao_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TYPE "public"."venda_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."venda_categoria_enum"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."client_estado_enum"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TYPE "public"."usuario_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."usuario_cargo_enum"`);
        await queryRunner.query(`DROP TYPE "public"."usuario_departamento_enum"`);
        await queryRunner.query(`DROP TABLE "reembolso"`);
        await queryRunner.query(`DROP TYPE "public"."reembolso_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reembolso_categoria_enum"`);
    }

}
