# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class message(models.Model):
    content = models.CharField(max_length=750)
    sender = models.CharField(max_length=50)
    receiver = models.CharField(max_length=50)
