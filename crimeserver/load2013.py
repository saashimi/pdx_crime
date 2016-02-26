import os
from django.contrib.gis.utils import LayerMapping
from .models import Crime2013

crime2013_mapping = {
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
crime2013_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', '2013-crime_incident_data_reproj.shp'))

def run(verbose=True):
    lm = LayerMapping(Crime2013, crime2013_shp, crime2013_mapping,
                      transform=False, encoding='utf-8')

    lm.save(strict=True, verbose=verbose)