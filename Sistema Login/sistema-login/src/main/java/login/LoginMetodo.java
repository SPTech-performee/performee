package login;

import java.util.Scanner;

public class LoginMetodo {

    Scanner leitor = new Scanner(System.in);

    void receberDados(){
        System.out.println("Olá!!! Seja bem-vindo(a) a Performee.");
        System.out.println("-------------------------------------");
        System.out.println("Insira seu nome:");
        String nome = leitor.next();
        System.out.println("Insira seu email:");
        String email = leitor.next();
        System.out.println("Insira sua senha:");
        String senha = leitor.next();
        validarLogin(nome, email, senha);
    }
    void validarLogin(String nome, String email, String senha){
        if(email.equals("admin@admin") && senha.equals("admin123")) {
            System.out.println(String.format("Olá %s seja bem-vindo(a)!",nome));
        }else {
            System.out.println("Login inválido");
        }
    }
}
