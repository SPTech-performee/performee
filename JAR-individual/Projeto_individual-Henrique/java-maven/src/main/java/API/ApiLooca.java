package API;

import Dao.DaoDados;
import modelo.Componentes;
import modelo.Leituras;

import java.util.Scanner;

public class ApiLooca {
    public static void main(String[] args) {

        DaoDados dao = new DaoDados();
        Scanner leitor = new Scanner(System.in);

        Integer opcao;


        System.out.println("""
                ,-.                          .                                                  \s
                |  )                 o       |                          ,-                      \s
                |-<  ,-. ;-.-.   . , . ;-. ,-| ,-.   ,-:   ;-. ,-. ;-.  |  ,-. ;-. ;-.-. ,-. ,-.\s
                |  ) |-' | | |   |/  | | | | | | |   | |   | | |-' |    |- | | |   | | | |-' |-'\s
                `-'  `-' ' ' '   '   ' ' ' `-' `-'   `-`   |-' `-' '    |  `-' '   ' ' ' `-' `-'\s
                                                           '           -'                       \s""");
        while (true) {

            System.out.println("""
                    +-------------------------------+
                    | 1) Cadastrar componentes      |
                    | 2) Atualizar componentes      |
                    | 3) Inserir dados de leitura   |
                    | 4) Ver Componentes            |
                    | 5) Ver Leituras               |
                    | 6) Deletar Componente         |
                    | 7) Sair                       |
                    +-------------------------------+""");

            opcao = leitor.nextInt();


            switch (opcao) {
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
                            | 3) Atualizar Tudo                    |
                            | 4) Cancelar                          |
                            +--------------------------------------+""");
                            opcaoAtualizar = leitor.nextInt();

                            dao.atualizarComponete(opcaoAtualizar);
                    } while (opcaoAtualizar != 4);
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

                    Integer opcaoComponente;
                    do {
                        System.out.println("""
                            +-------------------------+
                            | Deletar Componente      |
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
                                System.out.println("Deletando CPU....");
                                dao.deletarComponentes("CPU");
                                break;
                            }
                            case 2: {
                                System.out.println("Deletando RAM....");
                                dao.deletarComponentes("RAM");
                                break;
                            }
                            case 3: {
                                System.out.println("Deletando Disco....");
                                dao.deletarComponentes("Disco");
                                break;
                            }
                            case 4: {
                                System.out.println("Deletando Rede....");
                                dao.deletarComponentes("Rede");
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

                case 7: {
                    System.out.println("""
                                       .--.         _          .-.    \s
                                      : .--'       :_;         : :     \s
                                      `. `.  .--.  .-.,-.,-. .-' : .--.\s
                                       _`, :' .; ; : :: ,. :' .; :' .; :
                                      `.__.'`.__,_;:_;:_;:_;`.__.'`.__.'
                                                                       \s""");
                    System.exit(0);
                }
                default: {
                    System.out.println("Opção inválida! digite novamente");
                }
            }
        }

    }
}

