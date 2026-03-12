# frozen_string_literal: true

# Sets user_id from current_user on create so patients can only submit requests for themselves.
module Rhino
  class AppointmentRequestsController < Rhino::CrudController
    before_action :set_user_id_on_create, only: [:create]

    private

    def set_user_id_on_create
      return unless current_user

      if params[:appointment_request].present?
        params[:appointment_request][:user_id] = current_user.id
      else
        params[:user_id] = current_user.id
      end
    end
  end
end
