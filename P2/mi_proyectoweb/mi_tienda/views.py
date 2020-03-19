# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import tecnologia
from mi_tienda.models import suplementacion
from mi_tienda.models import ropa
from mi_tienda.models import alimentacion


# Create your views here.
def home_view(request):
    return render(request, "index.html", {})

def tecnologia_view(request):
    return render(request, "tecnologia.html", {})

def suplementacion_view(request):
    return render(request, "suplementacion.html", {})

def ropa_view(request):
    return render(request, "ropa.html", {})

def alimentacion_view(request):
    return render(request, "alimentacion.html", {})

"""
def search_view (request):
    return render(request, "search.html", {})


def searching(request):
    query = request.GET.get('q', '')
    if query:
        qset = (
            Q(nombre__icontains=query) |
            Q(precio__icontains=query) |
            Q(stock__icontains=query)
        )
        results = London.objects.filter(qset).distinct()
    else:
        results = []
    return render(requets, {
        "results": results,
        "query": query,
    })

def list(request):
    objects = London.objects.all()
    html = "<p> Listado de articulos </p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + ' ' + str(elt.precio) + '<p>'
    return HttpResponse(html)
"""
