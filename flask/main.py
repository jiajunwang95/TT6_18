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
    def get(self):
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Insert username into it
        sql_query = ("select * from user")
        cursor.execute(sql_query)
        data = cursor.fetchone()
        return data
api.add_resource(LoginProcess,'/login/auth')

class GetExchangeRate(Resource):
    def get(self):
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Insert username into it
        sql_query = ("select * from exchange_rate")
        cursor.execute(sql_query)
        data = cursor.fetchall()
        return jsonify(data)
api.add_resource(GetExchangeRate,'/exchangerate')

class GetWalletInfo(Resource):
    def get(self):
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Retrieve wallet + currency table
        sql_query = ("select w.*, c.currency, c.amount from wallet w INNER JOIN currency c on w.id = c.wallet_id")
        cursor.execute(sql_query)
        data = cursor.fetchall()
        return jsonify(data)
api.add_resource(GetWalletInfo,'/wallet')



@app.route('/',methods=['GET','POST'])
def transaction():
    if request.method == 'GET':
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #We need to identify the username to insert in Where by

        cursor.execute("select * from transaction")
        data =cursor.fetchall()
        #return jsonify

# @app.route('/login/auth',methods=['POST','GET'])
# def login():
#     if request.method =="POST":
#         data = request.json
#         username= data.get("username")
#         cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
#         #Insert username into it
#         sql_query = ("select * from user where username = %s")
#         cursor.execute(sql_query, (username,))
#         data = cursor.fetchone()
#         #Check the password if it is accurate
#         data_password = data.get('password')
#         data_username =data.get('username')
#         print(data_password)
#         print(data_username)
#         if data and data_password == password and data_username == username:
#             return render_template('temp.html',data=data)
#     else:
#         return render_template("login.html")

@app.route('/login/auth', methods = ['POST'])
def login_auth():
    if request.method == "POST":
        data = request.json
        username= data.get("username")
        password = data.get("password")
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql_query = ("select * from user where username = %s and password = %s")
        cursor.execute(sql_query, (username,password))
        data = cursor.fetchone()
        if data == None:
            raise ValueError("Wrong username or password.")
        else:
            return jsonify(data)
        #return render_template('login.html')
@app.route('/currency',methods=['GET'])
def currency():
        #Get the username session

        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Change the SELECT variables (There are duplicates so we will need to change accordingly)
        sql_query = ("select wallet.*, currency.currency, currency.amount from wallet join currency on wallet.id = currency.wallet_id")
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

#content = request.json

@app.route('/wallet', methods = ["DELETE"])
def delete(w_id):
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    sql_query = ("delete from wallet where wallet.id = w_id") #select wallet to be deleted from wallet table
    cursor.execute(sql_query)
    sql_query = ("delete from currency where currency.wallet_id = w_id")
    cursor.execute(sql_query)
    print("Wallet is deleted.")



if __name__=="__main__":
    app.run(debug=True)
