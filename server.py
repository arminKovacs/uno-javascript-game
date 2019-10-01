from flask import Flask, render_template, request
import random

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def route_game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True)