from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from flask_restful import Resource, Api
#pip install
import MySQLdb.cursors
import json
import requests

#import yaml

app=Flask(__name__)
api = Api(app)
#configure db
#db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] ="localhost"
app.config['MYSQL_USER'] ="root"
app.config['MYSQL_PASSWORD'] =""
app.config['MYSQL_DB'] ='multicurrency'

mysql=MySQL(app)

#API
class LoginProcess(Resource):
    def transaction():
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Insert username into it
        sql_query = ("select * from user")
        cursor.execute(sql_query)
        data = cursor.fetchone()
        return data
api.add_resource(LoginProcess,'/login/auth')


@app.route('/',methods=['GET','POST'])
def transaction():
    if request.method == 'GET':
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #We need to identify the username to insert in Where by

        cursor.execute("select * from transaction")
        data =cursor.fetchall()
        #return jsonify

@app.route('/login',methods=['POST','GET'])
def login():
    if request.method =="POST":
        username = request.form["username"] 
        password= request.form['password']
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Insert username into it
        sql_query = ("select * from user where username = %s")
        cursor.execute(sql_query, (username,))
        data = cursor.fetchone()
        #Check the password if it is accurate
        data_password = data.get('password')
        data_username =data.get('username')
        print(data_password)
        print(data_username)
        if data and data_password == password and data_username == username:
            return render_template('temp.html',data=data)
    else:
        return render_template("login.html")

@app.route('/currency',methods=['GET'])
def currency():
        #Get the username session

        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Change the SELECT variables (There are duplicates so we will need to change accordingly)
        sql_query = ("SELECT w.name,c.wallet_id,c.currency,c.amount FROM user U INNER JOIN wallet w ON u.id = w.user_id INNER JOIN currency c ON w.id =c.wallet_id")
        #Insert into username.
        #cursor.execute(sql_query, (username,))
        cursor.execute(sql_query)
        data = cursor.fetchall()
        return render_template('currency.html', title="page", jsonfile=json.dumps(data))

@app.route('/wallet',methods=['POST','GET'])
def transaction4():
     #Amount, debit_wallet, credit_wallet
    userid = "1"
    wallet_id = "1"
    currency = "SGD"

    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #Retrieve the wallet id the users have
    sql_query = ("select w.id ,currency, amount from wallet w INNER JOIN user u  ON w.user_id =u.id INNER JOIN currency c ON c.wallet_id = w.id where w.user_id = %s AND w.id =%s AND c.currency =%s")
    cursor.execute(sql_query, (userid,wallet_id,currency))
    data = cursor.fetchall()
    balance_left = data.get('')
    
    return jsonify(data)

    # cursor.execute("INSERT INTO transaction")

content = request.json

@app.route('/login/auth', methods = ['POST'])
def login_auth():
    if request.method == "POST":
        #username = request.json["username"]
        #password = request.json["password"]
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql_query = ("select * from user where username = %s and password = %s")
        cursor.execute(sql_query, (username,))
        data = cursor.fetchone()
        if data == None:
            raise ValueError("Wrong username or password.")
        else:
            db_id = data[0]
            db_un = data[1]
            db_pw = data[2]
            db_name = data[3]
            return username, db_id, db_name
        #return render_template('login.html')

@app.route('/exchange', methods=['POST','GET'])
def ex_rate():
    if request.method == 'POST':
        username = request.form["username"]
        password = request.form["password"]
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql_query = ("select * from exchange_rate")
        cursor.execute(sql_query)
        

if __name__=="__main__":
    app.run(debug=True)