from rest_framework import serializers
from bbrwtsapp.models import TrainModel,LocomotiveModel,TrainTransactionsModel, WagonModel, CommodityListModel,ProjectsListModel,LocationListModel,LocomotiveListModel,WagonListModel,CustomerListModel

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainModel
        fields = '__all__'

class TrainTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainTransactionsModel
        fields = '__all__'

class WagonSerializer(serializers.ModelSerializer):
    class Meta:
        model = WagonModel
        fields = '__all__'


class CommodityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommodityListModel
        fields = '__all__'        

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectsListModel
        fields = '__all__'               

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationListModel
        fields = '__all__'         

class LocomotiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocomotiveListModel
        fields = '__all__'         

class LocoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocomotiveModel
        fields = '__all__'  

class WagonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WagonListModel
        fields = '__all__'        

class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerListModel
        fields = '__all__'         