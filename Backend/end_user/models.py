# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class endUser(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # make sure this is unique
    username = models.CharField(max_length=50, primary_key=True)
    # use a picker
    location = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    # use an array
    # dogs = models.CharField(max_length=50)
