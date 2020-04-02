class CreateNovelties < ActiveRecord::Migration[6.0]
  def change
    create_table :novelties do |t|
      t.string :title
      t.text :text
      t.datetime :published_at
      t.string :source
      t.string :source_url
      t.references :author, foreign_key: true
      t.references :category, foreign_key: true
      t.references :age, foreign_key: true

      t.timestamps
    end
  end
end
