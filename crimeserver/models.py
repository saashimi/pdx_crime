from django.contrib.gis.db import models

class Crime2014(models.Model):
    recordid = models.IntegerField()
    date = models.CharField(max_length=254)
    time = models.CharField(max_length=254)
    offense = models.CharField(max_length=254)
    address = models.CharField(max_length=254)
    neighborhd = models.CharField(max_length=254)
    pdprecinct = models.CharField(max_length=254)
    pddistrict = models.CharField(max_length=254)
    x_coord = models.FloatField()
    y_coord = models.FloatField()
    geom = models.PointField(srid=4236) # Already converted in qGIS
    objects = models.GeoManager()

    def __str__(self):
        return 'Record ID:' + " " + str(self.recordid) + " " + 'Offense Type: ' + self.offense


