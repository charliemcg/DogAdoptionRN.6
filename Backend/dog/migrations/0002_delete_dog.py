# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-03-14 08:49
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dog', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='dog',
        ),
    ]
