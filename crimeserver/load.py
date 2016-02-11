import os
from django.contrib.gis.utils import LayerMapping
from .models import Crime2014

crime2014_mapping = {
    'recordid' : 'RecordID',
    'date' : 'Date',
    'time' : 'Time',
    'offense' : 'Offense',
    'address' : 'Address',
    'neighborhd' : 'Neighborhd',
    'pdprecinct' : 'PDPrecinct',
    'pddistrict' : 'PDDistrict',
    'x_coord' : 'X_Coord',
    'y_coord' : 'Y_Coord',
    'geom' : 'POINT', 
}

# Copypasta from geodjango tutorial.
crime2014_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', '2014-crime_incident_data_reproj.shp'))

def run(verbose=True):
    lm = LayerMapping(Crime2014, crime2014_shp, crime2014_mapping,
                      transform=False, encoding='utf-8')

    lm.save(strict=True, verbose=verbose)