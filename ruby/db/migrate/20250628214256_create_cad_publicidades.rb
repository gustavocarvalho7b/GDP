class CreateCadPublicidades < ActiveRecord::Migration[8.0]
  def change
    create_table :cad_publicidades do |t|
      t.string :titulo
      t.string :descricao
      t.string :botao_link
      t.string :titulo_botao_link
      t.integer :id_publicidade_estado
      t.date :dt_inicio
      t.date :dt_fim
      t.binary :imagem
      t.boolean :padrao

      t.timestamps
    end
  end
end
