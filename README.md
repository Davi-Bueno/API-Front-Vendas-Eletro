

# Frontend da Aplicação de Vendas de Eletrodomésticos

Este é o frontend da aplicação de vendas de eletrodomésticos, desenvolvido em React. Ele fornece uma interface de usuário para gerenciar clientes, vendedores, eletrodomésticos, carrinhos de compras e realizar operações de venda.

## Tecnologias Utilizadas

- React
- Material-UI
- Axios
- React Router

## Estrutura do Projeto
## Estrutura do Projeto
/API Front
./public
    estrutura.txt
    favicon.ico
    index.html
    logo192.png
    logo512.png
    manifest.json
    robots.txt
./src
|   App.css
|   App.js
|   App.test.js
|   axios.js
|   estrutura.txt
|   index.css
|   index.js
|   logo.svg
|   reportWebVitals.js
|   setupTests.js
|   
+---components
|       AppAppBar.js
|       authToken.js
|       Footer.js
|       Latest.js
|       MainContent.js
|       NavBar.js
|       SitemarkIcon.js
|       ToggleColorMode.js
|       
+---containers
|       home.js
|       login.js
|       loja.js
|       
\---theme
    |   getBlogTheme.js
    |   themePrimitives.js
    |   
    +---customizations
    |       dataDisplay.js
    |       feedback.js
    |       index.js
    |       inputs.js
    |       navigation.js
    |       surfaces.js
    |       
    \---fotos
            Airfry.png
            atividade 2.png
            Cafeteira.png
            Diversos.png
            Eletros.png
            Fogao.png
            Geladeria.png
            logo eletro.jpg
            microondas.png
            Ventilador.png
           monte em estrutura readme.md


## Componentes

### AppAppBar.js
- [ ] Barra de navegação superior da aplicação
  - [ ] Logo da aplicação
  - [ ] Links de navegação
  - [ ] Botão de login/logout

### MainContent.js
- [ ] Componente principal que renderiza o conteúdo da página
  - [ ] Tabelas para exibir dados (clientes, vendedores, eletrodomésticos, carrinhos)
  - [ ] Campos de busca para cada tabela
  - [ ] Botões para criar novos itens

### Latest.js
- [ ] Exibe as últimas atualizações ou itens recentes (se aplicável)

### Footer.js
- [ ] Rodapé da aplicação com links e informações adicionais

### NavBar.js
- [ ] Barra de navegação lateral (se aplicável)
  - [ ] Navegação entre diferentes seções da aplicação

## Containers

### loja.js
- [ ] Componente principal que gerencia o estado da aplicação
  - [ ] Estados para clientes, vendedores, eletrodomésticos e carrinhos
  - [ ] Funções para CRUD de todas as entidades
  - [ ] Lógica de autenticação
  - [ ] Renderização de modais para criação/edição de itens

## Temas e Customizações

### getBlogTheme.js
- [ ] Define o tema personalizado da aplicação
  - [ ] Paleta de cores para modos claro e escuro
  - [ ] Tipografia personalizada
  - [ ] Estilos de componentes customizados

### ToggleColorMode
- [ ] Implementado no componente principal (loja.js)
  - [ ] Permite alternar entre os modos claro e escuro da aplicação

## Páginas Principais

### Página de Login de Administrador
- [ ] Acesso restrito para administradores
- [ ] Permite acesso ao painel de controle para realizar operações CRUD em todas as tabelas

### Painel de Controle do Administrador
- [ ] Interface para gerenciamento de todas as entidades (clientes, vendedores, eletrodomésticos, carrinhos)
- [ ] Tabelas com funcionalidades CRUD para cada entidade
- [ ] Filtros e buscas avançadas

### Página de Compras de Eletrodomésticos
- [ ] Exibe catálogo de eletrodomésticos disponíveis
- [ ] Permite aos clientes adicionar itens ao carrinho
- [ ] Implementa funcionalidades de filtro e busca de produtos

### Página de Cadastro de Clientes
- [ ] Formulário para novos clientes se cadastrarem
- [ ] Validação de campos e feedback em tempo real

### Interface do Carrinho de Compras
- [ ] Exibe itens adicionados ao carrinho
- [ ] Permite ajustar quantidades e remover itens
- [ ] Calcula total da compra
- [ ] Opção para finalizar a compra

## Funcionalidades Detalhadas

1. **Gerenciamento de Clientes**
   - [ ] Listar todos os clientes em uma tabela paginada
   - [ ] Modal para criar novo cliente com campos validados
   - [ ] Modal para editar cliente existente
   - [ ] Confirmação para deletar cliente
   - [ ] Campo de busca com filtragem em tempo real

2. **Gerenciamento de Vendedores**
   - [ ] Listar todos os vendedores em uma tabela paginada
   - [ ] Modal para criar novo vendedor
   - [ ] Modal para editar vendedor existente
   - [ ] Confirmação para deletar vendedor
   - [ ] Campo de busca com filtragem em tempo real

