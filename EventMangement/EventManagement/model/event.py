import random
from datetime import datetime
import re
import mysql.connector

conn = mysql.connector.connect(user='root', password='P@ssw0rd1230909', host='127.0.0.1', database='bookstore')

class Event:

    def eventList(self):
        mycursor = conn.cursor()
        mycursor.execute(f"select * from books")
        myresult = mycursor.fetchall()
        return myresult

    def addQuote(self, eventType, numberGuest, username, email, description, price):
        mycursor = conn.cursor()
        val = (eventType, numberGuest, username, email, description, price)
        sql = "insert into quote (eventType, numberGuest, username, email, description, price) values(%s, %s, %s, %s, %s, %s)"
        mycursor.execute(sql, val)
        conn.commit()
        return True

    def addConsultation(self, username, contactNo, preferredTime, query):
        mycursor = conn.cursor()
        val = (username, contactNo, preferredTime, query)
        sql = "insert into consultation (username, contactNo, preferredTime, query) values(%s, %s, %s, %s)"
        mycursor.execute(sql, val)
        conn.commit()
        return True

    def getQuotes(self):
        mycursor = conn.cursor()
        mycursor.execute(f"select * from quote")
        myresult = mycursor.fetchall()
        return myresult

    def getConsultation(self):
        mycursor = conn.cursor()
        mycursor.execute(f"select * from consultation")
        myresult = mycursor.fetchall()
        return myresult