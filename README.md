<h1 align="center">

<img src="https://raw.githubusercontent.com/khalleb/ignews/main/public/images/avatar.svg" alt="rocketshoes" width="200px"/>

</h1>

<h1 align="center">
    ig.News - Next.js
</h1>
<p align="center">Aplicação para inscrição de newsletter com pagamento via stripe</p>


<p align="center">
 <a href="#sobre-o-projeto">Sobre o Projeto</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#configurações-necessárias">Configurações necessárias</a> •
 <a href="#licença">Licença</a> •
 <a href="#autor">Autor</a>
</p>

## Sobre o projeto

O projeto tem como objetivo o estudo e desenvolvimento de uma aplicação em ReactJS com NextJS para listagem de posts e sistema de inscrição(subscription).

A aplicação foi desenvolvida utilizando o framework NextJS aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Site Generation (SSG), STRIPE para pagamentos das subscriptions, NextAuth para autenticação com Github, FaunaDB para armazenar as informações do usuário em um banco de dados e Prismic CMS para adição e gerenciamento do conteúdo dos posts.

O projeto foi desenvolvido como pratica das aulas do modulo 03 do [Ignite da Rocketseat](https://rocketseat.com.br/)

---

## Tecnologias

Abaixo as tecnologias utilizadas para construção da aplicação

- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Next-Auth](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

---

## Configurações necessárias

### Definindo o .env para a aplicação rodar: 
![image](https://github.com/VitorVeector/ignews/assets/67335644/9793b01b-9f30-4d38-be66-2076f39ece9d)


- Home
![Home](https://i.imgur.com/ktL1NvC.png)

```
💵 Plataforma de pagamento: STRIPE
🔒 Plataforma de Login: *OATUH*
```

- Acesso aos Posts
![Posts](https://github.com/khalleb/ignews/blob/main/.github/image-02.png?raw=true)
```
🖥 Plataforma de cadastro dos Posts: *PrismicCMS*
```

- Pagamento
![Stripe Pagamento](https://github.com/khalleb/ignews/blob/main/.github/image-04.png?raw=true)




<div style="display:flex;justify-content:space-betwen">

</div>

### **Requisitos**

Necessário realizar as instalações:

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

Criar conta e configurar os serviços externos:

- [Stripe](https://stripe.com/)
- [FaunaDB](https://fauna.com/)
- [Prismic CMS](https://prismic.io/)

*Configurações dos serviços estão localizadas no arquivo servicesConfig.md na raiz do projeto.*

### **Clone do projeto**

```bash
# Execute o comando git clone para realizar o clone do repositório
$ git clone https://github.com/vitorveector/ignews.git
# Entre na pasta do repositório clonado
$ cd ignews
```

### **Iniciando o projeto**

```bash
# Execute yarn para instalar as dependências
$ yarn

# Na raiz do projeto crie uma copia do arquivo .env.local.example
# Altere o nome da copia para .env.local
# Preencha as variáveis ambiente de acordo com as instruções
$ cp .env.local.example .env.local

# Execute stripe listen para ouvir eventos do webhook
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Para iniciar a aplicação
$ yarn dev

```

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

## Autor

Feito por Vítor Araújo 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Vitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vitor-huro-araujo/)](https://www.linkedin.com/in/vitor-hugo-araujo/)
[![Outlook Badge](https://img.shields.io/badge/-job_vitoraraujo@outlook.com-red?style=flat-square&link=mailto:job_vitoraraujo@outlook.com)](mailto:job_vitoraraujo@outlook.com)
