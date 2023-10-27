package Dao;

import Conexao.Conexao;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.group.temperatura.Temperatura;
import com.github.britooo.looca.api.util.Conversor;
import modelo.Componentes;
import modelo.Leituras;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

public class DaoDados {
    Looca looca = new Looca();
    Sistema sistema = looca.getSistema();
    Processador processador = looca.getProcessador();
    Temperatura temp = new Temperatura();
    Memoria memoria = looca.getMemoria();
    private Integer tentativas;

    public DaoDados() {
        this.tentativas = 4;
    }

    public void verificarLogin(Integer opcao, String email, String senha) {
            Conexao conexao = new Conexao();
            JdbcTemplate con = conexao.getConexaoDoBanco();


            if (tentativas.equals(1)) {
                System.out.println("Limite de tentativas atingido! tente novamente mais tarde.");
                System.exit(0);
            } else {
                switch (opcao) {
                    case 1: {
                        Integer verificacao = con.queryForObject("select count(*) from usuario where email = '" + email + "' && senha = '" + senha + "'", Integer.class);
                        if (verificacao == 0) {
                            tentativas--;
                            System.out.println("""
                                    Email ou senha inválido! Você tem %d tentativas""".formatted(tentativas));
                        } else {
                            String verificacao2 = con.queryForObject("select nome from usuario where email = '" + email + "' && senha = '" + senha + "'", String.class);
                            System.out.println("""
                                    +-------------------------------+
                                    | Bem vindo! %s""".formatted(verificacao2));
                            executar();
                        }
                        break;
                    }
                    case 2: {
                        Integer verificacao = con.queryForObject("select count(*) from administrador where email = '" + email + "' && senha = '" + senha + "'", Integer.class);
                        if (verificacao == 0) {
                            tentativas--;
                            System.out.println("""
                                    Email ou senha inválido! Você tem %d tentativas""".formatted(tentativas));
                        } else {
                            String verificacao2 = con.queryForObject("select nome from administrador where email = '" + email + "' && senha = '" + senha + "'", String.class);
                            System.out.println("""
                                    +-------------------------------+
                                    | Bem vindo! %s""".formatted(verificacao2));
                            executar();
                        }
                        break;
                    }
                }
            }
        }

