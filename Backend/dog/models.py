# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class dog(models.Model):
    # make these pickers instead of text inputs
    location = models.CharField(max_length=50)
    breed = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    user = models.CharField(max_length=50)
