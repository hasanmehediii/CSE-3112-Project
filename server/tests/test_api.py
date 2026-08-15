from .conftest import auth, login


def register_student(client, email="student@example.com"):
    response = client.post(
        "/users/register",
        json={
            "name": "Student User",
            "email": email,
            "password": "Student123",
            "registration_no": "REG-" + email.split("@")[0],
            "role": "admin",
        },
    )
    assert response.status_code == 201, response.text
    return response.json()["access_token"]


def test_public_registration_is_always_student(client):
    token = register_student(client)
    response = client.get("/users/me", headers=auth(token))
    assert response.status_code == 200
    assert response.json()["role"] == "student"


def test_students_cannot_provision_canteens(client):
    token = register_student(client)
    response = client.post(
        "/admin/users",
        headers=auth(token),
        json={
            "role": "canteen",
            "name": "Owner",
            "email": "owner@example.com",
            "password": "Owner123",
            "canteen_name": "Campus Cafe",
        },
    )
    assert response.status_code == 403


def test_admin_provisions_canteen_and_order_stock_is_restored_on_cancel(client, admin_credentials):
    admin_token = login(client, **admin_credentials)
    response = client.post(
        "/admin/users",
        headers=auth(admin_token),
        json={
            "role": "canteen",
            "name": "Cafe Owner",
            "email": "owner@example.com",
            "password": "Owner123",
            "canteen_name": "Campus Cafe",
            "location": "Science Faculty",
        },
    )
    assert response.status_code == 201, response.text

    owner_token = login(client, "owner@example.com", "Owner123")
    canteen = client.get("/canteens/me", headers=auth(owner_token)).json()["canteen"]
    meal_response = client.post(
        "/meals/",
        headers=auth(owner_token),
        json={"name": "Rice Bowl", "price": 120, "quantity": 5},
    )
    assert meal_response.status_code == 201, meal_response.text
    meal = meal_response.json()

    student_token = register_student(client, "buyer@example.com")
    order_response = client.post(
        "/orders/",
        headers=auth(student_token),
        json={
            "canteen_id": canteen["id"],
            "mode": "pickup",
            "items": [{"meal_id": meal["id"], "quantity": 3}],
        },
    )
    assert order_response.status_code == 201, order_response.text
    order = order_response.json()

    accepted = client.patch(
        f"/orders/{order['id']}/status",
        headers=auth(owner_token),
        json={"status": "accepted"},
    )
    assert accepted.status_code == 200, accepted.text
    meals = client.get(f"/meals/canteen/{canteen['id']}").json()
    assert meals[0]["quantity"] == 2

    cancelled = client.patch(
        f"/orders/{order['id']}/status",
        headers=auth(owner_token),
        json={"status": "cancelled"},
    )
    assert cancelled.status_code == 200, cancelled.text
    meals = client.get(f"/meals/canteen/{canteen['id']}").json()
    assert meals[0]["quantity"] == 5


def test_delivery_address_and_complaint_validation(client):
    token = register_student(client)
    invalid_order = client.post(
        "/orders/",
        headers=auth(token),
        json={"canteen_id": 1, "mode": "delivery", "items": [{"meal_id": 1, "quantity": 1}]},
    )
    assert invalid_order.status_code == 422

    invalid_complaint = client.post(
        "/complaints/",
        headers=auth(token),
        json={"canteen_id": 1, "message": "short"},
    )
    assert invalid_complaint.status_code == 422

