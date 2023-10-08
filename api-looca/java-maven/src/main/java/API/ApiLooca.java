package API;

import Conexao.Conexao;
import Dao.DaoDados;
import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import com.github.britooo.looca.api.group.rede.RedeParametros;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.group.temperatura.Temperatura;

import java.util.List;

public class ApiLooca {
    public static void main(String[] args) {

        Looca looca = new Looca();
        DaoDados dao = new DaoDados();
        dao.Insert();

        // Instanciando os objetos dos componentes
        Sistema sistema = looca.getSistema();

        Processador processador = looca.getProcessador();

        Memoria memoria = looca.getMemoria();

        DiscoGrupo grupoDeDiscos;
        grupoDeDiscos = looca.getGrupoDeDiscos();

        Temperatura temperatura = looca.getTemperatura();

        RedeParametros redeParametros = looca.getRede().getParametros();

        RedeInterfaceGroup grupoRede;
        grupoRede = looca.getRede().getGrupoDeInterfaces();

        grupoRede.getInterfaces();

        Rede rede = looca.getRede();

        ProcessoGrupo processos = looca.getGrupoDeProcessos();
        /////////////////////////////////////////////

        //Puxando os dados dos componentes de forma especifica e jogando para o banco
        Conexao conexao = new Conexao();

        //Obtendo lista de discos a partir do getter
        List<Disco> discos = grupoDeDiscos.getDiscos();

        // prints dos componentes
        System.out.println("DISCOS");
        for (Disco disco : discos) {
            System.out.println(disco); }

        System.out.println("SISTEMA");
        System.out.println(sistema);

        System.out.println("PROCESSADOR");
        System.out.println(processador);

        System.out.println("MEMORIA");
        System.out.println(memoria);

        System.out.println("TEMPERATURA");
        System.out.println(temperatura);

        System.out.println("PROCESSOS");
        System.out.println(processos);

        System.out.println("PARAMETROS REDE");
        System.out.println(redeParametros);

        System.out.println("GRUPO DE REDES");
        System.out.println(grupoRede);

        System.out.println("REDE");
        System.out.println(rede);


    }
}
