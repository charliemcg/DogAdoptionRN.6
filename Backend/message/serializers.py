from rest_framework import serializers
from .models import message


class messageSerializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = ('id', 'content', 'sender', 'receiver')
