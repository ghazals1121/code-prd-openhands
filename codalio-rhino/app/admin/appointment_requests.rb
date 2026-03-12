# frozen_string_literal: true

# Admin interface for clinic staff to view and manage patient appointment requests.
# Staff can mark requests as reviewed, contacted, scheduled, or rejected.
ActiveAdmin.register AppointmentRequest do
  menu label: "Appointment Requests", priority: 2

  permit_params :name, :phone_number, :preferred_date, :preferred_time, :description, :status

  scope :pending, default: true
  scope :reviewed
  scope :contacted
  scope :scheduled
  scope :rejected
  scope :all

  index do
    selectable_column
    column :id
    column :name
    column :phone_number
    column :preferred_date
    column :preferred_time
    column :status do |req|
      status_tag req.status, class: req.status
    end
    column :user do |req|
      req.user&.email
    end
    column :created_at
    actions
  end

  filter :status, as: :select, collection: AppointmentRequest.distinct.pluck(:status)
  filter :preferred_date
  filter :created_at
  filter :name

  form do |f|
    f.inputs "Appointment Request" do
      f.input :name
      f.input :phone_number
      f.input :preferred_date, as: :date_select
      f.input :preferred_time
      f.input :description, as: :text
      f.input :status, as: :select, collection: %w[pending reviewed contacted scheduled rejected]
    end
    f.actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :phone_number
      row :preferred_date
      row :preferred_time
      row :description
      row :status
      row :user do |req|
        req.user&.email
      end
      row :created_at
      row :updated_at
    end
  end

  action_item :mark_reviewed, only: :show do
    if resource.status == "pending"
      button_to "Mark Reviewed",
                mark_status_admin_appointment_request_path(resource, status: "reviewed"),
                method: :put,
                data: { confirm: "Mark this request as reviewed?" },
                class: "button"
    end
  end

  action_item :mark_contacted, only: :show do
    if %w[pending reviewed].include?(resource.status)
      button_to "Mark Contacted",
                mark_status_admin_appointment_request_path(resource, status: "contacted"),
                method: :put,
                data: { confirm: "Mark this request as contacted?" },
                class: "button"
    end
  end

  action_item :mark_scheduled, only: :show do
    button_to "Mark Scheduled",
              mark_status_admin_appointment_request_path(resource, status: "scheduled"),
              method: :put,
              data: { confirm: "Mark this request as scheduled?" },
              class: "button"
  end

  action_item :mark_rejected, only: :show do
    button_to "Mark Rejected",
              mark_status_admin_appointment_request_path(resource, status: "rejected"),
              method: :put,
              data: { confirm: "Reject this request?" },
              class: "button danger"
  end

  member_action :mark_status, method: :put do
    resource.update!(status: params[:status])
    redirect_to admin_appointment_request_path(resource), notice: "Status updated to #{params[:status]}."
  end
end
