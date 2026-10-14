import type { SiteSettings } from "./types";

// Todo o conteúdo do site.
// Textos vêm do briefing e do Instagram do cliente; nada de número ou regra inventada.
export const SITE_DEFAULTS: SiteSettings = {
  hero: {
    selo: "Brechó infantil em Passo Fundo · de 0 a 14 anos",
    titulo: "Roupa de criança dura pouco.",
    destaque: "O carinho continua.",
    subtitulo:
      "Roupas, calçados, brinquedos e enxoval seminovos, escolhidos peça por peça. E o que não serve mais aí em casa vira saldo pra você.",
    ctaLabel: "Quero desapegar",
    ctaHref: "#desapego",
    cta2Label: "Ver o que tem na loja",
    cta2Href: "#categorias",
    recado: "peças com história, prontas pra próxima!",
    imagem: "",
  },
  numeros: {
    itens: [
      { valor: "+5 anos", rotulo: "vestindo a criançada de Passo Fundo" },
      { valor: "+3.000", rotulo: "fornecedores que confiam no nosso trabalho" },
      { valor: "0 a 14", rotulo: "anos: do enxoval ao uniforme da escola" },
    ],
  },
  categorias: {
    titulo: "O que você encontra na loja",
    subtitulo: "Tudo conferido antes de ir pra arara. Qualidade de novo, preço de brechó.",
    itens: [
      { nome: "Roupas", descricao: "Do recém-nascido ao tamanho 14, pra todas as estações." },
      { nome: "Calçados", descricao: "Tênis, sandálias e botinhas com muito chão pela frente." },
      { nome: "Brinquedos", descricao: "Pra brincar de novo, com outra criança." },
      { nome: "Enxoval", descricao: "Berço e os itens que o bebê precisa pra chegar." },
      { nome: "Uniformes e fantasias", descricao: "Volta às aulas e festa da escola sem gastar o que não precisa." },
      { nome: "Indumentária gaúcha", descricao: "Prenda e peão prontos pra Semana Farroupilha." },
    ],
  },
  consignacao: {
    selo: "Desapega aí!",
    titulo: "O que ficou pequeno vira saldo",
    subtitulo:
      "Você traz, a gente cuida da venda. E acompanha tudo pelo celular, num link só seu.",
    passos: [
      { titulo: "Separe", texto: "Roupas, calçados, brinquedos e itens de enxoval de 0 a 14 anos, em bom estado." },
      { titulo: "Traga na loja", texto: "Nossa equipe avalia e cadastra cada peça no seu nome." },
      { titulo: "Acompanhe pelo link", texto: "Veja quais peças estão disponíveis, quais já venderam e quanto você tem de saldo." },
      { titulo: "Use o saldo", texto: "Gaste em compras na loja ou receba em pagamento. Você escolhe." },
    ],
    ctaLabel: "Quero levar minhas peças",
    ctaMensagem: "Olá! Quero desapegar peças infantis. Como funciona?",
    saldoLabel: "Consultar meu saldo",
    saldoHref: "",
  },
  sobre: {
    titulo: "Três amores, uma loja inteira de cuidado",
    texto:
      "O Três Amores nasceu em Passo Fundo há mais de 5 anos com uma ideia simples: roupa boa de criança merece ser usada de novo.\n\nHoje são mais de 3.000 fornecedores, famílias que confiam suas peças à gente, e um sistema próprio de consignação que deixa tudo na palma da mão: peça por peça, venda por venda, saldo sempre à vista.",
  },
  faq: {
    titulo: "Dúvidas de quem está chegando",
    itens: [
      {
        pergunta: "Vocês trabalham com que idades?",
        resposta: "De 0 a 14 anos: roupas, calçados, uniformes, fantasias, brinquedos, enxoval e indumentária gaúcha.",
      },
      {
        pergunta: "Como acompanho as peças que deixei?",
        resposta: "Você recebe um link do nosso sistema e vê, a qualquer hora, as peças disponíveis, as vendidas e o seu saldo.",
      },
      {
        pergunta: "O que posso fazer com o saldo?",
        resposta: "Usar em compras na própria loja ou receber em pagamento.",
      },
      {
        pergunta: "Posso trocar indumentária gaúcha?",
        resposta: "Sim, por outra indumentária gaúcha, em até 7 dias úteis, apresentando a nota da compra.",
      },
    ],
  },
  contato: {
    titulo: "Passa aqui ou chama no WhatsApp",
    subtitulo: "Conta o que você procura, ou o que quer desapegar, que a gente responde rapidinho.",
    whatsapp: "5554991590605",
    email: "tresamores.pf@gmail.com",
    telefone: "",
    endereco: "",
    horarios: ["Segunda a sexta: 9h30 às 12h e 13h30 às 18h30", "Sábado: 9h30 às 12h"],
    instagram: "https://www.instagram.com/tresamores_brecho/",
    facebook: "https://www.facebook.com/tresamorespf",
  },
  chat: {
    ativo: true,
    nome: "Assistente Três Amores",
    saudacao: "Oi! Sou a assistente virtual do Três Amores. Posso te explicar como desapegar, o que tem na loja ou nosso horário.",
    sugestoes: ["Como funciona o desapego?", "Qual o horário da loja?", "Vocês têm indumentária gaúcha?"],
  },
  seo: {
    titulo: "Três Amores Brechó Infantil | Passo Fundo",
    descricao:
      "Brechó infantil em Passo Fundo: roupas, calçados, brinquedos e enxoval de 0 a 14 anos. Desapegue em consignação e acompanhe seu saldo pelo celular.",
    googleVerification: "",
    head: "",
    bodyStart: "",
  },
  visibilidade: { numeros: true, categorias: true, consignacao: true, sobre: true, faq: true },
};
