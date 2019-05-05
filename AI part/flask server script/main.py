from flask import Flask

import numpy as np
import cv2
from sklearn.cluster import KMeans
from collections import Counter
import imutils
import pprint
from matplotlib import pyplot as plt
import math
from flask import request

app = Flask(__name__)


@app.route("/")
def home():
    return "Loading.... Dressme Color detection API"


def extractSkin(image):
    # Taking a copy of the image
    img = image.copy()
    # Converting from BGR Colours Space to HSV
    img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Defining HSV Threadholds
    lower_threshold = np.array([0, 48, 80], dtype=np.uint8)
    upper_threshold = np.array([20, 255, 255], dtype=np.uint8)

    # Single Channel mask,denoting presence of colours in the about threshold
    skinMask = cv2.inRange(img, lower_threshold, upper_threshold)

    # Cleaning up mask using Gaussian Filter
    skinMask = cv2.GaussianBlur(skinMask, (3, 3), 0)

    # Extracting skin from the threshold mask
    skin = cv2.bitwise_and(img, img, mask=skinMask)

    # Return the Skin image
    return cv2.cvtColor(skin, cv2.COLOR_HSV2BGR)


def removeBlack(estimator_labels, estimator_cluster):

    # Check for black
    hasBlack = False

    # Get the total number of occurance for each color
    occurance_counter = Counter(estimator_labels)

    # Quick lambda function to compare to lists
    def compare(x, y): return Counter(x) == Counter(y)

    # Loop through the most common occuring color
    for x in occurance_counter.most_common(len(estimator_cluster)):

        # Quick List comprehension to convert each of RBG Numbers to int
        color = [int(i) for i in estimator_cluster[x[0]].tolist()]

        # Check if the color is [0,0,0] that if it is black
        if compare(color, [0, 0, 0]) == True:
            # delete the occurance
            del occurance_counter[x[0]]
            # remove the cluster
            hasBlack = True
            estimator_cluster = np.delete(estimator_cluster, x[0], 0)
            break

    return (occurance_counter, estimator_cluster, hasBlack)


def getColorInformation(estimator_labels, estimator_cluster, hasThresholding=False):

    # Variable to keep count of the occurance of each color predicted
    occurance_counter = None

    # Output list variable to return
    colorInformation = []

    # Check for Black
    hasBlack = False

    # If a mask has be applied, remove th black
    if hasThresholding == True:

        (occurance, cluster, black) = removeBlack(
            estimator_labels, estimator_cluster)
        occurance_counter = occurance
        estimator_cluster = cluster
        hasBlack = black

    else:
        occurance_counter = Counter(estimator_labels)

    # Get the total sum of all the predicted occurances
    totalOccurance = sum(occurance_counter.values())

    # Loop through all the predicted colors
    for x in occurance_counter.most_common(len(estimator_cluster)):

        index = (int(x[0]))

        # Quick fix for index out of bound when there is no threshold
        index = (index-1) if ((hasThresholding & hasBlack)
                              & (int(index) != 0)) else index

        # Get the color number into a list
        color = estimator_cluster[index].tolist()

        # Get the percentage of each color
        color_percentage = (x[1]/totalOccurance)

        # make the dictionay of the information
        #colorInfo = {"cluster_index": index, "color": color,"color_percentage": color_percentage}
        colorInfo = color

        # Add the dictionary to the list
        colorInformation.append(colorInfo)

    return colorInformation


def extractDominantColor(image, number_of_colors=5, hasThresholding=False):

    # Quick Fix Increase cluster counter to neglect the black(Read Article)
    if hasThresholding == True:
        number_of_colors += 1

    # Taking Copy of the image
    img = image.copy()

    # Convert Image into RGB Colours Space
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Reshape Image
    img = img.reshape((img.shape[0]*img.shape[1]), 3)

    # Initiate KMeans Object
    estimator = KMeans(n_clusters=number_of_colors, random_state=0)

    # Fit the image
    estimator.fit(img)

    # Get Colour Information
    colorInformation = getColorInformation(
        estimator.labels_, estimator.cluster_centers_, hasThresholding)
    return colorInformation


def print_data(color_info):
    for x in color_info:
        print(pprint.pformat(x))
        print()


letters = "A B C D E F".split()


def toHex(r, g, b):
    r1 = math.floor(r/16)
    if r1 > 9:
        r1 = letters[r1-10]
    r2 = r % 16
    if r2 > 9:
        r2 = letters[r2-10]
    g1 = math.floor(g/16)
    if g1 > 9:
        g1 = letters[g1-10]
    g2 = g % 16
    if g2 > 9:
        g2 = letters[g2-10]
    b1 = math.floor(b/16)
    if b1 > 9:
        b1 = letters[b1-10]
    b2 = b % 16
    if b2 > 9:
        b2 = letters[b2-10]
    r1 = str(r1)
    r2 = str(r2)
    g1 = str(g1)
    g2 = str(g2)
    b1 = str(b1)
    b2 = str(b2)
    hex = r1+r2+g1+g2+b1+b2
    return hex

# Get Image from URL.
    #image = imutils.url_to_image("https://sa1s3optim.patientpop.com/assets/images/provider/photos/1868984.jpg")


# image = imutils.url_to_image("https://static-32.sinclairstoryline.com/resources/media/809642a7-7513-473f-c391-28b5bda5fba3-809642a77513473fc39128b5bda5fba3rendition_1_mark_christopher.jpg?1496596547423") #man white
#image = imutils.url_to_image("https://images.freeimages.com/images/small-previews/42e/girl-1518718.jpg")
# image = imutils.url_to_image("https://www.todaysparent.com/wp-content/uploads/2017/06/Black-girls-face-discrimination-as-young-as-five-years-old-says-new-study-1024x576-1498759744.jpg") #black girl
#image = imutils.url_to_image("https://ak6.picdn.net/shutterstock/videos/13947446/thumb/1.jpg")
#image = imutils.url_to_image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmZfoCvxe4-RGq4U3EPiLTYly2oai_vU7EpAk3oYNtWVkaP3i")
# image = imutils.url_to_image("https://pbs.twimg.com/profile_images/1003266193493450753/6-o5iDD8_400x400.jpg") #charith
#image = imutils.url_to_image("https://c1.staticflickr.com/6/5594/14403426954_a668d944c1_b.jpg")  # banu
#image = imutils.resize(image, width=250)
#skin = extractSkin(image)
#dominantColors = extractDominantColor(skin, hasThresholding=True)

# @app.route("/result/", defaults={'pic':''} , methods=['GET', 'POST'])


@app.route("/result/", methods=['GET', 'POST'])
def runDressme():
    pic = request.form['pic']
# Resize image to a width of 250
    image = imutils.url_to_image(pic)
    image = imutils.resize(image, width=250)
    skin = extractSkin(image)
    global dominantColors
    dominantColors = extractDominantColor(skin, hasThresholding=True)
# print(pprint.pformat(dominantColors[0]))
    rgb = (pprint.pformat(dominantColors[0]))
    hexColor = (toHex(int(dominantColors[0][0]), int(dominantColors[0][1]), int(dominantColors[0][2])))

    return  (hexColor)


@app.route("/hex", methods=['GET', 'POST'])
def hex():
    # print(toHex(int(dominantColors[0][0]),int(dominantColors[0][1]),int(dominantColors[0][2])))
    return (toHex(int(dominantColors[0][0]), int(dominantColors[0][1]), int(dominantColors[0][2])))
#print("Color Information")
# print_data(dominantColors)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
