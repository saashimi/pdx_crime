from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Crime2014

"""
Serializes geospatial fields from models into GeoJSON data.
"""

class Crime2014DataSerializer(GeoFeatureModelSerializer):
    class Meta:
        geo_field = 'geom'
        abstract = True
        model = Crime2014
        fields = ('offense', 'date', 'time', 'neighborhd')