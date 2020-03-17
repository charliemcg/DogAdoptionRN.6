from rest_framework import serializers
from .models import dog


class dogSerializer(serializers.ModelSerializer):
    class Meta:
        model = dog
        fields = ('id', 'location', 'breed', 'price', 'user')
