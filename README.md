# One Contact

um aplicativo de gestão de contactos onde o utilizador pode criar sua conta, criar contactos, editar, apagar, listar, pesquisar, e adicionar aos favoritos.

Para clonar o repositório, execute o seguinte comando no terminal:

```git clone https://github.com/alfiadoDev/onecontact.git```

# Tecnologias usadas

```
NODEJS - 16.13.0
TYPESCRIPT
EXPRESSJS
BD - PostgresSql
ORM - TYPEORM
```

# Design Pattern

```S.O.L.I.D```
```
Este principio, tem como principal objectivo estruturar a nossa aplicação, de modo que cada parte tenha a sua responsabilidade, gestão de dependências externas podem ser facilmente substituidas por outras e uso de interfaces para nossos repositorios, etc.

S ⇒ SRP - Single Responsability Principle (Principio de Responsabilidade Unica)

O ⇒ OCP - Open-Closed Principle (Principio aberto/fechado)

L ⇒ LSP - Liskov Substituion Principle (Principio de Substituicao de Liskov)

I ⇒ ISP - Interface Segregation Principle (Principio de Segregacao de Interface)

D ⇒ DIP - Dependency Inversion Principle (Principio de Inversao de Dependencia)
```

## Estrutura da Aplicação

```
config: onde fica toda configuração da nossa aplicação. ex: dados para gerar um token, regras para upload de um arquivo, etc.

modules: onde ficam todos modulos da nossa aplicação. ex: usuários tudo que tem haver com usuários fica dentro desta pasta, desde criar, authenticar, atualizar, perfil, etc.

shared: onde fica todo codigo, modulos... que iremos partilhar por toda aplicação. ex: routas, server, middlewares, conexão de banco de dados, etc.
```

# Instalação

Para rodar o projecto apos clonar o repositorio pode executar os seguintes comandos na raiz do projecto:
```
yarn install
```
De seguida deve copiar o arquivo ```.env.example``` na raiz do projecto e muda o nome para ```.env``` e altera os seguintes dados:

```
APP_SECRET=secret

## DATABASE
DB_USERNAME=username
DB_PASSWORD=pass
```

De seguida deve criar um banco de dados no seu SGBD do postgresSql com o nome ```onecontact```. depois volta para a linha de comandos na raiz do projecto e digita os seguintes comandos para preparar a base de dados:

```
yarn typeorm migration:run
```

Depois executar o seguinte comando para criar um usuario de teste: ```email: teste@teste.com, password: 123456```:

```
yarn seed
```


Por fim para rodar o servidor da API basta execiutar o seguinte comando na linha de comandos na raiz do projecto:

```yarn dev:server```

# Rotas da API
A url padrão é ```http://localhost:3333```. Para teste pode usar o ```postman ou insomnia``` e todos dados devem ser enviados via JSON

## Usuários

```POST: /users``` para criar um novo usuário informando os seguintes campos: ```first_name, last_name, email e password```, tudo é texto.

## Autenticação

```POST: /sessions``` para se autenticar no API deve informar os seguintes campos: ```email e password```. Sera devolvido os dados do usuário e o token de acesso.

## Contactos

O usuário deve estar autenticado para aceder estas rotas. onde vem ```contact_id``` é o id do contacto uuid.

### Criar contacto

```POST: /contacts``` para criar um contacto informando os seguintes campos: ```name e number```. 

### Atualizar contacto

```PUT: /contacts/contact_id``` para atualizar um contacto informando os seguintes campos: ```name e number```.

### Apagar contacto

```DELETE: /contacts/contact_id``` para apagar um contacto.

### Adicionar ou Remover um contacto dos favoritos

```PATCH: /contacts/contact_id/favorite```.

### Listar todos contactos

```GET: /contacts``` para obter a lista dos seus contactos.

### Pesquisar contactos

Para pesquisar usamos a mesma rota acima, mas indicando um query param de nome ```search``` na url.

```GET: /constacts?search="pesquisa"```.
