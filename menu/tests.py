from django.test import TestCase, SimpleTestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

# Test strony głównej
class HomePageTests(SimpleTestCase):

    # Sprawdza czy stronka zwraca kod 200 - czy istnieje
    def test_home_page_status_code(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    # Sprawdza czy zgadza się adres url
    def test_view_url_by_name(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
    # Sprawdza czy załadowano odpowiednią templatke
    def test_view_uses_correct_template(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "home.html")

# Test tworzenia konta 
class SignupPageTests(TestCase):

    username = "newuser"
    email    = "newuser@email.com"

    # Sprawdza czy stronka zwraca kod 200 - czy istnieje
    def test_signup_page_status_code(self):
        response = self.client.get("/accounts/signup/")
        self.assertEqual(response.status_code, 200)

    # Sprawdza czy zgadza się adres url
    def test_view_url_by_name(self):
        response = self.client.get(reverse("signup"))
        self.assertEqual(response.status_code, 200)

    # Sprawdza czy załadowano odpowiednią templatke
    def test_view_uses_correct_template(self):
        response = self.client.get(reverse("signup"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "registration/signup.html")
    
    # Przeprowadza testową rejestrację - tworzy uzytkownika, i po przeprowadzeniu testu go usuwa
    def test_signup_form(self):
        new_user = get_user_model().objects.create_user( self.username, self.email)
        self.assertEqual(get_user_model().objects.all().count(), 1)
        self.assertEqual(get_user_model().objects.all()[0].username, self.username)
        self.assertEqual(get_user_model().objects.all()[0].email, self.email)