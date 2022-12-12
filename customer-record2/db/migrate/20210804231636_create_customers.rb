class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :customer_name
      t.string :address
      t.string :telephone_number
      t.string :manager
      t.text :memo

      t.timestamps
    end
  end
end
