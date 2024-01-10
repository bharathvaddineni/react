from flask import Blueprint, render_template, request, redirect, url_for
from lib import lib
from model.book import Book
from model.order import Order
from model.event import Event
from flask import jsonify
from datetime import datetime, timedelta
from time import gmtime, strftime, mktime

event_page = Blueprint("event_page", __name__)

model_book = Book()
model_order = Order()
model_event = Event()

@event_page.route("/home", methods=["GET"])
def eventHome():
    return render_template("eventHome.html", current_user_role=lib.current_user_role)

@event_page.route("/event-list", methods=["GET"])
def eventList():
    return render_template("eventList.html", current_user_role=lib.current_user_role)

@event_page.route("/gallery", methods=["GET"])
def eventGallery():
    return render_template("eventGallery.html", current_user_role=lib.current_user_role)

@event_page.route("/request-quote", methods=["GET"])
def eventRequest():
    req = request.values
    lib.current_type = req['id']
    return render_template("eventRequest.html", current_user_role=lib.current_user_role, current_type=lib.current_type)

@event_page.route("/request-quote", methods=["POST"])
def eventRequestPost():
    eventType = request.form.get('eventType')
    numberGuest = request.form.get('role')
    username = request.form.get('name')
    email = request.form.get('email')
    description = request.form.get('description')
    price = request.form.get('price')
    model_event.addQuote(eventType, numberGuest, username, email, description, price)
    return render_template("eventList.html", current_user_role=lib.current_user_role, current_type=lib.current_type)


@event_page.route("/consultation", methods=["GET"])
def eventConsultation():
    return render_template("eventConsultation.html", current_user_role=lib.current_user_role)

@event_page.route("/consultation", methods=["POST"])
def eventConsultationPost():
    username = request.form.get('name')
    contactNo = request.form.get('number')
    preferredTime = request.form.get('role')
    query = request.form.get('query')
    model_event.addConsultation(username, contactNo, preferredTime, query)
    return render_template("eventConsultation.html", current_user_role=lib.current_user_role)

@event_page.route("/contact", methods=["GET"])
def eventContact():
    return render_template("eventContact.html", current_user_role=lib.current_user_role)

@event_page.route("/carrers", methods=["GET"])
def eventCarrer():
    return render_template("eventCarrer.html", current_user_role=lib.current_user_role)

@event_page.route("/reviews", methods=["GET"])
def eventReview():
    return render_template("eventReview.html", current_user_role=lib.current_user_role)

@event_page.route("/event-order", methods=["GET"])
def eventOrder():
    quotes = model_event.getQuotes()
    return render_template("eventOrder.html", current_user_role=lib.current_user_role, quotes=quotes)

@event_page.route("/consultation-order", methods=["GET"])
def eventConsultationOrder():
    consultation = model_event.getConsultation()
    return render_template("eventConsultationOrder.html", current_user_role=lib.current_user_role, consultations=consultation)