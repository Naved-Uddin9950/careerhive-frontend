import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin, Button, message } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { getApiAuth } from '../../utils/apiService';
import styles from './Profile.module.css';

const UserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { token } = useAuth();
    const [query] = useSearchParams();
    const id = query.get("id");

    useEffect(() => {
        if (!token) return;
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getApiAuth(`/users/${id}`, token);
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error fetching profile : ", error);
                message.error("Error fetching profile");
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [token, id]);

    if (loading) {
        return <Spin size="large" />;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        message.info("Feature is under development!");
        setIsEditing(false);
    };

    return (
        <div className={styles["profile-container"]}>
            <div className={styles["images-container"]}>
                <img
                    src="https://via.placeholder.com/1500x500/2D3748/FFFFFF?text=Banner+Image"
                    alt="Banner"
                    className="rounded-xl w-full h-48 object-cover"
                />
                <div className={styles["avatar-container"]}>
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className={styles["avatar"]}
                    />
                </div>
            </div>

            <div className={styles["details-container"]}>
                <div className={styles["name-container"]}>
                    <div>
                        <h2 className={styles["fullname"]}>{userData.fullname}</h2>
                        <p className={styles["role"]}>{userData.role}</p>
                    </div>
                    {/* <Button
                        type="primary"
                        icon={<FaEdit />}
                        onClick={handleEditClick}
                        disabled={isEditing}
                    >
                        Edit Profile
                    </Button> */}
                </div>

                <div className={styles["personal-container"]}>
                    <div className={styles["field-container"]}>
                        <span className={styles["label"]}>Email:</span>
                        {isEditing ? (
                            <input
                                type="email"
                                defaultValue={userData.email}
                                className={styles["input"]}
                            />
                        ) : (
                            <span className={styles["value"]}>{userData.email}</span>
                        )}
                    </div>
                    <div className={styles["field-container"]}>
                        <span className={styles["label"]}>Verified:</span>
                        <span className={styles["value"]}>{userData.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                    <div className={styles["field-container"]}>
                        <span className={styles["label"]}>Account Created:</span>
                        <span className={styles["value"]}>{new Date(userData.createdAt).toLocaleString()}</span>
                    </div>
                    <div className={styles["field-container"]}>
                        <span className={styles["label"]}>Last Updated:</span>
                        <span className={styles["value"]}>{new Date(userData.updatedAt).toLocaleString()}</span>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-6 text-center">
                        <Button type="primary" onClick={handleSaveClick}>
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
