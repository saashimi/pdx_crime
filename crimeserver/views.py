from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import Crime2014, Crime2013, Crime2012
from .serializers import Crime2014DataSerializer, Crime2013DataSerializer, Crime2012DataSerializer

"""
View Controller objects that render serialized GeoJSON data through the Django
REST GIS framework.
"""

def home_page(request):
    return render(request, 'index.html')

class CrimeDataViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)

    filter_fields = ('offense', 'date', 'time', 'neighborhd')
    
    class Meta:
        abstract=True

class Crime2014DataViewSet(CrimeDataViewSet):
    queryset = Crime2014.objects.all()
    serializer_class = Crime2014DataSerializer

class Crime2013DataViewSet(CrimeDataViewSet):
    queryset = Crime2013.objects.all()
    serializer_class = Crime2013DataSerializer

class Crime2012DataViewSet(CrimeDataViewSet):
    queryset = Crime2012.objects.all()
    serializer_class = Crime2012DataSerializer
