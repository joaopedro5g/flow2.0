# Flow Podcast 2.0 🎙️

Bem-vindo à versão **2.0** do projeto **Flow Podcast**, esse projeto tem o objetivo de apenas mostrar a minha evolução na programação, e não tem nenhum vinculo com o [Flow Podcast](https://nv99.com.br).
Este projeto começou como uma brincadeira para aprender **NodeJS** e **NextJS**, e agora foi reconstruído usando tecnologias modernas, como **NestJS**, **NextJS 14**, **TypeScript**, **Rust** e **Docker**.

O objetivo continua o mesmo criar uma plataforma de streaming de áudio com um SDK robusto para integração com dispositivos de terceiros, mas agora com uma arquitetura mais avançada.

## 🚀 O que mudou na versão 2.0?

- **API com NestJS**: A API foi reescrita com **NestJS**, proporcionando uma estrutura modular e escalável.
- **Frontend com NextJS 14**: A interface web foi atualizada para **NextJS 14** e **TailwindCSS**.
- **SDK com TypeScript e Rust**: O SDK agora utiliza **TypeScript** e **Rust**, oferecendo uma estrutura tipada, trazendo mais segurança e performance.
- **Docker**: A API agora roda em um ambiente Dockerizado, usando containers para o **MariaDB** e **Redis**.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Para a API.
- **NextJS 14** e **Tailwind CSS**: Para o frontend.
- **TypeScript**: Um SDK atualizado para TypeScript.
- **Rust**: Usado para iniciar a interface de áudio para contrar a placa de audio e gerenciar transimição via protocolo **Flow Connect**(basedo no protocolo Spotify Connect).
- **Docker**: Para subir o ambiente de desenvolvimento e produção, incluindo banco de dados SQL e Redis.

## 🎧 Funcionalidades

- **Streaming de Áudio em Tempo Real**: Gerenciamento do fluxo de áudio com APIs modernas e eficientes.
- **SDK com TypeScript e Rust**: Integração com dispositivos de terceiros via um daemon em Rust que controla o áudio.
- **Frontend**: Aplicação web em **NextJS 14** e **Tailwind CSS**, fornecendo uma experiência moderna para acessar e controlar o conteúdo.
- **Ambiente Dockerizado**: API, banco de dados e Redis são executados em containers para facilitar o deploy e o desenvolvimento.

## 🏗️ Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/joaopedro5g/flow2.0.git
   cd flow2.0
   ```

2. Inicie o frontend:

   ```bash
   cd frontend
   yarn install
   yarn dev
   ```

3. Inicie o Backend:

   ```bash
   cd backend
   docker compose up
   ```

4. A API será exposta via HTTP na porta 3333.

## 📚 SDK

**ERRO 404**: _Ainda não está disponivel volte mais tarde kkkkkk_

## 🛠️ Ferramentas usadas

- **Docker Compose**: Para facilitar o gerenciamento dos containers.
- **SQL + Redis**: Usados no backend para gerenciamento de dados e sessões de clientes.

## 🌐 Link para a versão anterior

Confira a [versão 1.0](https://github.com/joaopedro5g/flowpodcast) do projeto para ver como ele evoluiu desde seu início há quatro anos.

## 📄 Licença

Este projeto está sob a licença [LICENSE](LICENSE).
