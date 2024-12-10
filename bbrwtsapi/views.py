from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from bbrwtsapp.models import TrainModel, LocomotiveModel,TrainTransactionsModel,WagonModel, CommodityListModel,ProjectsListModel,LocationListModel,LocomotiveListModel,WagonListModel,CustomerListModel
from .serilizers import TrainSerializer,TrainTransactionSerializer,WagonSerializer,LocoSerializer, CommodityListSerializer,ProjectsSerializer,LocationSerializer, LocomotiveSerializer, WagonListSerializer, CustomerListSerializer
from .filters import TrainFilter, WagonFilter,LocoFilter, TrainTransactionFilter
from rest_framework import generics
import django_filters
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter


class TrainView(generics.ListAPIView):
    queryset=TrainModel.objects.all()
    serializer_class=TrainSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    filterset_class = TrainFilter
    #ordering_fields=['dateCreated','price'] 

class TrainTransactionView(generics.ListAPIView):
    queryset=TrainTransactionsModel.objects.all()
    serializer_class=TrainTransactionSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    filterset_class = TrainTransactionFilter
    #ordering_fields=['dateCreated','price']     

class WagonView(generics.ListAPIView):
    queryset=WagonModel.objects.all()
    serializer_class=WagonSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    filterset_class = WagonFilter
    #ordering_fields=['dateCreated','price'] 

class LocoView(generics.ListAPIView):
    queryset=LocomotiveModel.objects.all()
    serializer_class=LocoSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    filterset_class = LocoFilter
    #ordering_fields=['dateCreated','price']       

class LocomotiveView(generics.ListAPIView):
    queryset=LocomotiveListModel.objects.all()
    serializer_class=LocomotiveSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price']   

class CommodityView(generics.ListAPIView):
    queryset=CommodityListModel.objects.all()
    serializer_class=CommodityListSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price'] 

class ProjectsView(generics.ListAPIView):
    queryset=ProjectsListModel.objects.all()
    serializer_class=ProjectsSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price'] 

class LocationView(generics.ListAPIView):
    queryset=LocationListModel.objects.all()
    serializer_class=LocationSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price'] 

  

class WagonListView(generics.ListAPIView):
    queryset=WagonListModel.objects.all()
    serializer_class=WagonListSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price']     

class CustomerView(generics.ListAPIView):
    queryset=CustomerListModel.objects.all()
    serializer_class=CustomerListSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend,OrderingFilter]
    #filterset_class = CommodityListFilter
    #ordering_fields=['dateCreated','price']     