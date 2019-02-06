# Project DressMe - Team CodeKnights
# @Gigara Hettige

import numpy as np
import cv2
from sklearn.cluster import KMeans
from collections import Counter
import imutils
import pprint
from matplotlib import pyplot as plt


def extractSkin(image):
    # make a copy of image
    img = image.copy()
    # BGR to HSV
    img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # HSV Threadholds
    lower_threshold = np.array([0, 48, 80], dtype=np.uint8)
    upper_threshold = np.array([20, 255, 255], dtype=np.uint8)

    # Single Channel mask
    skinMask = cv2.inRange(img, lower_threshold, upper_threshold)

    # Gaussian Filter
    skinMask = cv2.GaussianBlur(skinMask, (3, 3), 0)

    # Extracting skin from the threshold mask
    skin = cv2.bitwise_and(img, img, mask=skinMask)

    # Return the image
    return cv2.cvtColor(skin, cv2.COLOR_HSV2BGR)
