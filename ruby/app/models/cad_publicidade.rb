class CadPublicidade < ApplicationRecord
  has_many :cad_publicidade_estados, foreign_key: :id_publicidade
  has_many :cad_estados, through: :cad_publicidade_estados

  def imagem_base64
    return nil unless imagem.present?

    tipo = detectar_tipo_imagem(imagem)
    "data:#{tipo};base64,#{Base64.strict_encode64(imagem)}"
  end

  def imagem_base64=(base64_str)
    if base64_str.present?
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
end
