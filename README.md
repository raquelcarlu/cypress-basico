# Projeto de Automação de Testes com Cypress

Este repositório contém testes automatizados utilizando Cypress desenvolvidos no curso [Cypress Básico V2](https://www.udemy.com/course/testes-automatizados-com-cypress-basico/) do instrutor Walmyr Filho.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados e configurados em seu ambiente:

- Node.js (nodejs -v: v12.22.9)
- npm (Node Package Manager)
- [Cypress](https://www.cypress.io/) (será instalado como dependência de desenvolvimento)

## Instalação das Dependências

Para instalar as dependências do projeto, siga os passos abaixo:

1. Clone este repositório para o seu ambiente local

2. Navegue até o diretório do projeto:

    ```bash
   cd cypress-basico-v2

3. Instale as dependencias do projeto usando npm:
    
    ```bash
    npm install

## Rodando os Testes

Para executar os testes simulando um ambiente desktop ou mobile viewport utilizando Cypress, siga os passos abaixo:

### Desktop

Execute `npm test` (ou `npm t` para a versão resumida) para rodar o teste no modo headless simulando um ambiente desktop.

Ou execute `npm run cy:open` para abrir o Cypress no modo interativo.

### Mobile

Execute `npm run test:mobile` para rodar o teste no modo headless simulando um ambiente mobile.

Ou execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo em um mobile viewport.


## Outras Informações

Os testes estão localizados no diretório cypress/integration.

Para mais informações sobre o Cypress, consulte a [documentação oficial do Cypress](https://docs.cypress.io/guides/overview/why-cypress).