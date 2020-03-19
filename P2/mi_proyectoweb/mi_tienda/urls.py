from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^index', views.home_view),
    url(r'^alimentacion', views.alimentacion_view),
    url(r'^ropa', views.ropa_view),
    url(r'^suplementacion', views.suplementacion_view),
    url(r'^tecnologia', views.tecnologia_view),
]
