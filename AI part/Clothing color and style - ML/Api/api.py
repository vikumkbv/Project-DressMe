import tensorflow as tf
from tensorflow import keras
import numpy as np
import math
from flask import Flask,request

app = Flask(__name__)

#round to next event number
def round_up_to_even(f):
    return math.ceil(round(f[0][0]) / 2.) * 2
  
#colors
colors = ["light purple","pastel","pink","gold","Yellow","bronze","orange","bright Yellow",
          "light red","deep navy blue","royal blue","Deep pink","bright pink",
          "raspberry pink","light red","bright green","deep purples","pink","Bright pinks",
          "olive green","emerald green","orange","cherry red","burgundy red",
         "brown","olive green","emerald green","gray","light red","apricot orange"]

def get_color(num):
    return colors[(num//2)-1]

@app.route('/api')
def index(): 
    gender = int(request.args.get('gender'))
    skin_color = int(request.args.get('skin_color'))
    occassion = int(request.args.get('occassion'))
    age = int(request.args.get('age'))

    model = keras.Sequential() 
    input_layer = keras.layers.Dense(4, input_shape=[4], activation='relu')
    model.add(input_layer)

    output_layer = keras.layers.Dense(1, activation='relu')
    model.add(output_layer)

    test = tf.Variable([[gender,skin_color,occassion,age]])
    init=tf.global_variables_initializer()
    with tf.Session() as sess:
        sess.run(init)
        model.load_weights('dressMe_model.h5')
        results = model.predict(test, verbose=1, steps=1)
        color_id = round_up_to_even(results)
        return(get_color(color_id))

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)        
    