import pandas as pd
import numpy as np
import keras
from keras import backend as K
from keras.preprocessing.image import img_to_array
import pickle
# import sys
import cv2
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

default_image_size = tuple((256, 256))

labels = np.array(['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy',
       'Potato___Early_blight', 'Potato___Late_blight',
       'Potato___healthy', 'Tomato_Bacterial_spot', 'Tomato_Early_blight',
       'Tomato_Late_blight', 'Tomato_Leaf_Mold',
       'Tomato_Septoria_leaf_spot',
       'Tomato_Spider_mites_Two_spotted_spider_mite',
       'Tomato__Target_Spot', 'Tomato__Tomato_YellowLeaf__Curl_Virus',
       'Tomato__Tomato_mosaic_virus', 'Tomato_healthy'])

def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None :
            image = cv2.resize(image, default_image_size)   
            return img_to_array(image)
        else :
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None

with open("cnn_model.pkl", "rb") as file:
    model = pickle.load(file)
    img_path = "./uploads/images/test.jpg"
    # print(img_path)
    # sys.stdout.flush()
    new_img = convert_image_to_array(img_path)
    # print(new_img)

    img_batch = np.expand_dims(new_img, axis=0)
    pred = model.predict_proba(img_batch)

    print(labels[np.argmax(pred)])

    with open("results.txt", "r+") as f:
        data = f.read()
        f.seek(0)
        f.write(labels[np.argmax(pred)])
        f.truncate()