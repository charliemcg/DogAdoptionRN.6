# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import dog
from .serializers import dogSerializer

# Create your views here.


class dogView(viewsets.ModelViewSet):
    queryset = dog.objects.all()
    serializer_class = dogSerializer
