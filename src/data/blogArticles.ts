import imgCelular from '../assets/images/blog_lotofacil_celular_1790599069546.jpg';
import imgPremio from '../assets/images/blog_bilhete_premio_1790599087099.jpg';
import imgAppOnline from '../assets/images/blog_aposta_online_1790599104133.jpg';

export interface ArtigoBlog {
  id: number;
  tag: string;
  categoria: 'lotofacil' | 'megasena' | 'geral' | 'lotomania';
  data: string;
  tempo: string;
  titulo: string;
  resumo: string;
  tags: string[];
  imagemUrl?: string;
  ilustracaoTipo?: 'caneta' | 'volante' | 'seguranca' | 'dinheiro' | 'calendario' | 'imposto' | 'quadrantes' | 'primos' | 'moldura' | 'bolao' | 'grafico' | 'trofeu';
  destaque?: boolean;
  conteudoCompleto: string[];
}

export const BLOG_ARTICLES: ArtigoBlog[] = [
  // 1. Destaque
  {
    id: 1,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '28 de setembro de 2026',
    tempo: '2 min de leitura',
    titulo: 'Lotofácil final zero: o que muda no prêmio?',
    resumo: 'O concurso Lotofácil terminado em zero usa uma reserva acumulada para reforçar a faixa de 15 acertos. Entenda o rateio, sem promessa de prêmio.',
    tags: ['#lotofacil', '#premios', '#rateio', '#regras'],
    destaque: true,
    conteudoCompleto: [
      'Na Lotofácil, a cada sorteio regular com final de 1 a 9, a Caixa Econômica Federal retém exatamente 10% da arrecadação líquida destinada aos prêmios variáveis e direciona para uma conta de reserva especial.',
      'Essa reserva acumulada é paga integralmente no próximo concurso cujo número termine em zero (por exemplo, concursos 3780, 3790, 3800).',
      'Com isso, enquanto um sorteio regular destina 62% da premiação aos 15 acertos, no concurso final zero esse percentual sobe para 72%, gerando premiações significativamente maiores mesmo que o concurso anterior não tenha acumulado!',
      'Importante destacar: a probabilidade de acerto (1 em 3.268.760 na aposta de 15 números) e o custo da aposta continuam rigorosamente os mesmos.'
    ]
  },
  // 2
  {
    id: 2,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '21 de set',
    tempo: '4 min',
    titulo: 'Bilhete de loteria é ao portador? Como se proteger',
    resumo: 'Entenda a diferença entre o recibo físico e a aposta digital, quando escrever nome e CPF e como guardar um bilhete da Lotofácil com segurança.',
    tags: ['#lotofacil', '#seguranca', '#bilhete'],
    ilustracaoTipo: 'seguranca',
    conteudoCompleto: [
      'Por padrão legal, o comprovante emitido pelas máquinas lotéricas é considerado um documento ao portador: quem estiver fisicamente com ele em mãos tem o direito de receber o prêmio.',
      'Para se proteger contra perda, furto ou roubo, escreva no verso do bilhete o seu nome completo, número de CPF e assinatura assim que receber o comprovante.',
      'Com o CPF anotado, a Caixa Econômica Federal só autoriza o pagamento mediante apresentação de documento oficial de identificação coincidente com o registro no verso.'
    ]
  },
  // 3
  {
    id: 3,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '14 de set',
    tempo: '3 min',
    titulo: 'Como conferir a Lotofácil pelo celular',
    resumo: 'Veja como selecionar o concurso, marcar de 15 a 20 dezenas e conferir um jogo da Lotofácil pelo celular, sem confundir a consulta com o resgate.',
    tags: ['#lotofacil', '#conferir', '#celular', '#dicas'],
    imagemUrl: imgCelular,
    conteudoCompleto: [
      'Conferir apostas pelo celular ficou muito mais rápido com o conferidor instantâneo do Lottery Pro.',
      'Basta selecionar o número do concurso no seletor ou clicar nas setas de navegação. A cartela exibe as dezenas em círculos coloridos e faz o cruzamento imediato das suas escolhas com as dezenas sorteadas pela Caixa.',
      'Se você tiver bilhete físico de papel, lembre-se: conferir no aplicativo ou site serve para consultar o resultado. Para receber o prêmio oficial, você deve apresentar o comprovante original impresso na lotérica ou em agência da Caixa.'
    ]
  },
  // 4
  {
    id: 4,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '07 de set',
    tempo: '6 min',
    titulo: 'Apostar datas de aniversário na Lotofácil faz sentido?',
    resumo: 'Usar datas de aniversário na Lotofácil não aumenta a chance. Entenda o limite de 1 a 25, o possível rateio e como escolher sem ilusão no jogo.',
    tags: ['#lotofacil', '#aniversario', '#estrategia'],
    ilustracaoTipo: 'volante',
    conteudoCompleto: [
      'Muitos apostadores jogam exclusivamente números baseados em datas de nascimento (dias de 1 a 31 e meses de 1 a 12). Na Lotofácil, como o volante vai de 01 a 25, todos os dias de aniversário cabem no volante!',
      'No entanto, a armadilha matemática está na divisão do prêmio: como milhões de pessoas jogam os mesmos aniversários, quando sai um sorteio com dezenas predominantemente baixas (01 a 12), o número de acertadores de 14 e 15 pontos explode.',
      'O resultado é que o prêmio por ganhador é diluído e fica muito menor. Matematicamente, distribuir dezenas por todo o volante equilibra a variância.'
    ]
  },
  // 5
  {
    id: 5,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '04 de set',
    tempo: '5 min',
    titulo: 'Bilhete da Lotofácil rasurado ainda vale?',
    resumo: 'Um bilhete da Lotofácil só pode receber prêmio se estiver legível e com autenticidade verificável. Veja o que preservar e onde pedir avaliação oficial.',
    tags: ['#lotofacil', '#rasurado', '#regras'],
    imagemUrl: imgPremio,
    conteudoCompleto: [
      'Para que um bilhete seja validado pelos terminais lotéricos, o código de barras e o número de autenticação digital impresso na parte inferior precisam estar perfeitamente legíveis.',
      'Pequenas marcas ou anotações à caneta na frente do bilhete geralmente não invalidam o prêmio, desde que não atinjam o código de barras ou os números sorteados.',
      'Se o terminal lotérico recusar a leitura por desgaste ou dano, o bilhete deve ser levado a uma agência da Caixa para abertura de processo formal de perícia e recuperação.'
    ]
  },
  // 6
  {
    id: 6,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '02 de set',
    tempo: '5 min',
    titulo: 'Posso repetir o mesmo jogo da Lotofácil em vários concursos?',
    resumo: 'Repetir o mesmo jogo da Lotofácil em vários concursos cria novas tentativas pagas, mas não melhora a chance de cada sorteio. Entenda a Teimosinha.',
    tags: ['#lotofacil', '#teimosinha', '#repetir'],
    ilustracaoTipo: 'calendario',
    conteudoCompleto: [
      'A Teimosinha permite concorrer com as mesmas dezenas por 3, 6, 12, 18 ou 24 concursos consecutivos na Lotofácil.',
      'Repetir o jogo traz praticidade e evita o estresse de esquecer de apostar no dia do concurso.',
      'No entanto, do ponto de vista matemático puro, cada concurso continua sendo um evento isolado com probabilidade independente de 1 em 3.268.760.'
    ]
  },
  // 7
  {
    id: 7,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '31 de ago',
    tempo: '2 min',
    titulo: 'Lotofácil acumula se ninguém acertar 15? Veja a regra',
    resumo: 'Sim. No concurso regular, o prêmio sem ganhador de 15 acumula para o próximo concurso. Na Independência, a regra de distribuição é diferente.',
    tags: ['#lotofacil', '#acumulado', '#regras'],
    ilustracaoTipo: 'trofeu',
    conteudoCompleto: [
      'Nos concursos regulares da Lotofácil, caso nenhuma aposta acerte as 15 dezenas sorteadas, o valor destinado à primeira faixa é integralmente transferido para o concurso subsequente na mesma faixa de 15 acertos.',
      'Já na edição especial da Lotofácil da Independência (em setembro), o prêmio não acumula: se ninguém acertar 15, a bolada é rateada entre os acertadores de 14 pontos.'
    ]
  },
  // 8
  {
    id: 8,
    tag: 'GERAL',
    categoria: 'geral',
    data: '28 de ago',
    tempo: '6 min',
    titulo: 'Pra onde vai o dinheiro das loterias? Entenda a divisão da arrecadação',
    resumo: 'Parte da arrecadação vira prêmio; o restante financia repasses sociais e custos da operação. Veja como a divisão funciona nas loterias da Caixa.',
    tags: ['#loterias', '#arrecadacao', '#repasses'],
    ilustracaoTipo: 'dinheiro',
    conteudoCompleto: [
      'Você sabia que do total arrecadado pela Caixa com as loterias federais, quase metade não vai para prêmios, mas sim para repasses sociais obrigatórios por lei?',
      'Aproximadamente 43,35% compõe a renda bruta da premiação. O restante é destinado para a Seguridade Social, Fundo Penitenciário Nacional (FUNPEN), Comitê Olímpico e Paralímpico do Brasil, Fundo Nacional de Segurança Pública (FNSP) e Fundo de Financiamento Estudantil (FIES).',
      'Portanto, ao jogar em qualquer loteria oficial, uma parcela expressiva do valor é revertida para investimentos públicos de interesse coletivo.'
    ]
  },
  // 9
  {
    id: 9,
    tag: 'GERAL',
    categoria: 'geral',
    data: '26 de ago',
    tempo: '6 min',
    titulo: 'Apostar online pela Caixa é seguro? Como funciona o app oficial',
    resumo: 'Entenda quando apostar online nas loterias da Caixa é seguro, como identificar o canal oficial, criar cadastro e evitar sites que imitam o serviço.',
    tags: ['#seguranca', '#online', '#app-oficial'],
    imagemUrl: imgAppOnline,
    conteudoCompleto: [
      'A Caixa Econômica Federal disponibiliza seu portal oficial de Loterias Online e aplicativo para iOS e Android com autenticação Gov.br e pagamento via Pix ou Cartão de Crédito.',
      'O valor mínimo de compra no canal oficial é de R$ 30,00 por carrinho, permitindo mesclar bilhetes de diferentes modalidades.',
      'Fique sempre atento ao domínio da URL no navegador: deve conter rigorosamente caixa.gov.br ou loterias.caixa.gov.br. Desconfie de intermediários não autorizados que cobram sobretaxas.'
    ]
  },
  // 10
  {
    id: 10,
    tag: 'LOTOMANIA',
    categoria: 'lotomania',
    data: '24 de ago',
    tempo: '5 min',
    titulo: 'Lotomania paga quem acerta ZERO? Sim — entenda a faixa mais curiosa da Caixa',
    resumo: 'Na Lotomania, errar as 20 dezenas sorteadas também dá prêmio oficial. Veja por que zero e 20 acertos têm a mesma chance e como conferir sua aposta.',
    tags: ['#lotomania', '#zero-acertos', '#curiosidades'],
    ilustracaoTipo: 'volante',
    conteudoCompleto: [
      'A Lotomania possui uma das mecânicas mais fascinantes das Loterias Caixa: o apostador escolhe 50 números entre os 100 disponíveis (00 a 99), e o sistema extrai 20 números.',
      'A probabilidade combinatória de errar absolutamente todas as 20 dezenas sorteadas é rigorosamente de 1 em 11.372.635 — exatamente idêntica à probabilidade de acertar as 20!',
      'Por isso, a Caixa destina uma fatia expressiva da premiação para a faixa de 0 acertos, garantindo prêmios polpudos para quem não acertar absolutamente nada.'
    ]
  },
  // 11
  {
    id: 11,
    tag: 'MEGA-SENA',
    categoria: 'megasena',
    data: '21 de ago',
    tempo: '6 min',
    titulo: 'Até quanto a Mega-Sena pode acumular? Recordes e regras',
    resumo: 'A Mega-Sena não tem um teto público de acumulação: o valor cresce com as apostas e concursos sem sena. Entenda regras, estimativas e recordes.',
    tags: ['#megasena', '#acumulados', '#recordes'],
    ilustracaoTipo: 'trofeu',
    conteudoCompleto: [
      'Ao contrário de loterias em alguns países que possuem teto máximo de prêmio acumulado, na Mega-Sena brasileira não existe limite superior legal.',
      'Se ninguém acertar as 6 dezenas sorteadas, 35% da arrecadação líquida é repassada para o concurso seguinte, somando-se ao valor anterior.',
      'O maior prêmio regular já pago superou os R$ 378 milhões, demonstrando que o montante cresce em progressão direta com a quantidade de bilhetes emitidos pela população.'
    ]
  },
  // 12
  {
    id: 12,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '19 de ago',
    tempo: '6 min',
    titulo: 'Quanto rende o prêmio da Lotofácil na poupança e no CDI?',
    resumo: 'Um prêmio de R$ 1,5 milhão rende R$ 7.500 ao mês na poupança, sem TR. Em 100% do CDI, varia, tem IR e depende do prazo e da taxa contratada.',
    tags: ['#lotofacil', '#investimentos', '#cdi', '#poupanca'],
    ilustracaoTipo: 'dinheiro',
    conteudoCompleto: [
      'Com a taxa Selic em patamares elevados, aplicar um prêmio de R$ 1,5 milhão da Lotofácil em renda fixa gera uma renda passiva mensal considerável.',
      'Na caderneta de poupança (isenta de IR), o rendimento aproximado gira em torno de R$ 7.500 a R$ 8.500 por mês.',
      'Já em ativos atrelados a 100% do CDI (como Tesouro Selic ou CDBs com liquidez diária), o retorno bruto mensal chega a ultrapassar R$ 13.000, proporcionando segurança patrimonial permanente.'
    ]
  },
  // 13
  {
    id: 13,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '17 de ago',
    tempo: '6 min',
    titulo: 'Bolão oficial da Caixa ou entre amigos: diferenças, taxas e riscos',
    resumo: 'Bolão oficial tem cotas registradas; entre amigos exige acordo e comprovantes. Compare taxas, recibos e riscos antes de apostar em grupo com calma.',
    tags: ['#bolao', '#caixa', '#amigos'],
    ilustracaoTipo: 'bolao',
    conteudoCompleto: [
      'No bolão oficial das casas lotéricas, cada cotista recebe o seu comprovante individual impresso com código de barras próprio, permitindo o resgate sem depender de ninguém.',
      'Nos bolões informais feitos entre amigos ou colegas de trabalho, todo o grupo depende do titular que guardou o bilhete original, o que exige termo por escrito assinado por todos para evitar disputas jurídicas.'
    ]
  },
  // 14
  {
    id: 14,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '14 de ago',
    tempo: '5 min',
    titulo: 'Dá pra viver de Lotofácil? A matemática honesta',
    resumo: 'Não de forma confiável: a Lotofácil destina só parte da arrecadação a prêmios e acertar 15 continua raro. Veja a conta, sem promessa de prêmio.',
    tags: ['#lotofacil', '#matematica', '#honestidade'],
    ilustracaoTipo: 'grafico',
    conteudoCompleto: [
      'Qualquer modalidade de loteria oficial possui uma expectativa matemática de retorno negativa no longo prazo (o chamado House Edge).',
      'Cerca de 56% do dinheiro arrecadado é retido pelo governo para despesas e repasses sociais, retornando apenas 43% aos apostadores em forma de prêmio.',
      'Portanto, encare as loterias como um entretenimento saudável de baixo custo com a chance remota de mudar de vida, e nunca como um plano de renda previsível.'
    ]
  },
  // 15
  {
    id: 15,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '12 de ago',
    tempo: '2 min',
    titulo: 'Lotofácil na quarta ou no sábado: o dia muda a chance?',
    resumo: 'O dia da aposta não muda a chance de acertar 15. Desde julho de 2026, o concurso regular do fim de semana é no domingo; confira a diferença.',
    tags: ['#lotofacil', '#sorteios', '#dias'],
    ilustracaoTipo: 'calendario',
    conteudoCompleto: [
      'A chance física de acerto de 15 dezenas (1 em 3.268.760) independe totalmente do dia da semana em que o sorteio é realizado.',
      'O que pode mudar é o volume de arrecadação: sorteios de fim de semana costumam atrair mais apostas, o que aumenta o prêmio acumulado e também a probabilidade de haver múltiplos acertadores dividindo o prêmio principal.'
    ]
  },
  // 16
  {
    id: 16,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '10 de ago',
    tempo: '6 min',
    titulo: 'O que acontece se duas apostas acertarem os 15 pontos?',
    resumo: 'Se duas apostas fizerem 15 pontos na Lotofácil, o prêmio da faixa é dividido em partes iguais. Veja como funciona o rateio e o que muda no concurso.',
    tags: ['#lotofacil', '#rateio', '#divisao'],
    ilustracaoTipo: 'dinheiro',
    conteudoCompleto: [
      'Quando mais de um bilhete crava os 15 acertos, o valor total apurado para a primeira faixa de premiação é rateado em partes rigorosamente iguais entre os ganhadores.',
      'Por exemplo: em um prêmio de R$ 2.400.000,00 com 2 apostas premiadas, cada titular recebe exatamente R$ 1.200.000,00 líquidos de Imposto de Renda na fonte.'
    ]
  },
  // 17
  {
    id: 17,
    tag: 'GERAL',
    categoria: 'geral',
    data: '07 de ago',
    tempo: '5 min',
    titulo: 'Prêmio de loteria prescreve? Entenda o prazo de 90 dias',
    resumo: 'Sim. Em regra, você tem 90 dias corridos para pedir um prêmio de loteria da Caixa. Depois, o valor vai ao Tesouro Nacional para aplicação no FIES.',
    tags: ['#prazo', '#prescricao', '#regras'],
    ilustracaoTipo: 'calendario',
    conteudoCompleto: [
      'Segundo a legislação vigente das loterias federais (Lei nº 13.756/2018), o ganhador tem um prazo improrrogável de 90 (noventa) dias corridos, contados a partir da data de realização do sorteio, para reivindicar seu prêmio.',
      'Caso o bilhete premiado não seja apresentado em uma lotérica ou agência bancária dentro desse período de 3 meses, o prêmio prescreve e o ganhador perde irrevogavelmente o direito ao valor.',
      'Os valores não resgatados são repassados integralmente ao Fundo de Financiamento Estudantil (FIES).'
    ]
  },
  // 18
  {
    id: 18,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '06 de ago',
    tempo: '6 min',
    titulo: 'Ganhei na Lotofácil: como receber o prêmio passo a passo por valor',
    resumo: 'Veja onde resgatar um prêmio da Lotofácil, os documentos exigidos e os prazos para bilhete físico ou aposta digital.',
    tags: ['#resgate', '#documentos', '#agencia'],
    ilustracaoTipo: 'seguranca',
    conteudoCompleto: [
      'Valores líquidos de até R$ 2.259,20 podem ser retirados diretamente em qualquer casa lotérica credenciada.',
      'Prêmios com valores superiores devem ser retirados obrigatoriamente nas agências da Caixa Econômica Federal.',
      'Para valores acima de R$ 10.000,00, a Caixa efetua o pagamento após o prazo de 2 dias úteis contados a partir da apresentação do bilhete na agência, por razões de conformidade e segurança bancária.'
    ]
  },
  // 19
  {
    id: 19,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '05 de ago',
    tempo: '3 min',
    titulo: 'Lotofácil da Independência 2026: resultado, regras e chances',
    resumo: 'O concurso 3780 teve 72 apostas com 15 acertos e pagou R$ 4.488.579,00 a cada uma. Veja as dezenas, o rateio especial e as regras.',
    tags: ['#lotofacil', '#independencia', '#concurso3780'],
    ilustracaoTipo: 'trofeu',
    conteudoCompleto: [
      'A edição especial da Lotofácil da Independência mobilizou apostadores de todo o Brasil com premiação histórica superior a R$ 200 milhões.',
      'O concurso 3780 premiou 72 bilhetes que acertaram as 15 dezenas, garantindo R$ 4.488.579,00 para cada vencedor.',
      'Mais de 9.000 bilhetes também foram contemplados na faixa de 14 acertos.'
    ]
  },
  // 20
  {
    id: 20,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '03 de ago',
    tempo: '2 min',
    titulo: 'Até que horas apostar na Lotofácil? Veja os prazos',
    resumo: 'Nos concursos regulares de segunda a sexta, até 20h. Para domingo, até 22h de sábado. A Independência 2026 tem prazo próprio: veja as datas.',
    tags: ['#lotofacil', '#horarios', '#prazos'],
    ilustracaoTipo: 'calendario',
    conteudoCompleto: [
      'Em dias de concursos normais de segunda a sexta-feira, as apostas encerram rigorosamente às 20h (horário de Brasília) tanto nas casas lotéricas quanto no portal online da Caixa.',
      'Para sorteios aos domingos, o registro encerra às 22h do sábado anterior.',
      'Sempre registre seus jogos com antecedência para evitar instabilidade nos servidores ou filas nos terminais.'
    ]
  },
  // 21
  {
    id: 21,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '29 de jul',
    tempo: '2 min',
    titulo: 'Lotofácil paga 11 pontos? Sim: R$ 7 na aposta simples',
    resumo: 'Sim. Uma aposta simples da Lotofácil com 11 acertos paga R$ 7. Veja os valores de 11, 12 e 13 pontos e como conferir se houve lucro ou prejuízo.',
    tags: ['#lotofacil', '#11pontos', '#premios-fixos'],
    ilustracaoTipo: 'dinheiro',
    conteudoCompleto: [
      'Na Lotofácil, 11 acertos é a faixa de entrada premiada, pagando o valor fixo garantido por lei.',
      'Com uma aposta simples de R$ 3,50, acertar 11 pontos devolve o dobro do dinheiro investido.',
      '12 acertos pagam o valor fixo de R$ 12,00 e 13 acertos garantem R$ 30,00 fixos.'
    ]
  },
  // 22
  {
    id: 22,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '28 de jul',
    tempo: '7 min',
    titulo: 'Tudo sobre a Lotofácil: o guia completo, honesto e sem promessa de prêmio',
    resumo: 'Entenda como funciona a Lotofácil, quanto custa, quais são as chances de cada faixa e como usar as ferramentas do Lottery Pro sem promessa de prêmio.',
    tags: ['#lotofacil', '#guia-completo', '#lotterypro'],
    ilustracaoTipo: 'volante',
    conteudoCompleto: [
      'A Lotofácil foi criada pela Caixa Econômica Federal em 2003 e tornou-se rapidamente a modalidade favorita dos brasileiros devido à facilidade de ganhar em faixas secundárias.',
      'No volante de 25 dezenas, o apostador escolhe de 15 a 20 números. São premiadas as apostas que acertarem 11, 12, 13, 14 ou 15 números.',
      'O Lottery Pro oferece conferidor automático, banco histórico de todos os concursos, gerador com fechamentos matemáticos e estatísticas ao vivo.'
    ]
  },
  // 23
  {
    id: 23,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '31 de mai',
    tempo: '3 min',
    titulo: 'Como montar jogo da Lotofácil com estatística, sem mito',
    resumo: 'Use estatísticas da Lotofácil para descrever um jogo, não para prever o sorteio. Veja um método simples e os limites de cada filtro.',
    tags: ['#lotofacil', '#estatisticas', '#filtros'],
    ilustracaoTipo: 'grafico',
    conteudoCompleto: [
      'Estatísticas não prevêem o futuro, mas descrevem com precisão matemática os padrões de distribuição observados ao longo de milhares de sorteios.',
      'Equilibrar pares e ímpares (7/8 ou 8/7), manter a soma das dezenas entre 170 e 210, e incluir entre 8 e 10 repetidas do concurso anterior garante que você não jogue combinações aberrantes que nunca saíram.'
    ]
  },
  // 24
  {
    id: 24,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '30 de mai',
    tempo: '5 min',
    titulo: 'Qual a chance real de ganhar na Lotofácil? As probabilidades de 11 a 15 acertos',
    resumo: 'A chance de cravar os 15 é 1 em 3,2 milhões — mas ganhar alguma faixa (11 a 14) é 1 em 11. Veja a probabilidade real de cada faixa da Lotofácil, sem enrolação.',
    tags: ['#lotofacil', '#probabilidades', '#chances'],
    ilustracaoTipo: 'volante',
    conteudoCompleto: [
      'A chance de acertar 15 pontos é de 1 em 3.268.760. Já para 14 pontos, é de 1 em 21.791.',
      'Para 13 pontos, a chance é de 1 em 691; para 12 pontos, 1 em 59; e para 11 pontos, é de apenas 1 em 11!',
      'Isso significa que, estatisticamente, a cada 11 jogos que você faz, em média um pontuará com 11 acertos.'
    ]
  },
  // 25
  {
    id: 25,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '30 de mai',
    tempo: '5 min',
    titulo: 'Surpresinha e Teimosinha na Lotofácil: o que são e quando usar',
    resumo: 'Surpresinha deixa o sistema escolher suas dezenas; Teimosinha repete a mesma aposta por vários concursos. Veja como cada uma funciona e quando vale a pena.',
    tags: ['#lotofacil', '#surpresinha', '#teimosinha'],
    ilustracaoTipo: 'calendario',
    conteudoCompleto: [
      'A Surpresinha é perfeita para quem tem pressa ou não quer ficar indeciso na escolha das dezenas: o terminal da Caixa sorteia 15 números aleatórios para você.',
      'A Teimosinha repete seu jogo preferido por até 24 sorteios seguidos, garantindo que você nunca perca um concurso por esquecimento.'
    ]
  },
  // 26
  {
    id: 26,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '29 de mai',
    tempo: '3 min',
    titulo: 'Vale a pena jogar mais de 15 dezenas na Lotofácil?',
    resumo: 'Marcar mais dezenas aumenta o preço e a chance de acertar 15 na mesma proporção. Compare o custo de 15 a 20 dezenas e entenda as combinações.',
    tags: ['#lotofacil', '#apostas-multiplas', '#custo-beneficio'],
    ilustracaoTipo: 'dinheiro',
    conteudoCompleto: [
      'Marcar 16 dezenas equivale a 16 jogos simples e custa R$ 56,00. Marcar 17 equivale a 136 jogos e custa R$ 476,00.',
      'A grande vantagem das apostas múltiplas não é apenas o aumento das chances, mas os prêmios multiplicados: acertar 14 pontos num jogo de 17 dezenas paga múltiplos prêmios secundários.',
      'Porém, para quem tem orçamento controlado, utilizar fechamentos com volantes de 15 dezenas costuma ser mais eficiente.'
    ]
  },
  // 27
  {
    id: 27,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '10 de mai',
    tempo: '7 min',
    titulo: 'Como funciona o bolão da Lotofácil: lotérica, online ou pelo grupo do WhatsApp',
    resumo: 'As 3 formas de fazer bolão de Lotofácil — diferenças, taxas, valor mínimo e quando cada uma vale. Sem juridiquês, com tabela e cálculo pronto.',
    tags: ['#lotofacil', '#bolao', '#whatsapp'],
    ilustracaoTipo: 'bolao',
    conteudoCompleto: [
      'No bolão lotérico, a casa lotérica pode cobrar uma taxa de serviço adicional de até 35% do valor da cota.',
      'No portal oficial de Loterias Online da Caixa, você compra combos prontos sem pagar taxa de lotérica.',
      'Já no bolão entre amigos no WhatsApp, a economia com taxas é total, mas é indispensável tirar foto do bilhete com nome de todos antes do sorteio.'
    ]
  },
  // 28
  {
    id: 28,
    tag: 'GERAL',
    categoria: 'geral',
    data: '05 de mai',
    tempo: '4 min',
    titulo: 'Imposto de Renda no prêmio da loteria: como funciona, quanto fica e o que declarar',
    resumo: 'A Caixa retém 30% do prêmio antes de pagar — e ainda tem o passo da declaração anual no IR. Cálculos prontos, faixas e o que muda para bolão.',
    tags: ['#imposto', '#irpf', '#declaracao'],
    ilustracaoTipo: 'imposto',
    conteudoCompleto: [
      'A Caixa Econômica Federal já faz a retenção na fonte da alíquota de 30% de Imposto de Renda antes de divulgar e pagar o valor aos ganhadores.',
      'Portanto, o valor que você recebe na sua conta bancária já é 100% líquido de impostos.',
      'Na declaração anual do IRPF, basta lançar a quantia exata na ficha de "Rendimentos Sujeitos à Tributação Exclusiva/Definitiva" com o CNPJ da Caixa Econômica Federal.'
    ]
  },
  // 29
  {
    id: 29,
    tag: 'LOTOFÁCIL',
    categoria: 'lotofacil',
    data: '24 de abr',
    tempo: '5 min',
    titulo: 'Como escolher dezenas na Lotofácil sem acreditar em mito',
    resumo: 'Análise honesta do que funciona e o que é superstição na hora de marcar dezenas. Matemática simples sem promessa de ganho.',
    tags: ['#lotofacil', '#mitos', '#estrategia'],
    ilustracaoTipo: 'grafico',
    conteudoCompleto: [
      'Superstições como escolher dezenas que formam desenhos geométricos no cartão (cruzes, círculos ou diagonais) apenas aumentam a chance de ter que dividir o prêmio com milhares de pessoas.',
      'O método mais sólido consiste em respeitar o equilíbrio natural da física: mesclar números pares e ímpares, controlar a soma geral e usar o desdobramento matemático para cercar mais números com menos cartões.'
    ]
  }
];
