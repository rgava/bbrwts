import django_filters
from bbrwtsapp.models import TrainModel,WagonModel,TrainTransactionsModel,LocomotiveModel

class TrainFilter(django_filters.FilterSet):
    train_number=django_filters.CharFilter(method='filter_train')

    class Meta:
        model=TrainModel
        fields = ['serial_number','train_number','from_source','to_destination']

        
    def filter_train(self, queryset, name, value):
            values = value.split(',')  # Split the multiple values
            return queryset.filter(**{'{}__in'.format(name): values})


class TrainTransactionFilter(django_filters.FilterSet):
    train_number=django_filters.CharFilter(method='filter_train')
    serial_number=django_filters.CharFilter(method='filter_serial')

    class Meta:
        model=TrainTransactionsModel
        fields = ['serial_number','train_number','from_source','to_destination']

        
    def filter_train(self, queryset, name, value):
            values = value.split(',')  # Split the multiple values
            return queryset.filter(**{'{}__in'.format(name): values})

    def filter_serial(self, queryset, name, value):
            values = value.split(',')  # Split the multiple values
            return queryset.filter(**{'{}__in'.format(name): values})
    
class WagonFilter(django_filters.FilterSet):
    train_number=django_filters.CharFilter(method='filter_wagon')

    class Meta:
        model=WagonModel
        fields = '__all__'

        
    def filter_wagon(self, queryset, name, value):
            values = value.split(',')  # Split the multiple values
            return queryset.filter(**{'{}__in'.format(name): values})


class LocoFilter(django_filters.FilterSet):
    train_number=django_filters.CharFilter(method='filter_locomotive')

    class Meta:
        model=LocomotiveModel
        fields = '__all__'
        
    def filter_locomotive(self, queryset, name, value):
            values = value.split(',')  # Split the multiple values
            return queryset.filter(**{'{}__in'.format(name): values})    