class CadEstado < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_estado, dependent: :destroy
  has_many :cad_publicidades, through: :cad_publicidade_estados, source: :cad_publicidade

  before_validation { sigla&.upcase! }
  validates :sigla,
  presence: { message: " obrigatória" },
  length: { is: 2, message: " deve ter exatamente 2 caracteres" }
  validates :descricao, presence: { message: " obrigatória" }
end
