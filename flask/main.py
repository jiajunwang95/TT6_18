from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
#pip install
import MySQLdb.cursors
import json
import requests



#import yaml

app=Flask(__name__)
cors = CORS(app)
api = Api(app)

#configure db
#db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] ="localhost"
app.config['MYSQL_USER'] ="root"
app.config['MYSQL_PASSWORD'] ="password"
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
        data = request.json
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Retrieve wallet + currency table
        userid = data.get('userid')
        sql_query = ("select w.*, c.currency, c.amount from wallet w INNER JOIN currency c on w.id = c.wallet_id WHERE w.user_id =%s")
        cursor.execute(sql_query, (userid,))
        data = cursor.fetchall()
        return jsonify(data)
api.add_resource(GetWalletInfo,'/wallet')

class GetWalletDetails(Resource):
    def get(self):
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        ql_query = ("select w.*,u.username, c.currency, c.amount from wallet w inner join currency c on w.id = c.wallet_id inner join user u on u.id = w.user_id where username = %s")
        cursor.execute(sql_query, (username,))
        data = cursor.fetchall()
        return jsonify(data)
api.add_resource(GetWalletDetails,'/walletdetails')

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
@app.route('/currency',methods=['POST','GET'])
def currency():
        #Get the username session
        data = request.json
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #Retrieve wallet + currency table
        userid = data.get('userid')
        sql_query = ("select w.id, c.currency, c.amount from wallet w INNER JOIN currency c on w.id = c.wallet_id WHERE w.user_id =%s")
        cursor.execute(sql_query, (userid,))
        data = cursor.fetchall()
        return jsonify(data)

@app.route('/insert',methods=['POST','GET'])
def insert_data():
     #Amount, debit_wallet, credit_wallet
    data = request.json
    userid = data.get('userid')
    wallet_id = data.get('wallet_id')
    currency = data.get('currency')
    credit_amount = data.get('credit_amount')
    debit_amount = data.get('debit_amount')
    cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #Retrieve the wallet id the users have
    sql_query = ("select w.id ,currency, amount from wallet w INNER JOIN user u  ON w.user_id =u.id INNER JOIN currency c ON c.wallet_id = w.id where w.user_id = %s AND w.id =%s AND c.currency =%s")
    cursor.execute(sql_query, (userid,wallet_id,currency))
    data = cursor.fetchall()
    balance_left = data.get('amount')
    if credit_amount > balance_left:
        sql_query= ("INSERT INTO transaction (id,wallet_id,debit_id,debit_currency,debit_amount\
            ,credit_id,credit_currency,credit_amount,description,created_at,\
            created_by,updated_at,updated_by)\
            VALUES(default,%s,%s,%s,%s,%d\
                %s,%s,%d,%s,%s,\
                    %s,%s,%s)")
        cursor.execute(sql_query, (wallet_id))
            
    return jsonify(data)

    # cursor.execute("INSERT INTO transaction")

#content = request.json





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
