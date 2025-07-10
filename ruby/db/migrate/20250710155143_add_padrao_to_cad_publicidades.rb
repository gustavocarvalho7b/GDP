class AddPadraoToCadPublicidades < ActiveRecord::Migration[8.0]
  def change
    add_column :cad_publicidades, :padrao, :boolean, default: false
  end
end
