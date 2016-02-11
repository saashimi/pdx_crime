from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import Crime2014
from .serializers import Crime2014DataSerializer

"""
View Controller objects that render serialized GeoJSON data through the Django
REST GIS framework.
"""

def home_page(request):
    return render(request, 'index.html')

class Crime2014DataViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Crime2014.objects.all()
    serializer_class = Crime2014DataSerializer
    filter_fields = ('offense', 'date', 'time', 'neighborhd')
