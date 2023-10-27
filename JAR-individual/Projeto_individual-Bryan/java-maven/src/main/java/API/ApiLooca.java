package API;

import Dao.DaoDados;
import modelo.Componentes;
import modelo.Leituras;

import java.util.Scanner;

public class ApiLooca {
    public static void main(String[] args) {

        DaoDados dao = new DaoDados();
        Scanner leitor = new Scanner(System.in);
        Scanner leitorString = new Scanner(System.in);

        Integer opcaoLogin;
        do {
            System.out.println("""
                +-------------------------------+
                |   Login Performee.            |""");

            System.out.println("""
                    +-------------------------------+
                    | 1) Login Como Usuário         |
                    | 2) Login Como Admin           |
                    | 3) Sair                       |
                    +-------------------------------+""");
            opcaoLogin = leitor.nextInt();

            switch (opcaoLogin) {
                case 1: {
                    System.out.println("Digite o email:");
                    String email = leitorString.nextLine();

                    System.out.println("digite a senha:");
                    String senha = leitorString.nextLine();

                    dao.verificarLogin(opcaoLogin, email, senha);
                    break;
                }
                case 2: {
                    System.out.println("Digite o email:");
                    String email = leitorString.nextLine();

                    System.out.println("digite a senha:");
                    String senha = leitorString.nextLine();

                    dao.verificarLogin(opcaoLogin, email, senha);
                    break;
                }
                case 3: {
                    System.out.println("Saindo...");
                    System.exit(0);
                }
                default: {
                    System.out.println("Opção inválida!");
                }
            }

        } while (!opcaoLogin.equals(3) || dao.getTentativas().equals(0));

    }
}

