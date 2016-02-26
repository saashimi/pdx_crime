from django.contrib.gis.db import models

class CrimeModelTemplate(models.Model):
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
    geom = models.PointField(srid=4326) 
    objects = models.GeoManager()

    def __str__(self):
        return 'Record ID:' + " " + str(self.recordid) + " " + 'Offense Type: ' + self.offense

    class Meta:
        abstract=True

class Crime2014(CrimeModelTemplate):
    """We're inheriting the whole abstract base class."""

class Crime2013(CrimeModelTemplate):
    """We're inheriting the whole abstract base class."""

class Crime2012(CrimeModelTemplate):
    """We're inheriting the whole abstract base class."""

class Crime2011(CrimeModelTemplate):
    """We're inheriting the whole abstract base class."""

class Crime2010(CrimeModelTemplate):
    """We're inheriting the whole abstract base class."""