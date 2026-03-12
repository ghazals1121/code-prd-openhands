class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :number, null: false
      t.string :room_type, null: false
      t.decimal :price_per_night, precision: 10, scale: 2, null: false
      t.integer :capacity, null: false
      t.jsonb :amenities, default: []
      t.boolean :is_available, default: true
      t.timestamps
    end
    add_index :rooms, :number, unique: true
  end
end
