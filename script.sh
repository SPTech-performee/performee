#!/bin/bash

# Verifica a versão atual do Java
java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')

if [ $? -eq 0 ]; then
    
    dpkg --compare-versions "$java_version" lt "17" && update_java=true || update_java=false

    if [ "$update_java" = true ]; then
        echo "Java já está instalado: $java_version"
        echo "Gostaria de atualizar o Java? [s/n]"
        read get 
        if [ "$get" == "s" ]; then
            echo "Atualizando o JDK para a versão 17..."
            sudo apt update
            sudo apt install openjdk-17-jre -y
        else
            echo "Você optou por não atualizar o Java."
        fi
    else
        echo "Java já está na versão 17 ou superior."
    fi
else
    echo "Java não está instalado."
    echo "Gostaria de instalar o Java? [s/n]"
    read get # Variável que guarda a resposta do usuário

    if [ "$get" == "s" ]; then
        echo "Instalando o JDK versão 17..."
        sudo apt update
        sudo apt install openjdk-17-jre -y
    else
        echo "Você optou por não instalar o Java."
    fi
fi
