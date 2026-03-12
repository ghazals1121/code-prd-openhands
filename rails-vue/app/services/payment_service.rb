require "stripe"
class PaymentService
  def self.create_intent(reservation)
    Stripe::PaymentIntent.create(
      amount: (reservation.total_price * 100).to_i,
      currency: "usd",
      metadata: { reservation_id: reservation.id }
    )
  end
  def self.construct_webhook_event(payload, sig_header)
    Stripe::Webhook.construct_event(payload, sig_header, ENV["STRIPE_WEBHOOK_SECRET"])
  end
  def self.handle_event(event)
    case event["type"]
    when "payment_intent.succeeded"
      rid = event["data"]["object"]["metadata"]["reservation_id"]
      Reservation.find(rid).update!(status: "confirmed", payment_id: event["data"]["object"]["id"])
    end
  end
end
