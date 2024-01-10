from flask import Flask
from controller.index_controller import index_page
from controller.user_controller import user_page
from controller.book_controller import book_page
from controller.order_controller import order_page
from controller.event_controller import event_page

app = Flask(__name__)

app.register_blueprint(index_page, url_prefix="/")
app.register_blueprint(user_page, url_prefix="/user")
app.register_blueprint(book_page, url_prefix="/book")
app.register_blueprint(order_page, url_prefix="/order")
app.register_blueprint(event_page, url_prefix="/event")

if __name__ == "__main__":
    app.run(debug=True)