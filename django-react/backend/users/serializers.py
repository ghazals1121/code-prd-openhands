from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","first_name","last_name","role","phone"]
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["email","password","first_name","last_name"]
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
