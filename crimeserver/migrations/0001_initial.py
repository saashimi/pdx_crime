# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crime2013',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('recordid', models.IntegerField()),
                ('date', models.CharField(max_length=254)),
                ('time', models.CharField(max_length=254)),
                ('offense', models.CharField(max_length=254)),
                ('address', models.CharField(max_length=254)),
                ('neighborhd', models.CharField(max_length=254)),
                ('pdprecinct', models.CharField(max_length=254)),
                ('pddistrict', models.CharField(max_length=254)),
                ('x_coord', models.FloatField()),
                ('y_coord', models.FloatField()),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Crime2014',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('recordid', models.IntegerField()),
                ('date', models.CharField(max_length=254)),
                ('time', models.CharField(max_length=254)),
                ('offense', models.CharField(max_length=254)),
                ('address', models.CharField(max_length=254)),
                ('neighborhd', models.CharField(max_length=254)),
                ('pdprecinct', models.CharField(max_length=254)),
                ('pddistrict', models.CharField(max_length=254)),
                ('x_coord', models.FloatField()),
                ('y_coord', models.FloatField()),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
