class CadPublicidadesController < ApplicationController
  before_action :set_cad_publicidade, only: %i[ show update destroy ]

  # GET /cad_publicidades
  def index
    @cad_publicidades = CadPublicidade.all

    render json: @cad_publicidades
  end

  # GET /cad_publicidades/1
  def show
    render json: @cad_publicidade
  end

  # POST /cad_publicidades
  def create
    @cad_publicidade = CadPublicidade.new(cad_publicidade_params)

    if @cad_publicidade.save
      render json: @cad_publicidade, status: :created, location: @cad_publicidade
    else
      render json: @cad_publicidade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cad_publicidades/1
  def update
    if @cad_publicidade.update(cad_publicidade_params)
      render json: @cad_publicidade
    else
      render json: @cad_publicidade.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cad_publicidades/1
  def destroy
    @cad_publicidade.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cad_publicidade
      @cad_publicidade = CadPublicidade.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def cad_publicidade_params
      params.expect(cad_publicidade: [ :titulo, :descricao, :botao_link, :id_publicidade_estado, :titulo_botao_link, :dt_inicio, :dt_fim ])
    end
end
