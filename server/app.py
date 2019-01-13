import os
import threading

from datetime import datetime
from flask import Flask, jsonify


app = Flask(__name__)
store = {}
store['data'] = []


@app.route('/data')
def data():
    global store
    return jsonify(store)

def save_load_every_ten_seconds():
    global store
    threading.Timer(10.0, save_load_every_ten_seconds).start()

    time = datetime.now().isoformat()
    one_min_load, five_min_load, fifteen_min_load = os.getloadavg()
    store['data'].append({'time': time, 'one_min': one_min_load, 'five_min': five_min_load, 'fifteen_min_load': fifteen_min_load})

save_load_every_ten_seconds()
