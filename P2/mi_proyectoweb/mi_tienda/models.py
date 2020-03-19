# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class tecnologia (models.Model):
    name = models.CharField( max_length=50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class ropa (models.Model):
    name = models.CharField( max_length=50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class alimentacion (models.Model):
    name = models.CharField( max_length=50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name

class suplementacion (models.Model):
    name = models.CharField( max_length=50)
    precio = models.FloatField()
    stock = models.IntegerField()

    def __str__(self):
        return self.name