        public void executar() {
            Integer opcao;


            while (true) {
                DaoDados dao = new DaoDados();
                Scanner leitor = new Scanner(System.in);

                System.out.println("""
                    +-------------------------------+
                    | 1) Cadastrar componentes      |
                    | 2) Atualizar componentes      |
                    | 3) Inserir dados de leitura   |
                    | 4) Ver Componentes            |
                    | 5) Ver Leituras               |
                    | 6) Sair                       |
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


    public void inserirComponente() {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();


        Integer count = con.queryForObject("SELECT COUNT(*) FROM Componente", Integer.class);

        if (count != 0) {
            System.out.println("""
                    Já existe %d componentes cadastrado!""".formatted(count));
        } else {
            switch (1) {
                case 1: {
                    String modelo = processador.getNome();
                    double capacidadeTotal = processador.getNumeroCpusLogicas();

                    Integer fkServidor = 000000001;

                    System.out.println("Salvando dados da CPU....");
                    con.update("insert into Componente(tipo, modelo, capacidadeTotal, fkMedida, fkEmpresa, fkDataCenter, fkServidor) values (?,?,ROUND(?, 2),?,?,?,?)", "CPU", modelo, capacidadeTotal, 1, 1, 1, fkServidor);

                }
                case 2: {
                    String modelo = "Memoria RAM";                  //divide bytes em gb
                    Double capacidadeTotal = (memoria.getTotal() / 1073741824.0);
                    Integer fkServidor = 000000001;

                    System.out.println("Salvando dados da RAM....");
                    con.update("insert into Componente(tipo, modelo, capacidadeTotal, fkMedida, fkEmpresa, fkDataCenter, fkServidor) values (?,?,ROUND(?, 2),?,?,?,?)", "RAM", modelo, capacidadeTotal, 3, 1, 1, fkServidor);

                }
                case 3: {

                    String modelo;
                    Double capacidadeTotal;
                    Integer fkServidor = 000000001;

                    //Criação do gerenciador
                    DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();

                    //Obtendo lista de discos a partir do getter
                    List<Disco> discos = grupoDeDiscos.getDiscos();
                    System.out.println("Salvando dados do disco....");
                    for (Disco disco : discos) {
                        modelo = disco.getModelo();            //divide bytes em gb
                        capacidadeTotal = disco.getTamanho() / 1073741824.0;
                        con.update("insert into Componente(tipo, modelo, capacidadeTotal, fkMedida, fkEmpresa, fkDataCenter, fkServidor) values (?,?,ROUND(?, 2),?,?,?,?)", "Disco", modelo, capacidadeTotal, 3, 1, 1, fkServidor);
                    }

                }
                case 4: {
                    String modelo;
                    Double capacidadeTotal;
                    Integer fkServidor = 000000001;

                    //Criação do gerenciador
                    RedeInterfaceGroup grupoDeDiscos = looca.getRede().getGrupoDeInterfaces();

                    //Obtendo lista de rede a partir do getter
                    List<RedeInterface> discos = grupoDeDiscos.getInterfaces();

                    System.out.println("Salvando dados da rede....");
                    for (RedeInterface rede : discos) {
                        modelo = rede.getNomeExibicao();             //bytes em mb
                        capacidadeTotal = (rede.getBytesEnviados() / 1048576.0) + (rede.getBytesRecebidos() / 1048576.0);
                        con.update("insert into Componente(tipo, modelo, capacidadeTotal, fkMedida, fkEmpresa, fkDataCenter, fkServidor) values (?,?,ROUND(?, 2),?,?,?,?)", "Rede", modelo, capacidadeTotal, 4, 1, 1, fkServidor);
                    }
                }
            }
            System.out.println("Dados enviado com sucesso!");
        }
    }
    public void atualizarComponete(Integer opcao) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        switch (opcao) {
            case 1: {
                String modelo = processador.getNome();
                double capacidadeTotal = processador.getNumeroCpusLogicas();

                System.out.println("Atualizando dados da CPU....");
                con.update("update Componente set modelo = ?, capacidadeTotal = ? where idComponente = 1", modelo, capacidadeTotal);
                break;
            }
            case 2: {
                String modelo = "Memoria RAM";                  //divide bytes em gb
                Double capacidadeTotal = (memoria.getTotal() / 1073741824.0);

                System.out.println("Atualizando dados da RAM....");
                con.update("update Componente set modelo = ?, capacidadeTotal = ROUND(?, 2) where idComponente = 2", modelo, capacidadeTotal);
                break;
            }
            case 3: {

                con.execute("truncate table Leitura");
                con.execute("SET FOREIGN_KEY_CHECKS = 0");
                con.execute("truncate table Componente");
                con.execute("SET FOREIGN_KEY_CHECKS = 1");

                inserirComponente();
                break;
            }
            case 4: {
                System.out.println("Voltando para o inicio...");
                break;
            }
            default: {
                System.out.println("Opção inválida! digite novamente");
            }
        }
    }
    public void inserirLeitura (Integer opcao) {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();
        Integer fkServidor = 000000001;

        switch (opcao) {
            case 1: {
                Double emUso = processador.getUso();
                String tempoAtivdade = Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade());
                Double temperatura = temp.getTemperatura();
                Double frequencia = (double) processador.getFrequencia() / 1000000000.0;

                con.update("insert into Leitura(dataLeitura, emUso, TempoAtividade, temperatura, frequencia, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values (now(),ROUND(?, 2),?,?,?,?,?,?,?)", emUso, tempoAtivdade, temperatura, frequencia, 1, 1, fkServidor, 1);
                break;
            }
            case 2: {
                Double emUso = memoria.getEmUso() / 1073741824.0;
                String tempoAtivdade = Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade());
                Double temperatura = null;
                Double frequencia = null;

                con.update("insert into Leitura(dataLeitura, emUso, TempoAtividade, temperatura, frequencia, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values (now(),ROUND(?, 2),?,?,?,?,?,?,?)", emUso, tempoAtivdade, temperatura, frequencia, 1, 1, fkServidor, 2);
                break;
            }
            case 3: {
                Scanner leitor = new Scanner(System.in);
                Integer discoEscolhido;

                String disco = con.query("select * from Componente where tipo = 'Disco'",
                        new BeanPropertyRowMapper<>(Componentes.class)).toString();

                System.out.println(disco);

                System.out.println("Digite o id do disco desejado:");
                discoEscolhido = leitor.nextInt();

                //Criação do gerenciador
                DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();

                //Obtendo lista de discos a partir do getter
                List<Disco> discos = grupoDeDiscos.getDiscos();

                String query = "select modelo from Componente where idComponente = ?";
                String discoIdResult = con.queryForObject(query, String.class, discoEscolhido);


                for (Disco arm : discos){
                    if (arm.getModelo().equals(discoIdResult)) {
                        Double emUso = null;
                        String tempoAtivdade = Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade());
                                                                            //bytes em mb
                        Double velocidadeLeitura = arm.getBytesDeLeitura() / 1048576.0;
                        Double velocidadeEscrita = arm.getBytesDeEscritas() / 1048576.0;


                        con.update("insert into Leitura(dataLeitura, emUso, TempoAtividade, velocidadeLeitura, velocidadeEscrita, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values (now(),ROUND(?, 2),?,ROUND(?, 2),ROUND(?, 2),?,?,?,?)", emUso, tempoAtivdade, velocidadeLeitura, velocidadeEscrita, 1, 1, fkServidor, discoEscolhido);
                        break;
                    }
                }
                System.out.println("Enviando dados do disco....");
                break;
            }
            case 4: {
                Scanner leitor = new Scanner(System.in);
                Integer redeEscolhida;

                String redes = con.query("select * from Componente where tipo = 'Rede'",
                        new BeanPropertyRowMapper<>(Componentes.class)).toString();

                System.out.println(redes);

                System.out.println("Digite o id da rede desejada:");
                redeEscolhida = leitor.nextInt();

                //Criação do gerenciador
                RedeInterfaceGroup grupoDeDiscos = looca.getRede().getGrupoDeInterfaces();

                //Obtendo lista de discos a partir do getter
                List<RedeInterface> discos = grupoDeDiscos.getInterfaces();


                String query = "select modelo from Componente where idComponente = ?";
                String discoIdResult = con.queryForObject(query, String.class, redeEscolhida);


                for (RedeInterface rede : discos){
                    if (rede.getNomeExibicao().equals(discoIdResult)) {
                        Double emUso = null;
                        String tempoAtivdade = Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade());
                                                                        //bytes em mb
                        Double upload = rede.getBytesEnviados() / 1048576.0;
                        Double download = rede.getBytesRecebidos() / 1048576.0;


                        con.update("insert into Leitura(dataLeitura, emUso, TempoAtividade, upload, download, fkEmpresa, fkDataCenter, fkServidor, fkComponente) values (now(),ROUND(?, 2),?,ROUND(?, 2),ROUND(?, 2),?,?,?,?)", emUso, tempoAtivdade, upload, download, 1, 1, fkServidor, redeEscolhida);
                        break;
                    }
                }
                System.out.println("Enviando dados da rede....");
                break;
            }
        }
    }
    public List <Componentes> exibirComponentes() {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();

        return con.query("select * from Componente",
                new BeanPropertyRowMapper<>(Componentes.class));
    }
    public List <Leituras> exibirLeituras() {
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();



        return con.query("select * from Leitura join Componente on idComponente = fkComponente",
                new BeanPropertyRowMapper<>(Leituras.class));
    }

    public Integer getTentativas() {
        return tentativas;
    }

    public void setTentativas(Integer tentativas) {
        this.tentativas = tentativas;
    }
}

