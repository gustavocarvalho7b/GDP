class CadPublicidadesController < ApplicationController
  before_action :set_cad_publicidade, only: %i[show update destroy]

  # GET /cad_publicidades
  def index
    @cad_publicidades = CadPublicidade.includes(:cad_estados).all

    render json: @cad_publicidades.as_json(
      include: {
        cad_estados: {
          only: [ :id, :descricao, :sigla ]
        }
      },
      methods: [ :imagem_base64 ],
      except: [ :created_at, :updated_at, :imagem ]
    )
  end

  # GET /cad_publicidades/1
  def show
    render json: @cad_publicidade.as_json(methods: [ :imagem_base64 ], except: [ :imagem ])
  end

  # POST /cad_publicidades
  def create
    @cad_publicidade = CadPublicidade.new(cad_publicidade_params.except(:id_publicidade_estado))

    # ⚠️ Constrói as associações ANTES do save
    if params[:cad_publicidade][:id_publicidade_estado].present?
      params[:cad_publicidade][:id_publicidade_estado].each do |estado_id|
        @cad_publicidade.cad_publicidade_estados.build(id_estado: estado_id)
      end
    end

    if @cad_publicidade.save
      render json: @cad_publicidade.as_json(methods: [:imagem_base64], except: [:imagem]), status: :created
    else
      render json: @cad_publicidade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cad_publicidades/1
  def update
    if @cad_publicidade.update(cad_publicidade_params.except(:id_publicidade_estado))
      @cad_publicidade.cad_publicidade_estados.destroy_all

      if params[:cad_publicidade][:id_publicidade_estado].present?
        params[:cad_publicidade][:id_publicidade_estado].each do |estado_id|
          CadPublicidadeEstado.create!(
            id_publicidade: @cad_publicidade.id,
            id_estado: estado_id
          )
        end
      end

      render json: @cad_publicidade.as_json(methods: [:imagem_base64], except: [:imagem])
    else
      render json: @cad_publicidade.errors, status: :unprocessable_entity
    end
  end

    # DELETE /cad_publicidades/1
    def destroy
      @cad_publicidade.destroy!
    end

  private

  def set_cad_publicidade
    @cad_publicidade = CadPublicidade.find(params[:id])
  end


  def cad_publicidade_params
    params.require(:cad_publicidade).permit(
      :titulo, :descricao, :botao_link,
      :titulo_botao_link, :dt_inicio, :dt_fim, :imagem_base64,
      id_publicidade_estado: []
    )
  end
end
