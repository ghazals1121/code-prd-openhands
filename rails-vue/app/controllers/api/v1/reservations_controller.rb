module Api
  module V1
    class ReservationsController < ApplicationController
      def index
        render json: current_user.reservations.includes(:room).order(created_at: :desc), each_serializer: ReservationSerializer
      end
      def create
        reservation = current_user.reservations.build(reservation_params)
        if reservation.save
          ReservationMailerJob.perform_later(reservation.id)
          render json: reservation, serializer: ReservationSerializer, status: :created
        else
          render json: { errors: reservation.errors }, status: :unprocessable_entity
        end
      end
      def show
        render json: current_user.reservations.find(params[:id]), serializer: ReservationSerializer
      end
      def destroy
        reservation = current_user.reservations.find(params[:id])
        reservation.update!(status: "cancelled")
        render json: { message: "Reservation cancelled" }
      end
      private
      def reservation_params = params.require(:reservation).permit(:room_id, :check_in, :check_out)
    end
  end
end
