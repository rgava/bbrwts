from django import forms
from django.contrib.auth.forms import AuthenticationForm

class LoginForm(AuthenticationForm):
    username = forms.CharField(label='Username', 
                               max_length=254,
                               widget=forms.TextInput())
    password = forms.CharField(label='Password', widget=forms.PasswordInput)