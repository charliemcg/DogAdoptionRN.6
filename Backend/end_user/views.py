# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .models import endUser
from .serializers import endUserSerializer

# Create your views here.


class endUserView(viewsets.ModelViewSet):
    queryset = endUser.objects.all()
    serializer_class = endUserSerializer
