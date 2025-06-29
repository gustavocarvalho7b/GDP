class CadPublicidade < ApplicationRecord
  has_one_attached :imagem

  # relacionamento N:N com estados
  has_many :cad_publicidade_estados, foreign_key: :id_publicidade, dependent: :destroy
  has_many :cad_estados, through: :cad_publicidade_estados, source: :cad_estado
end
