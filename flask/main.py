from flask import Flask, render_template,request
from flask_mysqldb import MySQL
import MySQLdb.cursors
import yaml

app=Flask(__name__)

#configure db
db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] =db['mysql_host']
app.config['MYSQL_USER'] =db['mysql_user']
app.config['MYSQL_PASSWORD'] =db['mysql_password']
app.config['MYSQL_DB'] =db['mysql_db']

mysql=MySQL(app)

@app.route('/',methods=['GET','POST'])
def transaction():
    if request.method == 'GET':
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("select * from transaction")
        data =cursor.fetchall()
        return render_template('transaction.html',data=data)

@app.route('/login',methods=['POST','GET'])
def login():
    if request.method =="POST":
        username = request.form["username"] 
        password= request.form['password']
        cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        sql_query = ("select * from user where username = %s")
        cursor.execute(sql_query, (username,))
        data = cursor.fetchall()
        return render_template('temp.html',data=data)
    else:
        return render_template("login.html")


@app.route('/login', methods = ['POST'])
def login_auth():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
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
            return username, db_id
        #return render_template('login.html')

if __name__=="__main__":
    app.run(debug=True)