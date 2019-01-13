import os
import threading

from datetime import datetime
from flask import Flask, jsonify


app = Flask(__name__)
store = {}
store['loadHistory'] = []
store['currentTime'] = ''


@app.route('/data')
def data():
    global store
    return jsonify(store)

def save_load_every_ten_seconds():
    global store
    threading.Timer(10.0, save_load_every_ten_seconds).start()

    time = datetime.now().isoformat()
    one_min_load, five_min_load, fifteen_min_load = os.getloadavg()
    store['loadHistory'].append({'time': time, 'one_min': one_min_load, 'five_min': five_min_load, 'fifteen_min_load': fifteen_min_load})

# Inspiration for data to capture comes from uptime man pages:
# The uptime utility displays the current time, the length of time the system has been up, the number of users, and the load average of the system over the
# last 1, 5, and 15 minutes.
def save_current_time_every_ten_seconds():
    global store
    threading.Timer(10.0, save_load_every_ten_seconds).start()
    store['currentTime'] = datetime.now().isoformat()


save_load_every_ten_seconds()
save_current_time_every_ten_seconds()
