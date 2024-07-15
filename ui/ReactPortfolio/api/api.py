from flask import Flask
import requests
import regex as re
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/api/leetcode")
def getLeetcodeCount():
    try:
        url = 'https://leetcode.com/WiNterBoy180204/'
        response = requests.get(url)
        content = response.content
        soup = BeautifulSoup(content, 'html.parser')

        count_div = soup.find("div", class_="absolute inset-0")

        count_text = count_div.get_text()
        pattern = r'\d+'
        solved_count = re.findall(pattern, count_text)[0] if re.findall(pattern, count_text) else "0"


        rating_div = soup.find("div", class_="text-label-1 dark:text-dark-label-1 flex items-center text-2xl")
        rating = rating_div.get_text() if rating_div else "N/A"

        data = {'solvedCount': solved_count, 'rating': rating}
        response_model = ResponseModel(status="success", data=data, message="Data retrieved successfully")

    except requests.RequestException as e:
        response_model = ResponseModel(status="error", data={}, message=f"Request error: {str(e)}")
    except Exception as e:
        response_model = ResponseModel(status="error", data={}, message=f"An error occurred: {str(e)}")

    response_data = {
        'status': response_model.status,
        'message': response_model.message,
        'data': response_model.data
    }

    return jsonify(response_data)


# @app.route("/api/leetcode")
# def getLeetcodeCount():
#     url = 'https://leetcode.com/WiNterBoy180204/'
#     r = requests.get(url)
#     content = r.content
#     soup = BeautifulSoup(content, 'html.parser')

#     countDiv = soup.find("div", class_="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center").get_text()
#     pattern = '[0-9]*'
#     solvedCount = re.findall(pattern, countDiv)[0]
#     rating = soup.find("div", class_="text-label-1 dark:text-dark-label-1 flex items-center text-2xl").get_text()
    
#     return {'solvedCount': solvedCount, 'rating': rating}


@app.route("/api/codeforces", methods=['GET', 'POST'])
def getCodeforcesCount():
    url = 'https://codeforces.com/profile/WiNterBoy180204'
    r = requests.get(url)
    content = r.content
    soup = BeautifulSoup(content, 'html.parser')

    countDiv = soup.find("div", class_="_UserActivityFrame_counterValue")
    inner_text = countDiv.get_text()
    pattern = '[0-9]*'
    solved_count = re.findall(pattern, inner_text)[0]

    ratingDiv = soup.find("div", class_="info")

    if ratingDiv:
        rating = ratingDiv.find("ul").find("li").find("span").get_text()
    else:
        rating = 'N/A'

    return {'solvedCount': solved_count, 'rating': rating}

