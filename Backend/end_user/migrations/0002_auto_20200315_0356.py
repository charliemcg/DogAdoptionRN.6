# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-03-15 03:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('end_user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enduser',
            name='email',
        ),
        migrations.RemoveField(
            model_name='enduser',
            name='id',
        ),
        migrations.AddField(
            model_name='enduser',
            name='username',
            field=models.CharField(default=django.utils.timezone.now, max_length=50, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
