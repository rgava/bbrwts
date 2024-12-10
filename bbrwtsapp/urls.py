from django.urls import path
from .views import login_view,logout_view,get_username, DataEntryView, AttachmentsView,get_train_data,update_loco_train_ajax,update_train_record,update_train_ajax,HomeView, GPSView, IndexView, MovementsView,submit_train_wagon_form #, wagon_entry_list,get_entry,update_wagon_entry

urlpatterns=[
    #path('',IndexView.as_view(),name='index'),
    path('',login_view,name='login'),
    path('logout/', logout_view, name='logout'),
    path('home',HomeView.as_view(),name='home'),
    path('movements',MovementsView.as_view(),name='movements'),
    path('attachments',AttachmentsView.as_view(),name='attachments'),
    #path('dataentry',DataEntryView.as_view(),name='dataentry'),
    #path('dataentry',submit_form,name='dataentry'),
    path('dataentry/',submit_train_wagon_form,name='dataentry'),
    #path('dataentry/', dataentry_view, name='dataentry'),
    path('gps',GPSView.as_view(),name='gps'),
    path('wagon/<str:wagon_number>/update_train_ajax/', update_train_ajax, name='update_train_ajax'),
    path('locomotive/<str:loco_number>/update_loco_train_ajax/', update_loco_train_ajax, name='update_loco_train_ajax'),
    path('get_train_data/<str:serialNo>/', get_train_data, name='get_train_data'),
    path('update_train_record/<str:serialNumber>/', update_train_record, name='update_train_record'), 
    path('get-username/', get_username, name='get_username'),
   # path('wagonentries', wagon_entry_list, name='wagon_entry_list'),
   # path('get_entry/<int:id>/', get_entry, name='get_entry'),
   # path('update_wagon_entry/', update_wagon_entry, name='update_wagon_entry'),
]