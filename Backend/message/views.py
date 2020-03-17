# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import message
from .serializers import messageSerializer

# Create your views here.


class messageView(viewsets.ModelViewSet):
    queryset = message.objects.all()
    serializer_class = messageSerializer
