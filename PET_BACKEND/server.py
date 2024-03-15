from flask import Flask,request,jsonify
import mysql.connector
import urllib.request
import os
from werkzeug.utils import secure_filename # pip install Werkzeug
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static/images"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="pet_adoption"
)

# mycursor = mydb.cursor()
mycursor = mydb.cursor()


@app.route('/')
def root():
    return "ruuunig python ka server running"
  
@app.route('/staff/add/pet', methods=["POST","GET"])
def handleUpload():
  if request.method == "POST":
    # file = request.form
    file = request.files.get('image') 
    pet = request.form
    name = pet.get("name")
    breed = pet.get('breed')
    species = pet.get('species')
    age = pet.get('age')
    gender = pet.get('gender')
    status = pet.get('status')
    # print(name,breed,species,age,gender,status)
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    sql = "INSERT INTO pet (pet_name,pet_breed,pet_species,pet_age,pet_gender,pet_adoption_status,pet_image) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    values = (name,breed,species,age,gender,status,filename)
    mycursor.execute(sql,values)
    mydb.commit()
    id = mycursor.lastrowid
    return jsonify({"message":"successful","id":id})
  else:
    return jsonify({"message":"failed"})

@app.route("/all/not/adopted/pets",methods=["GET"])
def getAllNotAdoptedPets():
  if request.method == "GET":
    qury = "SELECT * FROM pet WHERE pet_adoption_status='NOT ADOPTED YET';"
    mycursor.execute(qury)
    return mycursor.fetchall()
  
@app.route("/visiter/request/pets/<vid>",methods=["GET"])
def getAllVisiterRequestPets(vid):
  if request.method == "GET":
    resposnse = []
    qury = f"SELECT pet_id FROM visiter_request_pet_adoption WHERE visiter_id='{vid}';"
    mycursor.execute(qury)
    pids = mycursor.fetchall()
    # print(pids)
    for pidi in pids:
      # print(pidi[0])
      try:
        innerQuery = f"SELECT * FROM pet WHERE pet_id='{pidi[0]}';"
        mycursor.execute(innerQuery)
        data = mycursor.fetchall()
        # print(data)
        # [(9, 'penguin', 'pen', 'penx', '13', 'male', 'REQUEST', 'penguin.jpg')]
        resposnse.append({
          'id':data[0][0],
          'name':data[0][1],
          'breed':data[0][2],
          'species':data[0][3],
          'age':data[0][4],
          'gender':data[0][5],
          'status':data[0][6],
          'img':data[0][7]
        })
        # return mycursor.fetchall()
      except Exception as e:
        return jsonify({"message":"Failed To fecth Data"})
    # print(mycursor.fetchall())
    return resposnse

@app.route("/visiter/request/pets",methods=["GET"])
def getAllxxxAdoptedPets():
  if request.method == "GET":
    qury = "SELECT * FROM pet WHERE pet_adoption_status='ADOPTED';"
    mycursor.execute(qury)
    return mycursor.fetchall()

@app.route("/all/adopted/pets",methods=["GET"])
def getAllAdoptedPets():
  if request.method == "GET":
    qury = "SELECT * FROM pet WHERE pet_adoption_status='ADOPTED';"
    mycursor.execute(qury)
    return mycursor.fetchall()

@app.route("/all/adoption/request/pets",methods=["GET"])
def getAllAdoptionRequestPets():
  try:
      if request.method == "GET":
            qury = "SELECT * FROM pet WHERE pet_adoption_status='REQUEST';"
            mycursor.execute(qury)
            datas = [mycursor.fetchall()]
            visiters_ids = []
            # print(datas)
            for data in datas[0]:
                # print(data[0])
                innerqueryx = f"SELECT visiter_id FROM visiter_request_pet_adoption WHERE pet_id='{data[0]}';"
                mycursor.execute(innerqueryx)
                ids = mycursor.fetchall()
                # print(ids)
                visiters_ids.append(ids[0][0])

            tupleIDS = tuple(visiters_ids)
            # print(tupleIDS)
            names = []
            # tupleIDS = tuple(visiters_ids)
            for vid in visiters_ids:
              outterNameQuery = f"SELECT visiter_name,visiter_id FROM visiter WHERE visiter_id = '{vid}';"
              mycursor.execute(outterNameQuery)
              data = mycursor.fetchall()
              print(data)
              name = data[0][0]
              temp_vid = data[0][1]
              temp = [name,temp_vid]
              names.append(temp)
            datas.append(names)
            return datas
  except Exception as e:
    return jsonify({"message":"FAILED"})

