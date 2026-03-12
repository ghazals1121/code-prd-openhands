class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.date :check_in, null: false
      t.date :check_out, null: false
      t.decimal :total_price, precision: 10, scale: 2
      t.string :status, default: "pending"
      t.string :payment_id
      t.timestamps
    end
  end
end
