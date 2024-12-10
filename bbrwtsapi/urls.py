from django.urls import path
from .views import TrainView, TrainTransactionView,LocoView, WagonView, CommodityView,ProjectsView,LocationView,LocomotiveView,WagonListView,CustomerView

urlpatterns=[
             path('trains/', TrainView.as_view(), name='trains'),
             path('traintransactions/', TrainTransactionView.as_view(), name='traintransactions'),
             path('wagons/', WagonView.as_view(), name='wagons'),
             path('commodities/', CommodityView.as_view(), name='commodities'), 
             path('projects/', ProjectsView.as_view(), name='projects'), 
             path('locations/', LocationView.as_view(), name='locations'), 
             path('locos/', LocoView.as_view(), name='locos'), 
             path('locomotives/', LocomotiveView.as_view(), name='locomotives'), 
             path('wagonlist/', WagonListView.as_view(), name='wagonlist'), 
             path('customers/', CustomerView.as_view(), name='customers'), 
]
