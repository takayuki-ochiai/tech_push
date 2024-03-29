# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170317123006) do

  create_table "book_topics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "book_id"
    t.integer  "topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_book_topics_on_book_id", using: :btree
    t.index ["topic_id", "book_id"], name: "index_book_topics_on_topic_id_and_book_id", unique: true, using: :btree
    t.index ["topic_id"], name: "index_book_topics_on_topic_id", using: :btree
  end

  create_table "books", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title",                                          null: false
    t.string   "title_kana"
    t.string   "publisher_name",                                 null: false
    t.string   "author",                                         null: false
    t.string   "author_kana"
    t.text     "item_url",         limit: 65535,                 null: false
    t.text     "small_image_url",  limit: 65535
    t.text     "medium_image_url", limit: 65535
    t.text     "large_image_url",  limit: 65535
    t.string   "isbn",                                           null: false
    t.integer  "price",                                          null: false
    t.boolean  "display_flg",                    default: false, null: false
    t.date     "sales_date",                                     null: false
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.index ["isbn"], name: "index_books_on_isbn", unique: true, using: :btree
  end

  create_table "devices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.string   "one_signal_player_id", null: false
    t.string   "device_model",         null: false
    t.string   "device_os",            null: false
    t.string   "type",                 null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["user_id"], name: "index_devices_on_user_id", using: :btree
  end

  create_table "interests", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "topic_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id", "user_id"], name: "index_interests_on_topic_id_and_user_id", unique: true, using: :btree
    t.index ["topic_id"], name: "index_interests_on_topic_id", using: :btree
    t.index ["user_id"], name: "index_interests_on_user_id", using: :btree
  end

  create_table "notices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "book_id"
    t.integer  "user_id"
    t.integer  "device_id"
    t.boolean  "notified",             default: false, null: false
    t.string   "one_signal_player_id",                 null: false
    t.string   "device_model",                         null: false
    t.string   "device_os",                            null: false
    t.string   "headings",                             null: false
    t.string   "contents",                             null: false
    t.datetime "notify_schedule"
    t.datetime "notify_datetime"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "link_url"
    t.string   "chrome_web_icon"
    t.index ["book_id", "user_id"], name: "index_notices_on_book_id_and_user_id", unique: true, using: :btree
    t.index ["book_id"], name: "index_notices_on_book_id", using: :btree
    t.index ["device_id"], name: "index_notices_on_device_id", using: :btree
    t.index ["user_id"], name: "index_notices_on_user_id", using: :btree
  end

  create_table "topic_tree_paths", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "ancestor_id",                   null: false
    t.integer  "descendant_id",                 null: false
    t.boolean  "parental_flg",  default: false, null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.index ["ancestor_id", "descendant_id"], name: "index_topic_tree_paths_on_ancestor_id_and_descendant_id", unique: true, using: :btree
    t.index ["descendant_id"], name: "fk_rails_6649b360cb", using: :btree
  end

  create_table "topics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",       null: false
    t.string   "type",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "provider",                             default: "email", null: false
    t.string   "uid",                                  default: "",      null: false
    t.string   "encrypted_password",                   default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.text     "access_token",           limit: 65535
    t.boolean  "admin_flg",                            default: false
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  add_foreign_key "book_topics", "books"
  add_foreign_key "book_topics", "topics"
  add_foreign_key "devices", "users"
  add_foreign_key "interests", "topics"
  add_foreign_key "interests", "users"
  add_foreign_key "notices", "books"
  add_foreign_key "notices", "devices"
  add_foreign_key "notices", "users"
  add_foreign_key "topic_tree_paths", "topics", column: "ancestor_id"
  add_foreign_key "topic_tree_paths", "topics", column: "descendant_id"
end
