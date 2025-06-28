class CreateCadEstados < ActiveRecord::Migration[8.0]
  def change
    create_table :cad_estados do |t|
      t.string :descricao
      t.string :sigla

      t.timestamps
    end
  end
end
