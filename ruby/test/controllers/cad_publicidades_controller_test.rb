require "test_helper"

class CadPublicidadesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cad_publicidade = cad_publicidades(:one)
  end

  test "should get index" do
    get cad_publicidades_url, as: :json
    assert_response :success
  end

  test "should create cad_publicidade" do
    assert_difference("CadPublicidade.count") do
      post cad_publicidades_url, params: { cad_publicidade: { botao_link: @cad_publicidade.botao_link, descricao: @cad_publicidade.descricao, dt_fim: @cad_publicidade.dt_fim, dt_inicio: @cad_publicidade.dt_inicio, id_publicidade_estado: @cad_publicidade.id_publicidade_estado, titulo: @cad_publicidade.titulo, titulo_botao_link: @cad_publicidade.titulo_botao_link } }, as: :json
    end

    assert_response :created
  end

  test "should show cad_publicidade" do
    get cad_publicidade_url(@cad_publicidade), as: :json
    assert_response :success
  end

  test "should update cad_publicidade" do
    patch cad_publicidade_url(@cad_publicidade), params: { cad_publicidade: { botao_link: @cad_publicidade.botao_link, descricao: @cad_publicidade.descricao, dt_fim: @cad_publicidade.dt_fim, dt_inicio: @cad_publicidade.dt_inicio, id_publicidade_estado: @cad_publicidade.id_publicidade_estado, titulo: @cad_publicidade.titulo, titulo_botao_link: @cad_publicidade.titulo_botao_link } }, as: :json
    assert_response :success
  end

  test "should destroy cad_publicidade" do
    assert_difference("CadPublicidade.count", -1) do
      delete cad_publicidade_url(@cad_publicidade), as: :json
    end

    assert_response :no_content
  end
end
