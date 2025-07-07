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

    # Associa os estados antes do save
    if params[:cad_publicidade][:id_publicidade_estado].present?
      estados = CadEstado.where(id: params[:cad_publicidade][:id_publicidade_estado])
      @cad_publicidade.cad_estados = estados
    end

    if @cad_publicidade.save
      render json: @cad_publicidade.as_json(methods: [ :imagem_base64 ], except: [ :imagem ]), status: :created
    else
      Rails.logger.debug " Erros ao salvar publicidade: #{@cad_publicidade.errors.full_messages}"
      render json: @cad_publicidade.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cad_publicidades/1
  def update
    if params[:cad_publicidade][:id_publicidade_estado].present?
      estados = CadEstado.where(id: params[:cad_publicidade][:id_publicidade_estado])
      @cad_publicidade.cad_estados = estados
    else
      @cad_publicidade.cad_estados.clear
    end

    if @cad_publicidade.update(cad_publicidade_params.except(:id_publicidade_estado))
      render json: @cad_publicidade.as_json(methods: [ :imagem_base64 ], except: [ :imagem ]), status: :ok
    else
      Rails.logger.debug "Erros ao atualizar publicidade: #{@cad_publicidade.errors.full_messages}"
      render json: @cad_publicidade.errors.full_messages, status: :unprocessable_entity
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
