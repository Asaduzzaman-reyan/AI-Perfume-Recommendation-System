import React, { useEffect, useState, useRef } from "react";
import { User, Mail, Shield, Camera, PackageSearch, Calendar, DollarSign, Heart } from "lucide-react";

const Profile = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", favoriteScent: "", newsletter: false });
    const [avatar, setAvatar] = useState("");
    const fileInputRef = useRef(null);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingWishlist, setLoadingWishlist] = useState(true);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
    const [passwordMsg, setPasswordMsg] = useState("");
    const [profileMsg, setProfileMsg] = useState("");

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const res = await fetch("/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                    setForm({
                        name: data.name,
                        email: data.email,
                        favoriteScent: data.preferences?.favoriteScent || "",
                        newsletter: data.preferences?.newsletter || false,
                    });
                    setAvatar(data.avatar || "");
                }
            } catch {}
        };
        fetchProfile();
    }, [token]);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;
            try {
                const res = await fetch("/api/users/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setOrders(data || []);
            } catch {
                setOrders([]);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, [token]);

    // Fetch wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!token) return;
            try {
                const res = await fetch("/api/users/wishlist", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setWishlist(data || []);
            } catch {
                setWishlist([]);
            } finally {
                setLoadingWishlist(false);
            }
        };
        fetchWishlist();
    }, [token]);

    // Handle avatar change
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result;
                setAvatar(base64);
                // Optionally, add avatar update endpoint if needed
                // await fetch("/api/users/avatar", { ... })
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileMsg("");
        try {
            const res = await fetch("/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    preferences: {
                        favoriteScent: form.favoriteScent,
                        newsletter: form.newsletter,
                    },
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setProfileMsg("Profile updated!");
                setEditMode(false);
                setUser((prev) => ({
                    ...prev,
                    name: form.name,
                    email: form.email,
                    preferences: {
                        favoriteScent: form.favoriteScent,
                        newsletter: form.newsletter,
                    },
                }));
            } else {
                setProfileMsg(data.error || "Update failed");
            }
        } catch {
            setProfileMsg("Update failed");
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMsg("");
        try {
            const res = await fetch("/api/users/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(passwordForm),
            });
            const data = await res.json();
            if (res.ok) {
                setPasswordMsg("Password updated!");
                setPasswordForm({ currentPassword: "", newPassword: "" });
            } else {
                setPasswordMsg(data.error || "Password update failed");
            }
        } catch {
            setPasswordMsg("Password update failed");
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-20 text-red-500 text-lg">
                No user info found. Please log in.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 md:flex-row items-start justify-center min-h-[80vh] bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 py-10">
            {/* Profile Section */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30 mb-10 md:mb-0">
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <div className="bg-gradient-to-br from-amber-400 to-purple-500 rounded-full p-2 shadow-lg">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                                />
                            ) : (
                                <User className="w-20 h-20 text-white" />
                            )}
                        </div>
                        <button
                            className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1 hover:bg-amber-300 transition-colors"
                            onClick={() => fileInputRef.current.click()}
                            title="Change avatar"
                        >
                            <Camera className="w-5 h-5 text-purple-700" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    {!editMode ? (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                            <div className="text-purple-100 mb-2">{user.email}</div>
                            <div className="text-purple-200 mb-2 capitalize">{user.role}</div>
                            <div className="mb-2">
                                <span className="text-purple-200 text-xs">Favorite Scent: </span>
                                <span className="text-white text-sm">
                                    {user.preferences?.favoriteScent || "—"}
                                </span>
                            </div>
                            <button
                                className="mt-4 bg-gradient-to-r from-purple-500 to-amber-400 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleProfileUpdate} className="w-full mt-2 space-y-3">
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-purple-200"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-purple-200"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="Email"
                                required
                            />
                            <label className="block text-purple-200 text-xs mb-1">Favorite Scent</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-purple-200 mb-2"
                                value={form.favoriteScent || ""}
                                onChange={e => setForm(f => ({ ...f, favoriteScent: e.target.value }))}
                                placeholder="e.g. Citrus, Woody, Floral"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-purple-500 to-amber-400 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-white/30 text-purple-900 px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            {profileMsg && (
                                <div className="text-center text-sm text-amber-200">{profileMsg}</div>
                            )}
                        </form>
                    )}
                </div>
                {/* Password Change */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-2">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-2">
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-purple-200"
                            value={passwordForm.currentPassword}
                            onChange={e => setPasswordForm(f => ({ ...f, currentPassword: e.target.value }))}
                            placeholder="Current Password"
                            required
                        />
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-purple-200"
                            value={passwordForm.newPassword}
                            onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))}
                            placeholder="New Password"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-amber-400 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform w-full"
                        >
                            Update Password
                        </button>
                        {passwordMsg && (
                            <div className="text-center text-sm text-amber-200">{passwordMsg}</div>
                        )}
                    </form>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-gradient-to-r from-purple-500 to-amber-400 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            localStorage.removeItem("avatar");
                            window.location.reload();
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Order History Section */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/30 mb-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <PackageSearch className="w-7 h-7 mr-2 text-amber-400" />
                    Order History
                </h3>
                {loadingOrders ? (
                    <div className="text-purple-100">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-purple-200">No orders found.</div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <Calendar className="w-5 h-5 text-purple-300 mr-2" />
                                        <span className="text-white text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center mb-2 md:mb-0">
                                        <DollarSign className="w-5 h-5 text-purple-300 mr-2" />
                                        <span className="text-white text-sm">Total: ${order.total_amount}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Shield className="w-5 h-5 text-purple-300 mr-2" />
                                        <span className="text-white text-sm capitalize">{order.status || "Processing"}</span>
                                    </div>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <span className="text-purple-200 text-xs">Items: </span>
                                    <span className="text-white text-sm">{order.items?.length || 0}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Wishlist Section */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Heart className="w-7 h-7 mr-2 text-amber-400" />
                    Wishlist
                </h3>
                {loadingWishlist ? (
                    <div className="text-purple-100">Loading wishlist...</div>
                ) : wishlist.length === 0 ? (
                    <div className="text-purple-200">No items in wishlist.</div>
                ) : (
                    <div className="space-y-6">
                        {wishlist.map((item) => (
                            <div key={item.id} className="bg-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="text-white font-semibold">{item.name}</div>
                                    <div className="text-purple-200 text-xs">{item.brand}</div>
                                </div>
                                <div className="flex items-center mt-2 md:mt-0">
                                    <span className="text-purple-200 text-xs mr-2">Added: {new Date(item.added_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;