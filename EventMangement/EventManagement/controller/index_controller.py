
from flask import render_template, Blueprint, redirect
from lib import lib

# from model.user import User
# from model.user_admin import Admin
import string
import random
from datetime import datetime, timedelta
from time import gmtime, strftime, mktime

index_page = Blueprint("index_page", __name__)

@index_page.route("/")
def index():
    print(lib.current_user_role)
    return render_template("index.html", current_user_role=lib.current_user_role)