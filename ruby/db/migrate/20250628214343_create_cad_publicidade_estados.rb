class CreateCadPublicidadeEstados < ActiveRecord::Migration[8.0]
  def change
    create_table :cad_publicidade_estados do |t|
      t.bigint :id_publicidade, null: false
      t.bigint :id_estado, null: false

      t.timestamps
    end

    add_foreign_key :cad_publicidade_estados, :cad_publicidades, column: :id_publicidade
    add_foreign_key :cad_publicidade_estados, :cad_estados, column: :id_estado
  end
end
