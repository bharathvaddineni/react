from flask import Flask, render_template,request, redirect, session,url_for
from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField,SubmitField,BooleanField
from wtforms.validators import DataRequired, Length
import os,boto3,json,mysql.connector,pymysql
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, template_folder='./')
app.config['SECRET_KEY'] = 'signinkey'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///'+os.path.join(basedir,'labdata.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

USER="admin"
PASSWORD="password"
PORT="3306"
ENDPOINT="newdatabase1.c1guegkqvl4q.us-east-1.rds.amazonaws.com"
DATABASE="newdatabase"

labdb = SQLAlchemy(app)
class Lab(labdb.Model):
    __tablename__ = "lab"
    id = labdb.Column(labdb.Integer, primary_key = True)
    firstname = labdb.Column(labdb.Text)
    lastname = labdb.Column(labdb.Text)
    email = labdb.Column(labdb.Text)
    password = labdb.Column(labdb.Text)
    def __init__(self,firstname,lastname,email,password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
    def __repr__(self):
        return f"{self.id} {self.email} {self.password}"
labdb.create_all()
class LoginForm(FlaskForm):
    username = StringField('Username:',validators=[DataRequired()])
    password = PasswordField('Password:',validators=[DataRequired(),Length(min=8)])
    submit = SubmitField('Login')
class SignupForm(FlaskForm):
    fname = StringField('First name:')
    lname = StringField('Last name:')
    email = StringField('Email:')
    password = PasswordField('Password:', validators=[Length(min=8)])
    confirmpassword = PasswordField('Confirm Password:',validators=[Length(min=8)])
    enter = SubmitField('Create Account')

class UplaodForm(FlaskForm):
    email1 = StringField('Email1:')
    email2 = StringField('Email2:')
    email3 = StringField('Email3:')
    email4 = StringField('Email4:')
    email5 = StringField('Email5:')
    submit = SubmitField('SUBMIT')

global user,pwd
@app.route('/', methods =['GET','POST'])
def index():
    global error
    form = LoginForm()
    if request.method == 'GET':
        return render_template('main.html',form = form)
    if request.method == 'POST':
        if form.submit.data:
            session['username'] = form.username.data
            session['password'] = form.password.data
            nuser = Lab.query.filter(Lab.email == form.username.data).first()
            if nuser:
                if nuser.password == form.password.data:
                    return redirect(url_for('secret'))
                else:
                    error = 'Incorrect password. Please try again'
                    return render_template('main.html',error = error, form =form)
            else:
                error = 'Account does not exist. Create a new one'
                return render_template('main.html',error = error, form =form)

@app.route('/signup', methods =['GET','POST'])
def signup():
    form = SignupForm()
    error = None
    if form.enter.data:
        nuser = Lab.query.filter(Lab.email == form.email.data).first()
        if nuser:
            error = 'An user is already exist with the given email. Please try again.'
            return render_template('sign.html',error = error, form =form)
        if form.password.data != form.confirmpassword.data:
            error = 'Passwords must match'
            return render_template('sign.html',error = error, form =form)

        upper = 0
        for x in form.password.data:
             if x.isupper():
                upper = 1
        lower = 0
        for y in form.password.data:
             if y.islower():
                 lower = 1
        digit = 0
        lent = len(form.password.data)
        if form.password.data[lent-1].isdigit():
             digit = 1

        if upper!=1 or lower!=1 or digit!=1:
            error = 'Password should contain at least one uppercase.\n Password should contain at least one lowercase. \n Password sould end with a digit.'
            return render_template('sign.html',error = error, form =form)
        newuser = Lab(form.fname.data,form.lname.data,form.email.data,form.password.data)
        labdb.session.add(newuser)
        labdb.session.commit()
        form.fname.data = ' '
        form.lname.data = ' '
        form.email.data = ' '
        form.password.data = ' '
        form.confirmpassword.data = ' '
        return redirect(url_for('thankyou'))
        return render_template('sign.html',error = error, form =form)
    return render_template('sign.html',error = error, form =form)

@app.route('/secret', methods =['GET','POST'])
def secret():
    form = UplaodForm()
    if request.method == 'POST':
        f = request.files['file']
        ext = f.filename.split(".")[-1]
        filename=f.filename.split("\\")[-1]

        downfile = "downfile."+ext
        f.save(secure_filename(filename))
        # print(filename)
        email1 = form.email1.data
        email2 = form.email2.data
        email3 = form.email3.data
        email4 = form.email4.data
        email5 = form.email5.data

        s3= boto3.client('s3',aws_access_key_id="AKIASDNWALCOMH77NSTL",
        aws_secret_access_key="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")
        s3.upload_file(filename,'finalprojectcloud',downfile)
        url = s3.generate_presigned_url(
        ClientMethod='get_object',
        Params={'Bucket': 'finalprojectcloud', 'Key': downfile},
        ExpiresIn=3600)
        ACCESS_KEY = "AKIASDNWALCOMH77NSTL"
        SECRET_KEY = "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"
        AWS_REGION = "us-east-1"
        lambda_client = boto3.client('lambda',
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        region_name=AWS_REGION)

        event={"email1":email1,
               "email2":email2,
               "email3":email3,
               "email4":email4,
               "email5":email5,
               "url":url}

        result = lambda_client.invoke(FunctionName='newlambda',
                     InvocationType='Event',
                     Payload=json.dumps(event))
        username = session['username']
        password = session['password']
        conn =  pymysql.connect(host=ENDPOINT, user=USER, password=PASSWORD,database=DATABASE)
        cur = conn.cursor()
        try:
            cur.execute("CREATE TABLE filedetails(email VARCHAR(255), password VARCHAR(255), filename VARCHAR(255));")
        except:
            pass
        val = (username, password, filename)
        sql = "INSERT INTO filedetails(email,password,filename) VALUES(%s,%s,%s);"
        cur.execute(sql, val)
        conn.commit()
        cur.execute("SELECT * FROM filedetails;")
        query_results = cur.fetchall()
        form.email1.data =' '
        form.email2.data =' '
        form.email3.data =' '
        form.email4.data =' '
        form.email5.data =' '
    return render_template('SecretPage.html',form = form)

@app.route('/thankyou')
def thankyou():
    return render_template('Thankyou.html')

if __name__ == '__main__':
    app.run(debug=True)


    # https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html
