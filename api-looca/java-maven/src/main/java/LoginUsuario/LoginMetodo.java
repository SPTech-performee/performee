package LoginUsuario;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LoginMetodo {
    Scanner leitor = new Scanner(System.in);
    List<String> listaEmailAdmins = new ArrayList();
    List<String> listaSenhaAdmins = new ArrayList();
    List<String> listaEmailEmp = new ArrayList();
    List<String> listaSenhaEmp = new ArrayList();
    List<String> listaEmailFunc = new ArrayList();
    List<String> listaSenhaFunc = new ArrayList();

    Integer tentativas = 4;
    Integer opcao;
    Boolean validacaoLogin = false;

    void cadastrarAdmins() {

        listaEmailAdmins.add("bryan@admin");
        listaSenhaAdmins.add("adminbryan");
        listaEmailAdmins.add("guilherme@admin");
        listaSenhaAdmins.add("adminguilherme");
        listaEmailAdmins.add("thais@admin");
        listaSenhaAdmins.add("adminthais");
        listaEmailAdmins.add("henrique@admin");
        listaSenhaAdmins.add("adminhenrique");
        listaEmailAdmins.add("luigi@admin");
        listaSenhaAdmins.add("adminluigi");
        listaEmailAdmins.add("jordana@admin");
        listaSenhaAdmins.add("adminjordana");

    }

    void cadastrarEmp() {

        listaEmailEmp.add("amazon@amazon");
        listaSenhaEmp.add("amazon123");
        listaEmailEmp.add("shopee@shopee");
        listaSenhaEmp.add("shopee123");
        listaEmailEmp.add("americanas@americanas");
        listaSenhaEmp.add("americanas123");
    }

    void cadastrarFunc() {

        listaEmailFunc.add("roberto@gmail.com");
        listaSenhaFunc.add("roberto123");
        listaEmailFunc.add("mario@gmail.com");
        listaSenhaFunc.add("mario123");
        listaEmailFunc.add("carlos@gmail.com");
        listaSenhaFunc.add("carlos123");

    }

    void linhas() {

        System.out.println("---------------------------------------------");
    }

    void receberDados() {

        cadastrarAdmins();
        cadastrarEmp();
        cadastrarFunc();
        linhas();

        System.out.println("|   Olá! Seja bem-vindo(a) a Performee.   |");
        linhas();

        do {
            System.out.println("""
                    | Fazer login como:                         |
                    | 1 - Administrador                         |
                    | 2 - Empresa                               |
                    | 3 - Funcionário                           |
                    | 0 - Sair                                  |""");
            linhas();
            System.out.print("Opção: ");
            opcao = leitor.nextInt();

            if (opcao >= 1 && opcao <= 3) {
                System.out.print("Insira o nome: ");
                String nome = leitor.next();

                do {
                    System.out.print("Insira seu email: ");
                    String email = leitor.next();

                    System.out.print("Insira sua senha: ");
                    String senha = leitor.next();

                    validarLogin(nome, email, senha);

                } while (!tentativas.equals(0));
            } else if (opcao < 0 || opcao > 3){
                System.out.println("Opção Inválida! Digite novamente");
                linhas();
            }

        } while (!opcao.equals(0));

    }

    void validarLogin(String nome, String email, String senha) {
        switch (opcao) {
            case 1: {
                for (int i = 0; i < listaEmailAdmins.size(); i++) {
                    while (i < listaSenhaAdmins.size()) {

                        if (email.equals(listaEmailAdmins.get(i)) && senha.equals(listaSenhaAdmins.get(i))) {

                            validacaoLogin = true;
                            break;
                        }
                        i++;
                    }
                }
                if (validacaoLogin.equals(true)) {
                    tentativas = 0;
                    opcao = 0;
                    linhas();
                    System.out.println("       Bem-Vindo(a) novamente, " + nome);
                    linhas();
                    System.out.println("""
                            | O que deseja?                             |
                            | 1 - Cadastrar Empresa                     |
                            | 2 - Cadastrar Datacenters                 |
                            | 3 - Cadastrar Servidores                  |
                            | 4 - Monitorar Desempenho                  |
                            | 5 - DashBoard                             |
                            | 6 - Alertas                               |
                            | 7 - Editar/Alterar                        |
                            | 8 - Deletar                               |
                            | 9 - Log de Eventos                        |
                            | 0 - Logout                                |""");
                    linhas();

                } else {

                    tentativas--;

                    if (tentativas.equals(0)) {
                        opcao = 0;
                        linhas();
                        System.out.println("""
                                |         Login ou senha INVÁLIDOS!         |
                                |          Acabou suas tentativas,          |
                                |        tente novamente mais tarde.        |""");
                        linhas();

                    } else {
                        linhas();
                        System.out.println("""
                                |         Login ou senha inválidos!         |
                                |           Você tem %d tentativa            |""".formatted(tentativas));
                        linhas();
                    }

                }
                break;
            }
            case 2: {
                for (int i = 0; i < listaEmailEmp.size(); i++) {
                    while (i < listaSenhaEmp.size()) {
                        if (email.equals(listaEmailEmp.get(i)) && senha.equals(listaSenhaEmp.get(i))) {
                            validacaoLogin = true;
                            break;
                        }
                        i++;
                    }
                }
                if (validacaoLogin.equals(true)) {
                    opcao = 0;
                    tentativas = 0;
                    linhas();
                    System.out.println("       Bem-Vindo(a) novamente, " + nome);
                    linhas();
                    System.out.println("""
                            | O que deseja?                             |
                            | 1 - Cadastrar Funcionário                 |
                            | 2 - Monitorar Desempenho                  |
                            | 3 - DashBoard                             |
                            | 4 - Alertas                               |
                            | 5 - Enviar Diagnósticos                   |
                            | 6 - Excluir funcionários                  |
                            | 0 - Logout                                |""");
                    linhas();

                } else {

                    tentativas--;

                    if (tentativas.equals(0)) {
                        opcao = 0;
                        linhas();
                        System.out.println("""
                                |         Login ou senha INVÁLIDOS!         |
                                |          Acabou suas tentativas,          |
                                |        tente novamente mais tarde.        |""");
                        linhas();

                    } else {
                        linhas();
                        System.out.println("""
                                |         Login ou senha inválidos!         |
                                |           Você tem %d tentativa            |""".formatted(tentativas));
                        linhas();
                    }

                }
                break;
            }
            case 3: {
                for (int i = 0; i < listaEmailFunc.size(); i++) {
                    while (i < listaSenhaFunc.size()) {
                        if (email.equals(listaEmailFunc.get(i)) && senha.equals(listaSenhaFunc.get(i))) {
                            validacaoLogin = true;
                            break;
                        }
                        i++;
                    }
                }
                if (validacaoLogin.equals(true)) {
                    opcao = 0;
                    tentativas = 0;
                    linhas();
                    System.out.println("       Bem-Vindo(a) novamente, " + nome);
                    linhas();
                    System.out.println("""
                            | O que deseja?                             |
                            | 1 - Monitorar Desempenho                  |
                            | 2 - DashBoards                             |
                            | 3 - Alertas                               |
                            | 4 - Enviar Diagnósticos                   |
                            | 0 - Logout                                |""");
                    linhas();

                } else {
                    tentativas--;
                    if (tentativas.equals(0)) {
                        opcao = 0;
                        linhas();
                        System.out.println("""
                                |         Login ou senha INVÁLIDOS!         |
                                |          Acabou suas tentativas,          |
                                |        tente novamente mais tarde.        |""");
                        linhas();

                    } else {
                        linhas();
                        System.out.println("""
                                |         Login ou senha inválidos!         |
                                |           Você tem %d tentativa            |""".formatted(tentativas));
                        linhas();
                    }

                }
                break;
            }
        }
    }
}
