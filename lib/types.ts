// Formato do conteúdo do site (lib/defaults.ts).
export type SiteSettings = {
  hero: {
    selo: string;
    titulo: string;
    destaque: string;
    subtitulo: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label: string;
    cta2Href: string;
    recado: string;
    imagem: string;
  };
  numeros: { itens: { valor: string; rotulo: string }[] };
  categorias: { titulo: string; subtitulo: string; itens: { nome: string; descricao: string }[] };
  consignacao: {
    selo: string;
    titulo: string;
    subtitulo: string;
    passos: { titulo: string; texto: string }[];
    ctaLabel: string;
    ctaMensagem: string;
    saldoLabel: string;
    saldoHref: string;
  };
  sobre: { titulo: string; texto: string };
  faq: { titulo: string; itens: { pergunta: string; resposta: string }[] };
  contato: {
    titulo: string;
    subtitulo: string;
    whatsapp: string;
    email: string;
    telefone: string;
    endereco: string;
    horarios: string[];
    instagram: string;
    facebook: string;
  };
  chat: { ativo: boolean; nome: string; saudacao: string; sugestoes: string[] };
  seo: { titulo: string; descricao: string; googleVerification: string; head: string; bodyStart: string };
  visibilidade: { numeros: boolean; categorias: boolean; consignacao: boolean; sobre: boolean; faq: boolean };
};

export type Secao = keyof SiteSettings;
