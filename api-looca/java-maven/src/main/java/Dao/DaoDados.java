package Dao;

import API.ApiLooca;
import Conexao.Conexao;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;
import org.springframework.jdbc.core.JdbcTemplate;

public class DaoDados {
    Looca looca = new Looca();
    Processador processador = looca.getProcessador();
    public void Insert(){

        Conexao conexao = new Conexao();
        JdbcTemplate com = conexao.getConexaoDoBanco();

        com.update("INSERT INTO Empresa(razaoSocial) VALUES(?)", processador.getFabricante() );
    }
    // quando fizer um insert:
    // inserir primeiro o nome da tabela
    // entre parentese o atributo que deseja inserir a informação
    // values e (ponto de interegação) <<< os pontos de interrogacao significa a qtd
    // de atributos
}
