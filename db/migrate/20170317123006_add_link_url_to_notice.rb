class AddLinkUrlToNotice < ActiveRecord::Migration[5.0]
  def change
    add_column :notices, :link_url, :string
    add_column :notices, :chrome_web_icon, :string
  end
end
