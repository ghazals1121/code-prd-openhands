# frozen_string_literal: true

# Stores patient appointment requests for the clinic. Patients submit preferred date,
# time, and problem description; clinic staff manage status (reviewed, scheduled, rejected).
class AppointmentRequest < ApplicationRecord
  rhino_controller :appointment_requests

  belongs_to :user

  validates :name, presence: true
  validates :phone_number, presence: true
  validates :preferred_date, presence: true
  validates :preferred_time, presence: true
  validates :description, presence: true
  validates :status, presence: true, inclusion: { in: %w[pending reviewed contacted scheduled rejected] }
end
