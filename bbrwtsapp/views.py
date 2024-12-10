from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from .models import WagonModel, TrainModel,TrainImage, TrainTransactionsModel,LocomotiveModel,WagonTransactionsModel,LocomotiveTransactionsModel # WagonEntryModel
#from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
import json
from django.db import transaction
import uuid;
from django.http import JsonResponse
from .models import CustomUser as User # or your custom user model
from .forms import LoginForm
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login

class DataEntryView(TemplateView):
    template_name='dataentry.html'

class HomeView(TemplateView):
    template_name='home.html'

class MovementsView(TemplateView):
    template_name='movements.html'  

class AttachmentsView(TemplateView):
    template_name='attachments.html'      

class IndexView(TemplateView):
    template_name='index.html'    

class GPSView(TemplateView):
    template_name='gps.html' 



def get_username(request):
    if request.user.is_authenticated:  # Ensure the user is logged in
        username = request.user.username
        location=request.user.location_id
        return JsonResponse({'username': username,'location':location})
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)


def login_view(request):
    form = LoginForm(request, data=request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

#@csrf_protect
'''def submit_form(request):
    if request.method == "POST":
        serial_number=request.POST.get('serial_number')
        wagon_number=request.POST.get('wagon_number')
        wagon_owner=request.POST.get('wagon_owner')
        container=request.POST.get('container')
        container_2=request.POST.get('container_2')
        train_number=request.POST.get('train_number')
        departure_date=request.POST.get('departure_date')
        departure_time=request.POST.get('departure_time')
        arrival_date=request.POST.get('arrival_date')
        arrival_time=request.POST.get('arrival_time')
   
        from_source=request.POST.get('from_source')
        to_destination=request.POST.get('to_destination')
        origin=request.POST.get('origin')
        destination=request.POST.get('destination')
        bound=request.POST.get('bound')
        commodity=request.POST.get('commodity')
        customer=request.POST.get('customer')
        tonnage=request.POST.get('tonnage')
        gross_weight=request.POST.get('gross_weight')

        wagon_entry=WagonEntryModel(serial_number=serial_number,wagon_number=wagon_number,wagon_owner=wagon_owner,
        container=container,container_2=container_2,train_number=train_number,
        departure_date=departure_date,departure_time=departure_time,arrival_date=arrival_date,
        arrival_time=arrival_time,from_source=from_source,
        to_destination=to_destination,origin=origin,destination=destination,
        bound=bound,commodity=commodity,customer=customer,tonnage=tonnage,gross_weight=gross_weight)

        wagon_entry.save()

        return redirect('dataentry')  # Redirect to a success page or another view

    return render(request, 'dataentry.html') '''


#@csrf_protect

def submit_train_wagon_form(request):
    if request.method == "POST":
        form_type = request.POST.get('form_type')
        current_tab = request.POST.get('current_tab', 'tab1')  # Default to 'tab1' if not provided

        if form_type == "wagon_form":

            wagon_number=request.POST.get('wagon_number')
            container_1=request.POST.get('container_1')
            container_2=request.POST.get('container_2')
            commodity=request.POST.get('commodity')
            customer=request.POST.get('customer')
            net=request.POST.get('net')
            tare_weight=request.POST.get('tare_weight')
            origin=request.POST.get('origin')
            destination=request.POST.get('destination')
            projects=request.POST.get('projects')
            tarp_number=request.POST.get('tarp_number')
            condition=request.POST.get('condition')
            wagon_entry=WagonModel(wagon_number=wagon_number,
            container_1=container_1,container_2=container_2,commodity=commodity,customer=customer,net=net,tare_weight=tare_weight,origin=origin,destination=destination,
            projects=projects,tarp_number=tarp_number,condition=condition,train='Unattached')

            wagon_entry.save()

            # Redirect to 'dataentry' with the current tab as a query parameter
            return redirect(f'/dataentry/?tab={current_tab}')  # Construct URL with query parameter
    
        elif form_type == "train_form":
            #serial_number=request.POST.get('serial_number')
            
            train_number=request.POST.get('train_number')
            from_source=request.POST.get('from_source')
            to_destination=request.POST.get('to_destination')
            departure_date=request.POST.get('departure_date')
            departure_time=request.POST.get('departure_time')
            arrival_date=request.POST.get('arrival_date')or None
            arrival_time=request.POST.get('arrival_time')or None
            
            status=request.POST.get('status')or None
            #train_list_document=request.POST.get('document')or None
            serial_number=from_source +''+ str(TrainModel.objects.count()) +'24'

            train_entry=TrainModel(serial_number=serial_number,train_number=train_number,from_source=from_source,
            to_destination=to_destination,departure_date=departure_date,departure_time=departure_time,arrival_date=arrival_date,
            arrival_time=arrival_time,status=status)

           
            train_entry.save()
            # Handle multiple image uploads
            images = request.FILES.getlist('images')  # Get the list of uploaded images
        
            # Save each image associated with this train_entry
            for image in images:
                TrainImage.objects.create(train_serial=train_entry, image=image)
            # Redirect to 'dataentry' with the current tab as a query parameter
            return redirect(f'/dataentry/?tab={current_tab}')  # Construct URL with query parameter

    return render(request, 'dataentry.html') 

def get_train_data(request, serialNo):
    train = get_object_or_404(TrainModel, serial_number=serialNo)
    train_data = {
        'serial_number': train.serial_number,
        'train_number': train.train_number,
        'from_source': train.from_source,
        'to_destination': train.to_destination,
        'departure_date': train.departure_date.strftime('%Y-%m-%d'),
        'departure_time': train.departure_time.strftime('%H:%M:%S'),
        #'arrival_date': train.arrival_date.strftime('%Y-%m-%d') if train.arrival_date else '',
        #'arrival_time': train.arrival_time.strftime('%H:%M:%S') if train.arrival_time else '',

        'status':train.status
    }
    return JsonResponse(train_data)

'''def wagon_entry_list(request):
    entries = WagonEntryModel.objects.all()
    return render(request, 'wagon_entry_list.html', {'entries': entries})     

def get_entry(request, id):
    entry = get_object_or_404(WagonEntryModel, id=id)
    data = {
        'id': entry.id,
        'serial_number': entry.serial_number,
        'wagon_number': entry.wagon_number,
        'wagon_owner': entry.wagon_owner,
        'container': entry.container,
        'container_2': entry.container_2,
        'train_number': entry.train_number,
        'departure_date': entry.departure_date.strftime('%Y-%m-%d') if entry.departure_date else '',
        'departure_time': entry.departure_time.strftime('%H:%M') if entry.departure_time else '',
        'arrival_date': entry.arrival_date.strftime('%Y-%m-%d') if entry.arrival_date else '',
        'arrival_time': entry.arrival_time.strftime('%H:%M') if entry.arrival_time else '',
       
        'from_source': entry.from_source,
        'to_destination': entry.to_destination,
        'origin': entry.origin,
        'destination': entry.destination,
        'bound': entry.bound,
        'commodity': entry.commodity,
        'customer': entry.customer,
        'tonnage': entry.tonnage,
        'gross_weight': entry.gross_weight,
    }
    return JsonResponse(data)

@require_POST
def update_wagon_entry(request):
    id = request.POST.get('id')
    entry = get_object_or_404(WagonEntryModel, id=id)

    entry.serial_number = request.POST.get('serial_number')
    entry.wagon_number = request.POST.get('wagon_number')
    entry.wagon_owner = request.POST.get('wagon_owner')
    entry.container = request.POST.get('container')
    entry.container_2 = request.POST.get('container_2')
    entry.train_number = request.POST.get('train_number')
    entry.departure_date = request.POST.get('departure_date')
    entry.departure_time = request.POST.get('departure_time')
    entry.arrival_date = request.POST.get('arrival_date')
    entry.arrival_time = request.POST.get('arrival_time')
    
    entry.from_source = request.POST.get('from_source')
    entry.to_destination = request.POST.get('to_destination')
    entry.origin = request.POST.get('origin')
    entry.destination = request.POST.get('destination')
    entry.bound = request.POST.get('bound')
    entry.commodity = request.POST.get('commodity')
    entry.customer = request.POST.get('customer')
    entry.tonnage = request.POST.get('tonnage')
    entry.gross_weight = request.POST.get('gross_weight')

    entry.save()
    return redirect('wagon_entry_list')'''

'''def dataentry_view(request):
    # Handle query parameters
    tab = request.GET.get('tab', 'tab1')  # Default to 'tab1' if no 'tab' parameter is provided

    context = {
        'current_tab': tab,
    }

    return render(request, 'dataentry.html', context)'''

@csrf_exempt

def update_train_ajax(request, wagon_number):
    if request.method == 'POST':
        try:
            # Load JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            new_train_value = data.get('train')

            # Retrieve the wagon instance by wagon_number
            wagon = get_object_or_404(WagonModel, wagon_number=wagon_number)

            # Update the train field
            wagon.train = new_train_value
            wagon.save()

            # Return success response
            return JsonResponse({'status': 'success', 'message': 'Train field updated successfully!'})

        except json.JSONDecodeError:
            # Handle JSON decoding error
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)

        except WagonModel.DoesNotExist:
            # Handle case where wagon does not exist
            return JsonResponse({'status': 'error', 'message': 'Wagon not found'}, status=404)

        except Exception as e:
            # Handle any other exceptions
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    # Handle non-POST requests
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt

