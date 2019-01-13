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

def save_load_every_minute():
    global store
    threading.Timer(5.0, save_load_every_minute).start()

    time = datetime.now().isoformat()
    load = os.getloadavg()
    app.logger.debug('Saving load {} at {}'.format(load, time))
    store['data'].append({time, load})

save_load_every_minute()
