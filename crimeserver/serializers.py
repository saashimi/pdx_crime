from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Crime2014, Crime2013, Crime2012

"""
Serializes geospatial fields from models into GeoJSON data.
"""
class CrimeDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        geo_field = 'geom'
        fields = ('offense', 'date', 'time', 'neighborhd')
        abstract = True

class Crime2014DataSerializer(CrimeDataSerializer):
    class Meta(CrimeDataSerializer.Meta):
        model = Crime2014

class Crime2013DataSerializer(CrimeDataSerializer):
    class Meta(CrimeDataSerializer.Meta):        
        model = Crime2013

class Crime2012DataSerializer(CrimeDataSerializer):
    class Meta(CrimeDataSerializer.Meta):        
        model = Crime2012
