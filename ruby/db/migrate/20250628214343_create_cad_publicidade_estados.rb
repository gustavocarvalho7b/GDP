class CreateCadPublicidadeEstados < ActiveRecord::Migration[8.0]
  def change
    create_table :cad_publicidade_estados do |t|
      t.references :id_publicidade, null: false, foreign_key: true
      t.references :id_estado, null: false, foreign_key: true

      t.timestamps
    end
  end
end
