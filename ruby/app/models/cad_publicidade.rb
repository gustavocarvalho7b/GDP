class CadPublicidade < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_publicidade, inverse_of: :cad_publicidade, dependent: :destroy
  has_many :cad_estados, through: :cad_publicidade_estados

  validate :unica_publicidade_padrao_por_estado, if: :padrao?
  validate :deve_ter_pelo_menos_um_estado
  validate :verifica_conflito_de_datas
  validates :titulo, presence: { message: " obrigatório" }
  validates :imagem, presence: { message: " obrigatória" }
  validates :descricao, presence: { message: " obrigatória" }
  validates :botao_link, presence: { message: " obrigatório" }
  validates :titulo_botao_link, presence: { message: " obrigatório" }


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

  def verifica_conflito_de_datas
    return if dt_inicio.blank? || dt_fim.blank?

    estado_ids = cad_estados.map(&:id)

    return if estado_ids.blank?

    conflitos = CadPublicidade
      .joins(:cad_publicidade_estados)
      .where(cad_publicidade_estados: { id_estado: estado_ids })
      .where.not(id: id)
      .where("cad_publicidades.dt_inicio <= ? AND cad_publicidades.dt_fim >= ?", dt_fim, dt_inicio)
      .distinct

    if conflitos.exists?
      errors.add(:base, "Já existe uma publicidade no estado selecionado com a mesma data de vigência.")
    end
  end

  def deve_ter_pelo_menos_um_estado
    if cad_estados.empty?
      errors.add(:base, "A publicidade deve estar vinculada a pelo menos um estado.")
    end
  end

  before_save :desmarcar_outras_publicidades_padrao, if: -> { padrao? }

  def desmarcar_outras_publicidades_padrao
    return if cad_estados.empty?

    CadPublicidade
      .joins(:cad_estados)
      .where(cad_estados: { id: cad_estados.map(&:id) })
      .where.not(id: id)
      .where(padrao: true)
      .update_all(padrao: false)
  end
  
  def unica_publicidade_padrao_por_estado
    return unless padrao?

    estado_ids = cad_estados.pluck(:id)

    conflito = CadPublicidade
      .joins(:cad_publicidade_estados)
      .where(padrao: true)
      .where.not(id: id)
      .where(cad_publicidade_estados: { id_estado: estado_ids })
      .exists?

    if conflito
      errors.add(:padrao, "já existe uma publicidade padrão para um dos estados selecionados")
    end
  end
end
