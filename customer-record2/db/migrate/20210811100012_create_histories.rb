class CreateHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :histories do |t|
      t.string :action
      t.integer :customer_id
      t.string :result
      t.text :caption

      t.timestamps
    end
  end
end