def update_loco_train_ajax(request, loco_number):
    if request.method == 'POST':
        try:
            # Load JSON data from request body
            data = json.loads(request.body.decode('utf-8'))
            new_train_value = data.get('train')

            # Retrieve the wagon instance by wagon_number
            loco = get_object_or_404(LocomotiveModel, locomotive=loco_number)

            # Update the train field
            loco.train = new_train_value
            loco.save()

            # Return success response
            return JsonResponse({'status': 'success', 'message': 'Train field updated successfully!'})

        except json.JSONDecodeError:
            # Handle JSON decoding error
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)

        except WagonModel.DoesNotExist:
            # Handle case where wagon does not exist
            return JsonResponse({'status': 'error', 'message': 'Wagon not found'}, status=404)

        except Exception as e:
            # Handle any other exceptions
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    # Handle non-POST requests
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@require_POST

def update_train_record(request,serialNumber):
    #serial_number = request.POST.get('serial_number')
    train_number = request.POST.get('train_number')
    from_source = request.POST.get('from_source')
    to_destination = request.POST.get('to_destination')
    departure_date = request.POST.get('departure_date')
    departure_time = request.POST.get('departure_time')
    arrival_date = request.POST.get('arrival_date', None)
    arrival_time = request.POST.get('arrival_time', None)
    status=request.POST.get('status', None)
    #train_list_document=request.POST.get('document')or None

    try:
        train_transaction_uuid = uuid.uuid4()
        
        train = TrainModel.objects.get(serial_number=serialNumber)
        train.train_number = train_number
        train.from_source = from_source
        train.to_destination = to_destination
        train.departure_date = departure_date
        train.departure_time = departure_time
        train.arrival_date = arrival_date if arrival_date else None
        train.arrival_time = arrival_time if arrival_time else None        
        train.status = status if status else None
        # Save the updated record

        #Below code saves train data in the train transactions table whenever an update happens
        train_transactions=TrainTransactionsModel(serial_number=serialNumber,train_number=train_number,from_source=from_source,
        to_destination=to_destination,departure_date=departure_date,departure_time=departure_time,arrival_date=arrival_date,
        arrival_time=arrival_time,status=status,train_transaction_id=train_transaction_uuid)


        wagon_records = WagonModel.objects.filter(train=serialNumber)
        locomotive_records = LocomotiveModel.objects.filter(train=serialNumber)


        with transaction.atomic():
            train.save()
            train_transactions.save()

            for wagon in wagon_records:
                # Create a new transaction record
                wagon_transaction = WagonTransactionsModel(
                    wagon_number=wagon.wagon_number,
                    container_1=wagon.container_1,
                    container_2=wagon.container_2,
                    commodity=wagon.commodity,
                    customer=wagon.customer,
                    net=wagon.net,
                    tare_weight=wagon.tare_weight,
                    origin=wagon.origin,
                    destination=wagon.destination,
                    projects=wagon.projects,
                    train=wagon.train,
                    wagon_transaction_id=train_transaction_uuid  
                )
                wagon_transaction.save()

                  
            for locomo in locomotive_records:
                # Create a new transaction record
                locomo_transaction = LocomotiveTransactionsModel(
                    locomotive=locomo.locomotive,
                    owner=locomo.owner,
                    type=locomo.type,
                    weight=locomo.weight,
                    train=locomo.train,                  
                    locomotive_transaction_id=train_transaction_uuid  
                )
                locomo_transaction.save()

        return JsonResponse({'status': 'success', 'message': 'Train record updated successfully!'})

    except TrainModel.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Train record not found!'})