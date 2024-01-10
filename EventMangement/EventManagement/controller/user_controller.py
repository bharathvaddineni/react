from flask import Blueprint, render_template, request, redirect, url_for
from lib import lib
from model.user import User
from flask import jsonify
from datetime import datetime, timedelta
from time import gmtime, strftime, mktime

user_page = Blueprint("user_page", __name__)

model_user = User()

@user_page.route("/login", methods=["GET"])
def login():
    return render_template("login.html")

@user_page.route("/login", methods=["POST"])
def login_post():
    global model_user
    username = request.form.get('username')
    password = request.form.get('password')

    if model_user.validate_username(username, password):
        lib.current_user_role = model_user.getRoleUsername(username)
        lib.current_username = username
        return jsonify({
            'code': 200,
            'msg': 'success'
            })
    return jsonify({
        'code': 201,
        'msg': 'fail'
        })

@user_page.route("/register", methods=["GET"])
def register():
    return render_template("register.html")

@user_page.route("/register", methods=["POST"])
def register_post():
    username = request.form.get('username')
    password = request.form.get('password')
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    role = request.form.get('role')

    if model_user.validateRegisterName(username):
        if model_user.register_user(username, password, firstname, lastname, role):
            return jsonify({
                'code': 200,
                'msg': 'success'
                })
    return jsonify({
        'code': 201,
        'msg': 'fail'
        })

@user_page.route("/logout", methods=["GET"])
def logout():
    lib.current_user_role = None
    lib.current_username = ""
    return render_template("index.html")