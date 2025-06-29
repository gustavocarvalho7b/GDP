class FixColumnNamesInCadPublicidadeEstados < ActiveRecord::Migration[8.0]
  def change
    rename_column :cad_publicidade_estados, :cad_publicidade_id, :id_publicidade
    rename_column :cad_publicidade_estados, :cad_estado_id, :id_estado
  end
end
