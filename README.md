# Sturdy Invention

Projeto que possui a intenção de ser uma forma de estudo sobre NodeJs e TypeScript, feito utilizando como base o [Adonis.js](https://adonisjs.com/) atendendo as seguintes regras de negócio:

- Deve ser possível criar, atualizar, visualizar e remover Clientes
  - O cadastro dos clientes deve conter apenas seu nome e endereço de e-mail
  - Um cliente não pode se registrar duas vezes com o mesmo endereço de e-mail
- Cada cliente só deverá ter uma única lista de produtos favoritos
- Em uma lista de produtos favoritos podem existir uma quantidade ilimitada de produtos
  - Um produto não pode ser adicionado em uma lista caso ele não exista
  - Um produto não pode estar duplicado na lista de produtos favoritos de um cliente
- Um produto possui o seguinte modelo de dados
  - `price`: preço do produto
  - `image`: URL da imagem do produto
  - `brand`: marca do produto
  - `id`: id do produto
  - `title`: nome do produto
  - `reviewScore`: média dos reviews para este produto
- O dispositivo que irá renderizar a resposta fornecida por essa nova API irá apresentar o Título, Imagem, Preço e irá utilizar o ID do produto para formatar o link que ele irá acessar. Quando existir um review para o produto, o mesmo será exibido por este dispositivo.
- O acesso à api deve ser aberto ao mundo, porém deve possuir autenticação e autorização.

## Documentação

A documentação com todas as rotas disponíveis e seus respectivos payloads pode ser encontrado no seguinte link: <https://documenter.getpostman.com/view/1314133/TzsYM97h>

## Requisitos

- NodeJS 14
- Yarn
- MySQL

## Como executar

Para realizar a instalação e posterior execução do projeto vai precisar ter instalado em sua máquina os requisitos acima, e posteriormente executar os seguintes comandos de configuração:

```bash
# Alterar as conexões para o banco de dados que estiver utilizando
cp .env.example .env
yarn

# Criação das tabelas do banco de dados
node ace migration:run

# Vai carregar os produtos a partir da Factory
node ace db:seed -f database/seeders/Product.ts

# Vai executar o servidor na porta 3333 ou a configurada dentro do .env
node ace serve
```

## Security

If you discover any security related issues, please email vitorhugo.ro10@gmail.com instead of using the issue tracker.

## Credits

- [Vitor Merencio](https://github.com/vitorhugoro1)

## License

The GNU GENERAL PUBLIC LICENSE (GNU). Please see [License File](LICENSE.md) for more information.
