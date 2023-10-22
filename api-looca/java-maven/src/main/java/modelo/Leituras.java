package modelo;


import java.time.LocalDateTime;

public class Leituras {

    private Integer idLeitura;

    private String tipo;
    private LocalDateTime dataLeitura;
    private Double emUso;
    private String tempoAtividade;
    private Double temperatura;
    private Double frequencia;
    private Double upload;
    private Double download;
    private Double velocidadeLeitura;
    private Double velocidadeEscrita;
    private Integer fkComponente;

    public Leituras() {
    }

    public Integer getIdLeitura() {
        return idLeitura;
    }

    public void setIdLeitura(Integer idLeitura) {
        this.idLeitura = idLeitura;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getDataLeitura() {
        return dataLeitura;
    }

    public void setDataLeitura(LocalDateTime dataLeitura) {
        this.dataLeitura = dataLeitura;
    }

    public Double getEmUso() {
        return emUso;
    }

    public void setEmUso(Double emUso) {
        this.emUso = emUso;
    }

    public String getTempoAtividade() {
        return tempoAtividade;
    }

    public void setTempoAtividade(String tempoAtividade) {
        this.tempoAtividade = tempoAtividade;
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Double temperatura) {
        this.temperatura = temperatura;
    }

    public Double getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(Double frequencia) {
        this.frequencia = frequencia;
    }

    public Double getUpload() {
        return upload;
    }

    public void setUpload(Double upload) {
        this.upload = upload;
    }

    public Double getDownload() {
        return download;
    }

    public void setDownload(Double download) {
        this.download = download;
    }

    public Double getVelocidadeLeitura() {
        return velocidadeLeitura;
    }

    public void setVelocidadeLeitura(Double velocidadeLeitura) {
        this.velocidadeLeitura = velocidadeLeitura;
    }

    public Double getVelocidadeEscrita() {
        return velocidadeEscrita;
    }

    public void setVelocidadeEscrita(Double velocidadeEscrita) {
        this.velocidadeEscrita = velocidadeEscrita;
    }

    public Integer getFkComponente() {
        return fkComponente;
    }

    public void setFkComponente(Integer fkComponente) {
        this.fkComponente = fkComponente;
    }

    @Override
    public String toString() {

        if (tipo.equals("CPU")) {
            return """
                idLeitura: %d
                tipo: %s
                dataLeitura: %s
                emUso: %.2f%%
                tempoAtv: %s
                temperatura: %.2f°C
                frequencia: %.2fGHz
                fkComponente: %d""".formatted(idLeitura, tipo, dataLeitura, emUso, tempoAtividade, temperatura, frequencia, fkComponente);
        }
        if (tipo.equals("RAM")) {
            return """
                idLeitura: %d
                tipo: %s
                dataLeitura: %s
                emUso: %.2fGB
                tempoAtv: %s
                fkComponente: %d""".formatted(idLeitura, tipo, dataLeitura, emUso, tempoAtividade, fkComponente);

        }
        if (tipo.equals("Disco")) {
            return """
                idLeitura: %d
                tipo: %s
                dataLeitura: %s
                tempoAtv: %s
                velocidadeLeitura: %.2fMBs
                velocidadeEscrita: %.2fMBs
                fkComponente: %d""".formatted(idLeitura, tipo, dataLeitura, tempoAtividade, velocidadeLeitura, velocidadeEscrita, fkComponente);
        }
        if (tipo.equals("Rede")) {
            return """
                idLeitura: %d
                tipo: %s
                dataLeitura: %s
                tempoAtv: %s
                upload: %.2fMBs
                download: %.2fMBs
                fkComponente: %d""".formatted(idLeitura, tipo, dataLeitura, tempoAtividade, upload, download, fkComponente);
        }
       return null;
    }
}
