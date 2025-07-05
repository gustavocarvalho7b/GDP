require "test_helper"

class CadPublicidadeEstadosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cad_publicidade_estado = cad_publicidade_estados(:one)
  end

  test "should get index" do
    get cad_publicidade_estados_url, as: :json
    assert_response :success
  end

  test "should create cad_publicidade_estado" do
    assert_difference("CadPublicidadeEstado.count") do
      post cad_publicidade_estados_url, params: { cad_publicidade_estado: { id_estado_id: @cad_publicidade_estado.id_estado_id, id_publicidade_id: @cad_publicidade_estado.id_publicidade_id } }, as: :json
    end

    assert_response :created
  end

  test "should show cad_publicidade_estado" do
    get cad_publicidade_estado_url(@cad_publicidade_estado), as: :json
    assert_response :success
  end

  test "should update cad_publicidade_estado" do
    patch cad_publicidade_estado_url(@cad_publicidade_estado), params: { cad_publicidade_estado: { id_estado_id: @cad_publicidade_estado.id_estado_id, id_publicidade_id: @cad_publicidade_estado.id_publicidade_id } }, as: :json
    assert_response :success
  end

  test "should destroy cad_publicidade_estado" do
    assert_difference("CadPublicidadeEstado.count", -1) do
      delete cad_publicidade_estado_url(@cad_publicidade_estado), as: :json
    end

    assert_response :no_content
  end
end