3. **Gerenciamento de Eletrodomésticos**
   - [ ] Listar todos os eletrodomésticos em uma tabela paginada
   - [ ] Modal para criar novo eletrodoméstico com campos para nome, valor e ID do vendedor
   - [ ] Modal para editar eletrodoméstico existente
   - [ ] Confirmação para deletar eletrodoméstico
   - [ ] Campo de busca com filtragem em tempo real

4. **Gerenciamento de Carrinhos**
   - [ ] Listar todos os carrinhos em uma tabela paginada
   - [ ] Modal para criar novo carrinho com campos para data de criação, ID do cliente e ID do vendedor
   - [ ] Modal para editar carrinho existente
   - [ ] Confirmação para deletar carrinho
   - [ ] Campo de busca com filtragem em tempo real

5. **Gerenciamento de CarrinhosEletro (Itens do Carrinho)**
   - [ ] Listar todos os itens de carrinhos em uma tabela paginada
   - [ ] Interface para adicionar/remover eletrodomésticos a um carrinho
   - [ ] Edição de quantidades de itens no carrinho
   - [ ] Cálculo automático de subtotais e total do carrinho

6. **Autenticação**
   - [ ] Modal de login com campos para usuário e senha
   - [ ] Armazenamento do token JWT no localStorage
   - [ ] Logout com remoção do token e redirecionamento

7. **Tema e Modo de Cor**
   - [ ] Toggle para alternar entre modo claro e escuro
   - [ ] Tema personalizado aplicado a todos os componentes Material-UI

## A Implementar na API

1. **CRUD Completo de Carrinhos**
   - [ ] Implementar endpoints para criar, ler, atualizar e deletar carrinhos
   - [ ] Incluir validações e tratamento de erros

2. **CRUD Completo de CarrinhosEletro**
   - [ ] Implementar endpoints para gerenciar itens dentro de um carrinho
   - [ ] Incluir lógica para atualizar quantidades e calcular totais

3. **Endpoint para Finalização de Compra**
   - [ ] Implementar lógica para processar a compra
   - [ ] Atualizar estoque de eletrodomésticos
   - [ ] Gerar registro de venda

4. **Melhorias na Autenticação e Autorização**
   - [ ] Implementar diferentes níveis de acesso (cliente, vendedor, administrador)
   - [ ] Adicionar tokens de refresh para melhor segurança

5. **Endpoints para Relatórios**
   - [ ] Implementar endpoints para gerar relatórios de vendas, estoque, etc.

## A Implementar no Frontend

1. **Interface para o Carrinho e CarrinhoEletro**
   - [ ] Desenvolver componentes para exibir e gerenciar itens no carrinho
   - [ ] Implementar funcionalidades de adicionar, remover e atualizar quantidades

2. **Página de Compras dos Eletrodomésticos**
   - [ ] Criar interface de catálogo de produtos
   - [ ] Implementar funcionalidades de filtro, ordenação e busca
   - [ ] Adicionar botões para adicionar itens ao carrinho

3. **Página de Cadastro dos Clientes**
   - [ ] Desenvolver formulário de cadastro com validações
   - [ ] Implementar feedback visual e mensagens de erro/sucesso

4. **Melhorias na Página de Administração**
   - [ ] Adicionar mais opções de filtro e busca avançada
   - [ ] Implementar visualização de relatórios e dashboards

5. **Implementação de Testes**
   - [ ] Adicionar testes unitários para componentes React
   - [ ] Implementar testes de integração para fluxos principais

## Comunicação com o Backend

- [ ] A comunicação com o backend é feita através do Axios
  - [ ] Instância do Axios configurada com a URL base da API
  - [ ] Interceptor para adicionar o token JWT a todas as requisições
  - [ ] Funções para todas as operações CRUD de cada entidade

## Como Executar

1. [ ] Certifique-se de que o Node.js está instalado em sua máquina
2. [ ] Navegue até o diretório do projeto frontend
3. [ ] Instale as dependências:
    ```bash
    npm install
    ```
4. [ ] Inicie a aplicação:
    ```bash
    npm start
    ```
5. [ ] A aplicação estará disponível em `http://localhost:3000` (ou outra porta, se configurada diferentemente)

## Configuração

- [ ] Configure a URL base da API no arquivo `axios.js`
- [ ] Ajuste o tema no arquivo `getBlogTheme.js` conforme necessário
- [ ] Personalize os textos e labels no arquivo de idiomas (se implementado)

## Boas Práticas Implementadas

- [ ] Uso de componentes funcionais e hooks do React
- [ ] Gerenciamento de estado centralizado no componente principal
- [ ] Separação de preocupações entre componentes de apresentação e containers
- [ ] Uso de PropTypes para validação de props
- [ ] Implementação de tratamento de erros e feedback ao usuário via Snackbars

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir mudanças maiores antes de submeter um pull request.

## Licença

[Inserir informações sobre a licença aqui]
