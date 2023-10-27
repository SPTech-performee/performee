package Conexao;

import com.mysql.cj.jdbc.JdbcConnection;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
    private JdbcTemplate conexaoDoBanco;

        public Conexao() {
            BasicDataSource dataSource = new BasicDataSource();

            // com.mysql.cj.jdbc.Driver <- EXEMPLO PARA MYSQL

            dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");

            //  jdbc:mysql://localhost:3306/mydb <- EXEMPLO PARA MYSQL

            dataSource.setUrl("jdbc:mysql://localhost:3306/performee");
            dataSource.setUsername("root");
            dataSource.setPassword("sptech");

            conexaoDoBanco = new JdbcTemplate(dataSource);
        }
        public  JdbcTemplate getConexaoDoBanco() {
            return conexaoDoBanco;
        }

        // nessa etapa se cria a conexão com o banco
    }

