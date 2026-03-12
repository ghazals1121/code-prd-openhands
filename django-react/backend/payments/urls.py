from django.urls import path
from .views import CreatePaymentIntentView, StripeWebhookView
urlpatterns = [path("create-intent/", CreatePaymentIntentView.as_view()), path("webhook/", StripeWebhookView.as_view())]
