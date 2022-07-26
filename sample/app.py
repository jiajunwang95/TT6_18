import requests
from flask import Flask,request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)
app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = 'multicurrency'


mysql = MySQL(app)


@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.json
        username = data.get("username")
        password = data.get("password")
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql_query = (
            "select * from user where username = %s and password = %s")
        cursor.execute(sql_query, (username, password))
        data = cursor.fetchone()
        if data == None:
            return jsonify({"error":"Wrong username or password."})
        else:
            return jsonify(data)

@app.route('/rate')
def show_exchange():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    sql_query = ("select * from exchange_rate ")
    cursor.execute(sql_query)
    data = cursor.fetchall()
    if data != None:
        return jsonify(data)
    else:
        return jsonify({"error":"Empty database"})

@app.route('/currency/<string:userid>')
def show_currency(userid : str):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    sql_query = ("SELECT w.name as 'wallet_name',c.wallet_id,c.currency,c.amount \
                FROM user u INNER JOIN wallet w \
                ON u.id = w.user_id\
                INNER JOIN currency c\
                ON w.id =c.wallet_id \
                WHERE u.id = %s")
    cursor.execute(sql_query, (userid,))
    data = cursor.fetchall()
    if data != None:
        return jsonify(data)
    else:
        return jsonify({"error":"Empty database"})

@app.route('/wallet/<string:userid>')
def show_wallet(userid : str):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    sql_query = ("SELECT w.* \
                FROM user u INNER JOIN wallet w \
                ON u.id = w.user_id\
                WHERE u.id = %s")
    cursor.execute(sql_query, (userid,))
    data = cursor.fetchall()
    if data != None:
        return jsonify(data)
    else:
        return jsonify({"error":"Empty database"})
@app.route('/delete', methods=['POST'] )
def deletion():
    if request.method == "POST":
        data = request.json
        userid = data.get("userid")
        walletid = data.get("walletid")
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        delete_currency_query = ("DELETE FROM currency \
                    WHERE wallet_id in (SELECT id from wallet where user_id = %s )")
        delete_wallet_query = ("DELETE FROM wallet \
                            WHERE id = %s")
        if delete_currency_query != None and delete_wallet_query != None:
            try:
            # Execute the SQL command
                cursor.execute(delete_currency_query, (userid,))
                cursor.execute(delete_wallet_query, (walletid,))
            # Commit your changes in the database
                mysql.connection.commit()
                return jsonify({"msg":"Successful"})
            except:
            # # Roll back in case there is any error
                mysql.connection.rollback()       
        else:
            return jsonify({"error":"Unable to find data"})

if __name__ == "__main__":
    app.run(debug=True)