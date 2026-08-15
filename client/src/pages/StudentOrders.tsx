import { useCallback, useEffect, useState } from "react";
import { apiRequest, getErrorMessage } from "../api";
import { useAuth } from "../context/auth";

type Order = {
  id: number;
  canteen_id: number | null;
  total_price: number;
  status: string;
  mode: string | null;
  created_at: string;
};

export default function StudentOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      setOrders(await apiRequest<Order[]>("/orders/me", {}, token));
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError, "Could not load your orders"));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { void loadOrders(); }, [loadOrders]);

  return (
    <main className="page-shell">
      <div className="page-container">
        <section className="panel" aria-labelledby="orders-title">
          <span className="eyebrow">Student portal</span>
          <h1 id="orders-title">Your orders</h1>
          <p>Follow every campus order from request to pickup or delivery.</p>
          {error && <div className="error-banner" role="alert">{error} <button onClick={() => void loadOrders()}>Retry</button></div>}
          {loading ? <div className="empty-state" aria-live="polite">Loading orders…</div> : orders.length === 0 ? (
            <div className="empty-state">No orders yet. Choose a meal from your dashboard to get started.</div>
          ) : (
            <div className="status-list">
              {orders.map((order) => (
                <article className="status-row" key={order.id}>
                  <div><strong>Order #{order.id}</strong><div>Canteen #{order.canteen_id} · {order.mode ?? "pickup"} · ৳{order.total_price.toFixed(2)}</div><small>{new Date(order.created_at).toLocaleString()}</small></div>
                  <span className="status-badge">{order.status}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

