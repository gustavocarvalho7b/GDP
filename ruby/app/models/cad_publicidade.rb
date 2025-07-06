class CadPublicidade < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_publicidade, dependent: :destroy
  has_many :cad_estados, through: :cad_publicidade_estados

  validates :dt_inicio, :dt_fim, presence: true
  validate :sem_conflito_de_vigencia

  def imagem_base64
    return nil unless imagem.present?

    tipo = detectar_tipo_imagem(imagem)
    "data:#{tipo};base64,#{Base64.strict_encode64(imagem)}"
  end

  def imagem_base64=(base64_str)
    if base64_str.blank?
      self.imagem = nil
    else
      self.imagem = Base64.decode64(base64_str.split(",").last)
    end
  end

  private

  def sem_conflito_de_vigencia
    estado_ids = cad_estados.map(&:id)
    if estado_ids.empty? && cad_publicidade_estados.any?
      estado_ids = cad_publicidade_estados.map(&:id_estado)
    end

    return if estado_ids.empty? || dt_inicio.blank? || dt_fim.blank?

    estado_ids.each do |estado_id|
      conflitos = CadPublicidade.joins(:cad_estados)
        .where(cad_estados: { id: estado_id })
        .where.not(id: self.id)
        .where.not("dt_fim < ? OR dt_inicio > ?", dt_inicio, dt_fim)

      if conflitos.exists?
        estado_nome = CadEstado.find_by(id: estado_id)&.nome || "desconhecido"
        errors.add(:base, "Já existe publicidade vigente para o estado #{estado_nome} no período selecionado.")
      end
    end
  end

  def detectar_tipo_imagem(data)
    case data[0..3].unpack("C*")
    when [ 0x89, 0x50, 0x4E, 0x47 ]
      "image/png"
    when  [ 0xFF, 0xD8, 0xFF, 0xE0 ], [ 0xFF, 0xD8, 0xFF, 0xE1 ]
      "image/jpeg"
    else
      "application/octet-stream"
    end
  end
end
