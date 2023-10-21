package modelo;

public class Componentes {

    private  Integer idComponente;
    private String tipo;
    private String modelo;
    private Double capacidadeTotal;


    public Componentes(Integer idComponente, String tipo, String modelo, Double capacidadeTotal) {
        this.idComponente = idComponente;
        this.tipo = tipo;
        this.modelo = modelo;
        this.capacidadeTotal = capacidadeTotal;
    }


    public Componentes() {
   }

    public Integer getIdComponente() {
        return idComponente;
    }

    public void setIdComponente(Integer idComponente) {
        this.idComponente = idComponente;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Double getCapacidadeTotal() {
        return capacidadeTotal;
    }

    public void setCapacidadeTotal(Double capacidadeTotal) {
        this.capacidadeTotal = capacidadeTotal;
    }

    @Override
    public String toString() {
        if (tipo.equals("CPU")) {
            return """
                
                idComponente: %d
                Tipo: %s
                Modelo: %s
                Capacidade: %.0f nucleos lógicos
                _________________________________________________________""".formatted(idComponente, tipo, modelo, capacidadeTotal);
        }
        if (tipo.equals("RAM")) {
            return """
                
                idComponente: %d
                Tipo: %s
                Modelo: %s
                Capacidade: %.2fGB
                _________________________________________________________""".formatted(idComponente, tipo, modelo, capacidadeTotal);
        }
        if (tipo.equals("Disco")) {
            return """
                
                idComponente: %d
                Tipo: %s
                Modelo: %s
                Capacidade: %.2fGB
                _________________________________________________________""".formatted(idComponente, tipo, modelo, capacidadeTotal);
        }
        if (tipo.equals("Rede")) {
            return """
                
                idComponente: %d
                Tipo: %s
                Modelo: %s
                Capacidade: %.2fMB
                _________________________________________________________""".formatted(idComponente, tipo, modelo, capacidadeTotal);
        }
        return """
                idComponente: %d
                Tipo: %s
                Modelo: %s
                Capacidade: %.2f
                _________________________________________________________""".formatted(idComponente, tipo, modelo, capacidadeTotal);
    }
}
