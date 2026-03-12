import stripe
from reservations.models import Reservation
class PaymentService:
    @staticmethod
    def create_payment_intent(reservation: Reservation) -> dict:
        return stripe.PaymentIntent.create(
            amount=int(reservation.total_price * 100), currency="usd",
            metadata={"reservation_id": str(reservation.id)},
        )
    @staticmethod
    def confirm_payment(payment_intent_id: str, reservation_id: int):
        Reservation.objects.filter(id=reservation_id).update(status="CONFIRMED", payment_id=payment_intent_id)
