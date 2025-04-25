# RAMApp - Risk Area Monitoring Application

RAMApp é uma aplicação web projetada para monitoramento e gerenciamento de áreas de risco em comunidades, fornecendo recursos em tempo real para acompanhamento, alertas e segurança relacionados a riscos ambientais e de segurança.

![RAMApp Logo](public/logo.png)

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Acesso Online](#acesso-online)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [APIs e Integrações](#apis-e-integrações)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🔍 Visão Geral

RAMApp (Risk Area Monitoring Application) é uma solução abrangente para comunidades monitorarem áreas de risco, receberem alertas em tempo real e acessarem recursos de segurança importantes. A aplicação foi projetada pensando em usabilidade e funcionalidade prática para situações de emergência.

## ✨ Recursos Principais

- **Mapa Interativo de Riscos**: Visualize áreas de risco em um mapa interativo focado em Florianópolis, Brasil.
- **Gerenciamento de Alertas**: Crie, edite e exclua alertas com diferentes níveis de risco (baixo, médio, alto).
- **Integração Climática**: Dados meteorológicos em tempo real baseados na localização do usuário.
- **Diretrizes de Segurança**: Informações abrangentes sobre como agir em diversos cenários de emergência.
- **Contatos de Emergência**: Acesso rápido a serviços de emergência (polícia, bombeiros, defesa civil).
- **Autenticação de Usuário**: Sistema básico de login e registro usando armazenamento local.
- **Design Responsivo**: Interface adaptada para dispositivos móveis e desktop.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Roteamento**: React Router
- **Estilização**: TailwindCSS
- **Mapas**: Leaflet e react-leaflet
- **Ícones**: Lucide React
- **Ferramenta de Build**: Vite
- **Gerenciamento de Estado**: LocalStorage para persistência de dados

## 📥 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/RAMApp.git

# Navegue até o diretório do projeto
cd RAMApp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🚀 Uso

Após iniciar o servidor de desenvolvimento com `npm run dev`, abra seu navegador e acesse `http://localhost:5173/` para visualizar a aplicação.

### Páginas Principais:

- **Página Inicial**: Painel principal com informações meteorológicas e navegação para recursos principais.
- **Mapa**: Mapa interativo com marcadores de alerta arrastáveis.
- **Alertas**: Interface para criar e gerenciar alertas.
- **Segurança**: Diretrizes de segurança e informações de prevenção.
- **Emergência**: Contatos e protocolos de emergência.
- **Login**: Autenticação de usuário.

## 🌐 Acesso Online
A aplicação está disponível para uso online no seguinte endereço:

[Acessar RAMApp](https://ram-app-git-main-maycom-pires-projects.vercel.app)

**Instruções para Uso Online**:
- Abra o link acima em um navegador compatível (Google Chrome, Firefox, Safari, etc.).
- Na página inicial, explore o painel com informações meteorológicas ou navegue até as seções de Mapa, Alertas, Segurança, Emergência ou Login usando o menu de navegação.
- Para gerenciar alertas ou acessar recursos protegidos, faça login ou registre-se na página de Login.
- No Mapa, interaja com os marcadores para visualizar ou criar alertas de risco.
- Utilize a seção de Emergência para acessar contatos rápidos ou a seção de Segurança para diretrizes em situações de risco.

- **Nota**: Certifique-se de ter uma conexão estável com a internet para acessar os dados em tempo real, como informações meteorológicas e serviços de geocodificação.

## 📁 Estrutura do Projeto

```
RAMApp/
├── public/            # Recursos estáticos
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   │   ├── AlertsPage.tsx
│   │   ├── EmergencyPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MapPage.tsx
│   │   └── SafetyPage.tsx
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Ponto de entrada
├── index.html         # Arquivo HTML principal
└── package.json       # Dependências e scripts
```

## 🔌 APIs e Integrações

- **OpenWeather API**: Fornece dados meteorológicos em tempo real.
- **Nominatim API**: Serviço de geocodificação reversa para converter coordenadas em endereços legíveis.
- **Leaflet**: Biblioteca de mapas interativos.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ para ajudar comunidades a se manterem seguras em situações de risco e emergência.
