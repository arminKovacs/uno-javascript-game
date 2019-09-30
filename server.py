from flask import Flask, render_template, request
import random

app = Flask(__name__)


@app.route('/')
def index():
    random_list = get_random_color_and_num(create_color_list(), create_number_list())
    return render_template('index.html', random_list=random_list)


def create_color_list():
    list_of_colors = ['blue', 'red', 'green', 'yellow']
    return list_of_colors


def create_number_list():
    list_of_numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return list_of_numbers


def get_random_color_and_num(color_list, num_list):
    random_list = [random.choice(color_list), random.choice(num_list)]
    return random_list



if __name__ == '__main__':
    app.run(debug=True)