@app.route("/staff/delete/pet/<pid>",methods=["DELETE"])
def staffDeletePet(pid):
  if request.method == "DELETE":
    queryImgName = f"SELECT pet_image FROM pet WHERE pet_id='{pid}'"
    mycursor.execute(queryImgName)
    fileName = mycursor.fetchall()
    os.remove("C:/Users/aasim/Desktop/PET_ADOPT/PET_BACKEND/static/images/"+fileName[0][0])
    deletePet(pid)
    return jsonify({"message":"deleted","pid":pid})

def deletePet(pid):
  querydel = f"DELETE FROM pet WHERE pet_id = '{pid}'"
  mycursor.execute(querydel)
  mydb.commit()

@app.route('/staff/login', methods=["POST"])
def handleStaffLogin():
  if request.method == "POST":
    data = request.json
    email = data.get("email")
    password = data.get("password")
    query = f"SELECT * FROM staff WHERE staff_email='{email}' AND staff_password='{password}';"
    mycursor.execute(query)
    return mycursor.fetchall()
  else:
    return jsonify({"message":"staff login Failed As Wrong Requsst Made"})

@app.route('/visiter/register', methods=["POST"])
def handleVisiterRegister():
  if request.method == "POST":
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    query = f"INSERT INTO visiter(visiter_name,visiter_email,visiter_password) VALUES('{name}','{email}','{password}')"
    mycursor.execute(query)
    mydb.commit()
    return jsonify({"message":"Register Successs","id":mycursor.lastrowid})
  else:
    return jsonify({"message":"staff login Failed As Wrong Requsst Made"})

@app.route('/visiter/login', methods=["POST"])
def handleVisiterLogin():
  if request.method == "POST":
    data = request.json
    email = data.get("email")
    password = data.get("password")
    query = f"SELECT * FROM visiter WHERE visiter_email='{email}' AND visiter_password='{password}';"
    mycursor.execute(query)
    return mycursor.fetchall()
  else:
    return jsonify({"message":"staff login Failed As Wrong Requsst Made"})

@app.route("/visiter/request/pet/adoption",methods=["POST"])
def visiterRequsetPetAdoption():
   if request.method == "POST":
      data = request.json
      vid = data.get("vid")
      pid = data.get("pid")
      query = f"INSERT INTO visiter_request_pet_adoption(visiter_id,pet_id) VALUES('{vid}','{pid}');"
      mycursor.execute(query)
      query2 = f"UPDATE pet SET pet_adoption_status='REQUEST' WHERE pet_id='{pid}'"
      mycursor.execute(query2)
      mydb.commit()
      return jsonify({"message":"success"})

@app.route("/staff/accept/pet/adoption/request/<pid>",methods=["PUT"])
def staffAcceptPetAdoptionRequest(pid):
   if request.method == "PUT":
    query = f"UPDATE pet SET pet_adoption_status='ADOPTED' WHERE pet_id='{pid}'"
    mycursor.execute(query)
    mydb.commit()
    return jsonify({"message":"success"})

@app.route("/staff/reject/pet/adoption/request",methods=["POST"])
def staffRejectPetAdoptionRequest():
   if request.method == "POST":
      data = request.json
      vid = data.get("vid")
      pid = data.get("pid")
      query = f"UPDATE pet SET pet_adoption_status='NOT ADOPTED YET' WHERE pet_id='{pid}'"
      mycursor.execute(query)
      xquery = f"DELETE FROM visiter_request_pet_adoption WHERE visiter_id='{vid}' AND pet_id='{pid}'"
      mycursor.execute(xquery)
      mydb.commit()
      return jsonify({"message":"success"})

if __name__ == '__main__':
   app.run(debug=True)