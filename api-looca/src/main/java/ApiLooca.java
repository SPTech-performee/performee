import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.sistema.Sistema;
// importação dos objetos para captar as informações


import java.util.List;

public class ApiLooca {
    public static <DiscoGrupo> void main(String[] args) {

        Looca looca = new Looca();

        Sistema sistema = looca.getSistema();


        System.out.println(sistema);


        DiscoGrupo grupoDeDiscos = (DiscoGrupo) looca.getGrupoDeDiscos();

        //Obtendo lista de discos a partir do getter
        List<Disco> discos = ((com.github.britooo.looca.api.group.discos.DiscoGrupo) grupoDeDiscos).getDiscos();

        for (Disco disco : discos) {
            System.out.println(disco);
        }



    }
}
