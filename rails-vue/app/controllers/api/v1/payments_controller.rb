module Api
  module V1
    class PaymentsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:webhook]
      def create_intent
        reservation = current_user.reservations.find(params[:reservation_id])
        intent = PaymentService.create_intent(reservation)
        render json: { client_secret: intent.client_secret }
      end
      def webhook
        event = PaymentService.construct_webhook_event(request.body.read, request.env["HTTP_STRIPE_SIGNATURE"])
        PaymentService.handle_event(event)
        render json: { status: "ok" }
      end
    end
  end
end
