from flask import Flask, render_template,request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import json

#import yaml

app=Flask(__name__)

#configure db
#db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] ="localhost"
app.config['MYSQL_USER'] ="root"
app.config['MYSQL_PASSWORD'] =""
app.config['MYSQL_DB'] ='multicurrency'

mysql=MySQL(app)

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





if __name__=="__main__":
    app.run(debug=True)