import os
from django.contrib.gis.utils import LayerMapping
from .models import Crime2012

crime2012_mapping = {
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
crime2012_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', '2012-crime_incident_data_reproj.shp'))

def run(verbose=True):
    lm = LayerMapping(Crime2012, crime2012_shp, crime2012_mapping,
                      transform=False, encoding='utf-8')

    lm.save(strict=True, verbose=verbose)