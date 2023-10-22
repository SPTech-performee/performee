package API;

import Dao.DaoDados;
import modelo.Componentes;
import modelo.Leituras;

import java.util.Scanner;

public class ApiLooca {
    public static void main(String[] args) {

        DaoDados dao = new DaoDados();
        Scanner leitor = new Scanner(System.in);

        Integer opção;


        System.out.println("""
                +-------------------------------+
                |   Bem vindo ao performee.     |""");
        while (true) {

            System.out.println("""
                    +-------------------------------+
                    | 1) Cadastrar componentes      |
                    | 2) Atualizar componentes      |
                    | 3) Inserir dados de leitura   |
                    | 4) Ver Componentes            |
                    | 5) Ver Leituras               |
                    | 6) Sair                       |
                    +-------------------------------+""");

            opção = leitor.nextInt();


            switch (opção) {
                case 1: {
                    dao.inserirComponente();
                    break;
                }
                case 2: {
                    Integer opcaoAtualizar;
                    do {
                            System.out.println("""
                            +--------------------------------------+
                            | Qual componente deseja atualizar?    |
                            +--------------------------------------+
                            | 1) Atualizar CPU                     |
                            | 2) Atualizar RAM                     |
                            | 3) Atualizar Disco                   |
                            | 4) Atualizar Rede                    |
                            | 5) Cancelar                          |
                            +--------------------------------------+""");
                            opcaoAtualizar = leitor.nextInt();

                            dao.atualizarComponete(opcaoAtualizar);
                    } while (opcaoAtualizar != 5);
                    break;
                }
                case 3: {
                    Integer opcaoComponente;
                    do {
                        System.out.println("""
                            +-------------------------+
                            | Enviar dados Leitura    |
                            +-------------------------+
                            | 1) CPU                  |
                            | 2) RAM                  |
                            | 3) Disco                |
                            | 4) Rede                 |
                            | 5) Voltar               |
                            +-------------------------+""");

                        opcaoComponente = leitor.nextInt();

                        switch (opcaoComponente) {
                            case 1: {
                                System.out.println("Enviando dados da CPU....");
                                dao.inserirLeitura(1);
                                break;
                            }
                            case 2: {
                                System.out.println("Enviando dados da RAM....");
                                dao.inserirLeitura(2);
                                break;
                            }
                            case 3: {
                                dao.inserirLeitura(3);
                                break;
                            }
                            case 4: {
                                dao.inserirLeitura(4);
                                break;
                            }
                            case 5: {
                                System.out.println("Voltando para o inicio...");
                                break;
                            }
                            default: {
                                System.out.println("Opção inválida! digite novamente");
                                break;
                            }
                        }
                    } while (opcaoComponente != 5);
                    break;
                }
                case 4: {
                    System.out.println("""
                            +----------------------------+
                            | Componentes:               |
                            +----------------------------+""");
                    for (Componentes comp : dao.exibirComponentes()) {
                        System.out.println(comp);
                    }
                    break;
                }
                case 5: {
                    System.out.println("""
                            +----------------------------+
                            | Leituras:                  |
                            +----------------------------+""");
                    for (Leituras leit : dao.exibirLeituras()) {
                        System.out.println("-".repeat(30));
                        System.out.println(leit);
                    }
                    break;
                }
                case 6: {
                    System.out.println("""
                            Saindo...""");
                    System.exit(0);
                }
                default: {
                    System.out.println("Opção inválida! digite novamente");
                }
            }
        }

    }
}

