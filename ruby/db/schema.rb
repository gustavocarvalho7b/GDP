# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_10_155143) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cad_estados", force: :cascade do |t|
    t.string "descricao"
    t.string "sigla"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cad_publicidade_estados", force: :cascade do |t|
    t.bigint "id_publicidade", null: false
    t.bigint "id_estado", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cad_publicidades", force: :cascade do |t|
    t.string "titulo"
    t.string "descricao"
    t.string "botao_link"
    t.integer "id_publicidade_estado"
    t.string "titulo_botao_link"
    t.date "dt_inicio"
    t.date "dt_fim"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.binary "imagem"
    t.boolean "atual", default: false
    t.boolean "padrao", default: false
  end

  add_foreign_key "cad_publicidade_estados", "cad_estados", column: "id_estado"
  add_foreign_key "cad_publicidade_estados", "cad_publicidades", column: "id_publicidade"
end
