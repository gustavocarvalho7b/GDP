# db/seeds.rb

# Limpa os dados existentes (opcional, mas recomendado para testes)
CadPublicidadeEstado.delete_all
CadPublicidade.delete_all
CadEstado.delete_all

# Criação de estados
estados = [
  { descricao: "São Paulo", sigla: "SP" },
  { descricao: "Rio de Janeiro", sigla: "RJ" },
  { descricao: "Minas Gerais", sigla: "MG" },
  { descricao: "Bahia", sigla: "BA" }
]

estados = estados.map { |attrs| CadEstado.create!(attrs) }

# Criação de publicidades
publicidades = [
  { titulo: "Promoção Verão", descricao: "Descontos incríveis para o verão", botao_link: "https://promo.verao.com", titulo_botao_link: "Aproveite", dt_inicio: Date.today - 10, dt_fim: Date.today + 20 },
  { titulo: "Black Friday", descricao: "Ofertas imperdíveis Black Friday", botao_link: "https://blackfriday.com", titulo_botao_link: "Compre já", dt_inicio: Date.today - 30, dt_fim: Date.today - 25 },
  { titulo: "Natal", descricao: "Presentes de Natal com descontos", botao_link: "https://natal.com", titulo_botao_link: "Veja ofertas", dt_inicio: Date.today + 30, dt_fim: Date.today + 60 }
]

publicidades = publicidades.map { |attrs| CadPublicidade.create!(attrs) }

# Associação publicidades <-> estados
# Promoção Verão válida para SP e RJ
CadPublicidadeEstado.create!(id_publicidade: publicidades[0].id, id_estado: estados[0].id)
CadPublicidadeEstado.create!(id_publicidade: publicidades[0].id, id_estado: estados[1].id)

# Black Friday válida para MG
CadPublicidadeEstado.create!(id_publicidade: publicidades[1].id, id_estado: estados[2].id)

# Natal válida para BA e SP
CadPublicidadeEstado.create!(id_publicidade: publicidades[2].id, id_estado: estados[3].id)
CadPublicidadeEstado.create!(id_publicidade: publicidades[2].id, id_estado: estados[0].id)

puts "Seeds carregados com sucesso!"