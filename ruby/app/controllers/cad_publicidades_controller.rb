class CadPublicidadesController < ApplicationController
  before_action :set_cad_publicidade, only: %i[show update destroy]

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

  if params[:imagem].present?
    @cad_publicidade.imagem.attach(params[:imagem])
  end

  if @cad_publicidade.save
    # Criar vínculos com estados usando o campo id_publicidade_estado
    if params[:cad_publicidade][:id_publicidade_estado].present?
      params[:cad_publicidade][:id_publicidade_estado].each do |estado_id|
        CadPublicidadeEstado.create!(
          id_publicidade: @cad_publicidade.id,
          id_estado: estado_id
        )
      end
    end

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

  def set_cad_publicidade
    @cad_publicidade = CadPublicidade.find(params[:id])
  end

  def cad_publicidade_params
    params.require(:cad_publicidade).permit(
      :titulo, :descricao, :botao_link,
      :titulo_botao_link, :dt_inicio, :dt_fim, :imagem, id_publicidade_estado: []
    )
  end
end