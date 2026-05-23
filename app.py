from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

slot_data = {
    "A1": "vacant"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/status")
def status():
    return jsonify(slot_data)

@app.route("/update")
def update():
    status_value = request.args.get("status")

    if not status_value:
        return jsonify({"error": "Missing status parameter"}), 400

    status_value = status_value.strip().lower()

    if status_value == "occupied":
        slot_data["A1"] = "occupied"
    elif status_value == "vacant":
        slot_data["A1"] = "vacant"
    else:
        return jsonify({"error": "Invalid status value"}), 400

    return jsonify({
        "message": "updated successfully",
        "A1": slot_data["A1"]
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)