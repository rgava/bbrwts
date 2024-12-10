from django.db import models
from django.contrib.auth.models import AbstractUser




class TrainModel(models.Model):
    serial_number=models.CharField(max_length=100,primary_key=True)
    train_number = models.CharField(max_length=100)
    from_source = models.CharField(max_length=100)
    to_destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_date = models.DateField(blank=True,null=True)
    arrival_time = models.TimeField(blank=True,null=True)
    status = models.CharField(max_length=100,blank=True,null=True)
    #train_list_document = models.FileField(upload_to='documents/', blank=True, null=True)
    
    #train_list_documentb = models.FileField(upload_to='documents/', blank=True, null=True)
    #train_list_documentc = models.FileField(upload_to='documents/', blank=True, null=True)

    class Meta:
        db_table = "train"
        ordering=['arrival_date','arrival_time','departure_date','departure_time']

    def __str__(self):
        return self.train_number


class TrainImage(models.Model):
    train_serial = models.ForeignKey(TrainModel, to_field='serial_number', on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='train_images/')

    class Meta:
        db_table = "documents"


'''class TrainTransactionsModel(models.Model):
    serial_number=models.CharField(max_length=100)
    train_number = models.CharField(max_length=100)
    from_source = models.CharField(max_length=100)
    to_destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_date = models.DateField(blank=True,null=True)
    arrival_time = models.TimeField(blank=True,null=True)
    
    status = models.CharField(max_length=100,blank=True,null=True)
    train_list_document = models.FileField(upload_to='documents/', blank=True, null=True)
    train_list_documentb = models.FileField(upload_to='documents/', blank=True, null=True)
    train_list_documentc = models.FileField(upload_to='documents/', blank=True, null=True)

    
    # Automatic timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)  # Set once when the record is created
    updated_at = models.DateTimeField(auto_now=True)  # Update every time the record is saved

    class Meta:
        db_table = "train_transactions"
        ordering=['-created_at']

    def __str__(self):
        return self.train_number    '''

   

class WagonModel(models.Model):
    wagon_number = models.CharField(max_length=100,primary_key=True )
    container_1 = models.CharField(max_length=100,blank=True,null=True)
    container_2 = models.CharField(max_length=100,blank=True,null=True)
    commodity = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    net = models.FloatField()
    tare_weight = models.FloatField()
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    projects = models.CharField(max_length=100)
    tarp_number=models.CharField(max_length=100, blank=True)
    condition=models.CharField(max_length=100)
    train = models.CharField(max_length=100,default='Unattached')

    # ForeignKey to create a one-to-many relationship with TrainModel
    #train = models.ForeignKey(TrainModel, on_delete=models.CASCADE, related_name='wagons')

    class Meta:
        db_table = "wagon"

    def __str__(self):
        return self.wagon_number 

class LocomotiveModel(models.Model):
    locomotive = models.CharField(max_length=100,primary_key=True )
    owner = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    weight = models.FloatField()
    train = models.CharField(max_length=100,default='Unattached')

    class Meta:
        db_table = "locomotive"

    def __str__(self):
        return self.locomotive    

"""class WagonEntryModel(models.Model):
   serial_number=models.CharField(max_length=100)
   wagon_number=models.CharField(max_length=100)
   wagon_owner=models.CharField(max_length=100)
   container=models.CharField(max_length=100)
   container_2=models.CharField(max_length=100)
   train_number=models.CharField(max_length=100)
   departure_date=models.DateField()
   departure_time=models.TimeField()
   arrival_date=models.DateField()
   arrival_time=models.TimeField()

   from_source=models.CharField(max_length=100)
   to_destination=models.CharField(max_length=100)
   origin=models.CharField(max_length=100)
   destination=models.CharField(max_length=100)
   bound=models.CharField(max_length=100)
   commodity=models.CharField(max_length=100)
   customer=models.CharField(max_length=100)
   tonnage=models.FloatField()
   gross_weight=models.FloatField()

   class Meta:
      db_table="wagon_entry"""
            
class WagonListModel(models.Model):
    wagon_id = models.CharField(max_length=100,primary_key=True )
    symbol = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)

    class Meta:
        db_table = "wagon_list"

    def __str__(self):
        return self.wagon_id 

class CommodityListModel(models.Model):
    commodity = models.CharField(max_length=100,primary_key=True )
   
    class Meta:
        db_table = "commodity_list"

    def __str__(self):
        return self.commodity       
    
class LocomotiveListModel(models.Model):
    locomotive = models.CharField(max_length=100,primary_key=True )
    owner = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    weight = models.FloatField()

    class Meta:
        db_table = "locomotive_list"

    def __str__(self):
        return self.locomotive
    
class LocationListModel(models.Model):
    code = models.CharField(max_length=100,primary_key=True )
    name = models.CharField(max_length=100)
   
    class Meta:
        db_table = "location_list"

    def __str__(self):
        return self.name
    
class CustomUser(AbstractUser):
    location= models.ForeignKey(
        'LocationListModel', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )

    class Meta:
        db_table = "users"
    # Add more fields as needed


class CustomerListModel(models.Model):
    customer = models.CharField(max_length=100,primary_key=True )
       
    class Meta:
        db_table = "customer_list"

    def __str__(self):
        return self.customer
    
class ProjectsListModel(models.Model):
    projects = models.CharField(max_length=100,primary_key=True )
       
    class Meta:
        db_table = "projects_list"

    def __str__(self):
        return self.projects
    

class TrainTransactionsModel(models.Model):
    serial_number=models.CharField(max_length=100)
    train_number = models.CharField(max_length=100)
    from_source = models.CharField(max_length=100)
    to_destination = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_date = models.DateField(blank=True,null=True)
    arrival_time = models.TimeField(blank=True,null=True)    
    status = models.CharField(max_length=100,blank=True,null=True)
    train_transaction_id=models.CharField(max_length=100,blank=True,null=True)

    
    # Automatic timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)  # Set once when the record is created
    updated_at = models.DateTimeField(auto_now=True)  # Update every time the record is saved

    class Meta:
        db_table = "train_detailed_transactions"
        ordering=['-created_at']

    def __str__(self):
        return self.train_number     
    
class LocomotiveTransactionsModel(models.Model):
    locomotive = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    weight = models.FloatField()
    train = models.CharField(max_length=100,default='Unattached')
    locomotive_transaction_id=models.CharField(max_length=100,blank=True,null=True)

    class Meta:
        db_table = "locomotive_detailed_transactions"

    def __str__(self):
        return self.locomotive     
    
class WagonTransactionsModel(models.Model):
    wagon_number = models.CharField(max_length=100)
    container_1 = models.CharField(max_length=100,blank=True,null=True)
    container_2 = models.CharField(max_length=100,blank=True,null=True)
    commodity = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    net = models.FloatField()
    tare_weight = models.FloatField()
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    projects = models.CharField(max_length=100)
    train = models.CharField(max_length=100,default='Unattached')
    wagon_transaction_id=models.CharField(max_length=100,blank=True,null=True)

    # ForeignKey to create a one-to-many relationship with TrainModel
    #train = models.ForeignKey(TrainModel, on_delete=models.CASCADE, related_name='wagons')

    class Meta:
        db_table = "wagon_detailed_transactions"

    def __str__(self):
        return self.wagon_number     