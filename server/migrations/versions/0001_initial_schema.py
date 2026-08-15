"""Initial KhaiKhai schema."""

from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("role", sa.String(20), nullable=False),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("email", sa.String(120), nullable=False, unique=True),
        sa.Column("phone", sa.String(20)),
        sa.Column("password_hash", sa.Text(), nullable=False),
        sa.Column("image_url", sa.Text()),
        sa.Column("registration_no", sa.String(40), unique=True),
        sa.Column("dept", sa.String(100)),
        sa.Column("address", sa.Text()),
        sa.Column("canteen_name", sa.String(120)),
        sa.Column("location", sa.Text()),
        sa.CheckConstraint("role IN ('student', 'canteen', 'admin')", name="ck_users_role"),
    )
    op.create_index("ix_users_id", "users", ["id"])
    op.create_index("ix_users_email", "users", ["email"])
    op.create_table(
        "canteens",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("owner_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE")),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("image_url", sa.Text()),
        sa.Column("location", sa.Text()),
        sa.Column("category", sa.String(60)),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_canteens_id", "canteens", ["id"])
    op.create_table(
        "meals",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("canteen_id", sa.Integer(), sa.ForeignKey("canteens.id", ondelete="CASCADE"), nullable=False),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("image_url", sa.Text()),
        sa.Column("quantity", sa.Integer(), server_default="0"),
        sa.Column("is_available", sa.Boolean(), server_default=sa.true()),
        sa.Column("created_at", sa.DateTime()),
        sa.CheckConstraint("price > 0", name="ck_meals_price_positive"),
        sa.CheckConstraint("quantity >= 0", name="ck_meals_quantity_nonnegative"),
    )
    op.create_index("ix_meals_id", "meals", ["id"])
    op.create_table(
        "orders",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("student_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="SET NULL")),
        sa.Column("canteen_id", sa.Integer(), sa.ForeignKey("canteens.id", ondelete="SET NULL")),
        sa.Column("total_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("mode", sa.String(20)),
        sa.Column("delivery_address", sa.Text()),
        sa.Column("created_at", sa.DateTime()),
        sa.CheckConstraint("status IN ('pending','accepted','rejected','preparing','ready','completed','cancelled')", name="ck_orders_status"),
        sa.CheckConstraint("mode IN ('pickup','delivery')", name="ck_orders_mode"),
    )
    op.create_index("ix_orders_id", "orders", ["id"])
    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("order_id", sa.Integer(), sa.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False),
        sa.Column("meal_id", sa.Integer(), sa.ForeignKey("meals.id", ondelete="SET NULL")),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("price_each", sa.Numeric(10, 2), nullable=False),
        sa.CheckConstraint("quantity > 0", name="ck_order_items_quantity_positive"),
    )
    op.create_index("ix_order_items_id", "order_items", ["id"])
    op.create_table(
        "complaints",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("student_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("canteen_id", sa.Integer(), sa.ForeignKey("canteens.id")),
        sa.Column("meal_id", sa.Integer(), sa.ForeignKey("meals.id")),
        sa.Column("order_id", sa.Integer(), sa.ForeignKey("orders.id")),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(30), server_default="pending"),
        sa.Column("created_at", sa.DateTime()),
        sa.CheckConstraint("status IN ('pending','reviewing','resolved')", name="ck_complaints_status"),
    )
    op.create_index("ix_complaints_id", "complaints", ["id"])
    op.create_table(
        "bookings",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("student_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("meal_id", sa.Integer(), sa.ForeignKey("meals.id"), nullable=False),
        sa.Column("scheduled_time", sa.DateTime(), nullable=False),
        sa.Column("status", sa.String(20), server_default="booked"),
        sa.Column("created_at", sa.DateTime()),
        sa.CheckConstraint("status IN ('booked','cancelled')", name="ck_bookings_status"),
    )
    op.create_index("ix_bookings_id", "bookings", ["id"])
    op.create_table(
        "invoices",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("canteen_id", sa.Integer(), sa.ForeignKey("canteens.id"), nullable=False),
        sa.Column("order_id", sa.Integer(), sa.ForeignKey("orders.id"), nullable=False, unique=True),
        sa.Column("total_amount", sa.Numeric(10, 2), nullable=False),
        sa.Column("issued_at", sa.DateTime()),
    )
    op.create_index("ix_invoices_id", "invoices", ["id"])


def downgrade() -> None:
    for table in ["invoices", "bookings", "complaints", "order_items", "orders", "meals", "canteens", "users"]:
        op.drop_table(table)

