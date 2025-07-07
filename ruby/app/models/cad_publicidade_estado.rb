class CadPublicidadeEstado < ApplicationRecord
  belongs_to :cad_publicidade, class_name: "CadPublicidade", foreign_key: "id_publicidade", inverse_of: :cad_publicidade_estados
  belongs_to :cad_estado, class_name: "CadEstado", foreign_key: "id_estado"
end
