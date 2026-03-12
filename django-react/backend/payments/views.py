import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from reservations.models import Reservation
stripe.api_key = settings.STRIPE_SECRET_KEY if hasattr(settings, "STRIPE_SECRET_KEY") else ""

class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        reservation = Reservation.objects.get(id=request.data["reservation_id"], user=request.user)
        intent = stripe.PaymentIntent.create(amount=int(reservation.total_price * 100), currency="usd")
        return Response({"client_secret": intent.client_secret})

class StripeWebhookView(APIView):
    def post(self, request):
        event = stripe.Webhook.construct_event(request.body, request.META.get("HTTP_STRIPE_SIGNATURE"), "")
        if event["type"] == "payment_intent.succeeded":
            rid = event["data"]["object"]["metadata"]["reservation_id"]
            Reservation.objects.filter(id=rid).update(status="CONFIRMED")
        return Response({"status": "ok"})
