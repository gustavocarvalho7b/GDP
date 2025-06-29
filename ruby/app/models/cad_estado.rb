class CadEstado < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_estado, dependent: :destroy
  has_many :cad_publicidades, through: :cad_publicidade_estados, source: :cad_publicidade
end
