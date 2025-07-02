class CadPublicidade < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_publicidade, dependent: :destroy
  has_many :cad_estados, through: :cad_publicidade_estados, source: :cad_estado
end
