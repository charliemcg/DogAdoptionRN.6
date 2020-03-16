from rest_framework import serializers
from .models import endUser


class endUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = endUser
        fields = ('first_name', 'last_name',
                  'username', 'location', 'password')
