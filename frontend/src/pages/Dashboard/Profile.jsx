import React, { useContext, useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { UserContext } from '../../context/userContext'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import Input from '../../components/Inputs/Input'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import uploadImage from '../../utils/uploadImage'
import toast from 'react-hot-toast'

import { useUserAuth } from '../../hooks/useUserAuth'

const Profile = () => {
    useUserAuth();
    const { user, updateUser } = useContext(UserContext);

    const [profilePic, setProfilePic] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const names = (user.fullName || '').split(' ');
            setFirstName(names[0] || '');
            setLastName(names.slice(1).join(' ') || '');
            setEmail(user.email || '');
            setProfilePic(user.profileImageUrl);
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!firstName) {
            toast.error("First name is required");
            return;
        }

        setLoading(true);

        try {
            let profileImageUrl = user.profileImageUrl;

            // Upload image if a new one is selected
            if (profilePic instanceof File) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || profileImageUrl;
            } else if (profilePic === null) {
                profileImageUrl = ""; // Image removed
            }

            const fullName = `${firstName} ${lastName}`.trim();

            const payload = {
                fullName,
                profileImageUrl,
            };

            if (password) {
                payload.password = password;
            }

            const response = await axiosInstance.patch(API_PATHS.AUTH.UPDATE_PROFILE, payload);

            if (response.data && response.data.user) {
                updateUser(response.data.user);
                toast.success("Profile updated successfully");
                setPassword(''); // Clear password field after success
                setProfilePic(null); // Clear selected file
            }
        } catch (error) {
            console.error("Update profile error:", error);
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="max-w-4xl mx-auto my-10 px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                    <p className="text-gray-500 mb-8 border-b border-gray-50 pb-6">Update your personal information and profile picture.</p>

                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                        <div className="flex flex-col items-center sm:items-start space-y-4">
                            <label className="text-sm font-medium text-gray-700">Account Photo</label>
                            <ProfilePhotoSelector
                                image={profilePic}
                                setImage={setProfilePic}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="First Name"
                                placeholder="Ex: John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Ex: Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            value={email}
                            disabled
                            className="bg-gray-50 text-gray-400 cursor-not-allowed"
                        />

                        <div className="pt-4 border-t border-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                            <Input
                                label="New Password"
                                type="password"
                                placeholder="Leave blank to keep current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-10 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {loading ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Profile
