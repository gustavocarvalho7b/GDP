class CadPublicidadeEstadosController < ApplicationController
  before_action :set_cad_publicidade_estado, only: %i[ show update destroy ]

  # GET /cad_publicidade_estados
  def index
    @cad_publicidade_estados = CadPublicidadeEstado.all

    render json: @cad_publicidade_estados
  end

  # GET /cad_publicidade_estados/1
  def show
    render json: @cad_publicidade_estado
  end

  # POST /cad_publicidade_estados
  def create
    @cad_publicidade_estado = CadPublicidadeEstado.new(cad_publicidade_estado_params)

    if @cad_publicidade_estado.save
      render json: @cad_publicidade_estado, status: :created, location: @cad_publicidade_estado
    else
      render json: @cad_publicidade_estado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cad_publicidade_estados/1
  def update
    if @cad_publicidade_estado.update(cad_publicidade_estado_params)
      render json: @cad_publicidade_estado
    else
      render json: @cad_publicidade_estado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cad_publicidade_estados/1
  def destroy
    @cad_publicidade_estado.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cad_publicidade_estado
      @cad_publicidade_estado = CadPublicidadeEstado.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def cad_publicidade_estado_params
      params.expect(cad_publicidade_estado: [ :id_publicidade_id, :id_estado_id ])
    end
end
