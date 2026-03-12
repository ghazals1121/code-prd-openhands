# frozen_string_literal: true

class CreateAppointmentRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :appointment_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :phone_number, null: false
      t.date :preferred_date, null: false
      t.string :preferred_time, null: false
      t.text :description, null: false
      t.string :status, null: false, default: "pending"

      t.timestamps
    end

    add_index :appointment_requests, :status
    add_index :appointment_requests, :preferred_date
    add_index :appointment_requests, :created_at
  end
end
