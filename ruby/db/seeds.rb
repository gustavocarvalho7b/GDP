require 'date'
require 'base64'

# Limpeza
CadPublicidadeEstado.delete_all
CadPublicidade.delete_all
CadEstado.delete_all

# Criação dos estados
estados = [
  { descricao: "São Paulo", sigla: "SP" },
  { descricao: "Rio de Janeiro", sigla: "RJ" },
  { descricao: "Minas Gerais", sigla: "MG" },
  { descricao: "Bahia", sigla: "BA" }
]
estados = estados.map { |attrs| CadEstado.create!(attrs) }
estados_by_sigla = estados.index_by(&:sigla)

# Helper para intervalo de datas
def intervalo(inicio_em_dias, fim_em_dias)
  {
    dt_inicio: Date.today + inicio_em_dias,
    dt_fim: Date.today + fim_em_dias
  }
end

# Helper para carregar imagem base64
def carregar_imagem(nome_arquivo)
  path = Rails.root.join("db/seeds/images/#{nome_arquivo}")
  return nil unless File.exist?(path)

  conteudo = File.open(path, 'rb') { |f| f.read }
  "data:image/jpeg;base64,#{Base64.strict_encode64(conteudo)}"
end

# Publicidades com mapeamento de imagem
publicidades = [
  {
    titulo: "Promoção Verão",
    imagem: "verao.jpg",
    descricao: "Descontos incríveis para o verão",
    botao_link: "https://promo.verao.com",
    titulo_botao_link: "Aproveite",
    estados: %w[SP RJ],
    **intervalo(0, 20)
  },
  {
    titulo: "Natal Antecipado",
    imagem: "natal.jpg",
    descricao: "Compre seus presentes de Natal com desconto",
    botao_link: "https://natal.com",
    titulo_botao_link: "Ver ofertas",
    estados: %w[MG BA],
    **intervalo(21, 50)
  },
  {
    titulo: "Volta às Aulas",
    imagem: "aula.jpg",
    descricao: "Materiais escolares com super desconto",
    botao_link: "https://voltaasaulas.com",
    titulo_botao_link: "Comprar agora",
    estados: %w[SP MG],
    **intervalo(51, 75)
  },
  {
    titulo: "Férias de Julho",
    imagem: "ferias.jpg",
    descricao: "Pacotes de viagens promocionais",
    botao_link: "https://ferias.com",
    titulo_botao_link: "Garanta já",
    estados: %w[RJ BA],
    **intervalo(76, 95)
  },
  {
    titulo: "Ano Novo Econômico",
    imagem: "economia.jpg",
    descricao: "Comece o ano com economia",
    botao_link: "https://anonovo.com",
    titulo_botao_link: "Confira agora",
    estados: %w[SP BA],
    **intervalo(96, 115)
  },
  {
    titulo: "Carnaval de Ofertas",
    imagem: "carnaval.jpg",
    descricao: "Descontos para curtir o Carnaval",
    botao_link: "https://carnaval.com",
    titulo_botao_link: "Aproveitar",
    estados: %w[MG RJ],
    **intervalo(116, 135)
  },
  {
    titulo: "Semana da Economia SP",
    imagem: "semana.jpg",
    descricao: "Ofertas exclusivas para moradores de São Paulo",
    botao_link: "https://economiasp.com",
    titulo_botao_link: "Confira",
    estados: %w[SP],
    **intervalo(136, 150)
  },
  {
    titulo: "Bahia Tech Week",
    imagem: "bahia.jpg",
    descricao: "Feira de tecnologia e inovação na Bahia",
    botao_link: "https://bahiatechweek.com",
    titulo_botao_link: "Saiba mais",
    estados: %w[BA],
    **intervalo(151, 170)
  },
  {
    titulo: "Mega Campanha Nacional",
    imagem: "mega.jpg",
    descricao: "Promoções válidas em todo o Brasil!",
    botao_link: "https://megacampanha.com",
    titulo_botao_link: "Aproveite agora",
    estados: %w[SP RJ MG BA],
    **intervalo(171, 190)
  },
  {
    titulo: "Outubro de Ofertas",
    imagem: "outubro.jpg",
    descricao: "Comece o mês economizando",
    botao_link: "https://outubroofertas.com",
    titulo_botao_link: "Ver promoções",
    estados: %w[MG BA],
    **intervalo(191, 210)
  }
]

publicidades.each do |attrs|
  estado_siglas = attrs.delete(:estados)
  nome_imagem = attrs.delete(:imagem)

  pub = CadPublicidade.create!(
    **attrs,
    imagem_base64: carregar_imagem(nome_imagem)
  )

  estado_siglas.each do |sigla|
    CadPublicidadeEstado.create!(
      id_publicidade: pub.id,
      id_estado: estados_by_sigla[sigla].id
    )
  end
end

puts "Seeds carregados com sucesso!"
