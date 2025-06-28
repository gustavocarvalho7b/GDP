class CadEstadosController < ApplicationController
  before_action :set_cad_estado, only: %i[ show update destroy ]

  # GET /cad_estados
  def index
    @cad_estados = CadEstado.all

    render json: @cad_estados
  end

  # GET /cad_estados/1
  def show
    render json: @cad_estado
  end

  # POST /cad_estados
  def create
    @cad_estado = CadEstado.new(cad_estado_params)

    if @cad_estado.save
      render json: @cad_estado, status: :created, location: @cad_estado
    else
      render json: @cad_estado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cad_estados/1
  def update
    if @cad_estado.update(cad_estado_params)
      render json: @cad_estado
    else
      render json: @cad_estado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cad_estados/1
  def destroy
    @cad_estado.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cad_estado
      @cad_estado = CadEstado.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def cad_estado_params
      params.expect(cad_estado: [ :descricao, :sigla ])
    end
end
