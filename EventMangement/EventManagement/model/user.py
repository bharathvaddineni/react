import random
from datetime import datetime
import re
import mysql.connector

conn = mysql.connector.connect(user='root', password='P@ssw0rd1230909', host='127.0.0.1', database='bookstore')

class User:
    uid = None
    stu_id = None
    current_login_user = None

    def validate_username(self, username, password):
        mycursor = conn.cursor()
        mycursor.execute(f"select * from user where username='{username}' and password='{password}'")
        myresult = mycursor.fetchall()
        if len(myresult) >= 1:
            return True
        return False

    def getRoleUsername(self, username):
        mycursor = conn.cursor()
        mycursor.execute(f"select role from user where username='{username}'")
        myresult = mycursor.fetchall()
        return myresult[0][0]

    def validateRegisterName(self, username):
        mycursor = conn.cursor()
        mycursor.execute(f"select * from user where username='{username}'")
        myresult = mycursor.fetchall()
        if len(myresult) < 1:
            return True
        return False

    def register_user(self, username, password, firstname, lastname, role):
        mycursor = conn.cursor()
        if role == 'buyer':
            val = (username, password, firstname, lastname, '1')
        else:
            val = (username, password, firstname, lastname, '0')
        sql = "insert into user (username, password, firstname, lastname, role) values(%s, %s, %s, %s, %s)"
        mycursor.execute(sql, val)
        conn.commit()
        return True