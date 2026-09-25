import type { ExperienceDictionary } from './en';

/**
 * HAESSLER WORLD dictionary (Portuguese / pt-BR).
 *
 * Typed as `ExperienceDictionary`, so a missing or misspelled key here is a
 * compile error rather than an untranslated string in production.
 */
export const pt: ExperienceDictionary = {
  system: {
    name: 'HΛESSLER_WORLD',
    status: 'SISTEMA ONLINE',
    enter: 'EXPLORAR O MUNDO',
    tagline: [
      'ENGENHEIRO FULL STACK',
      'ENGENHEIRO MOBILE',
      'TECH LEAD',
      '9+ ANOS DE EXPERIÊNCIA',
    ],
  },
  shell: {
    skipToContent: 'Ir para o conteúdo',
    quickView: 'Visão Rápida',
    classicPortfolio: 'Portfólio Clássico',
    language: 'Idioma',
  },
  nav: {
    system: 'SISTEMA',
    proof: 'EVIDÊNCIA',
    problems: 'PROBLEMAS',
    cases: 'CASOS',
    architecture: 'ARQUITETURA',
    aiLab: 'LAB DE IA',
    human: 'HUMANO',
    now: 'AGORA',
    contact: 'CONTATO',
  },
  role: {
    fullstackMobile: 'Engenheiro Full Stack & Mobile',
  },
  common: {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'E-mail',
    cv: 'CV',
    whatsapp: 'WhatsApp',
    location: 'Localização',
    years: 'Anos',
    yearsValue: '9+ anos',
    backHome: 'Voltar ao início',
  },
  metrics: {
    years: {
      label: 'ANOS DE ENGENHARIA',
      context: 'Web, mobile e backend, em produção.',
    },
    activeUsers: {
      label: 'USUÁRIOS ATIVOS',
      context: 'Busi Boletos — apps de passageiros e operadores.',
    },
    monthlyUsers: {
      label: 'USUÁRIOS MENSAIS',
      context: 'Zumetrics — PWA de analytics social.',
    },
    codeDuplication: {
      label: 'MENOS DUPLICAÇÃO DE CÓDIGO',
      context: 'Busi — arquitetura compartilhada, web + mobile.',
    },
    featureDelivery: {
      label: 'ENTREGA DE FEATURES MAIS RÁPIDA',
      context: 'Busi — uma base de código para web e mobile.',
    },
    queryLatency: {
      label: 'MENOS LATÊNCIA DE CONSULTA',
      context: 'Zumetrics — camada de dados Node.js / GraphQL.',
    },
    testCoverage: {
      label: 'COBERTURA DE TESTES CRÍTICOS',
      context: 'DecentralFi — fluxos de carteira e transações.',
    },
    transactionSuccess: {
      label: 'SUCESSO EM TRANSAÇÕES',
      context: 'DecentralFi — transações on-chain.',
    },
    productionBugs: {
      label: 'MENOS BUGS EM PRODUÇÃO',
      context: 'Zumetrics — dashboards em produção.',
    },
  },
  cases: {
    busi: {
      title: 'Busi Boletos',
      category: 'TRANSPORTE PÚBLICO',
      role: 'Engenheiro Mobile / Frontend',
      summary:
        'Uma plataforma digital que transforma o transporte público na América Latina: apps para passageiros e operadores, gestão de bilhetes digitais e integrações de pagamento.',
    },
    decentralfi: {
      title: 'DecentralFi',
      category: 'WEB3 / CRIPTO',
      role: 'Desenvolvedor Web3 / Frontend',
      summary:
        'Uma aplicação web descentralizada para transações com criptomoedas, criação e gestão de carteiras, dados de mercado e gestão de liquidez na Thorchain.',
    },
    zumetrics: {
      title: 'Zumetrics',
      category: 'DADOS / DASHBOARDS',
      role: 'Tech Lead / Full-Stack',
      summary:
        'Uma PWA para visualizar e gerenciar métricas de redes sociais, com backend em Node.js e visualização de dados customizada.',
    },
  },
  recruiter: {
    eyebrow: 'PROVAVELMENTE ACABAMOS DE NOS CONHECER.',
    metaSeparator: '·',
    sceneTitle: 'RECRUTATECH 2026',
    proofTitle: 'EVIDÊNCIA',
    whatIBuildTitle: 'O QUE EU CONSTRUO',
    casesTitle: 'TRABALHOS SELECIONADOS',
    lookingForTitle: 'O QUE EU BUSCO',
    contactTitle: 'FALE COMIGO',
    statement: 'VAMOS CONSTRUIR ALGO',
    exploreFull: 'VER EXPERIÊNCIA COMPLETA',
    viewCase: 'ABRIR ESTUDO DE CASO',
    viewLive: 'SITE AO VIVO',
    sourceNfc: 'Aberto pelo cartão NFC.',
    sourceQr: 'Aberto pelo código QR.',
    whatIBuild: {
      fullStack: 'Aplicações full-stack',
      mobile: 'Aplicações mobile',
      backend: 'Sistemas de backend',
      architecture: 'Arquitetura',
      aiAutomation: 'IA / automação',
    },
    lookingFor: {
      softwareEngineering: 'Oportunidades em engenharia de software',
      fullStack: 'Full stack',
      mobile: 'Mobile',
      architectureLeadership: 'Arquitetura / liderança técnica',
      aiAutomation: 'IA / automação',
    },
  },
  boot: {
    lines: [
      'HΛESSLER_WORLD 9.0 — BOOT',
      'MONTANDO WORKSPACE ....... OK',
      'INDEXANDO CASOS ......... 03',
      'SISTEMA ONLINE',
    ],
    skip: 'PULAR',
  },
  hero: {
    eyebrow: 'MUNDO DE ENGENHARIA INTERATIVO',
    intro:
      'Construo sistemas em produção no web, mobile e backend — e me importa a arquitetura por trás deles.',
    readoutTitle: 'WORKSTATION.LEITURA',
    readoutMeta: 'AO VIVO',
    scrollHint: 'ROLE PARA EXPLORAR',
  },
  sections: {
    system: {
      lead: 'Engenheiro Full Stack & Mobile atuando em web, mobile e backend, com arquitetura como fio condutor.',
      domainsLabel: 'DOMÍNIOS',
      domains: ['FULL STACK', 'MOBILE', 'ARQUITETURA', 'IA', 'PRODUTO'],
      stackLabel: 'STACK PRINCIPAL',
      focusLabel: 'FOCO ATUAL',
      focus: 'Sistemas em produção, arquitetura e engenharia orientada a produto.',
    },
    proof: {
      lead: 'Números do trabalho em produção, cada um ligado ao estudo de caso de onde veio.',
      evidence: 'EVIDÊNCIA',
      verified: 'PORTFÓLIO',
      pending: 'A CONFIRMAR',
    },
    tools: {
      title: 'TECNOLOGIAS',
      lead: 'Tecnologias como ferramentas: onde rodam, por que estão lá e o que saiu disso.',
      labels: { where: 'ONDE', why: 'POR QUÊ', result: 'RESULTADO' },
      items: {
        react: {
          where: 'Aplicações frontend em produção',
          why: 'Arquitetura de componentes e UI escalável',
          result: 'Busi — UI compartilhada entre web e mobile',
        },
        reactNative: {
          where: 'Aplicações mobile',
          why: 'Uma base de código para iOS e Android',
          result: 'Busi — 30K+ usuários ativos',
        },
        node: {
          where: 'Serviços de backend',
          why: 'Arquitetura de API e acesso a dados',
          result: 'Zumetrics — 40% menos latência de consulta',
        },
        nestjs: {
          where: 'Arquitetura de backend',
          why: 'Serviços estruturados e manutenibilidade',
          result: '',
        },
        typescript: {
          where: 'Bases de código web, mobile e backend',
          why: 'Um contrato de tipos entre camadas',
          result: '',
        },
        graphql: {
          where: 'Camada de acesso a dados',
          why: 'Um contrato tipado por cliente',
          result: 'Zumetrics — 40% menos latência de consulta',
        },
      },
    },
    problems: {
      lead: 'Três problemas reais. Primeiro as restrições, depois as decisões, os tradeoffs e o que mudou.',
      labels: {
        constraints: 'RESTRIÇÕES',
        decisions: 'DECISÕES',
        tradeoffs: 'TRADEOFFS',
        stack: 'FERRAMENTAS',
        result: 'RESULTADO',
      },
      items: {
        scale: {
          title: 'Um app mobile usado diariamente por 30K+ pessoas.',
          summary:
            'Apps para passageiros e operadores de transporte público, com bilhetes digitais e integrações de pagamento.',
          constraints: [
            'Pagamento e validação de bilhete estão no mesmo caminho crítico.',
            'iOS e Android precisam sair do mesmo trabalho de feature.',
            'O produto cresce a cada ciclo de release.',
          ],
          decisions: [
            'Mantive uma única base React Native / Expo para as duas plataformas.',
            'Compartilhei UI e lógica de domínio com a aplicação web em vez de escrever duas vezes.',
            'Limitei a superfície nativa em Swift / Kotlin ao que a plataforma realmente exigia.',
          ],
          tradeoffs: [
            'Uma base compartilhada entrega mais rápido, mas limita trabalho muito específico de plataforma.',
            'Cada módulo nativo adiciona superfície para manter.',
          ],
          result:
            '30K+ usuários ativos, 40% menos código duplicado e 25% mais velocidade de entrega.',
        },
        latency: {
          title: 'Latência de consulta subindo em um dashboard em produção.',
          summary:
            'Uma PWA de métricas em que cada visualização jogava mais trabalho na camada de dados.',
          constraints: [
            'O dashboard não pode sair do ar enquanto é corrigido.',
            'Clientes diferentes consomem recortes diferentes dos mesmos dados.',
          ],
          decisions: [
            'Levei a agregação para mais perto da camada de dados em vez de repetir por cliente.',
            'Troquei padrões de múltiplas requisições por um contrato tipado por tela.',
            'Medi a camada de dados antes e depois de cada mudança.',
          ],
          tradeoffs: [
            'Um contrato agregado é mais barato por requisição, mas menos flexível para visões pontuais.',
            'Cache esconde consulta lenta se não for medido, então latência continuou sendo a métrica de referência.',
          ],
          result: '40% menos latência de consulta.',
        },
        duplication: {
          title: 'Dois frontends duplicando o mesmo produto.',
          summary:
            'Web e mobile implementavam features sobrepostas, então cada mudança precisava ser feita duas vezes.',
          constraints: [
            'A plataforma já atendia 30K+ usuários ativos.',
            'Reescrever não era uma opção.',
          ],
          decisions: [
            'Extraí domínio e UI compartilhados para uma camada consumida pelos dois clientes.',
            'Removi implementações duplicadas em vez de mantê-las em sincronia manualmente.',
          ],
          tradeoffs: [
            'Código compartilhado exige fronteiras mais rígidas e disciplina de revisão.',
            'A extração custa tempo no começo para pagar nos ciclos seguintes.',
          ],
          result: '40% menos duplicação de código e 25% mais velocidade de entrega.',
        },
      },
    },
    cases: {
      lead: 'Três sistemas em produção, na ordem em que moldaram meu jeito de trabalhar.',
      labels: {
        stack: 'STACK',
        outcome: 'RESULTADO',
        role: 'PAPEL',
        deepDive: 'ESTUDO DE CASO COMPLETO',
        live: 'SITE AO VIVO',
        archive: 'MAIS TRABALHOS',
      },
    },
    architecture: {
      lead: 'Como uma requisição atravessa os sistemas que construo, e o que cada camada custa.',
      hint: 'SELECIONE UMA CAMADA',
      labels: { why: 'POR QUÊ', tradeoff: 'TRADEOFF', channel: 'CANAL' },
      layers: {
        mobileApp: {
          label: 'APP MOBILE',
          why: 'O cliente é a superfície do produto: APIs do dispositivo, tolerância a offline e ciclos de release ficam aqui.',
          tradeoff: 'Mais lógica no cliente significa mais lugares para versionar e testar.',
        },
        api: {
          label: 'API',
          why: 'Um ponto de entrada único mantém os clientes honestos: validação, versionamento e respostas moldadas.',
          tradeoff:
            'Um ponto de entrada que faz demais vira gargalo para toda mudança de cliente.',
        },
        auth: {
          label: 'AUTH',
          why: 'Identidade tratada uma vez, de forma central, em vez de uma vez por cliente.',
          tradeoff:
            'Auth centralizado é dependência compartilhada: uma queda ali para tudo a montante.',
        },
        services: {
          label: 'SERVIÇOS',
          why: 'Fronteiras de domínio mantêm regras de negócio fora dos controllers e da UI.',
          tradeoff:
            'Separar cedo custa mais do que economiza enquanto o domínio ainda está sendo entendido.',
        },
        database: {
          label: 'BANCO DE DADOS',
          why: 'O modelo de dados sobrevive à aplicação, então as decisões de schema são as caras.',
          tradeoff: 'Otimizar para um padrão de acesso sempre penaliza outro.',
        },
      },
    },
    aiLab: {
      lead: 'IA e automação como encanamento: agentes que alcançam sistemas internos via MCP, orquestrados com n8n.',
      askLabel: 'PERGUNTE AO HΛESSLER',
      askHint:
        'As respostas vêm dos dados estruturados deste portfólio. Nada é gerado em tempo de execução.',
      labels: { pipeline: 'PIPELINE', answer: 'RESPOSTA' },
      questions: {
        builds: {
          question: 'O que você constrói?',
          answer:
            'Produtos full-stack e mobile: frontends em React e React Native, serviços em Node.js e NestJS, e a arquitetura que conecta tudo.',
        },
        stack: {
          question: 'Qual é a sua stack mais forte?',
          answer:
            'React, React Native, Node.js, Next.js e NestJS, em produção. Busi Boletos (React Native, 30K+ usuários ativos) e Zumetrics (Next.js, GraphQL, Node.js) são os exemplos mais claros.',
        },
        busi: {
          question: 'Fale sobre a Busi.',
          answer:
            'Uma plataforma de transporte público para a América Latina: apps para passageiros e operadores, bilhetes digitais e integrações de pagamento. 30K+ usuários ativos, 40% menos código duplicado, 25% mais velocidade de entrega.',
        },
        architecture: {
          question: 'Como você pensa arquitetura?',
          answer:
            'Fronteiras primeiro: manter regras de negócio fora da UI e dos controllers, compartilhar só o que é realmente igual e otimizar o padrão de acesso que você consegue medir. A seção ARQUITETURA mostra os tradeoffs.',
        },
        ai: {
          question: 'Qual é a sua experiência com IA?',
          answer:
            'Integrações, não pesquisa: agentes de IA conectados a sistemas internos via MCP, com o n8n cuidando da automação entre eles.',
        },
        lookingFor: {
          question: 'O que você está buscando?',
          answer:
            'Oportunidades em engenharia de software onde full-stack, mobile e arquitetura se encontram, incluindo IA e automação.',
        },
      },
    },
    human: {
      lead: 'Fora do editor.',
      interests: {
        comics: 'Quadrinhos',
        drawing: 'Desenho',
        music: 'Música',
        photography: 'Fotografia',
        machineLearning: 'Machine learning',
      },
      note: 'A mesma curiosidade, aplicada sem ticket.',
    },
    now: {
      lead: 'Onde estou e no que estou trabalhando.',
      labels: {
        location: 'LOCALIZAÇÃO',
        focus: 'FOCO',
        lookingFor: 'BUSCANDO',
        priorities: 'PRIORIDADES ATUAIS',
      },
      focus: {
        fullStack: 'Full stack',
        mobile: 'Mobile',
        architecture: 'Arquitetura',
        ai: 'IA',
      },
      priorities: {
        productionSystems: 'Sistemas em produção',
        architecture: 'Arquitetura',
        productEngineering: 'Engenharia orientada a produto',
        aiAutomation: 'IA / automação',
      },
    },
    contact: {
      statement: 'VAMOS CONSTRUIR ALGO',
      lead: 'Aberto a oportunidades em engenharia de software em full-stack, mobile, arquitetura e automação com IA.',
      classicHint: 'O portfólio original, ainda no ar.',
      recruiterHint: 'Versão curta para uma tela ou leitura de crachá.',
    },
  },
};
