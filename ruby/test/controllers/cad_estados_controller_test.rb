require "test_helper"

class CadEstadosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cad_estado = cad_estados(:one)
  end

  test "should get index" do
    get cad_estados_url, as: :json
    assert_response :success
  end

  test "should create cad_estado" do
    assert_difference("CadEstado.count") do
      post cad_estados_url, params: { cad_estado: { descricao: @cad_estado.descricao, sigla: @cad_estado.sigla } }, as: :json
    end

    assert_response :created
  end

  test "should show cad_estado" do
    get cad_estado_url(@cad_estado), as: :json
    assert_response :success
  end

  test "should update cad_estado" do
    patch cad_estado_url(@cad_estado), params: { cad_estado: { descricao: @cad_estado.descricao, sigla: @cad_estado.sigla } }, as: :json
    assert_response :success
  end

  test "should destroy cad_estado" do
    assert_difference("CadEstado.count", -1) do
      delete cad_estado_url(@cad_estado), as: :json
    end

    assert_response :no_content
  end
end
