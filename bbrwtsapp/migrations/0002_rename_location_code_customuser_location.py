# Generated by Django 4.2.14 on 2024-11-21 13:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("bbrwtsapp", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="customuser",
            old_name="location_code",
            new_name="location",
        ),
    ]
